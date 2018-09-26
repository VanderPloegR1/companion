# Developers Guide. Ish.
So, you want to develop a module for Companion? Welcome!
This document describes what you need to know and do to make a beautiful module being able to control your favorite gear with Companion.
## Prerequisites
Companion is written in Javascript and uses the node.js runtime. That means you should be at least a little bit familiar with Javascript.
Companion, Javascript and Node.js are platform independent, so you can develop on Windows, macOS or Linux and the code you write will be able to run on Windows, macOS and Linux, but the following text shows how to develop on Linux or macOS. On Windows you need a little different setup, so you can't use the commands for Windows.

1. Install [node.js](https://nodejs.org/en/). Node installs itself, the node executable and the node package manager "npm". You won't see any icons on your desktop or somewhere else, all node executables are used from the terminal.
2. Install n with the terminal command ```sudo npm install n -g```. n is a node version control module, it is very helpful because many node modules are working only with a certain version of node.
3. Install yarn with the terminal command ```sudo npm install yarn -g```. Yarn is a package management system for node modules, it helps you keeping all of your modules and their dependencies up to date.
4. Install [git](https://git-scm.com/downloads). Git is a version control system which allows many developers to collaborate on the same project and keep track of their work. If you have never worked with git before it is a good idea to read some getting started with git guides now.

## Getting started
1. Tell node what version you want to use ```n 8.12.0```
2. If you don't have a GitHub account yet, now you have to make one.
3. Fork the companion repository. Go to the [companion repository](https://github.com/bitfocus/companion) and click on Fork in the right top corner. Now GitHub will make a complete copy of all the companion source in your account, but GitHub will remember that this is a copy derived from the original Bitfocus/companion repository. If you want to make changes to the code or write a new module you cannot change the data in the Bitfocus/companion repository but you can write to your own fork. 
4. You cannot edit the code on GitHub (not really), you have to do this on your local computer. Use git to clone your fork to your computer. First change to the directory where you want to have your local repositoy and then ```git clone <your forked repository>```. \<your forked repository\> is something like https://github.com/yourgithubusername/companion.git
5. Change into your new local repository ```cd companion```
6. We provide some shell-scripts to run common tasks in the folder tools. Now use the update-script to install all the needed modules and submodules ```./tools/update.sh```
7. Voilá, you should now have everything set up to run Companion directly from the source code. Later you may or may not bundle all the stuff together and build an executable, but now you can just tell node to do the same stuff it would do when starting that executable but without packaging it first ```npm run start```

## The git workflow
For first time git and GitHub users this is a tough part. The commands in that section are only named for your reference, this section describes the workflow and is not a copy and paste to your commandline guide. Companion is open source, everybody can see and use the source code. You can change it the way you want, but we also want Companion to be a useful piece of software, so there has to be some management to ensure the software quality. Git and GitHub are tools, which help us with that. GitHub is a platform hosting the source code and its associated metadata and git is a program controlling that metadata and transferring the code from here to there on your computer and between computers.
* When you start developing Companion you are a stranger and we can't allow you to change the code directly in the Bitfocus/companion repository. Instead you have to change the code somewhere else and then propose your changes for being included in the original data. The first step is to fork the repo, that means GitHub makes a copy of the original repo in your account, but GitHub will remember that this is a copy derived from the original repository.
GitHub allows only very limited online editing, so you have to get all the data to your computer to edit it there. This process is called cloning, you have to clone your forked repository to your computer. When you clone a repo you do not only get the source code in its latest version you get all the history metadata together with it.
* Now that you have all the files on your computer you can edit them as you wish and try them out as long as you want. If you are satisfied with your work you have to make your changes available (if you want). Unfortunately this is a little complex process.
* git is a version control system, it allows us to go back in time and to see which change has been made to which file by who for what purpose. But we don't want to track every single edit you made, only the edits you think which should be a separate snapshot where you or anybody else might be interested in later. To create such a snapshot you have to "commit" your changes. First you have to select the changes which you want to commit, you don't have to include all your current changes you made in a snapshot. In git speak you have to "stage" the files you want to be included in the snapshot. With the commit command you tell git that you feel the state of the staged files like they are now on your computer should have a snapshot. If you edit a staged file before you commit it, it will get unstaged and you have to stage it again. You will be prompted to enter a commit message describing what that snapshot, we call it commit from now on, contains. Now git stores all the data in its database it needs to restore that point in time whenever you want.
* The commit still lives only on your computer, so you have to transfer it somehow to your remote repository. The command for that purpose is "push". At the time you cloned your remote repository to your computer git has remembered where it comes from and automatically added the remote location as a "remote" to your local repository. This remote automatically gets the name "origin". That means when you push now to origin you are transferring all your commits since cloning or the last push to the remote named origin.
* Now that your changes are in your fork you need a way to tell the Companion developers that you have some exciting new features and you want them to be included in the original Bitfocus/companion repository. The way to do that is to create a pull-request. You can do that on GitHub and you can decide which commits of which branch you want to be pulled to which branch in the Bitfocus/companion repo. Wait, what is a branch? Don't care about that for now, if you don't know about branches, then the branch with the name "master" is the right one for you.
* GitHub also tells you if the pull-request can be merged automatically. If yo are the only one who has made changes to the files in your pull-request, then it is easy. Git then just uses all your changes if the pull-request is accepted. But imagine somebody else has done some changes to the same files during the time it took you to fork and clone and edit and stage and commit and push and pull-request. Now the git program has two competing versions with different alterations and it cannot decide automatically how to mix the two files into one. That means a core developer has to do the work and review your changes and which lines to use from which version of the two competing files. If you have done bigger changes you normally had tested your code before pushing it and if somebody else now has to decide which lines to keep this may break the code. Therefor it is a good habit to "pull before push". That means you look yourself for changes somebody else may have done before you push your files. That is important even if there are changes in files you didn't change, because those changes may influence your code as well.
But at that point you have only one remote to your local repository, the automatically generated origin pointing to your fork. If you pull now you will pull from your fork and nobody else should have made any change on your fork. To pull the changes from the original repository you have to add it as a remote as well. You can name that remote as you like but a common name is "upstream". Once you have done that you pull from upstream and push to origin. If there are any conflicts, you are the one to solve them and test before you push. That makes the life of the maintainers a lot easier.
* If the core developers get tired of merging your pull-requests they may give you write access to a repository, then you can push direct to the code of Companion.

## Editing code
To edit the source code or write new code you can use any text editor you like, but there are many editors which are made especially for developing computer code or even better especially for JavaScript.
If you have no idea you should try the [atom editor](https://atom.io/), it is open source as well and very customizable.
### Bracing and indentation
Use tabs for indentation. We use tabwith=2, but you can do whatever you like. One indentation = one tab.

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

## Tools

### Update all, including yarn in submodules [Core Devs, Mod Devs]
./tools/update.sh

## Modules
Companion uses plug-ins to expand its capabilities, we call these plug-ins modules. For every device you can control with Companion there is a module. We splitted the repositories for the Companion source code and the code for the modules. Every module has its own repository on github and that repository is referenced in the core repo as a submodule. "Submodule" is a git term, "module" is a Javascript and Companion term. 

### Changing existing modules
When you want to make changes to an existing module, you need to fork the module's repository in the same way like you did with the core of Companion.
When you're doing changes to modules in companion, you need to upgrade the git link in the core as well. A submodule is similar to a pointer referencing a different repository at a certain commit point. If you made a change you have to update that pointer, so it points to the newest commit in the referenced repository.

1. Make sure you pull inside the module folder ```git pull origin master``` (maybe for you it is not "origin", just pull from the remote pointing to the original files)
2. Do your changes
3. Commit the changes with a nice message
4. Push your changes ```git push origin HEAD:master``` (again the name of your remote may be something different than "origin", if you are pushing to your fork of the submodule it usually is origin)

Now, in the core, we need to upgrade the reference to the module to the new version. For this we've made a tool. Go to the companion base directory (not inside the module):

```
cd companion
./tools/upgrade_module.sh <modulename>
```


## When you want to create a new ```mynewmodule``` module that doesn't have a repository yet:

1) ```cd ./lib/module/```
2) ```mkdir mynewmodule```
3) ```cd mynewmodule```
4) ```npm init``` (enter x 10)
5) ```git init```
6) ```git add package.json```
7) ```git commit package.json -m "package.json"```
8) ```echo node_modules/ > .gitignore```
9) ```git add .gitignore```
10) ```git commit .gitignore -m "gitignore to ignore the node_modules/ folder"```

Now, you need to ask the core developers to create a repository for your module, and wait for them to create the module repository.

When the repository gets created by a core developer, you can continue.

11) ```git remote add origin https://github.com/bitfocus/companion-module-mynewmodule.git```
12) ```git push origin HEAD:master```

Now we're at a point that the core developers must decide if its time to include this module in the companion core. But ask us on slack, and if we decide to add it - and we say it's done, you may proceed.

It's important that you didn't get any erros in the last push, because you're going to delete the code from your computer (make a backup if you're unsure).

13) ```cd ..```
14) ```rm -rf mynewmodule```
15) ```cd ../../```
16) ```./tools/update.sh```

The module should now appear in lib/module/mynewmodule, and if you want to change something in the module after this, you need to do your changes, commit it to the repository and read the beginning of the modules section in this document.

## What makes up a module

A Companion module consists of several files in one folder, the folder can have subfolders if needed.
On the root of the folder there have to be at least two files for a working module:
1) a file with the name package.json
2) a file containing the code of the module
There should be a few more files in every module, though technically not needed:
3) HELP.md, a file with some user manual for the module
4) LICENSE, in open source projects like Companion it is very important that you make clear under which license the modulke is released
5) .gitignore, this is a file which we recommend to add to your module to control which of the files within your module will be tracked by our version control system.

**Let's start with package.json**

package.json is the root of the module. Companion scans the directory /lib/module looking for subfolders containing that package.json-files and if it finds one it assumes it a module.
A typical package.json-file looks like this:
```{
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
At this point we don't make use of scripts given in the package.json, so you can just copy the test line. The test script will be executed if you run the module with ```npm test```. Test help to improve the stability and quality of the code and we may use them in the future.
"dependencies" lists other node packages and their minimum versions this package relies on. Most modules will rely on some standard packages like tcp, we have them in core, so you don't have to list them here.

**The Module source code**

You can handle all your moule's stuff in one big file or you can distribute it to several files, it's up to you. But you have to have some things in the module. If the user adds an instance to the configuration Companion instantiates the module. But JavaScript doesn't have classes, we are working with functions and objects. That means our module is required by the system and then some functions will be called. You have to fill the functions with code. Easiest way to build a new module is to have a look at some existing modules. Take them as a starting point.
The functions divide into several categories:
 1. Module internal stuff, initialisation, housekeeping...  
 2. Providing functionality to the user  
    2.1. Module configuration  
    2.2. Actions  
    2.3. Presets  
    2.4. Variables  
    2.5. Feedbacks  
 3. The code behind all that stuff  

### Module internal stuff, initialisation, housekeeping...

When the user adds a new instance Companion looks in your module's main JavaScript file and executes the function `instance(system, id, config)`. Within that function the module gets constructed by calling `instance_skel.apply(this, arguments);` (you need to require '../../instance_skel'). During construction instance_skel calls `instance.prototype.init` where all your initialization code should go.

When the module gets deleted `instance.prototype.destroy` is called where you should clean-up whatever you don't need anymore (sockets, timers...)

Most modules define the property "info" like this 
`instance.module_info = {
	label: 'Your module name',
	id: 'module_id',
	version: 'x.y.z'
};`
This is deprecated, the module information should be only in package.json

For the module to work you also need
`instance_skel.extendedBy(instance);
exports = module.exports = instance;`
It is the JavaScript equivalent to some object oriented code.

### Providing functionality to the user

Most (so far all) modules do want to provide some interaction with the user. The possible items are stored in json objects. This splits up in several categories.

#### Module configuration
The module configuration is like preferences for the instance. E.g. the IP-adress of the device controlled by the instance.
The configuration json is returned by the function `instance.prototype.config_fields`
Every item needs to have:
- id: an unique (within the configuration) id of the item
- label: the text which will be shown next to the configuration item
- type: the type of the configuration item. Following types are supported: textinput, dropdown, text
   textinput shows a textinput line where users can provide some text

```
{
  type: 'textinput',
  id: 'host',
  label: 'Target IP',
  width: 6,
  regex: self.REGEX_IP
}
```

   dropdown shows a dropdown menu with some choices to chose from

```
{
  type: 'dropdown',
  label: 'Nice Dropdown',
  id: 'myfirstdropdown',
  default: '1',
  choices: [
    { id: '1', label: 'One' },
    { id: '2', label: 'Zwei' },
    { id: '3', label: 'Tres' },
    { id: '4', label: '4' }
  ]
}
```

   text shows just some informational text

```
{
  type: 'text',
  id: 'info',
  width: 12,
  label: 'Information',
  value: 'Hello World!'
}
```
Additional an item can have:
- width: tries to set the display with of the item relative to the other items' widths
- default: a default value
- regex: a regular expression to validate the user-input
  you can find some predefined regular expressions in instance_skel and use them like e.g. `self.REGEX_IP`
  If you want to write your own regular expression the string should look like this `'/foo(bar)?/i'`, if you need a backslash, you have to double escape it like this `'/^\\w+$/'`

In your code you can get the values of the configuration like `var myConfigValue = this.config.idOfItem`

#### Actions

Actions are the "commands" being executed when a user pushes a button. 
This section explains how to provide the possible actions and their options to the user. The code executed when an action is triggered has to be written too, but not during action declaration.

#### Presets

Presets are a description of a ready made button, so the user doesn't have to write button text and choose a color and add an action, he can just drag and drop a preset to an empty bank and all the attributes are copied to the button.

#### Variables

#### Feedbacks

### The code behind all that stuff

... work in progress ...

Questions? SLACK! :)
