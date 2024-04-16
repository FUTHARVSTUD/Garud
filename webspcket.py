from flask import Flask, request, render_template_string, Response
from flask_socketio import SocketIO, emit
import cv2
import base64
import threading
from ultralytics import YOLO  # Make sure to have the ultralytics library installed

app = Flask(__name__)
socketio = SocketIO(app)

# Load the YOLO model (make sure the model file is in the correct path)
model = YOLO('./best.pt')

def process_and_stream(video_path):
    cap = cv2.VideoCapture(video_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame from BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Perform inference using the model
        results = model(frame_rgb)

        # Process each detection
        for detection in results[0].boxes.xyxy:
            x1, y1, x2, y2, conf, cls = detection
            label = f"{model.names[int(cls)]} {conf:.2f}"
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Convert the frame to JPEG and encode in base64
        _, jpeg = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(jpeg).decode('ascii')

        # Emit the processed frame
        socketio.emit('frame', {'image': 'data:image/jpg;base64,' + frame_base64})

    cap.release()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        video_file = request.files['video']
        video_path = 'uploaded_video.mp4'
        video_file.save(video_path)

        # Start processing and streaming in a background thread
        thread = threading.Thread(target=process_and_stream, args=(video_path,))
        thread.start()

        return Response(status=204)  # No content to return, just to indicate success

    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Upload Video</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js"></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 20px;
            }

            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            h1 {
                color: #333;
            }

            form {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
            }

            input[type="file"] {
                margin-bottom: 20px;
            }

            input[type="submit"] {
                cursor: pointer;
                padding: 10px 20px;
                border: none;
                background-color: #007bff;
                color: white;
                border-radius: 5px;
                font-size: 16px;
            }

            input[type="submit"]:hover {
                background-color: #0056b3;
            }

            #stream-image {
                max-width: 100%;
                border-radius: 8px;
            }
        </style>
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function() {
                var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
                socket.on('frame', function(data) {
                    var image = document.getElementById('stream-image');
                    image.src = data.image;
                });
            });
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Upload Video for Object Detection</h1>
            <form method="post" enctype="multipart/form-data">
                <input type="file" name="video" accept="video/*">
                <input type="submit" value="Upload">
            </form>
            <img id="stream-image" alt="Video Stream">
        </div>
    </body>
    </html>
''')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
