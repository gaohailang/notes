常见 UI 方案
- 切页面的动画
- modal window 效果
- 卡片 hover 效果
- 卡片 List 进入/load more 动画
- 图片/头像 loaded 效果
- new add card/item 动画（消息聊天）
- ladda 按钮 busy 效果
- collpasable header (scroll)

- page preloading
- 

## Todo - modal window 效果
http://tympanus.net/Development/ModalWindowEffects/

```js
// slide in(right, bottom)
// 3d flip(vertical, hor)
// let me in

el.on('click', function(ev) {
    $modal.addClass('md-show');
    $overlay.on('click', function() {
        removeModal( classie.has( el, 'md-setperspective' ) );
    });

    if( classie.has( el, 'md-setperspective' ) ) {
        setTimeout( function() {
            classie.add( document.documentElement, 'md-perspective' );
        }, 25 );
    }
});


```

## 切页面方案
http://tympanus.net/Development/PageTransitions/

```css
.page {
    width: 96%;
    padding: 2%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    transform: translate3d(0,0,0);
    transform-style: preserve-3d;
    backface-visibility: hidden;
}
// 例如：动画 - fade top bottom
.pt-page-moveToTopFade {
    -webkit-animation: moveToTopFade .1s ease both;
    animation: moveToTopFade .1s ease both;
}

.pt-page-moveFromBottomFade {
    -webkit-animation: moveFromBottomFade .7s ease both;
    animation: moveFromBottomFade .7s ease both;
}


$('.page-form').addClass('pt-page-moveToTopFade');
$('.page-feedback').removeClass('hide').addClass('pt-page-moveFromBottomFade');
```

## 卡片 List 进入/load more 动画


## 

```css
.slide-left {
    @include easingTimingFunction();
    @include transform(translateX(0));
    @include transitionDuration(550ms);
    opacity: 1;

    &.v-enter {
        @include transform(translateX(60px));
        opacity: 0;
    }
    &.v-leave {
        opacity: 0;
    }
}

.scale-fade {
    @include easingTimingFunction();
    @include transitionDuration(350ms);
    @include transform(scale(1));
    opacity: 1;

    &.v-enter, &.v-leave {
        @include transform(scale(0.7));
        opacity: 0;
    }
}
```

```css
@mixin transitionDuration ($duration) {
    transition-duration: $duration;
    -webkit-transition-duration: $duration;
}

@mixin easingTimingFunction () {
    -webkit-transition: all 0 cubic-bezier(0.250, 0.460, 0.450, 0.940);
    -moz-transition: all 0 cubic-bezier(0.250, 0.460, 0.450, 0.940);
    -ms-transition: all 0 cubic-bezier(0.250, 0.460, 0.450, 0.940);
     -o-transition: all 0 cubic-bezier(0.250, 0.460, 0.450, 0.940);
        transition: all 0 cubic-bezier(0.250, 0.460, 0.450, 0.940); /* easeOutQuad */
}


.popup {
    @include easingTimingFunction();
    @include transitionDuration(350ms);
    @include transform(scale(0.7));
    opacity: 0;
    &.loaded {
        @include transform(scale(1));
        opacity: 1;
    }
}
```

```js
// image load animation
// Add classes to fade-in images
document.addEventListener('load', function(event) {
    if (event.target.classList.contains('popup')) {
        event.target.classList.add('loaded');
    }
}, true);
```
