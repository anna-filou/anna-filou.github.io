#!/usr/bin/env python3
from PIL import Image
import sys

def process_image(input_path, output_path):
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGB if necessary (for JPEG compatibility)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Get bounding box of non-white areas (trim white borders)
    # Convert to numpy-like approach: getbbox() works on alpha channel or we can use getextrema
    # For white borders, we'll use crop with getbbox after converting white to transparent
    # Actually, PIL's ImageOps.autocontrast or we can manually find the bounding box
    
    # Simple approach: find the bounding box by checking pixels
    # Load pixel data
    pixels = img.load()
    width, height = img.size
    
    # Find top non-white row
    top = 0
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            # Check if pixel is not white (allow small threshold)
            if not (r > 250 and g > 250 and b > 250):
                top = y
                break
        else:
            continue
        break
    
    # Find bottom non-white row
    bottom = height
    for y in range(height - 1, -1, -1):
        for x in range(width):
            r, g, b = pixels[x, y]
            if not (r > 250 and g > 250 and b > 250):
                bottom = y + 1
                break
        else:
            continue
        break
    
    # Crop the image (top and bottom)
    if top > 0 or bottom < height:
        img = img.crop((0, top, width, bottom))
    
    # Resize to 500px wide, maintaining aspect ratio
    if img.width != 500:
        ratio = 500 / img.width
        new_height = int(img.height * ratio)
        img = img.resize((500, new_height), Image.Resampling.LANCZOS)
    
    # Save as WebP with compression
    img.save(output_path, 'webp', quality=85, method=6)
    print(f"Processed image saved to {output_path}")
    print(f"Original size: {width}x{height}, New size: {img.width}x{img.height}")

if __name__ == '__main__':
    process_image('assets/books/to-chryso-eisitirio.jpg', 'assets/books/to-chryso-eisitirio.webp')

