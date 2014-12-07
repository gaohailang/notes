
### Summary

今天在学习skinkit的几个案例前，回顾下了rotateX,Y,Z 和 perspective


非常tricky的一点是：
25% { -webkit-transform: translateX(22px) rotate(-90deg) scale(0.5) }
50% { -webkit-transform: translateX(22px) translateY(22px) rotate(-180deg) }
你会发现为什么50%的时候没有把scale()搞为1.0... 因为-webkit-transform 是个属性，每次都重置了！！！


transform - rotateX, rotateY, rotateZ
邹凯的体操单杠运动是rotateX；蔡依林姐姐的钢管舞是rotateY,旋转飞刀的特技表演是rotateZ。 (首先是认清xyz轴，然后对应的rotate的面是垂直该轴的平面)

http://www.zhangxinxu.com/wordpress/?p=2592 - 好吧， CSS 30 transform变换不过如此！ - 非常赞

This is the main difference between the transform: perspective() function and the perspective property. The first gives element depth while the later creates a 3D-space shared by all its transformed children.

认识的突破口：rotateX, rotateY, rotateZ

必不可少的perspective属性 - translateZ 帮你寻找透视位置 - 当translateZ和perspective大小一样时， 完全遮住视野。（所以The smaller the value, the closer you get from the Z plane and the more impressive the visual effect. The greater the value, the more subtle will be the effect.）

perspective属性有两种书写形式，一种用在舞台元素上（动画元素们的共同父辈元素）；第二种就是用在当前动画元素上

perspective-origin: 50% 50%; 可以是其他如px等单位

还有两个属性：
transform-style: preserve-3d
backface-visibility

图片的旋转木马效果demo
