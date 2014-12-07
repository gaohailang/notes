
### http://tobiasahlin.com/spinkit/

### Summary
大部分效果是transition, 和transform实现的，特意的。
js部分通过paagination， selected来定位保持state

```css
html {
  height: 100%;
  overflow: hidden;
}

body {
  background-color: #d35400;
  padding: 0;
  margin: 0;
  color: #fff;
  font: 14px "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
  line-height: 1.5em;
  text-align: center;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  -webkit-transition: background-color 0.6s ease-in-out 0s;
  transition: background-color 0.6s ease-in-out 0s;
}

.active2 { background-color: #2c3e50 }
.active3 { background-color: #1abc9c }
.active4 { background-color: #2980b9 }
.active5 { background-color: #7f8c8d }
.active6 { background-color: #f1c40f }
.active7 { background-color: #d35400 }
.active8 { background-color: #27ae60 }

a {
  color: #fff;
  text-decoration: none;
}

#preview-area {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0; left: 0; bottom: 60px; right: 0;
  margin: auto auto;
  
  -webkit-user-select: none;  
  -moz-user-select: none;  
  -ms-user-select: none;  
  user-select: none;
}

#spinners {
  width: 1000px;
  height: 60px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  font-size: 0;
  
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.active2 #spinners { 
  -webkit-transform: translateX(-100px);
  transform: translateX(-100px);
}
.active3 #spinners { 
  -webkit-transform: translateX(-200px);
  transform: translateX(-200px);
}
.active4 #spinners { 
  -webkit-transform: translateX(-300px);
  transform: translateX(-300px);
}
.active5 #spinners { 
  -webkit-transform: translateX(-400px);
  transform: translateX(-400px);
}
.active6 #spinners { 
  -webkit-transform: translateX(-500px);
  transform: translateX(-500px);
}
.active7 #spinners { 
  -webkit-transform: translateX(-600px);
  transform: translateX(-600px);
}
.active8 #spinners { 
  -webkit-transform: translateX(-700px);
  transform: translateX(-700px);
}
.active9 #spinners { 
  -webkit-transform: translateX(-800px);
  transform: translateX(-800px);
}

#spinners li {
  height: 60px;
  width: 60px;
  right: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
  margin-right: 40px;
  display: inline-block;
  visibility: hidden;
  position: relative;
  
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

#spinners .selected {
  opacity: 1;
  visibility: visible;
}

.navigation-arrow {
  position: absolute;
  top: 0;
  bottom: 70px;
  width: 28px;
  height: 42px;
  margin: auto 0;
  z-index: 1000;
  cursor: pointer;
  padding: 20px 10px;
  
  -webkit-transition: all 0.25s ease-in-out 0s;
  transition: all 0.25s ease-in-out 0s;
}

#prev {
  left: 10px;
  -webkit-transform: rotateZ(180deg) scale(0.8);
  transform: rotateZ(180deg) scale(0.8);
}

.active1 #prev, .active8 #next {
  opacity: 0;
  pointer-events: none;
}

#next {
  right: 10px;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

#next:hover {
  -webkit-transform: scale(1.0);
  transform: scale(1.0);
}

#prev:hover {
  -webkit-transform: scale(1.0) rotateZ(180deg);
  transform: scale(1.0) rotateZ(180deg);
}

.source {
  font-weight: 300;
  font-size: 16px;
  padding: 5px 7px;
  display: inline-block;
  margin: 30px 0 0;
  position: relative;
  
  -webkit-user-select: none;  
  -moz-user-select: none;  
  -ms-user-select: none;  
  user-select: none;
  
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.code {
  position: absolute;
  top: 5px;
  left: -18px;
}

.code img {
  border: 0;
}

.code img:first-child {
  margin-right: 2px;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 60px;
}

.profile-link {
  position: absolute;
  left: 15px;
  bottom: 14px;
  height: 60px;
  padding-left: 55px;
  background: url(/images/spinners/profile@2x.png) 0 center no-repeat;
  background-size: 50px 50px;
  z-index: 100;
}

.view-on-github {
  position: absolute;
  right: 25px;
  bottom: 14px;
  height: 60px;
  z-index: 100;
  padding-left: 27px;
  background: url(/images/spinners/github@2x.png) 0 center no-repeat;
  background-size: 20px 20px;
}

.underline {
  display: block;
  position: relative;
  padding: 0;
  width: 100%;
  height: 2px;
  bottom: 35%;
  right: 0;
  background-color: #fff;
  -webkit-transition: all 0.25s ease-in-out 0s;
  transition: all 0.25s ease-in-out 0s;
  
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}

a:hover .underline {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.pagination {
  width: 100%;
  bottom: 7px;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  font-size: 0;
  height: 60px;
  z-index: 10;
}

.pagination li {
  display: inline-block;
  margin: 0;
  padding: 0;
}

.pagination a {
  display: block;
  padding: 15px 4px;
}

.pagination span {
  display: block;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 100%;
  opacity: 0.6;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
  
  -webkit-transform: scale(0.6);
  transform: scale(0.6);
}

.pagination a:hover span {
  opacity: 1;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.pagination a.selected span {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

#source-frame > ul {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  margin: 0;
  padding: 0;
  
  list-style: none;
  background-color: rgba(0,0,0,0.3);
  z-index: 1100;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
}

#source-frame.visible > ul {
  opacity: 1;
  visibility: visible;
}

#source-frame li {
  position: absolute;
  height: 80%;
  width: 94%;
  max-width: 980px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  z-index: 1200;
  opacity: 0;
  visibility: hidden;
  
  -webkit-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
  
  -webkit-transform: scale(0);
  transform: scale(0);
}

#source-frame.visible .visible {
  opacity: 1;
  visibility: visible;
  -webkit-transform: scale(1);
  transform: scale(1);
}

#source-frame li::after {
  z-index: 1300;
  content: "HTML";
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ddd;
  padding: 2px 4px;
  border-radius: 3px;
}

#source-frame li::before {
  z-index: 1300;
  content: "CSS";
  position: absolute;
  top: 110px;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ddd;
  padding: 2px 4px;
  border-radius: 3px;
}

#source-frame textarea {
  width: 100%;
  height: 74%;
  margin: 0;
  border: 0;
  display: block;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  cursor: text;
  font-size: 14px;
  font-family: Consolas, "Courier New", Courier, monospace;
  outline: 0;
  resize: none;
  border-radius: 0;
}

#source-frame .html-code {
  height: 100px;
  border-bottom: 1px solid #eee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

#source-frame .css-code {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#source-frame textarea:hover {
  background-color: #fcfcfc;
}

@media (max-width: 650px) {
  .pagination {
    display: none;
  }
}

@media (max-width: 400px) {
  .profile-link {
    text-indent: -999em;
    font-size: 0;
  }
  
  .profile-link .underline {
    display: none;
  }
  
  #source-frame textarea {
    font-size: 13px;
  }
}

.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
```

```js
$(function() {
  
  $(".pagination a").click(function(e){
    e.preventDefault();
    // Remove the selected class from the currently selected indicator
    $(this).parent().parent().find(".selected").removeClass("selected");
    // Make the clicked indicator the selected one
    $(this).addClass("selected");
    
    updateSlideshowForSelectedPage();
  });
  
  $("#next").click(function(e) {
    goToNext();
  });
  
  $("#prev").click(function(e) {
    goToPrev();
  });

  // Keyboard shortcuts
  $("body").keyup(function(e) {
    if (e.keyCode == 39) {
      // Key right
      goToNext();
    } else if (e.keyCode == 37) {
      // Key left
      goToPrev();
    } else if (e.keyCode == 83) {
      // S key
      showSourceForActiveSpinner();
    } else if (e.keyCode == 27) {
      dismissSourceFrame();
    }
  });

  $(".source").click(function(e) {
    e.preventDefault();
    showSourceForActiveSpinner();
  });

  // Present the source frame from dismissing when interacting with the textarea
  $("#source-frame textarea").click(function(e) {
    e.stopPropagation();
  });

  // Dismiss the sourceframe when clicking the black overlay
  $("#source-frame ul").click(function(e) {
    dismissSourceFrame();
  });
  
  function goToNext() {
    // Exit if there are no more spinners
    if ($(".pagination .selected").parent().index()+1 >= $(".pagination li").length)
      return;

    // Exit if there source-frame is visible
    if ($("#source-frame").hasClass("visible"))
      return;

    $(".pagination .selected")
      .removeClass("selected")
      .parent().next().find("a").addClass("selected");
    
    updateSlideshowForSelectedPage();
  }
  
  function goToPrev() {
    // Exit if the currently selected spinner is the first one
    if ($(".pagination .selected").parent().index() <= 0)
      return;

    // Exit if there source-frame is visible
    if ($("#source-frame").hasClass("visible"))
      return;

    $(".pagination .selected")
      .removeClass("selected")
      .parent().prev().find("a").addClass("selected");
    
    updateSlideshowForSelectedPage();
  }
  
  function updateSlideshowForSelectedPage() {
    var index = $(".pagination .selected").parent().index(),
        classIndex = parseInt(index+1, 10);
    $("body").attr("class", "active" + classIndex);
    
    $("#spinners .selected").removeClass("selected");
    $("#spinners li:nth-child(" + classIndex + ")").addClass("selected");
  }

  function showSourceForActiveSpinner() {
    // Exit if the source-frame is already visible
    if ($("#source-frame").hasClass("visible"))
      return;

    // Show the corresponding li in the source list
    var index = $(".pagination .selected").parent().index();
    $("#source-frame li:eq("+ parseInt(index, 10) +")").addClass("visible");

    $("#source-frame").addClass("visible");
  }

  function dismissSourceFrame() {
    $("#source-frame .visible").removeClass("visible");
    $("#source-frame").removeClass("visible");
  }
    
});
```