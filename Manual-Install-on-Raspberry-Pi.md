These instructions will walk you through installing Companion v2.2 on your Raspberry Pi 4 Model B.

> :information_source: **Please Note:** The only supported Raspberry Pi hardware is the Raspberry Pi 4 4/8GB (1GB/2GB is not supported).

> :exclamation: **WARNING** Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, **but it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

When running Companion on the Raspberry Pi, the recommended mode of operation is "headless" (no monitor, keyboard, or mouse attached). As such, it is recommended to use Raspberry Pi OS Lite as your operating system. This maximizes the resources available to Companion. If you wish to have a desktop user interface on the same Pi, there are steps at the end of this document that will get you there.

> :information_source: **Please Note:** Raspberry Pi OS, and Ubuntu Server are the only supported Raspberry Pi operating system. These instructions do not work with the n00bs environment (known incompatibility), and no other operating systems have been tested or are supported.

- [Installing Companion](#installing-companion)
- [Adding a Desktop User Interface](#adding-a-desktop-user-interface)
- [Updating Companion](https://github.com/bitfocus/companion/wiki/Manual-Install-on-Raspberry-Pi#updating-companion)

# Installing Companion

Before starting the installation process, you'll need to get your Raspberry Pi set up and configured.

> :information_source: Ubuntu Server is also possible and is almost the same flow. You can substitute that in if you wish, but some commands may need to be subtly different. It is only recommended if you are comfortable with linux and can figure those bits out yourself.

- Start with a clean Raspberry Pi OS Lite install ([download here](https://downloads.raspberrypi.org/raspios_lite_armhf_latest))
  - If you want to have a desktop user interface, there is an additional section after the base install that will walk you through installing the XFCE Desktop Window Manager.
- You'll need to make sure you've got SSH access enabled (`sudo raspi-config` on the Raspberry Pi terminal to enable) before starting.

These instructions assume the following:

- Your Raspberry Pi is fully configured and ready to go.
- You are starting starting from the home directory of the current user.
  - If not, your mileage may vary with these instructions.
  - It is recommended to move to the home directory (`cd ~`) before starting:

1. Make sure apt and all installed packages are up-to-date.

   ```bash
   sudo apt update && sudo apt upgrade -y && sudo apt autoclean -y && sudo apt autoremove
   ```

1. Install some required packages.

   ```bash
   sudo apt-get install libgusb-dev git build-essential cmake libudev-dev libusb-1.0-0-dev curl -y
   ```

   :information*source: \_If you haven't already done so, make sure to install the latest version of the eeprom update tool to ensure you've got the latest firmware for the USB controller chip:*
   `sudo apt install rpi-eeprom rpi-eeprom-images`
   _You'll need to reboot immediately_ (`sudo reboot`) _after updating this package to finalize the installation and firmware update._

1. Install nodejs

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

1. Because it is never recommended to run things on Linux as the root user, you will need to add a udev rule.

   ```bash
   sudo nano /etc/udev/rules.d/50-companion.rules
   ```

   Add these lines to that new file

   ```
   SUBSYSTEM=="input", GROUP="input", MODE="0666"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006d", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006d", MODE:="666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f41", MODE:="666", GROUP="plugdev"
   KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f41", MODE:="666", GROUP="plugdev"
   ```

1. Either reboot your Raspberry Pi (`sudo reboot`) or reload the udev rules `sudo udevadm control --reload-rules`

1. Install yarn and update your PATH variable

   ```bash
   sudo npm install yarn -g
   export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
   ```

   :warning: _The output from the `export` command is silent. You will not see any results from this command other than a fresh command prompt after executing the command._

1. Now we're ready to clone the repository and build. These commands will clone the repository, move into the `companion` directory, update all dependencies and modules, and create a fresh build.

Note: From this point on, you do not need to use npm again. Doing so will give you the wrong dependencies and will probably break things

   ```bash
   cd ~
   git clone https://github.com/bitfocus/companion.git
   cd companion
   yarn update
   ./tools/build_writefile.sh
   ```

1. Follow the instructions here to create a service which will start Companion automatically at system boot: [auto start companion using systemd](https://github.com/bitfocus/companion/wiki/Auto-Start-Companion-on-Linux-Using-systemd).

1. Reboot your Raspberry Pi (`sudo reboot`), wait a couple minutes, and you should be able to access the Companion UI on port 8000 of your Raspberry Pi's IP address (i.e. `http://192.168.1.2:8000`)

# Adding a Desktop User Interface

After rebooting your Pi post-install, we can add a Desktop User Interface by following these steps:

1. Let's install some more applications:

   ```bash
   cd ~
   sudo apt install lightdm xfce4 xfce4-terminal rc-gui chromium filezilla
   ```

2. Once those are done installing, you'll need to tweak some settings in the `raspi-config` command-line utility:
   - Set the Pi to automatically boot to the desktop: `3 Boot Options` --> `B1 Desktop / CLI` --> `Desktop` or `Desktop Autologin`
   - Set your locale: `4 Localisation Options` --> all sub-menu items should be adjusted to match your locale
   - Set your default desktop resolution: `7 Advanced Options` --> `A5 Resolution`
   - Network-facing system name: `2 Network Options` --> `N1 Hostname`
     - You must reboot for this change to take effect

# Updating Companion

Instructions for updating Companion on your Raspberry Pi can be found here: [[Updating Companion on your Raspberry Pi]]
