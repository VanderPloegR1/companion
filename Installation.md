### Mac

Download the [latest release](https://github.com/bitfocus/companion/releases) for mac, unzip, drag Companion.app into your Applications folder

### Windows 7 and up (64bit)

Download the [latest release](https://github.com/bitfocus/companion/releases) for windows, install, run!

### Raspberry Pi (Raspbian)

Instructions to install and run Companion on a Raspberry Pi can be found here: [Companion on the Raspberry Pi](https://github.com/bitfocus/companion/wiki/Companion-on-the-Raspberry-Pi)

> **Please note:** Companion is only supported on the Raspberry Pi 4 (2, 4, or 8 GB). Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, **but it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

### Linux

For the desktop version, download the [latest release](https://github.com/bitfocus/companion/releases) for linux, untar, run!

To be able to use Companion in Linux without running as root (it is not recommended to run companion as root), you need to add a udev rule.

These rules needs to be added in **/etc/udev/50-companion.rules** with the content from https://github.com/bitfocus/companion-pi/blob/main/50-companion.rules
You may want to update this file when updating companion as it sometimes changes as new devices are released or supported

_NB:_ The location of the udev rules might differ on your linux distribution. Find a folder with other `.rules` files.

When you have done this, you can either reboot, or disconnect the devices and run

```
sudo udevadm control --reload-rules
```

before reconnecting them.

### Docker

There is a docker image published to the [Github container registry](https://github.com/bitfocus/companion/pkgs/container/companion%2Fcompanion) that can be used to simplify deployment on linux.

**Make sure to bind a volume to `/companion` so that your configuration is persisted**

Companion uses various incoming ports. There are various api servers, and some modules will setup their own servers expecting inbound connections to work. Make sure to plan for this with the network mode used in docker.

#### USB passthrough
TODO: example parameter  
TODO: are udev rules necessary?  
Not currently supported, the hid library does not work in docker properly

#### Remote USB
To connect streamdecks to companion from another machine, you can use [Companion Satellite](https://github.com/bitfocus/companion-satellite)  
Make sure to forward tcp port 16622 for this to work.
