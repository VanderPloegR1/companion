# About CompanionPi
CompanionPi is built and maintained by a member of the community, not by Bitfocus or its employees. If you encounter issues using CompanionPi, you should ask questions in the #rpi channel of the Bitfocus AS Slack server or report issues/feature requests here, on GitHub.

The current version of CompanionPi is built specifically for Rasbpian Buster on the Raspberry Pi 4. It has not been tested, and is therefore not supported on, any previous version of the Raspberry Pi.
* Headless: Raspbian Buster Lite
* Headed: "Raspbian Buster with desktop" (not "Raspbian Buster with desktop and recommended software")
>Headless, with no attached display and no graphical user interface, is the recommended mode of operation for Companion on current Raspberry Pi systems. This is because this mode maximizes the computational resources available to Companion.

# Configuration Notes
CompanionPi is built on an unmodified deployment of the Raspbian OS, with Companion installed per the standard instructions ([[Manual Install on Raspberry Pi]]). There is one key difference, though:
* **SSH Server is enabled by default**
* The default `pi` user account still has the default `raspberry` password. Those are left up to you to change for security purposes should you choose to do so [(and you should!)](https://www.raspberrypi.org/documentation/configuration/security.md)
* CompanionPi has a 2nd user account set up for the sole purpose of housing and running the Companion software. The username for this account is `companion` and the password is 'bitfocus'.
  * This was done so that no matter what happens to the default `pi` user account, Companion should still continue to function if the Raspberry Pi will boot.
* More details about how the CompanionPi image was assembled can be found at the end of this wiki page.

Certain other minor changes were made to the Raspbian environment for setup and configuration purposes, as well, most notably:
* Locale, Timezone, and Keyboard Layout settings were changed to US-based settings instead of the default UK-based settings
> The default `pi` user account still has the default `raspberry` password. Those are left up to you to change for security purposes should you choose to do so [(and you should!)](https://www.raspberrypi.org/documentation/configuration/security.md)

# CompanionPi Images
The images are currently being developed and/or tested to confirm viability. As they are deemed viable for public consumption, download links will be made available here.

## Flashing the Image to your microSD Card
First of all, you're going to want a fast Micro SD card. One of the most popular ones currently on the market is the SanDisk Extreme PRO 32GB card ([on Amazon, here](https://www.amazon.com/gp/product/B06XYHN68L)). This isn't always going to be _the best_ one to use, but it is a very good, adequately fast microSD card. Look for anything that is classified as UHS 1 or higher as these will have the read/write speeds you need for your Raspberry Pi to be useful instead of a slow pain in the neck.

Once you've got your fast microSD card in hand, you'll need a tool for flashing the image to the card. One of the most popular tools is Balena Etcher (Windows, Mac, and Linux). It's very easy to use. You can [download it here](https://www.balena.io/etcher/).

# Accessing the Companion Admin User Interface
In order for Companion to bind the Admin User Interface to your network connection (wired Ethernet or wireless), that connection has to be available at boot.
* Wired Ethernet: you'll need to have the Ethernet cable plugged in before you power on the Raspberry Pi.
* Wireless network: you'll need to set up your wireless connection first, then reboot the Raspberry Pi so Companion can bind the Admin User Interface to the wireless network connection.
  * If you're going to use wireless, make sure you've also updated the service file accordingly. The documentation for this is here: [[Auto Start Companion on Linux Using systemd]]

Once you've got your Raspberry Pi up and running with the CompanionPi image, you'll need to know the IP address of your Raspberry Pi. There are a few ways to do this:
* A custom Python script written to email you the IP address every time it boots _(requires internet connection at boot)_: [on GitHub, here](https://github.com/oliverscheer/send-email-with-device-ip-address)
* Set a static IP address on your Pi _(good option if your Raspberry Pi is going to be always connected to the same equipment)_: [this tutorial from The Pi Hut](https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-give-your-raspberry-pi-a-static-ip-address-update)
* An attached LCD display to show your current IP address _(a little maker-y, and pretty cool)_: [example here](https://pimylifeup.com/raspberry-pi-lcd-16x2/)

Once you know your IP address, you can access the Companion Admin User Interface on port 8000 of that IP address (i.e. http://192.168.1.3:8000).


# Complete Changes from Base Raspbian
These notes are not a "to-do" list, but are provided for transparency so users can see what changes have been made to the default Raspbian environment to make CompanionPi work. Enterprising users are free to make additional changes in their own environments, and having this informational baseline is always helpful in doing so.

## CompanionPi Headless
1. Changed default hostname from `raspberrypi` to `CompanionPi` _(raspi-config > 2 Network Options > N1 Hostname)_
1. Changed Locale to en_US.UTF-8 _(raspi-config > 4 Localisation Options > I1 Change Locale)_
1. Changed Timezone to America/Chicago _(raspi-config > 4 Localisation Options > I2 Change Timezone)_
1. Changed Keyboard Layout to Generic Logitech/US English _(raspi-config > 4 Localisation Options > I3 Change Keyboard Layout)_
1. Enabled SSH _(raspi-config > 5 Interfacing Options > P2 SSH)_
1. Added new user `companion`, with default password `bitfocus` and home directory `/home/companion`
1. Using the new `companion` user, Companion was installed via the standard instructions for the Raspberry Pi, substituting the appropriate home directory where necessary: [[Manual Install on Raspberry Pi]]
1. Companion is configured to auto-start at boot using a systemd unit file. The documentation for this is here: [[Auto Start Companion on Linux Using systemd]]

## CompanionPi w/ Attached Display (Headed)
_Coming soon!_
