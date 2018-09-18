## 纯CSS3动画Pc端音悦台( MusicPcProject)
###音悦台PC端重点笔记

	流体布局 包 固定布局(1100 * 520)
	1200 --> 2000(每一屏背景图的最大尺寸为2000)
	考虑电脑分辨率
	
### 骨架：

	1. 同步导航动画
		   循环清除宽度的时候一定要指定成"";指定成0会有问题
	2. 控制高宽实现动画在方向上有局限
	3. 窗口在缩放的时候
		  内容区高度需要动态控制
		  小三角的位置
		  内容区中元素的偏移量
	4. 背景偏移百分比的参照关系
		  参照于 背景区域的尺寸 - 背景图的尺寸
	5. 鼠标滚轮的套路
	6.  变量i 与 元素.index属性的同步！！
	7. move函数的抽取（复用）
		   点击导航 和 滑动鼠标滚轮的逻辑基本一模一样
	8. now的抽象
		   当前屏的索引
	9. 当快速滑动鼠标滚轮只切一屏
		  1. 事件的回调函数处进行处理
		  2. 定义一个延时定时器
			     将真正的业务逻辑定义在定时器中
			     定时器所指定的延迟时间就是我们业务逻辑触发的周期
             
	
### 第三屏，第二屏

	机器人动画处理时,翻转是即时的！不带过渡（通过关键帧来控制，关键帧的百分比指定是时间点！！）
	照片墙处理时，3d基础（景深 3D舞台）
		1. 两个面贴在一块，有文字的那一面在上面，有背景的那一面在下面。
		2. 初始化的时候，为了可以首先展示有背景的那一面，将有文字的那一面翻转180度并且隐藏背面。（有文字的那一面还是在上面）
		3. 要翻转时，将有文字的那一面翻360度（不是0度）；有背景的那一面相同方向转180度
			  backface-visibility的运用
				
### 3D无缝自动轮播 + 3D手动轮播

	布局：
		小圆点的居中
			1. 容器(宽度必须是一屏的宽度,text-algin:center)
			2. 子项(必须inline-block)
		四个动画状态的确定
			四个关键帧！！！

	逻辑：
		---手动轮播（事件驱动）
			小圆点的切换
				class不能完全覆盖，classlist的形式A区操作它
				for循环内部添加事件
					将所有小圆点的active remove掉
					给当前触发点击事件的小圆点add active(this)
					判断方向(在最外层循环时,将i绑给每个小圆点的index属性;
					点击事件逻辑的最后将this.index赋给oldindex)
						从左往右（this.index > oldindex）
							对动画的切换
						从右向左（this.index < oldindex）
							对动画的切换
---

	---自动轮播（定时器驱动）
		函数包裹循环定时器(方便重新开启);在函数的第一行清除定时器
		自动轮播只有一个方向;无缝
			this.index替换成一个会自动加1的变量 autoindex;
			逻辑的最后将autoindex赋给oldindex
			无缝的实现就是一个if判断，判断 autoindex的取值范围
			从左往右（this.index > oldindex）
				对动画的切换

---

	---自动轮播和手动轮播 冲突与联系
		1. 每一次自动轮播 都得告诉 手动轮播我当前的位置(自动轮播进行中可能会触发 手动轮播)
			  联系：在自动轮播的定时器内 oldindex = autoindex(全局变量)
			  冲突：自动轮播应该停止 清除定时器（变量提升的问题）
		2. 手动轮播 得告诉 自动轮播 ，下一次自动轮播时 你应该从哪一屏开始（手动点的那一屏）
			    在手动轮播的回调函数内 autoindex=this.index(全局变量)
			    重新开启定时器
