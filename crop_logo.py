from PIL import Image
import os

def crop_transparency(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    # Get the bounding box of non-transparent pixels
    bbox = img.getbbox()
    
    if bbox:
        # Crop to the bounding box
        img_cropped = img.crop(bbox)
        
        # We want to keep it square for a favicon, so let's add equal padding if needed
        width, height = img_cropped.size
        new_size = max(width, height)
        
        new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
        # Center the cropped image
        offset_x = (new_size - width) // 2
        offset_y = (new_size - height) // 2
        new_img.paste(img_cropped, (offset_x, offset_y))
        
        new_img.save(output_path, "WEBP")
        return True
    return False

if __name__ == "__main__":
    logo_path = r"C:\Users\ASUS\Documents\Sistemas\Marketing-mistico\frontend\public\Logoparaweb.webp"
    output_path = r"C:\Users\ASUS\Documents\Sistemas\Marketing-mistico\frontend\public\Logoparaweb.webp" # Overwrite
    
    if crop_transparency(logo_path, output_path):
        print("Logo cropped and updated successfully.")
    else:
        print("Failed to crop logo.")
