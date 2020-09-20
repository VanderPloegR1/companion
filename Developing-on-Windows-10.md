Install node latest form [here](https://nodejs.org/en/) and make sure you install additional tools like chocolatery (its a separate process, but it installs important stuff like Visual Studio buildtools and python).

Install Visual studio code: (https://code.visualstudio.com//) or Atom (https://atom.io/) as your editor

Install Git Bash and launch it after installation;
[Git for windows](https://gitforwindows.org/)

Because Companion is build on node 8, you'll need a version manager like N(ode)V(ersion)M(anager).
(https://github.com/coreybutler/nvm-windows/releases) and download nwv-setup.exe. Unpack and run the setup.
Verify installation by running `nvm list` in git bash, you should see the version you installed previously.

Now install version 8: `nvm install 8.15.1`
After that switch to that node version: `nvm use 8.15.1`

Now install Yarn;
`npm install yarn -g`

Get all core files to your system;
`git clone https://github.com/bitfocus/companion.git`

Companion core is now cloned to your system, but you don't have the submodules yet. Go into companion directory (`cd companion`) and run;
`./tools/update.sh`

You are all set!

To run Companion on the localhost (127.0.0.1:8000) use yarn script;
`yarn headless`

> When using Git Bash, you can get into trouble with line endings (Windows uses CRLF while Linux uses LF). `git config core.autocrlf true` converts this for you