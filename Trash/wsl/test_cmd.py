import os
# os.chdir('/')
import subprocess
fn = "3322ip"
cmd = 'echo password | sudo objdump -f ' + fn
r = subprocess.run('echo {} | sudo -S {}'.format(1, cmd),shell=True,capture_output=True)
print(r)