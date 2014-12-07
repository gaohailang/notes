
http://www.yasiv.com/github/#/costars?q=daneden%2Fanimate.css

## List

### WOW
- reveal css animation as you scroll down a page

### ScrollMagic 
https://github.com/janpaepke/ScrollMagic
The jQuery plugin for magical scroll interactions.

### scrollReveal.js 
Declarative on-scroll reveal animations.

### jquery.adaptive-backgrounds.js 
A jQuery plugin for extracting the dominant color from images and applying the color to their parent.

### SpinKit 
A collection of loading indicators animated with CSS

### Snap.svg
js library for modern SVG graphics

### echo
lazy-loading images with data-* attributes

### countUp.js 
Animates a numerical value by counting to it
### odometer
Transition numbers with ease - http://github.hubspot.com/odometer/

### grunticon 
A mystical CSS icon solution.

### headroom.js 
Give your pages some headroom. Hide your header until you need it


### MagicMove

### animo-js
- 看 Dan Eden's animate.css
- 看 codrops - full of css animations tutorials

css animation:
1 hardware accelerated, which is hard to notice if not on mobile
2 easier to visualization and write animation/transition in css using keyframes

problem:
stack animations to fire one after another, specify callbacks for the completion of an animation, or simply fire animations on any event or at any moment you please.

```js

/* From Modernizr */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
/* Listen for a transition! */ 
/* same as animationend and transitionend */
var transitionEvent = whichTransitionEvent();
transitionEvent && e.addEventListener(transitionEvent, function() {
    console.log('Transition complete!  This is the callback, no library needed!');
});

/*
    The "whichTransitionEvent" can be swapped for "animation" instead of "transition" texts, as can the usage :)
*/

// 更简单的方法：(IE10 才支持) - fallback 到 setTimeout
$element.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
    // your event handler
});
```


```js
$(element).animo({
    // [string]/[array] class name(s) of the css animation,
    animation: "name", // or ["name1", "name2", "name3"]
    // [float] time (in seconds) for the animation to last during 1 iteration
    duration: 0.8,
    // [int] number of times the animation shall repeat itself
    iterate: 1,
    // [string] how the animation should progress over the duration of each cycle
    timing: "linear",
    // [boolean] whether or not to "cleanse" the element after the animation has completed
    keep: false
} [,function]);
```

### aniamte.css
https://github.com/daneden/animate.css

1 custom build
2 dynamically add using jQuery
`$('#yourElement').addClass('animated bounceOutLeft');`
3 detect animation end
`$('#yourElement').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);`
4 change the duration/delay of your animations

#### Category
bouncing-entrences
bouncing-exits
fading_entrances
fading_exits
rotating_entrance
rotating_exits
sliding_entrance
sliding_exists
zooming_entrances
zooming_exists

attention_seekers
flippers
lightspped
specials


```css
#yourEleme {
    -vendor-animation-duration: 3s;
    -vendor-aniamtioon-delay: 2s;
    -vendor-animation-iteration-count: infinite;
}
```



```css

@keyframes lightSpeedIn {
  0% {
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }

  60% {
    transform: skewX(20deg);
    opacity: 1;
  }

  80% {
    transform: skewX(-5deg);
    opacity: 1;
  }

  100% {
    transform: none;
    opacity: 1;
  }
}

.lightSpeedIn {
  animation-name: lightSpeedIn;
  animation-timing-function: ease-out;
}



@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    visibility: visible;
  }

  100% {
    transform: translateX(0);
  }
}

.slideInLeft {
  animation-name: slideInLeft;
}
```

#### Fun
- dialog - sweet-alert
- dialog - Vex is a modern dialog library which is highly configurable, easily stylable, and gets out of the way. 

- background check - Automatically switch to a darker or a lighter version of an element depending on the brightness of images behind it.
- oriDomi - The web is flat, but now you can fold it up. http://oridomi.com/#ripple

Archive

```js
once('click', handler)
var once = function(e, h) {
    var x = function() {
        h.call();
        el.off(e, x)
    };
    el.on(e, x);
}

// shortcut handler like animo
```