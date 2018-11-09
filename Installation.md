### Mac

Download the [latest release](https://github.com/bitfocus/companion/releases) for mac, unzip, drag Companion.app into your Applications folder

### Windows 7 and up

Download the [latest release](https://github.com/bitfocus/companion/releases) for windows, install, run!

### Raspberry PI (raspbian)

Download the [latest release](https://github.com/bitfocus/companion/releases) for raspberry, untar, run!

To be able to use Companion on the raspberry pi without running as root (it is not recomended to run companion as root), you need to add a udev rule.

These rules needs to be added in in a new file at **/etc/udev/rules.d/50-companion.rules** with the following content:

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
```

When you have done this, you can either reboot, or disconnect the devices and run `sudo udevadm control --reload-rules` before reconnecting them.

### Linux

Download the [latest release](https://github.com/bitfocus/companion/releases) for linux, untar, run!

To be able to use Companion in Linux without running as root (it is not recomended to run companion as root), you need to add a udev rule.

These rules needs to be added in **/etc/udev/50-companion.rules** with the following content:

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
```

*NB:* The location of the udev rules might differ on your linux distirbution. Find a folder with other `.rules` files.

When you have done this, you can either reboot, or disconnect the devices and run
```
sudo udevadm control --reload-rules
```

before reconnecting them.