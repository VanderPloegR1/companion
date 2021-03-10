# Developers Guide. Ish.

So, you want to develop a module for Companion? Welcome!
This document describes what you need to know and do to make a beautiful module being able to control your favorite gear with Companion.

## Prerequisites

Companion is written in Javascript and uses the node.js runtime. That means you should be at least a little bit familiar with Javascript.
Companion, Javascript and Node.js are platform independent, so you can develop on Windows, macOS or Linux and the code you write will be able to run on Windows, macOS and Linux, but the following text shows how to develop on Linux or macOS. On Windows you need a little different setup, so you can't use the commands for Windows. Follow these guidelines and come back when ready: [Developing on Windows 10](https://github.com/bitfocus/companion/wiki/Developing-on-Windows-10)

### Prerequisites on Linux

1. Install [node.js](https://nodejs.org/en/). Node installs itself, the node executable and the node package manager "npm". You won't see any icons on your desktop or somewhere else, all node executables are used from the terminal.
2. Install n with the terminal command `sudo npm install n -g`. n is a node version control module, it is very helpful because many node modules are working only with a certain version of node.
3. Install yarn with the terminal command `sudo npm install yarn -g`. Yarn is a package management system for node modules, it helps you keeping all of your modules and their dependencies up to date.
4. Install [git](https://git-scm.com/downloads). Git is a version control system which allows many developers to collaborate on the same project and keep track of their work. If you have never worked with git before it is a good idea to read some getting started with git guides now.
5. Install libgusb headers, in debian based systems use package `libgusb-dev`
6. Install udev headers, in debian based systems use package `libudev-dev`
7. Install `cmake` as it is required for building nodejs modules for companion 2.0

### Prerequisites on osx with homebrew

1. Open terminal
2. Install [homebrew](https://docs.brew.sh/) `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Install needed packages `brew install nodejs npm libusb git`
4. Install npm packages: `npm install n yarn -g`
5. Select needed node.js version using n: `n 12.21.0`
6. Create directory to clone companion to and change to that directory: `mkdir -p ~/src && cd ~/src`
7. Clone the companion repository: `git clone https://github.com/bitfocus/companion`
8. Install required node.js modules and update companion modules: `cd companion && ./tools/update.sh && ./tools/build_writefile.sh`

## Getting started

1. Tell node what version you want to use `n 12.21.0`
2. If you don't have a GitHub account yet, now you have to make one.
3. Here you can make one of two choices on how to proceed:

   1. If you intended only to program modules and do not plan on developing for the core app, clone the Companion repository:

      - `git clone https://github.com/bitfocus/companion.git`
      - This will put the latest Companion code on your computer for module development
      - There are methods using git commands to switch the code from `latest` (or `master`) to a specific branch, such as `stable-2.1`, or to a tag, such as `v2.1.0`. For development purposes it's often best to be on the `master` branch.
      - The downside to this method is that if you later wish to submit bugfixes to the core app you will need to complete the steps below at that time.

   2. If you intend to develop for the core app, fork the Companion repository:
      - Go to the [companion repository](https://github.com/bitfocus/companion) and click on Fork in the right top corner. Now GitHub will make a complete copy of all the companion source in your account, but GitHub will remember that this is a copy derived from the original Bitfocus/companion repository. If you want to make changes to the code or write a new module you cannot change the data in the Bitfocus/companion repository but you can write to your own fork.
      - You cannot edit the code on GitHub (not really), you have to do this on your local computer. Use git to clone your fork to your computer. First change to the directory where you want to have your local repositoy and then `git clone https://github.com/yourgithubusername/companion.git`.
      - The downside to this method is that you will have to manually merge changes from the Bitfocus/companion repository into your fork in order to receive core updates. If you're git or Google savy this won't be a problem, though.

4. Change into your new local repository `cd companion`
5. After this you'll need to run some scripts in the `tools` folder. These are good to know, becuase you'll use them decently often in development:
   - `./tools/update.sh`: Companion only contains the core application in this repository, so you'll need this to sync in all the control modules and dependencies.
   - `./tools/build_writefile.sh`: This makes a build number reference for the runtime environment.
6. Voilá, you should now have everything set up to run Companion directly from the source code. Later you may or may not bundle all the stuff together and build an executable, but now you can just tell node to do the same stuff it would do when starting that executable but without packaging it first `yarn dev`

## The git workflow

For first time git and GitHub users this is a tough part. The commands in that section are only named for your reference, this section describes the workflow and is not a copy and paste to your commandline guide. Companion is open source, everybody can see and use the source code. You can change it the way you want, but we also want Companion to be a useful piece of software, so there has to be some management to ensure the software quality. Git and GitHub are tools, which help us with that. GitHub is a platform hosting the source code and its associated metadata and git is a program controlling that metadata and transferring the code from here to there on your computer and between computers.

- When you start developing Companion you are a stranger and we can't allow you to change the code directly in the Bitfocus/companion repository. Instead you have to change the code somewhere else and then propose your changes for being included in the original data. The first step is to fork the repo, that means GitHub makes a copy of the original repo in your account, but GitHub will remember that this is a copy derived from the original repository.
  GitHub allows only very limited online editing, so you have to get all the data to your computer to edit it there. This process is called cloning, you have to clone your forked repository to your computer. When you clone a repo you do not only get the source code in its latest version you get all the history metadata together with it.
- Now that you have all the files on your computer you can edit them as you wish and try them out as long as you want. If you are satisfied with your work you have to make your changes available (if you want). Unfortunately this is a little complex process.
- git is a version control system, it allows us to go back in time and to see which change has been made to which file by who for what purpose. But we don't want to track every single edit you made, only the edits you think which should be a separate snapshot where you or anybody else might be interested in later. To create such a snapshot you have to "commit" your changes. First you have to select the changes which you want to commit, you don't have to include all your current changes you made in a snapshot. In git speak you have to "stage" the files you want to be included in the snapshot. With the commit command you tell git that you feel the state of the staged files like they are now on your computer should have a snapshot. If you edit a staged file before you commit it, it will get unstaged and you have to stage it again. You will be prompted to enter a commit message describing what that snapshot, we call it commit from now on, contains. Now git stores all the data in its database it needs to restore that point in time whenever you want.
- The commit still lives only on your computer, so you have to transfer it somehow to your remote repository. The command for that purpose is "push". At the time you cloned your remote repository to your computer git has remembered where it comes from and automatically added the remote location as a "remote" to your local repository. This remote automatically gets the name "origin". That means when you push now to origin you are transferring all your commits since cloning or the last push to the remote named origin.
- Now that your changes are in your fork you need a way to tell the Companion developers that you have some exciting new features and you want them to be included in the original Bitfocus/companion repository. The way to do that is to create a pull-request. You can do that on GitHub and you can decide which commits of which branch you want to be pulled to which branch in the Bitfocus/companion repo. Wait, what is a branch? Don't care about that for now, if you don't know about branches, then the branch with the name "master" is the right one for you.
- GitHub also tells you if the pull-request can be merged automatically. If yo are the only one who has made changes to the files in your pull-request, then it is easy. Git then just uses all your changes if the pull-request is accepted. But imagine somebody else has done some changes to the same files during the time it took you to fork and clone and edit and stage and commit and push and pull-request. Now the git program has two competing versions with different alterations and it cannot decide automatically how to mix the two files into one. That means a core developer has to do the work and review your changes and which lines to use from which version of the two competing files. If you have done bigger changes you normally had tested your code before pushing it and if somebody else now has to decide which lines to keep this may break the code. Therefor it is a good habit to "pull before push". That means you look yourself for changes somebody else may have done before you push your files. That is important even if there are changes in files you didn't change, because those changes may influence your code as well.
  But at that point you have only one remote to your local repository, the automatically generated origin pointing to your fork. If you pull now you will pull from your fork and nobody else should have made any change on your fork. To pull the changes from the original repository you have to add it as a remote as well. You can name that remote as you like but a common name is "upstream". Once you have done that you pull from upstream and push to origin. If there are any conflicts, you are the one to solve them and test before you push. That makes the life of the maintainers a lot easier.
- If the core developers get tired of merging your pull-requests they may give you write access to a repository, then you can push direct to the code of Companion.

## Editing code

To edit the source code or write new code you can use any text editor you like, but there are many editors which are made especially for developing computer code or even better especially for JavaScript.
If you have no idea you should try the [Visual Studio Code](https://code.visualstudio.com/) editor.

### Bracing and indentation

Use tabs for indentation. We use tabwith=4, but you can do whatever you like. One indentation = one tab.

For bracing, do this

```
if (var == 1) {
	return;
}
```

not this

```
if (var == 1)
{
	return;
}
```

not this

```
if (var == 1) return;
```

not this

```
if (var == 1)
	return;
```

One thing we also like to do, is to subindent similar lines like

```
var moda = require("modulea");
var moduleb = require("moduleb");
var hello = require("hello");
```

to being

```
var moda    = require("modulea");
var moduleb = require("moduleb");
var hello   = require("hello");
```

this subindentation is not done with tabs, but spaces. Looks nice!

## Modules

Companion uses plug-ins to expand its capabilities, we call these plug-ins modules. For every device you can control with Companion there is a "module", which is both a Javascript and Companion term.

### Changing existing modules

When you want to make changes to an existing module, you need to fork the module's repository in the same way like you did with the core of Companion.
When you're doing changes to modules in companion, you need to upgrade the git link in the core as well. A submodule is similar to a pointer referencing a different repository at a certain commit point. If you made a change you have to update that pointer, so it points to the newest commit in the referenced repository.

1. Make sure you pull inside the module folder `git pull origin master` (maybe for you it is not "origin", just pull from the remote pointing to the original files)
2. Do your changes
3. Commit the changes with a nice message
4. Push your changes `git push origin HEAD:master` (again the name of your remote may be something different than "origin", if you are pushing to your fork of the submodule it usually is origin)

Now, in the core, we need to upgrade the reference to the module to the new version. For this we've made a tool. Go to the companion base directory (not inside the module):

```
cd companion
./tools/upgrade_module.sh <modulename>
```

## When you want to create a new `mymanufacturer-myproduct` module that doesn't have a repository yet:

1. `mkdir module-local-dev` (if the `module-local-dev` root folder does not already exist)
2. `cd ./module-local-dev/`
3. `mkdir mymanufacturer-myproduct`
4. `cd mymanufacturer-myproduct`
5. `npm init` (enter x 10)
6. `git init`
7. `git add package.json`
8. `git commit package.json -m "package.json"`
9. `echo node_modules/ > .gitignore`
10. `git add .gitignore`
11. `git commit .gitignore -m "gitignore to ignore the node_modules/ folder"`

Now, you need to ask the core developers in the #module-development group on ([Bitfocus Slack](https://join.slack.com/t/bitfocusio/shared_invite/enQtODk4NTYzNTkzMjU1LTMzZDY1Njc2MmE3MzVlNmJhMTBkMzFjNTQ2NzZlYzQyZWIzZTJkZWIyNmJlY2U0NzM1NGEzNzNlZWY3OWJlNGE)) to create a repository for your module (mention brand and product) and wait for them to create the module repository.

When the repository gets created by a core developer, you can continue.

11. `git remote add origin https://github.com/bitfocus/companion-module-mymanufacturer-myproduct.git`
12. `git push origin HEAD:master`

Now we're at a point that the core developers must decide if its time to include this module in the companion core. But ask us on slack ([Bitfocus Slack](https://join.slack.com/t/bitfocusio/shared_invite/enQtODk4NTYzNTkzMjU1LTMzZDY1Njc2MmE3MzVlNmJhMTBkMzFjNTQ2NzZlYzQyZWIzZTJkZWIyNmJlY2U0NzM1NGEzNzNlZWY3OWJlNGE)), and if we decide to add it - and we say it's done, you may proceed.

If you want to change something in the module after this, you need to do your changes, commit it to the repository and read the beginning of the modules section in this document for instructions.

## What makes up a module

This document describes the API version 1.0.0. Your module will be compatible with all versions of Companion using API 1.x.x.
A Companion module consists of several files in one folder, the folder can have subfolders if needed.
On the root of the folder there have to be at least two files for a working module:

1. a file with the name package.json
2. a file containing the code of the module
   There should be a few more files in every module, though technically not needed:
3. HELP.md, a file with some user manual for the module
4. LICENSE, in open source projects like Companion it is very important that you make clear under which license the module is released
5. .gitignore, this is a file which we recommend to add to your module to control which of the files within your module will be tracked by our version control system.

**Let's start with package.json**

package.json is the root of the module. Companion scans the directory /module-local-dev looking for subfolders containing that package.json-files and if it finds one it assumes it a module.
A typical package.json-file looks like this:

```
{
  "name": "eventmaster",
  "version": "0.0.4",
  "description": "Barco EventMaster plugin for Companion",
  "main": "eventmaster.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "William Viker",
  "license": "MIT",
  "dependencies": {
    "barco-eventmaster": "^5.1.0"
  }
}
```

You can guess the meaning of the most parts. "main" is the location/name of the main JavaScript file, it is common to either reflect the module name or to use index.js.

At this point we don't make use of scripts given in the package.json, so you can just copy the test line. The test script will be executed if you run the module with `npm test`. Test help to improve the stability and quality of the code and we may use them in the future.

A basic package.json file can be created by hand or it is automatically created for you when you use the command `npm init`.

"dependencies" lists other node packages and their minimum versions this package relies on. Most modules will rely on some standard packages like tcp, we have them in core, so you don't have to list them here.

When you want to use packages not available in core please install them in your module's node_modules folder with yarn `yarn add myfancymodule`. This will also add the package to the dependencies in package.json. Please also make sure to add the yarn.lock file to .gitignore after using yarn.

**The Module source code**

You can handle all your module's stuff in one big file or you can distribute it to several files, it's up to you. But you have to have some things in the module. If the user adds an instance to the configuration Companion instantiates the module. But JavaScript doesn't have classes, we are working with functions and objects. That means our module is required by the system and then some functions will be called. You have to fill the functions with code. Easiest way to build a new module is to have a look at some existing modules. Take them as a starting point.

The functions divide into several categories:

1.  Module internal stuff, initialization, housekeeping...
2.  Providing functionality to the user
3.  The code behind all that stuff

### Module internal stuff, initialization, housekeeping...

When the user adds a new instance Companion looks in your module's main JavaScript file and executes the function `instance(system, id, config)`. Within that function the module gets constructed by calling `instance_skel.apply(this, arguments);` (you need to require '../../instance_skel'). During construction instance_skel calls `instance.prototype.init` where all your initialization code should go.

When the module gets deleted `instance.prototype.destroy` is called where you should clean-up whatever you don't need anymore (sockets, timers...)

For the module to work you also need

```
instance_skel.extendedBy(instance);
exports = module.exports = instance;
```

It is the JavaScript equivalent to some object oriented code.

See also [Extending instance_skel](./instance_skel)

### Providing functionality to the user

Most (so far all) modules do want to provide some interaction with the user. The possible items are stored in json objects. This splits up in several categories.

- [[Module Configuration]]
- [[Actions]]
- [[Feedback]]
- [[Presets]]
- [[Variables]]

#### Printing to log

While developing you might want to print some info or variables to the console or the in companion log.
The below commands will help you do just that:

For printing to console, if you launch through terminal:

- `console.log('you data/message');`

And if you want it in the log in the web interface, see [instance_skel](https://github.com/bitfocus/companion/wiki/instance_skel#statuslevel-string-message-string-returns-void).

### The code behind all that stuff

Once you declared the actions and presets and maybe variables and feedbacks you have a nice looking module which still doesn't do anything. Now you have to program some code to be executed when an action is triggered or feedback has to be updated.
Let's start with the actions.
Companion calls the function `instance.prototype.action = function(action)` when it wants the module to execute an action.
It passes the object action, which reflects the ID of the action in the property action.action and has the options in the property action.options.

```
var theIDofTheAction = action.action;
var theOptionsOfTheAction = action.options;
```

Now you can act depending on the action and the options. Many modules use a simple switch statement with one case for each action. Another method is to use the action-ID itself. Let's assume you just want to send a string with each action, then you can use that string as the action-ID and use it like sendmystring(action.action);
If you are working with options, especially textinput, you should validate the inputs or make the code as failsafe as possible.

## Testing

In any case, your module should be tested throughout at different stages of its life. Off course you should use a linting tool which most code editors and IDEs offer.  
You should check the compatibility to the Companion core, especially to different versions of the configuration file. Some users may not have used Companion in a long time and their configuration file might look different then what you expect.  
And last but not least you should check **all** your actions with **all** the options and feedbacks and whatever with the real device. Most bugs we find are typos, which would have easily been detected be complete testing. Also please don't rely on simulations, often the real device reacts differently than the simulator.

... work in progress ...

Questions? [SLACK](https://join.slack.com/t/bitfocusio/shared_invite/enQtODk4NTYzNTkzMjU1LTMzZDY1Njc2MmE3MzVlNmJhMTBkMzFjNTQ2NzZlYzQyZWIzZTJkZWIyNmJlY2U0NzM1NGEzNzNlZWY3OWJlNGE)! :)
