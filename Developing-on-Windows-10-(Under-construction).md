Install node 8
Use a version manager

Get all core files to your system;
`git clone https://github.com/bitfocus/companion.git`

Fetch the (sub)modules;
`./tools/update.sh`

Create a buildfile/directory;
`./tools/build_writefile.sh`

To view the network interfaces available; 
`node headless.js`

Then use one listed like for example;
`node headless.js "Loopback Pseudo-Interface 1"`

> When using Git Bash, you can get into trouble with line endings (Windows uses CRLF while Linux uses LF). `git config core.autocrlf true` converts this for you