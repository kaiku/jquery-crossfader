jquery-crossfader
=================

"Crossfades" background images with trickery.

Description
-----------

This is basically a slideshow plugin that crossfades large background images behind all other content on screen.

Usage
-----

    var jqcf = $.crossfader({
        backgrounds: ['/my/image/1.jpg', '/my/image/2.jpg'],
        interval: 8000,
        fadeDuration: 3000,
        zIndex: -10
    });

Only the `backgrounds` array is required.

`interval` sets how many milliseconds to wait before transitioning to the next image.

`fadeDuration` sets how many milliseconds the fade transition should last.

`zIndex` sets the largest z-index that will be used for the two overlays.

Features
--------
*  Preloads the next image immediately after fade in.
*  Is simple.
*  Hopefully it helps you!

