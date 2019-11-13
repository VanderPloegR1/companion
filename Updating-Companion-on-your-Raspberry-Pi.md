Updating Companion on the Raspberry Pi (or any other Linux distribution) is quite simple. Just follow the steps for your current version of Companion.

### Companion v1.3 & v1.4
Run the following series of terminal commands from the root of the companion folder:
```bash
git pull
./tools/update.sh
sudo reboot
```
### Companion v2.0-alpha
Run the following series of terminal commands from the root of the companion folder:
```bash
git pull
yarn update
sudo reboot
```