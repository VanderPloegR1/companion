# Companion on the Raspberry Pi - A Primer
> **First and foremost:** Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, but **it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

The Raspberry Pi 4 is the first Raspberry Pi SBC (single board computer) that is able to stably run the Companion software. The 2GB variant of the Raspberry Pi 4 is the minimum recommended board. The  4GB variant is the preferred option. As stated above, any Raspberry Pi SBC prior to the 4 is unsupported and is used at your own risk.

If you are installing Companion from scratch, make sure you've got your system updated with the latest eeprom/firmware updates ([info here](https://www.raspberrypi.org/forums/viewtopic.php?t=255001)). A recent update (late October 2019) combines the update mechanisms for both the SPI EEPROM and the VLI USB controller chip. Installing the latest updates will (in the future) open up the ability to boot your Raspberry Pi from a network-connected device or from an external USB storage device, and also updates the VLI firmware to reduce power consumption and bring running temperatures down by up to 3-4 °C.

# Flashing the Image to your microSD Card
First of all, you're going to want a fast Micro SD card. One of the most popular ones currently on the market is the SanDisk Extreme PRO 32GB card ([on Amazon, here](https://www.amazon.com/gp/product/B06XYHN68L)). This isn't always going to be _the best_ one to use, but it is a very good, adequately fast microSD card. Look for anything that is classified as UHS 1 or higher as these will have the read/write speeds you need for your Raspberry Pi to be useful instead of a slow pain in the neck.

Once you've got your fast microSD card in hand, you'll need a tool for flashing the image to the card. One of the most popular tools is Balena Etcher (Windows, Mac, and Linux). It's very easy to use. You can [download it here](https://www.balena.io/etcher/).

# Securing your Raspberry Pi
If you haven't already, it is strongly recommended to change the default password of the `pi` user. If you're using the CompanionPi images, you should also change the default password of the `companion` user. Doing this will help secure your system from unauthorized access. There are other security-oriented best practices that are recommended, such as:
* making `sudo` require a password
* making sure you've got the latest security fixes
* improving SSH security

All of these recommended best practices can be found here, on the raspberrypi.org website: https://www.raspberrypi.org/documentation/configuration/security.md

# CompanionPi Images
You can find current CompanionPi documentation here: [[CompanionPi Documentation]]

The images are currently being developed and/or tested to confirm viability. As they are deemed viable for public consumption, download links will be made available.

# Manual Installation
Instructions for installing Companion manually on a Raspberry Pi 4 2GB/4GB can be found here: [[Manual Install on Raspberry Pi]]

# Updating Companion
Instructions for updating Companion on your Raspberry Pi can be found here: [[Updating Companion on your Raspberry Pi]]