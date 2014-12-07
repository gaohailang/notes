

### Summary
note 例子，来自于『CSS3 Pushing the Limits - CH 13:』

- pseudo-elements和伪类的区别
- exploring the current range of pseudo-elements
- 实例

### 区别：
pseudo-classes simply provide more control in terms of targeting elements, whereas pseudo-elements allow for the targeting and styling of nonexistent, “ghost” elements, which is a totally different ballgame.
同时在spec中语法也不一样（p:first-child, div::after），但是因为浏览器兼容， 统一写为单冒号

### 范围：

■ :first-line targets the first line of text in an element (introduced in CSS 1).
■ :first-letter targets the first letter in an element (introduced in CSS 1).
■ :before allows you to target the area before an element and insert generated content (introduced in CSS 2.1).
■ :afterallowsyoutotargettheareaafteranelementandinsertgeneratedcontent(introducedinCSS2.1).



### 创建CSS Shape

非常赞综合利用:after, :before, border各个边不同的大小和颜色，还有border-radius等


.speech-bubble {
       background: #fff;
       padding: 80px;
       border-radius: 50%;
       display: inline-block;
       position: relative;
}

.speech-bubble:before {
       content: “”;
       width: 50px;
       height: 50px;
       position: absolute;
       bottom: -15px;
       left: -20px;
       border-radius: 50%;
       border-left: 40px solid transparent;
       border-right: 40px solid #fff;
}

.ok {
       padding-left: 30px;
       position: relative;
       color: #fff;
}
   .ok:before {
       content: “”;
       position: absolute;
       left: 3px;
       width: 15px;
       height: 7px;
       border-left: 4px solid #fff;
       border-bottom: 4px solid #fff;
       transform: rotate(-45deg);
}

.save {
       padding-left: 30px;
       position: relative;
}
.save:before {
    content: “”;
    position: absolute;
    left: 0;
    width: 12px;
    height: 7px;
    background: #fff;
    border-bottom-left-radius: 4px;
    border: 4px solid #125ea5; /* Blue */
    border-top: 1px solid #125ea5; /* Blue */
    border-bottom: 11px solid #125ea5; /* Blue */
}
   .save:after {
       content: “”;
       position: absolute;
       left: 5px;
       bottom: 2px;
       width: 3px;
       height: 4px;
       border-left: 2px solid #ccc;
       border-top: 1px solid #ccc;
       border-right: 5px solid #ccc;
}

```
<article class=”container”>
  <blockquote>
      <strong>Imagination</strong> is <em>more important</em> than
      <strong>knowledge</strong>
  </blockquote>
  <b>Einstein, A.</b>
</article>
```

CSS
   nav a {
       font: 1.2em Arial;
       padding: 20px;
}
   nav a:after {
       content: “/”
       padding-left: 40px;
       color: #ccc;
   }



 .container:before {
       content: “““;
       font-size: 13em;
       position: absolute;
       left: -100px;
       color: #666;
}
   .container:after {
       content: “““;
       font-size: 13em;
       position: absolute;
       right: -100px;
       top: 150px;
       color: #666;
   }


   .clearfix:after {
          content: “”;
          display: block;
          clear: both;
      }


