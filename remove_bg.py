from PIL import Image
import sys
import os

def remove_white_bg(input_path, output_path, threshold=200):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        return
    
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if color is close to white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        remove_white_bg(sys.argv[1], sys.argv[2])
    else:
        # Fallback for previous usage
        remove_white_bg('public/sanza-logo.png', 'public/sanza-logo-transparent.png')
        remove_white_bg('public/sanza-trophy-source.png', 'public/sanza-trophy.png')
