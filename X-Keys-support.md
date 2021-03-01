# X-keys is now supported

Some tip's;
* Button 1 on the xkeys is page 1 button/bank 1. As Streamdeck XL has 32 buttons, button 33 on your xkeys is automatically page 2 button/bank 1 for programming
* Empty buttons on the xkeys de count, so make sure you skip those when needed (use companion log to see which button you are pressing).
* If your xkeys is pressing buttons you don't like (because of numbering), use the page option in settings to create an offset. This way you can set button 1 from your xkeys to for example page 10 button 1. When you press button 1 on your xkeys, it will be button 10.0. When you press button 33 on the xkeys it will be 11.1

Best tip I could give is to create pages just for the xkeys, start for example on page 50. Remove the page up/down/index buttons and put the page setting of the surface to 50.

>> When you see `Button 2.1 pressed` while you press 1 on the xkeys and `Button 99.17 pressed` while you press 17, you still have the page up/down buttons programmed.

## Feedback ##
The xkeys red backlight will respond to programmed feedback. When the red value of a background color is above 125 the button red light will go on

## T-Bar ##
When your model has a t-bar, it will update the variable $(internal:t-bar) you can use this variable in other modules. 

## Page offset ##
Its possible to create an offset for when the button presses start. Look for it in the surface settings.

## Disable your xkeys ##
When you don't want to use the xkeys in companion, but its connected to your computer, disable it in the surface settings.

When you have questions, drop a message in Slack

Supported models:
* XK-4
* XK-8
* XK-12 Jog
* XK-12 Joystick
* XK-16
* XK-24
* XR-32
* XK-60
* XKE-64 JogT-bar
* XK-68 Jog-Shuttle
* XK-80
* XKE-124 T-bar
* XKE-128

		
	
