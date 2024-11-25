import os
import shutil

def download_using_instaloader(url):
    current_directory = os.getcwd()

    relative_path = os.path.join("..", "media")
    DOWNLOAD_PATH = os.path.join(current_directory, relative_path)

    TEMP_PATH = os.path.join(DOWNLOAD_PATH, f"{url}")
    # print(TEMP_PATH)

    if os.path.exists(TEMP_PATH):
        return {"status": True, "message": "File already exists"}

    # print(url, "-", DOWNLOAD_PATH, "-", TEMP_PATH, "-", current_directory, "-", relative_path)

    command = f"instaloader -- -{url}"
    os.system(command)

    source_file =  f'./-{url}'
    destination_file = DOWNLOAD_PATH + f'/{url}'

    shutil.move(source_file, destination_file)

    return {"status": True, "message": "File downloaded successfully"}
