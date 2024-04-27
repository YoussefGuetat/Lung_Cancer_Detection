from ultralytics import YOLO
import torch.cuda
from PIL import Image
import numpy as np

def image_to_binary(image_path, threshold=128):
    # Open the image
    image = Image.open(image_path)
    
    # Convert the image to grayscale
    grayscale_image = image.convert('L')
    
    # Apply a binary threshold
    binary_image = grayscale_image.point(lambda x: 255 if x > threshold else 0, '1')
    
    return binary_image

if __name__ == '__main__':
    # Check if CUDA (GPU) is available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)

    # Initialize the YOLO model
    model = YOLO(r"C:\Users\Dell\Downloads\ct_images\runs\detect\train\weights\best.pt")

    # Path to the image you want to test
    image_path = r"C:\Users\Dell\Downloads\ct_images\valid\images\marked_310_423_208_jpg.rf.358160ef4f430dbb63018b259cc613b8.jpg"  # Update with the path to your image
    
    # Convert the image to binary
    binary_image = image_to_binary(image_path)
    
    # Save the binary image
    binary_image_path = r'uploads\binary_image.jpg'
    binary_image.save(binary_image_path)

    # Perform object detection on the binary image
    results = model.predict(source=binary_image_path, conf=0.25)
    print(results[0].boxes.xyxy)

    # Assuming results[0].boxes.xyxy is a torch.Tensor
    boxes_tensor = results[0].boxes.xyxy

    # Convert torch.Tensor to NumPy array
    boxes_numpy = boxes_tensor.cpu().detach().numpy()

    # Extract the coordinates from the NumPy array
    coordinates = boxes_numpy[0]  # Assuming there's only one box, adjust if necessary

    # Now you can access individual coordinates
    x1, y1, x2, y2 = coordinates

    # Open the original image
    original_image = Image.open(binary_image_path)

    # Crop the original image based on the coordinates from detection
    cropped_image = original_image.crop((x1, y1, x2, y2))

    # Save the cropped image
    cropped_image_path = r'uploads\cropped_image.jpg'
    cropped_image.save(cropped_image_path)

    # Optionally, you can display the cropped image
    cropped_image.show()
