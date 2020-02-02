Rather than using rc.local scripting, modern Linux distributions can use `systemd` to manage start-up scripting. The new CompanionPi project uses systemd to auto-start Companion at boot. If you are unfamiliar with systemd, this Wikipidia article is a good primer: https://en.wikipedia.org/wiki/Systemd.

This information is provided as a reference for those choosing to manually install Companion on a Linux-powered computer (especially a Raspberry Pi 4). For those using the CompanionPi pre-built images, the appropriate file is already included in the image.

If you intend to bind the Admin User Interface to a wireless network connection, you will need to make 1 minor modification to the headless `companion.service` unit file. On the line where you see `.../headless.js eth0` you need to change `eth0` to your wireless connection's designation. For most modern Linux distributions, this is most likely `wlan0`.

# Unit File
File name: /etc/systemd/system/companion.service  
Command: `sudo nano /etc/systemd/system/companion.service` (copy the below code into the file, then save)
```
[Unit]
Description=Bitfocus Companion (v2.0.0)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/home/pi/companion
ExecStart=/home/pi/companion/headless.js eth0
Restart=on-failure
KillSignal=SIGINT
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target
```
> Don't forget to enable the service with `sudo systemctl enable companion.service` and reboot `sudo reboot`

# CompanionPi Unit File
More information about the CompanionPi project can be found here: [[CompanionPi Documentation]]  
This is the unit file included in the CompanionPi flashable images. This is meant as a point of reference only. This file will not work with a standard manual installation of Companion. Note the difference in `WorkingDirectory` and `ExecStart`.  

File name: /etc/systemd/system/companion.service  
Command: `sudo nano /etc/systemd/system/companion.service`
```
[Unit]
Description=Bitfocus Companion (v2.0)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/usr/local/src/companion
ExecStart=/usr/local/src/companion/headless_ip.js 0.0.0.0
Restart=on-failure
KillSignal=SIGINT
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target
```

When using the network-online.target with systemd make sure this service is enabled;
`sudo systemctl enable systemd-networkd-wait-online.service`