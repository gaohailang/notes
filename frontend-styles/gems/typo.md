
### 中文网页重设与排版：TYPO.CSS
http://typo.sofish.de/

看到官网的页面，的确非常好看！ - 

### 它的README.md

## TYPO.CSS 主要包括：

1、一般 reset.css 所需的内容
 
目前的设计是这样的，尽量保持完整的 reset，比如让 ul/ol 无样式并且无多余的 `padding`/`margin`，这是必须的，因为一个网可能需要很多自定义的的内容，在实践中我们并不希望像 ul/ol 有样式，这样我们得用优先级去覆盖，这是非常麻烦的事。所以 typo.css 并不像 normalize.css，后者给每一个元素都预先定义了样式，这样在自定义的时候将是非常痛苦的。要大保持干净的所有元素一致化的 reset 才是最佳实践。

2、`class="typo"` 阅读内容排版

在文章/文档阅读的页面，需添加 `.typo` 这个 class，这样 table/ol/ul 等都会有预定的样式，让你的排版像 [http://typo.sofish.de](http://typo.sofish.de) 一样，让用户阅读起来更舒服。

在父容器在没有添加 `class="typo"` 的时候，可以使用 `class="typo-标签"`（如 `class="typo-ul"`）来实现像 `.typo > ul` 这样结构的样式。
 
3、增加类：

主要是一些需要中文日常排版需要的元素和语文对应样式的增强，目前包括：

(1) 专名号：使用标签 `<u>` 或者 `.typo-u` <br />
(2) 着重号：使用 class `.typo-em` <br />
(3) 清理浮动：与一般 reset.css 保持一致 `.clearfix` <br />
(4) 强制换行：添加 `.textwrap` 到文本所在的容器，如果是 `table` 测还需要 `.textwrap-table` <br />
(5) 衬线字体：添加 `.serif`




PS: 想到了如果在tampermonkey script中引入一个css framework到页面时候，应该在重置Reset或者base 样式的选择器前加上.{f-name} 来body上来约束！

```css
/* 标题应该更贴紧内容，并与其他块区分，margin 值要相应做优化 */
h1,h2,h3,h4,h5,h6 {
    line-height:1;font-family:Arial,sans-serif;margin:1.4em 0 0.8em;
}
h1{font-size:1.8em;}
h2{font-size:1.6em;}
h3{font-size:1.4em;}
h4{font-size:1.2em;}
h5,h6{font-size:1em;}

/* 现代排版：保证块/段落之间的空白隔行 */
.typo p, .typo pre, .typo ul, .typo ol, .typo dl, .typo form, .typo hr {
    margin:1em 0 0.6em;
}
```

```html
<p><small><b>作者：</b><abbr title="名丘，字仲尼">孔子</abbr>（<time>前551年9月28日－前479年4月11日</time>）</small></p>
```

raw typo.css

```css
@charset "utf-8";

/* 防止用户自定义背景颜色对网页的影响，添加让用户可以自定义字体 */
html {
    color: #444333;
    background: #fff;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizelegibility;
}

/* 内外边距通常让各个浏览器样式的表现位置不同 */
body, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    margin: 0;
    padding: 0;
}

/* 重设 HTML5 标签, IE 需要在 js 中 createElement(TAG) */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
}

/* HTML5 媒体文件跟 img 保持一致 */
audio, canvas, video {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

/* 要注意表单元素并不继承父级 font 的问题 */
body, button, input, select, textarea {
    font:500 0.875em/1.8 Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
}

/* 去除 IE6 input/button 多余的空白 */
button, input {
    *width: auto;
    *overflow: visible;

    /* 让 input 和 button 一样高 */
    line-height:22px;
}

/* 去掉各Table  cell 的边距并让其边重合 */
table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* IE bug fixed: th 不继承 text-align*/
th {
    text-align: inherit;
}

/* 去除默认边框 */
fieldset, img {
    border: 0;
}

/* 解决 IE6-7 图片缩放锯齿问题 */
img {
    -ms-interpolation-mode: bicubic;    
}

/* ie6 7 8(q) bug 显示为行内表现 */
iframe {
    display: block;
}

/* 块/段落引用 */
blockquote {
    font-family:Optima, Georgia, STSong, serif;
    margin: 1em 0;
    color:#999;
    padding: 0.6em 1em;
    background:#f8f8f8;
    border-left: 0.4em solid #ddd;
}
blockquote blockquote {
    padding: 0 0 0 1em;
    margin-left: 2em;
}
blockquote p {
    margin-bottom: 0;
}

/* Firefox 以外，元素没有下划线，需添加 */
acronym, abbr {
    border-bottom: 1px dotted;
    font-variant: normal;
}

/* 添加鼠标问号，进一步确保应用的语义是正确的（要知道，交互他们也有洁癖，如果你不去掉，那得多花点口舌） */
abbr {
    cursor: help;
}

/* 一致的 del 样式 */
del {
    text-decoration: line-through;
}

address, caption, cite, code, dfn, em, th, var {
    font-style: normal;
    font-weight: 400;
}

/* 去掉列表前的标识, li 会继承，大部分网站通常用列表来很多内容，所以应该当去 */
ul, ol {
    list-style: none;
}

/* 对齐是排版最重要的因素, 别让什么都居中 */
caption, th {
    text-align: left;
}

q:before, q:after {
    content: '';
}

/* 统一上标和下标 */
sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: text-top\9;
}
:root sub, :root sup{
    vertical-align: baseline; /* for ie9 and other mordern browsers */
}
sup {
    top: -0.5em;
}
sub {
    bottom: -0.25em;
}

/* 让链接在 hover 状态下显示下划线 */
a:hover {
    text-decoration: underline;
}

/* 默认不显示下划线，保持页面简洁 */
ins, a {
    text-decoration: none;
}

/* 专名号：虽然 u 已经重回 html5 Draft，但在所有浏览器中都是可以使用的，
 * 要做到更好，向后兼容的话，添加 class="typo-u" 来显示专名号
 * 关于 <u> 标签：http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-u-element
 * 被放弃的是 4，之前一直搞错 http://www.w3.org/TR/html401/appendix/changes.html#idx-deprecated
 * 一篇关于 <u> 标签的很好文章：http://html5doctor.com/u-element/ 
 */
u, .typo-u {
    text-decoration: underline;
}

/* 标记，类似于手写的荧光笔的作用 */
mark {
    background: #fffdd1;
}

/* 代码片断 */
pre, code {
    font-family: "Courier New", Courier, monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
}
pre {
    background: #f8f8f8;
    border:1px solid #ddd;
    padding: 1em 1.5em;
}

/* 一致化 horizonal rule */
hr{
    border:none;
    border-bottom:1px solid #cfcfcf;
    margin-bottom:10px;
    *color:pink;*filter:chroma(color=pink);
    height:10px;
    *margin:-7px 0 2px;
}

/* 底部印刷体、版本等标记 */
small, .typo-small, 

/* 图片说明 */
figcaption {
    font-size: 0.9em;
    color: #888;
}

/* 可拖动文件添加拖动手势 */
[draggable] {
    cursor: move;
}

.clearfix:before, .clearfix:after {
    content: "";
    display: table;
}

.clearfix:after {
    clear: both
}

.clearfix {
    zoom: 1
}

/* 强制文本换行 */
.textwrap, .textwrap td, .textwrap th{
    word-wrap:break-word;
    word-break:break-all;
}
.textwrap-table{
    table-layout:fixed;
}

/* 提供 serif 版本的字体设置 */
.serif{font-family:Palatino, Optima, STSong, Georgia, serif;}

/* 保证块/段落之间的空白隔行 */
.typo p, .typo pre, .typo ul, .typo ol, .typo dl, .typo form, .typo hr, .typo table,
.typo-p, .typo-pre, .typo-ul, .typo-ol, .typo-dl, .typo-form, .typo-hr, .typo-table {
    margin-bottom: 1.2em;
}

h1, h2, h3, h4, h5, h6{
    font-weight: 500;
    *font-weight: 800;
    font-family: Helvetica Neue, Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
    color:#333;
}

/* 标题应该更贴紧内容，并与其他块区分，margin 值要相应做优化 */
.typo h1, .typo h2, .typo h3, .typo h4, .typo h5, .typo h6,
.typo-h1, .typo-h2, .typo-h3, .typo-h4, .typo-h5, .typo-h6 {
    margin-bottom: 0.4em;
    line-height: 1.5;
}
.typo h1, .typo-h1 {
    font-size: 1.8em;
}
.typo h2, .typo-h2 {
    font-size: 1.6em;
}
.typo h3, .typo-h3 {
    font-size: 1.4em;
}
.typo h4, .typo-h4 {
    font-size: 1.2em;
}
.typo h5, .typo h6, .typo-h5, .typo-h6 {
    font-size: 1em;
}

/* 在文章中，应该还原 ul 和 ol 的样式 */
.typo ul, .typo-ul {
    margin-left: 1.3em;
    list-style: disc;
}
.typo ol, .typo-ol {
    list-style: decimal;
    margin-left: 1.9em;
}
.typo li ul, .typo li ol, .typo-ul ul, .typo-ul ol, .typo-ol ul, .typo-ol ol {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 2em;
}
.typo li ul, .typo-ul ul, .typo-ol ul {
    list-style: circle;
}

/* 同 ul/ol，在文章中应用 table 基本格式 */
.typo table th, .typo table td, .typo-table th, .typo-table td .typo table caption{
    border: 1px solid #ddd;
    padding: 0.5em 1em;
    color:#666;
}
.typo table th, .typo-table th {
    background: #fbfbfb;
}
.typo table thead th, .typo-table thead th {
    background: #f1f1f1;
}
.typo table .caption {
    border-bottom:none;
}

/* 去除 webkit 中 input 和 textarea 的默认样式  */
.typo-input, .typo-textarea{
    -webkit-appearance:none;
    border-radius:0;
}

/* 高亮选中 */
::-moz-selection {
    background:#08c;
    color:#fff;
}
::selection {
    background:#08c;
    color:#fff;
}

/* TODO: 供着重号使用 */
.typo-em, .typo em, legend, caption {font-weight: 700;}
```