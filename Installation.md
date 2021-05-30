### Mac

Download the [latest release](https://github.com/bitfocus/companion/releases) for mac, unzip, drag Companion.app into your Applications folder

### Windows 7 and up (64bit)

Download the [latest release](https://bit.ly/3c3SmAH) for windows, install, run!

### Raspberry Pi (Raspbian)

Instructions to install and run Companion on a Raspberry Pi can be found here: [Companion on the Raspberry Pi](https://github.com/bitfocus/companion/wiki/Companion-on-the-Raspberry-Pi)

> **Please note:** Companion is only supported on the Raspberry Pi 4 (2, 4, or 8 BG). Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, **but it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

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

_NB:_ The location of the udev rules might differ on your linux distribution. Find a folder with other `.rules` files.

When you have done this, you can either reboot, or disconnect the devices and run

```
sudo udevadm control --reload-rules
```

before reconnecting them.
