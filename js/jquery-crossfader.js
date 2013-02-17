/*
 * jquery-crossfader
 *
 * @author Greg Kuwaye
 * @copyright 2013 Greg Kuwaye
 * @version 0.1
 * @requires jQuery v1.7.1 or later
 */
!function($) {

    "use strict";
    
    var defaults = {
        'backgrounds': [],
        'interval': 3000,
        'fadeDuration': 2000,
        'zIndex': -10
    };
    
    // Holds the merged options
    var options = {};
    
    // The two overlays we'll be crossfading
    var overlays = [];
    
    // Will hold the current timeout id if we need to cancel
    var timeoutId;
    
    var isRunning = true;
    
    var privateMethods = {
        init: function() {
            // Do we have at least one background?
            if (!options.backgrounds.length) {
                this.log('Please set the "backgrounds" option');
                return false;
            };
            
            // Set the transition times
            var transitionTime = options.fadeDuration / 1000;
            var durations = {
                '-webkit-transition-duration': transitionTime + 's',
                '-ms-transition-duration': transitionTime + 's',
                '-moz-transition-duration': transitionTime + 's',
                '-o-transition-duration': transitionTime + 's',
                'transition-duration': transitionTime + 's'
            };
        
            // Build an overlay
            var bottomOverlay = this.buildElement('div', {'class': 'bg-overlay'}, $.extend({'z-index': options.zIndex}, durations));
            var topOverlay = this.buildElement('div', {'class': 'bg-overlay'}, $.extend({'z-index': options.zIndex + 1}, durations));
            
            overlays = [bottomOverlay, topOverlay];
            $('body').prepend(overlays);
            
            // Start immediately
            this.crossfadeOverlays();
        },
        log: function(message) {
            (typeof console !== 'undefined' && console.log(message));
        },
        // Returns an element
        buildElement: function(tag, elementAttrs, cssAttrs) {
            var elementAttrs = elementAttrs || {};
            var cssAttrs = cssAttrs || {};
            return $('<' + tag + ' />').attr(elementAttrs).css(cssAttrs);
        },
        loadCurrentImageInQueue: function(callback) {
            var self = this;
            
            // Build the image element
            var src = options.backgrounds[0];
            var img = this.buildElement('img', {'src': src});
            
            // Rearrange the backgrounds array only if there's a callback to run
            if (callback) {
                // Shift the image off the front and push onto the stack
                options.backgrounds.push(options.backgrounds.shift());
                
                $(img).load(function() {
                    callback.call(self, src);
                });
            };
        },
        crossfadeOverlays: function() {
            // Self is the `method` object
            var self = this;
            
            if (!isRunning) {
                timeoutId && clearTimeout(timeoutId);
                return false;
            };
            
            this.loadCurrentImageInQueue(function(src) {
                $(overlays[0]).removeClass('showing').addClass('prepping');
                $(overlays[1]).css('background-image', 'url(' + src + ')').removeClass('prepping').addClass('showing');
                overlays.reverse();
                
                timeoutId = setTimeout(function() {
                    self.crossfadeOverlays();
                }, options.interval);
            });
        }
    };
    
    var publicMethods = {
        stop: function() {
            isRunning = false;
        }
    };
    
    var crossfader = function(userOptions) {
        options = $.extend(defaults, userOptions);
        privateMethods.init();
        return publicMethods;
    };
    
    $.extend({'crossfader': crossfader});
    
}(window.jQuery);
