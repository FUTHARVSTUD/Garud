from ultralytics import YOLO
import torch

# Check for M1 GPU (Metal) availability
if torch.backends.mps.is_available():
    device = torch.device('mps')  # Use M1 GPU if available
else:
    device = torch.device('cpu')  # Fallback to CPU

# Load the YOLOv8 model 
model = YOLO('yolov8n.pt') 

# Move the model to the selected device
model.to(device) 

# Train the model
results = model.train(data='VisDrone.yaml', epochs=30, imgsz=640, save_dir='/content/gdrive/My Drive/YOLOv8_Models') 
