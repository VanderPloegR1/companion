Install node latest form [here](https://nodejs.org/en/) and make sure you install additional tools like chocolatery (its a separate process, but it installs important stuff like visualstudiobuildtools and python).

Install Visual studio code: (https://code.visualstudio.com//) or Atom (https://atom.io/) as your editor

Install Git Bash and launch it after installation;
[Git for windows](https://gitforwindows.org/)

Because Companion is build on node 8, you'll need a version manager like nvm. run the following script to install;
(https://github.com/coreybutler/nvm-windows/releases) and download nwv-setup.exe. Unpack and run the setup.
verify installation by running `nvm list`, you should see the version you installed previously.
now install version 8: `nvm install 8.15.1`
After that switch to that node version: `nvm use 8.51.1`

Now install Yarn
`npm install yarn -g`

Get all core files to your system;
`git clone https://github.com/bitfocus/companion.git`

Fetch the (sub)modules;
`tools\update.sh`

Create a buildfile/directory;
`tools\build_writefile.sh`

To view the network interfaces available; 
`node headless.js`

Then use one listed like for example;
`node headless.js "Loopback Pseudo-Interface 1"`

> When using Git Bash, you can get into trouble with line endings (Windows uses CRLF while Linux uses LF). `git config core.autocrlf true` converts this for you