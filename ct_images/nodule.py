from ultralytics import YOLO
import torch.cuda

if __name__ == '__main__':
    # Check if CUDA (GPU) is available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)

    # Initialize the YOLO model
    model = YOLO("yolov8n.pt")

    # Train the model with validation
    results = model.train(
        data=r"C:\Users\Dell\Downloads\ct_images\data.yaml",  # Path to your data configuration file
        epochs=25,                # Number of epochs for training
        batch=16,            # Batch size
        imgsz=512,             # Input image size
        device=device,    # Device to use (cuda if available, else cpu)
        workers=4
    )