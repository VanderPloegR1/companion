# X-keys is now supported

Some tip's;
* If your button map is off, go to settings and check the number on button row and column
* Button 1 on the xkeys is page 1 button one. As Streamdeck XL has 32 buttons, button 33 on your xkeys is automatically page 2 button 1.
* Empty buttons on the xkeys de count, so make sure you skip those when needed (use companion log to see which button you are pressing).
* If your xkeys is pressing buttons you don't like (because of numbering), use the page option in settings to create an offset. This way you can set button 1 from your xkeys to for example page 10 button 1. When you press button 33 on the xkeys it will be 11.1

## T-Bar
When your model has a t-bar, it will update the variable $(internal:t-bar) you can use this variable in other modules. 

>> When you want to use the t-bar with vMix check this video: [setup vMix with midi](https://www.youtube.com/watch?v=D0palug7MKY). Use the t-bar of the xkeys instead of the midicontroller shown. When you use the variable option in vMix, the software automatically switches back to zero/left, that can give issues. So for now, use the option as described.