Rather than using rc.local scripting, modern Linux distributions can use `systemd` to manage start-up scripting. The new CompanionPi project uses systemd to auto-start Companion at boot. If you are unfamiliar with systemd, this Wikipidia article is a good primer: https://en.wikipedia.org/wiki/Systemd.

This information is provided as a reference for those choosing to manually install Companion on a Linux-powered computer (especially a Raspberry Pi 4). For those using the CompanionPi pre-built images, the appropriate file is already included in the image.

You can find an up-to-date copy of the unit file used for CompanionPi [here](https://github.com/bitfocus/companion-pi/blob/main/companion.service)

File name: /etc/systemd/system/companion.service  
Command: `sudo nano /etc/systemd/system/companion.service` (copy the code from the link above into here, then save)

> Don't forget to enable the service with `sudo systemctl enable companion.service` and reboot `sudo reboot`  
> When using the network-online.target with systemd make sure this service is enabled;  
> `sudo systemctl enable systemd-networkd-wait-online.service`
