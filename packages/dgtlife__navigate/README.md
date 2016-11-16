# Navigate
Navigate is a simple lightweight mobile-first navigation package for Meteor. Navigate manages transitions to and from a _screen_ without _requiring_ the use of a path/URL for that screen. However, it can support paths/URLs, if configured to do so. In other words, URLs are the tail, not the dog. 

In App Mode, it uses a **Navigation Stack** to store the history of arbitrary (any screen to any other screen) transitions triggered from the UI. With this Nav Stack it is then able to support backward and forward transitions, as needed. In this mode, the app behaves like a native iOS/Android app in which URLs are typically _not_ used for navigation. 

In Browser Mode, it enables the app to behave like a website with loading/reloading of arbitrary URLs, support for the Back and Forward buttons of the browser using ```window.history```, as well as arbitrary transitions triggered from the UI.

Navigate also supports multiple independent content regions.


## Documentation?
At this point, the only documentation for Navigate is in the code itself. However, the package is used in the Material for Meteor website. So please review that [repo](https://github.com/dgtlife/material-for-meteor-website) as an example. In particular, look at ```/imports/startup/client/index.js``` where Navigate is configured and started, and at ```/imports/startup/client/register-screens.js``` where the various screens are registered. Throughout the app, look for Nav.toScreen() calls to see how screen transitions are effected. 

So, if you want to use the Navigate package at this time, you will do so without Issue queue support.
