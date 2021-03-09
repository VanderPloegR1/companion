# Setting up your dev environment on Windows 10

> Many AV users work on Windows, setting up a developers environment is a bit harder then on OSX or Linux. The key is combining linux on Windows. You are installing Linux side-by-side on windows.

First install Windows Subsystem for Linux (reboot yes);

`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`

Download from the windows store a Linux distribution (I used Ubuntu LTS search for linux) and install/start it (just follow the steps). This will install a command line interface for Ubuntu. It will start automatically. 

Install nodejs 12 (we use 12 for companion)
`curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -`

`sudo apt-get install gcc g++ make`

`sudo apt-get install -y nodejs`

`npm install yarn -g`

`sudo apt-get install -y libgusb-dev`

`sudo apt-get install -y libudev-dev`

Normally that would be it, but unfortunately, still errors. Missing dependencies etc.

Install GTK+ (be patient for this);

`sudo apt-get install libgtk-3-dev`

Extra library's;

`sudo apt-get install libgconf2-4`

`sudo apt-get install libxss1`

`sudo apt-get install libnss3-dev`

`sudo apt-get install libasound2`

Git should already be there so clone the repository, but on your windows drive!;

`cd /mnt/c` This will go to your C drive choose a different location if needed

`git clone https://github.com/bitfocus/companion.git`

Go into your newly created directory
`cd companion`

then get all the module stuff and update;
`./tools/update.sh`

No errors? then launch!

`./tools/build_writefile.sh`

`node headless.js`

You'll get a list of available interfaces and use one, for example:

`node headless.js eth0`

## Extra's

### Nodemon
This is very handy for testing. To install:
`sudo npm install -g nodemon`

now you can compile and with each codechange companion will restart;
`nodemon headless.js eth0`

If you would like more versions of node install NVM or n
### Install nvm (version manager of node) on Ubuntu;

`sudo apt-get update`

`sudo apt-get install build-essential libssl-dev`

`sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

This will install the v0.34.0 version check on the website for the latest version ([https://github.com/creationix/nvm/releases](https://github.com/creationix/nvm/releases))

Then install your version of nodejs;

`nvm install 12.21.0`

verify after install if this is the version being used;
`nvm list`

### Install python

`sudo apt install python`

### 32-bit vs 64-bit problems
If you get error's from not being able to use 32-bit versions in WSL include these two commands once:

`sudo service binfmt-support start`

`sudo dpkg --add-architecture i386`

After using those once you will need to enable this again next time you run a WSL instance by using this command again:
`sudo service binfmt-support start`