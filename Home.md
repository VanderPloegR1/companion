#  Welcome to the companion wiki!

We will try to keep this page updated with useful information

## OS Support information

### Mac

This is the most tested version. It should work without problems.

### Windows 7 and up

It works fine in Windows too. At the moment there is a few cosmetical problems with the windows version. But all functionality is there.

### Linux

To be able to use Companion in Linux without running as root (it is not recomended to run companion as root), you need to add a udev rule.

These rules needs to be added in **/etc/udev/50-companion.rules** with the following content:

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
```

When you have done this, you can either reboot, or disconnect the devices and run
```
sudo udevadm control --reload-rules
```

before reconnecting them.