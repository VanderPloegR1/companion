Rather than using rc.local scripting, modern Linux distributions can use `systemd` to manage start-up scripting. The new CompanionPi project uses systemd to auto-start Companion at boot. If you are unfamiliar with systemd, this Wikipidia article is a good primer: https://en.wikipedia.org/wiki/Systemd.

Because the commands used to start Companion differ between headless and headed operation, the unit files used to manage the service differ between headless and headed operation, as well.

This information is provided as a reference for those choosing to manually install Companion on a Linux-powered computer (especially a Raspberry Pi 4). For those using the CompanionPi pre-built images, the appropriate file is already included in the image.

# Headless and Wireless
If you are using Companion in headless mode and you intend to bind the Admin User Interface to a wireless network connection, you will need to make 1 minor modification to the headless `companion.service` unit file. On the line where you see `.../headless.js eth0` you need to change `eth0` to your wireless connection's designation. For Raspberry Pi 4 users, this is mostly likely `wlan0`.

# Headless Unit File
File name: /etc/systemd/system/companion.service
> Pending update after launch of v1.4 CompanionPi Headless

# Headed Unit File
_(for deployments with an attached display and keyboard/mouse)_  
File name: /etc/systemd/system/companion.service  
_(this is still being tested but will be posted when available)_