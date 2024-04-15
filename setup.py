import subprocess

# We load the newline separated commands from the commands file.
with open("commands.txt", "r") as fh:
    # We use the readlines() method to get a list of all the lines in the file.
    cmds = fh.readlines()
    for cmd in cmds:
        # We run each command using the subprocess.run() function in Python.
        subprocess.run(["sudo"] + cmd.split())
