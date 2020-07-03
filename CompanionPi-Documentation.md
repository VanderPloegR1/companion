> :warning: :warning: :warning: If you flash the CompanionPi image and your Stream Deck is not detected, you need to follow [steps 3 and 4 of the manual installation instructions](https://github.com/bitfocus/companion/wiki/Manual-Install-on-Raspberry-Pi#installing-companion). The newest version of the 15-button Stream Deck uses a hardware ID that is not accounted for in the current CompanionPi image. This will be fixed with the release of Companion v2 from beta.

***

## Table of Contents
1. [About CompanionPi](#about-companionpi)
    * [System Requirements](#system-requirements)
    * [Configuration Notes](#configuration-notes)
    * [Optional Post-Flash Configuration](#optional-post-flash-configuration)
    * [CompanionPi Terminal Commands](#companionpi-terminal-commands)
1. [CompanionPi Images](#companionpi-images)
1. [Accessing the Companion Admin User Interface](#accessing-the-companion-admin-user-interface)
1. [Complete Changes from Base Raspbian](#complete-changes-from-base-raspbian)

# About CompanionPi
CompanionPi is built and maintained by a member of the community, not by Bitfocus or its employees. If you encounter issues using CompanionPi, you should ask questions in the #rpi channel of the Bitfocus AS Slack server or report issues/feature requests [here, on GitHub](https://github.com/bitfocus/companion/issues).

The current version of CompanionPi is built specifically for Rasbpian Buster on the Raspberry Pi 4. It has not been tested, and is not in any way supported on, any previous version of the Raspberry Pi or on any other Raspberry Pi operating system. Additionally, you'll want to make sure your Raspberry Pi is the 4GB variant.

Due to the fact that are working with the Raspberry Pi, CompanionPi is built on Raspbian Buster Lite. This is intended for headless operation (no display, mouse, or keyboard attached). This mode of operation is the recommended mode because this maximizes the resources available to Companion.

## System Requirements
* Raspberry Pi 4B 4GB
* MicroSD Card, UHS Class 1 or higher
* Adequate power supply adapter (recommend the [official Raspberry Pi power supply](https://www.raspberrypi.org/products/type-c-power-supply/))

## Configuration Notes
CompanionPi is built on the Raspbian OS. Aside from the addition of the Companion source code, only a few minor changes have been made to the system configuration to facilitate construction of the image(s):
* **SSH Server is enabled by default**
* The default `pi` user account still has the default `raspberry` password. This is left up to you to change for security purposes should you choose to do so [(and you should!)](https://www.raspberrypi.org/documentation/configuration/security.md)
* Locale, Timezone, and Keyboard Layout settings were changed to US-based settings instead of the default UK-based settings
* More specific details about how the CompanionPi image was assembled can be found at the end of this wiki page.

## Optional Post-Flash Configuration
If you weren't already planning on it, it is strongly recommended to change the default password of the `pi` user.  Doing this will help secure your system from unauthorized access. There are other security-oriented best practices that are recommended, such as:
* making `sudo` require a password
* making sure you've got the latest security fixes
* improving SSH security

All of these recommended best practices can be found here, on the raspberrypi.org website: https://www.raspberrypi.org/documentation/configuration/security.md

## CompanionPi Terminal Commands
There are a few commands that will be useful for all CompanionPi users. These commands will perform several functions, such as
* Viewing the full Bitfocus Companion licensing information
  * `companion-license` is a custom executable that's been added to output the full text of the Bitfocus Companion License.
  * To close the license viewer (`less` file viewer) you can simply type `q`.
* Starting, stopping, or restarting Companion, or viewing the status of the Companion service
  * `sudo systemctl [start/stop/restart/status] companion` will execute the desired action as it relates to the Companion service
* Updating the Companion source code from GitHub and building any new changes
  * `companion-update` is a custom executable that's been added to easily call the `update.sh` script that performs the update operations.
  * This must be run as `sudo` (i.e. `sudo companion-update`).

# CompanionPi Images
CompanionPi images can be downloaded using the links below. Both the image file and the sha1 checksum are provided. "Versioning" for CompanionPi will be indicated by the date in the filename, rather than a version number.
* CompanionPi 2020-07-02
  * Image: https://s3.bitfocus.io/rpi-builds/CompanionPi-2020-07-02/CompanionPi-2020-07-02.img.gz
  * Checksum (SHA256): https://s3.bitfocus.io/rpi-builds/CompanionPi-2020-07-02/CompanionPi-2020-07-02.img.gz.sha256sum
  * Changes:
    * Fresh build on new Raspberry Pi OS (formerly Raspbian) _Lite Version_
    * Updated Companion (latest master as of 02 July 2020)
* [Previous Versions](https://github.com/bitfocus/companion/wiki/CompanionPi-Archive)

## Flashing the Image to your microSD Card
First of all, you're going to want a fast Micro SD card. One of the most popular ones currently on the market is the SanDisk Extreme PRO 32GB card ([on Amazon, here (Amazon US)](https://www.amazon.com/gp/product/B06XYHN68L)). This isn't always going to be _the best_ one to use, but it is a very good, adequately fast microSD card. Look for anything that is classified as UHS 1 or higher as these will have the read/write speeds you need for your Raspberry Pi to be useful instead of a slow pain in the neck.

Once you've got your fast microSD card in hand, you'll need a tool for flashing the image to the card. One of the most popular tools is Balena Etcher (Windows, Mac, and Linux). It's very easy to use. You can [download it here](https://www.balena.io/etcher/).

> On first boot, it'll take a few minutes for the Admin User Interface to be available. The OS has to resize itself to the capacity of your SD card and that takes an extra reboot.

Once you've got CompanionPi up and running, it's recommended to run `sudo companion-update` via an SSH terminal to make sure you've got all the latest updates and fixes.

# Accessing the Companion Admin User Interface
Once you've got your Raspberry Pi up and running with the CompanionPi image, you'll need to know the IP address of your Raspberry Pi. There are a few ways to do this:
* A custom Python script written to email you the IP address every time it boots _(requires internet connection at boot)_: [on GitHub, here](https://github.com/oliverscheer/send-email-with-device-ip-address)
* Set a static IP address on your Pi _(good option if your Raspberry Pi is going to be always connected to the same equipment)_: [this tutorial from The Pi Hut](https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-give-your-raspberry-pi-a-static-ip-address-update)
* An attached LCD display to show your current IP address _(a little maker-y, and pretty cool)_: [example from PiMyLifeUp](https://pimylifeup.com/raspberry-pi-lcd-16x2/)

Once you know your IP address, you can access the Companion Admin User Interface on port 8000 of that IP address (i.e. http://192.168.1.3:8000).


# Complete Changes from Base Raspbian
These notes are not a "to-do" list, but are provided for transparency so users can see what changes have been made to the default Raspbian environment to make CompanionPi work. Enterprising users are free to make additional changes in their own environments, and having this informational baseline is always helpful in doing so.

* Changed default hostname from `raspberrypi` to `CompanionPi`  
_(raspi-config > 2 Network Options > N1 Hostname)_
* Changed Locale to en_US.UTF-8  
_(raspi-config > 4 Localisation Options > I1 Change Locale)_
* Changed Timezone to America/Chicago  
_(raspi-config > 4 Localisation Options > I2 Change Timezone)_
* Changed Keyboard Layout to Generic Logitech/US English  
_(raspi-config > 4 Localisation Options > I3 Change Keyboard Layout)_
* Enabled SSH  
_(raspi-config > 5 Interfacing Options > P2 SSH)_
* Companion v2.0 was installed per the standard instructions ([[Manual Install on Raspberry Pi]]) with one change:  
**Companion is installed at `/usr/local/src` instead of `/home/pi`.**
  * This was done primarily so individual users have the option to modify/disable/remove the default `pi` user as a security measure.
  * This directory is also, historically, the "preferred" location for source code applications.
* The standard `headless.js` is replaced with a modified version that will bind to IP address `0.0.0.0` at boot instead of requiring an active network connection.
  * This allows for the Raspberry Pi to be booted up _and then_ connected to a network, such as a wireless network, and have Companion still launch and available as soon as the network connection is up.
  * The code for this modified `headless.js` (named `headless_ip.js`) can be found here [Companion Issue #538](https://github.com/bitfocus/companion/issues/538#issuecomment-472007173)
* Companion is configured to auto-start at boot using a systemd unit file.
  * The code and documentation for this is here: [[Auto Start Companion on Linux Using systemd]]
* Two executables have been added to `/usr/local/bin` to make two functions easier. These commands can be run from any directory by any logged-in user.
  * `companion-license` - outputs the contents of the full LICENSE.md file
  * `companion-update` - simplifies the process of updating Companion
    * Must be run as sudo -> `sudo companion-update`
* A custom Message of the Day has been added to be displayed in the terminal when users log in either locally or via SSH.  
   ```This Raspberry Pi is running the Bitfocus Companion software, version 1.4.0.  
   The source code repository for this project can be found here:  
   https://github.com/bitfocus/companion
   
   Full licensing information for Bitfocus Commpanion can be found at
   /usr/local/src/LICENSE.md or https://github.com/bitfocus/companion/blob/master/LICENSE.md  
   or by running 'companion-license' in the terminal
   
   Any bugs, issues, or feature requests for the Companion software should be reported on the project's GitHub:  
   https://github.com/bitfocus/companion/issues
   
   Companion should auto-start on this computer as soon as a viable network connection is detected.  
   You can access the Companion Admin User Interface on port 8000 of this computer's IP address  
   (i.e. http://192.1.1.2:8000).
   ```