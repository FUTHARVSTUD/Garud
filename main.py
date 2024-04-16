from flask import Flask, request, render_template_string, Response, redirect, url_for
import cv2
import torch
from ultralytics import YOLO
import tempfile


# After initializing your Flask app

import os

app = Flask(__name__)

def generate_frames(video_path):
    model = YOLO('./models/best.pt')  # Load the trained model
    cap = cv2.VideoCapture(video_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model(frame_rgb)

        for detection in results[0].boxes.xyxy:
            x1, y1, x2, y2 = detection
            conf, cls = 50.0, 0  # Default values for simplicity
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"{model.names[int(cls)]} {conf:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/')
def index():
   return render_template_string('''
    <!doctype html>
    <html>
    <head>
        <title>Upload Video</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                flex-direction: column;
            }
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            input[type="file"], input[type="submit"] {
                margin-bottom: 20px;
            }
            input[type="submit"] {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: #3498db;
                color: white;
                cursor: pointer;
            }
            input[type="submit"]:hover {
                background-color: #2980b9;
            }
        </style>
    </head>
    <body>
        <h1>Upload video to process</h1>
       <form method="post" enctype="multipart/form-data" action="/upload">
        <input type="file" name="video">
        <input type="submit" value="Upload">
        </form>
    </body>
    </html>
    ''')
 

@app.route('/upload', methods=['POST'])
def upload():
    video_file = request.files['video']
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        video_file.save(temp_video.name)
        global video_path
        video_path = temp_video.name  # Make the video path accessible globally
    return render_template_string('''
        <!doctype html>
<html>
<head>
    <title>Processed Video</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            text-align: center; /* Ensures the text inside the flex container is centered */
        }
        
        img {
            margin-bottom: 20px; /* Adds some space below the image */
        }
    </style>
</head>
<body>
    <h1>Processed Video Stream</h1>
    <img src="/stream" width="640" height="480" alt="Processed Video Stream">
    <br>
    <a href="/">Upload Another Video</a>
</body>
</html>

        ''')

@app.route('/stream')
def stream():
    return Response(generate_frames(video_path),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
