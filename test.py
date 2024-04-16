# import cv2
# import torch
# from ultralytics import YOLO

# # Function to convert video resolution
# def convert_video_resolution(video_path, output_path, target_width=1920, target_height=1080):
#     cap = cv2.VideoCapture(video_path)
#     width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

#     # Only convert if the resolution is different
#     if width != target_width or height != target_height:
#         print("Converting video resolution...")
#         fourcc = cv2.VideoWriter_fourcc(*'XVID')  # Or another suitable codec
#         out = cv2.VideoWriter(output_path, fourcc, cap.get(cv2.CAP_PROP_FPS), (target_width, target_height))

#         while cap.isOpened():
#             ret, frame = cap.read()
#             if not ret:
#                 break

#             frame_resized = cv2.resize(frame, (target_width, target_height))
#             out.write(frame_resized)

#         cap.release()
#         out.release()
#         print("Conversion complete.")
#     else:
#         print("Video resolution is already 1920x1080.")


# # --- Rest of your code ---

# # ... (Your existing code)

# # Resolution checking and conversion
# video_path = '5349098-hd_1920_1080_30fps.mp4' 
# output_path = '5349098-hd_1920_1080_30fps.mp4'  # Output path for converted video if needed

# convert_video_resolution(video_path, output_path)

# # Open the (potentially converted) video file
# cap = cv2.VideoCapture(output_path)


import cv2
import torch
from ultralytics import YOLO


model = YOLO('./models/image_model.pt')  


# video_path = '15650838-hd_1920_1080_60fps.mp4'  
cap = cv2.VideoCapture(0)


while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = model(frame_rgb)
    print(results[0]) 

    
    for detection in results[0].boxes.xyxy: 
        x1, y1, x2, y2 = detection

        
        cls = 0
        conf = .5 

        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2) 
        cv2.putText(frame, f"{model.names[int(cls)]} {conf:.2f}", (int(x1), int(y1) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow('Processed Frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()