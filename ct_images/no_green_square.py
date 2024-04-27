import os
import cv2
import numpy as np

# Path to the folder containing the images
folder_path = r'C:\Users\Dell\Downloads\ct_images\valid\images'
folder_path1 = r'C:\Users\Dell\Downloads\ct_images\valid\images\after'

# Define the lower and upper bounds for the green color in BGR
lower_green = np.array([0, 100, 0])
upper_green = np.array([150, 255, 150])

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png'):
        # Load the image
        image = cv2.imread(os.path.join(folder_path, filename))

        # Create a mask to locate green areas
        mask = cv2.inRange(image, lower_green, upper_green)

        # Replace green pixels with black
        image[mask > 0] = [0, 0, 0]

        # Save the result with the original filename
        cv2.imwrite(os.path.join(folder_path1, filename), image)
