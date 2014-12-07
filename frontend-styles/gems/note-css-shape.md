
### TODO:
- 多个border-radius是干嘛的？


### Summary
New properties, like border-radius and transform allow creation of a whole array of CSS-only shapes that previously required images.

all basic shapes require only one div, making them more convenient than SVG vector shapes.

It's a review of my three articles on CSS circles/ovals, CSS triangles and CSS squares/rectangles.


响应式的CSS Shape - 对于圆和square很简单， border-radius和width用相对大小。
对于triangle：

```css
div.fixed-size-triangle {
    width: 0;
    height: 0;
    border: 100px solid #1F80AF;
    border-top: none;
    border-left-color: transparent;
    border-right-color: transparent;
}
```

to place the triangle inside a responsive rectangle. Then we just use overflow:hidden to cut off the bottom part:

```css
.triangle-up {
    margin: 0 auto;
    width: 25%;
    height: 0;    
    padding-left:25%;
    padding-bottom: 25%;
    overflow: hidden;
}
.triangle-up:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    margin-left:-500px;
    border-left: 500px solid transparent;
    border-right: 500px solid transparent;
    border-bottom: 500px solid #4679BD;
}
```

简单图形：
http://codepen.io/ghlndsl/pen/tbyrx

特殊图形：
http://codepen.io/ghlndsl/pen/wFdKD