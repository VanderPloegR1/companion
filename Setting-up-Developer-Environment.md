If you only wish to develop modules, you can refer to the [Module Development Wiki](https://github.com/bitfocus/companion-module-base/wiki) for a simpler and more minimal setup.  
The following will also work for developing modules, if you prefer the more manual route

## Platform notes

### Installing WSL

> Many AV users work on Windows, setting up a developers environment is a bit harder then on OSX or Linux. The key is combining linux on Windows. You are installing Linux side-by-side on windows.

First install Windows Subsystem for Linux (reboot yes);

`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`

Download from the windows store a Linux distribution (I used Ubuntu LTS search for linux) and install/start it (just follow the steps). This will install a command line interface for Ubuntu. It will start automatically.

### Using homebrew on macos

On macos, the typically way to install git and other tools is with [Homebrew](https://brew.sh/)

## The process

### 1) Install node.js

There are many ways of doing this. We recommend using a version manager, to allow for easily updating and switching between versions.

In the past, we recommended using `n`, but that requires a version node.js to be installed first.  
Our recommendation is to use [fnm](https://github.com/Schniz/fnm#installation) It is fast and cross-platform. You are free to install any other way you wish, but you will need to figure out the correct commands or ensure you have the right version at each point.

Once you have installed fnm execute the following in a terminal, to install node.js v18 and make it be the default.

```
fnm install 18
fnm use 18
fnm default 18
corepack enable
```

> When using Git Bash on windows, you can get into trouble with line endings (Windows uses CRLF while Linux uses LF). `git config core.autocrlf true` converts this for you

### 2) Other tools

To edit the source code or write new code you can use any text editor you like, but there are many editors which are made especially for developing computer code or even better especially for JavaScript.
If you have no idea you should try the [Visual Studio Code](https://code.visualstudio.com/) editor.

You will also need to install [git](https://git-scm.com/), which is what we use with to manage, upload and download the sourcecode with [GitHub](https://github.com/bitfocus). On macos this available from homebrew.  
If you have never used git or github before, have a read of our [Git crashcourse](Git-crashcourse).

TODO - we should recommend a free git gui tool

### 2a) Linux dependencies

If you are using linux, you should follow the dependencies and udev rules steps as described in the README included in the release builds https://github.com/bitfocus/companion/tree/beta/assets/linux.

For WSL, you should follow the dependencies portion.

You may also need to install python, which on Ubuntu can be achieved with: `sudo apt install python`

### 3) Companion preperation

Using your git client, you can clone Companion.

Once you have done this, in a terminal (the console window inside vscode is perfect for this) run `yarn update` to prepare your clone for being run. You will need to do this every time you update your clone as we are often updating dependencies or changing the webui code.

You can now run Companion with `yarn dev`

By default this will serve the prebuilt version of the webui, which will not update as you make changes. If you wish to run the webui in development mode in a second terminal window/tab run `yarn dev-webui`. This will launch the development version of the webui on a different port, typically http://localhost:3000

This will run the 'headless' version of Companion, without the red launcher window. If you want to run with that, you can cd into the `launcher` folder and run `yarn dev`. On WSL this may require additional dependencies to be installed.
