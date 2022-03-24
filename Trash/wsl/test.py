#e.g: To execute "ls -l"
import subprocess
print(subprocess.check_call(['wsl', 'ls','-l']))