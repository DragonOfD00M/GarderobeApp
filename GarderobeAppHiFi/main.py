import subprocess
import threading

def execute(file_type : str, file_path : str) -> None:
    subprocess.run([file_type,file_path])

programs = [r"Garderobe_system.py",r"Garderobe_visual.py"]
for program_path in programs:
    threading.Thread(target=execute, args= ("Python", program_path)).start()