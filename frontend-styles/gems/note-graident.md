

### Syntax
The CSS linear-gradient() function creates an <image> which represents a linear gradient of colors. The result of this function is an object of the CSS <gradient> data type. Like any other gradient, a CSS linear gradient is not a CSS <color> but an image with no intrinsic dimensions; that is, it has neither natural or preferred size, nor ratio. Its concrete size will match the one of the element it applies to.


语法真是太扯淡了， 差别太大！

```
Formal grammar: linear-gradient(  [ <angle> | to <side-or-corner> ,]? <color-stop> [, <color-stop>]+ )
                                  \---------------------------------/ \----------------------------/
                                    Definition of the gradient line         List of color stops  
  where <side-or-corner> = [left | right] || [top | bottom]
    and <color-stop>     = <color> [ <percentage> | <length> ]?

```


### 资源
http://www.colorzilla.com/gradient-editor/
http://css-tricks.com/css3-gradients/ - 详解！ - 同时，还有Radial Gradients



举个例子：

```css
background: #1e5799; /* Old browsers */
background: -moz-linear-gradient(top,  #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1e5799), color-stop(50%,#2989d8), color-stop(51%,#207cca), color-stop(100%,#7db9e8)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* IE10+ */
background: linear-gradient(to bottom,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
```

Repeating Gradients 
分为linear和radial的

.repeat {
  background-image: 
    repeating-linear-gradient(
      45deg,
      yellow,
      yellow 10px,
      red 10px,
      red 20px /* determines size */
    );
}