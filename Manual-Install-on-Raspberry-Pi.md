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

- Start with a clean Raspberry Pi OS Lite install [download here](https://downloads.raspberrypi.org/raspios_lite_arm64_latest)
  - If you are using an older pi, you may need to use [this image](https://downloads.raspberrypi.org/raspios_lite_armhf_latest) instead, as the one above is only for newer models
  - If you want to have a desktop user interface, there is an additional section after the base install that will walk you through installing the XFCE Desktop Window Manager.
- You'll need to make sure you've got SSH access enabled (`sudo raspi-config` on the Raspberry Pi terminal to enable) before starting.

These instructions assume the following:

- Your Raspberry Pi is fully configured and ready to go.
- You are starting starting from the home directory of the current user.
  - If not, your mileage may vary with these instructions.
  - It is recommended to move to the home directory (`cd ~`) before starting:
- You are comfortable with running linux commands and interpreting their output

> :information_source: \_If you haven't already done so, make sure to install the latest version of the eeprom update tool to ensure you've got the latest firmware for the USB controller chip: `sudo apt install rpi-eeprom rpi-eeprom-images`  
> _You'll need to reboot immediately_ (`sudo reboot`) _after updating this package to finalize the installation and firmware update._

Doing a manual install is not recommended if you are not comfortable with linux.

## Full CompanionPi setup

Note that the updater which is setup as part of this will make some system configuration changes, which may conflict with other applications you wish to install or may give companion too much control over your system (the power to shutdown/reboot)

The steps to replicate a full CompanionPi setup can be found in the script used to build CompanionPi images [here](https://github.com/bitfocus/companion-pi/blob/main/companionpi.pkr.hcl). 

The basic structure of that file, is the `provisioner "shell"` blocks define some scripts/commands to run. Each block is run as a different user. Try to follow the steps and if you have issues, either open an issue asking for help in that repository or ask in slack. Then we can improve the comments in that file to help the next person.

## Minimal companion install

This method will be more minimal and give you more control, but as a consequence will require you manage the nodejs version, udev rules and possibly other configurations. These changes will not be announced anywhere, it will be up to you to make the changes when appropriate

TODO - write steps here

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
