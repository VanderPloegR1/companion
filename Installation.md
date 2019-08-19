### Mac

Download the [latest release](https://github.com/bitfocus/companion/releases) for mac, unzip, drag Companion.app into your Applications folder

### Windows 7 and up

Download the [latest release](https://github.com/bitfocus/companion/releases) for windows, install, run!

### Raspberry PI (raspbian)

Instructions to install and run Companion (1.3-stable or 2.0-alpha) on a Raspberry Pi can be found here: https://github.com/bitfocus/companion/blob/master/documentation/raspberrypi.md

> Please note: performance on any Raspberry Pi system to date is less than optimal, and can easily break. **Running Companion in its current form on a Raspberry Pi is not recommended.** However, since the RPi is a popular device these instructions have been provided for you to use at your own risk. If you insist on running Companion on a Raspberry Pi, it is recommended to run Companion headless on the "Lite" version of the Raspbian OS. This will maximize the potential performance on your Raspberry Pi.

### Linux

Download the [latest release](https://github.com/bitfocus/companion/releases) for linux, untar, run!

To be able to use Companion in Linux without running as root (it is not recomended to run companion as root), you need to add a udev rule.

These rules needs to be added in **/etc/udev/50-companion.rules** with the following content:

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006?", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006?", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f4?", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f4?", MODE:="666", GROUP="plugdev"
```

*NB:* The location of the udev rules might differ on your linux distirbution. Find a folder with other `.rules` files.

When you have done this, you can either reboot, or disconnect the devices and run
```
sudo udevadm control --reload-rules
```

before reconnecting them.