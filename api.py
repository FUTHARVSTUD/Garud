from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import torch
from ultralytics import YOLO
import tempfile
import os

app = Flask(__name__)
CORS(app)

# Load YOLO model globally to avoid reloading it on each request
model = YOLO('./best.pt')

def generate_frames(video_path):
    cap = cv2.VideoCapture(video_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model(frame_rgb)

        for detection in results[0].boxes.xyxy:
            x1, y1, x2, y2 = detection
            conf, cls = detection[-2], int(detection[-1])  # Use actual confidence and class
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"{model.names[cls]} {conf:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/api/upload', methods=['POST'])
def upload():
    if 'video' not in request.files:
        return jsonify({"error": "No video part"}), 400

    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        video_file.save(temp_video.name)
        video_path = temp_video.name  # Use a local variable instead of global

    # You might want to process the video here and return the result
    # For simplicity, we're returning a placeholder response
    return jsonify({"message": "Video uploaded successfully", "videoPath": video_path}), 200

@app.route('/api/stream/<path:video_path>')
def stream(video_path):
    # Make sure to validate and sanitize 'video_path' to avoid security risks
    return Response(generate_frames(video_path),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
