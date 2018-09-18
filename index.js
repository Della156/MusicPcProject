window.onload = function() {
	var arrowEl = document.querySelector("#head > .headMain > .arrow");
	var liNodes = document.querySelectorAll("#head > .headMain > .nav > .list > li");
	var upNodes = document.querySelectorAll("#head > .headMain > .nav > .list > li .up");
	var firstLiNode = liNodes[0];
	var firstUpNode = firstLiNode.querySelector(".up");

	var head = document.querySelector("#head");
	var content = document.querySelector("#content");
	var cLiNodes = document.querySelectorAll("#content > .list > li");
	var cList = document.querySelector("#content > .list");

	var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li");
	var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li");
	var home1 = document.querySelector("#content > .list > .home .home1");

	var aboutUlNodes = document.querySelectorAll("#content > .list > .about .about3 > .item > ul");
	var dotLiNodes = document.querySelectorAll("#content > .dot >li");

	var team3Lis = document.querySelectorAll("#content > .list >.team .team3 ul>li");
	var team3 = document.querySelector("#content > .list >.team .team3");
	//同步每一屏的索引  now----同步----index ,但是index并没有同步--now  因为没有意义
	var now = 0;
	var timer = 0;
	var prevIndex = 0;
	var oldIndex = 0;
	var timer3D = 0;
	var autoIndex = 0;
	var mask = document.querySelector("#mask");			
	var line = document.querySelector("#mask > .line");
	var faces = document.querySelectorAll("#mask > div");
	//开机动画
	loadingAn();
	function loadingAn () {
		var arr = ['adl.jpg','adl1.jpg','adl2.jpg','adl3.jpg','pin3.jpg','ping.jpg','ping2.jpeg','ping4.jpeg','musicoff.gif','musicon.gif'];
		var flag =0;
		for(var i=0;i<arr.length;i++){
			var img = new Image();
			img.src="img/"+arr[i];
			img.onload=function(){
				flag++;
				line.style.width = flag/arr.length*100+"%";
			}
		}
		
		line.addEventListener("transitionend",function(){
			if(flag === arr.length){
				for(var i=0;i<faces.length;i++){
					faces[i].style.height=0+"px";
				}
				this.style.display="none";
			}
		})
		
		faces[0].addEventListener("transitionend",function(){
			mask.remove();
			audio.play();
			home3D();
		})
	}

	//音频
	var music = document.querySelector("#head > .headMain .music");
	var audio = document.querySelector("#head > .headMain .music audio");
	music.onclick = function  () {	
		if (audio.paused) {
			audio.play();
			music.style.background = "url(img/musicon.gif)";
		}else{
			audio.pause();
			music.style.background = "url(img/musicoff.gif)";
		}
	}
	//出入场动画
	var anArr=[
		{
			inAn:function(){
				var home1 = document.querySelector("#content > .list > .home .home1");
				var home2 = document.querySelector("#content > .list > .home .home2");
				
				home1.style.transform = "translateY(0px)";
				home2.style.transform = "translateY(0px)";
				home1.style.opacity = 1;
				home2.style.opacity = 1;
			},
			outAn:function(){
				var home1 = document.querySelector("#content > .list > .home .home1");
				var home2 = document.querySelector("#content > .list > .home .home2");					
				home1.style.transform = "translateY(-400px)";
				home2.style.transform = "translateY(100px)";
				home1.style.opacity = 0;
				home2.style.opacity = 0;						
			}
		},
		{
			inAn:function(){
				var plane1 = document.querySelector("#content>.list >.course .plane1");
				var plane2 = document.querySelector("#content>.list >.course .plane2");
				var plane3 = document.querySelector("#content>.list >.course .plane3");
				
				plane1.style.transform = "translate(0px,0px)";
				plane2.style.transform = "translate(0px,0px)";
				plane3.style.transform = "translate(0px,0px)";
			},
			outAn:function(){
				var plane1 = document.querySelector("#content>.list >.course .plane1");
				var plane2 = document.querySelector("#content>.list >.course .plane2");
				var plane3 = document.querySelector("#content>.list >.course .plane3");
				
				plane1.style.transform = "translate(-200px,-200px)";
				plane2.style.transform = "translate(-200px,200px)";
				plane3.style.transform = "translate(200px,-200px)";
			}
		},
		{
			inAn:function(){
				var pencel1 = document.querySelector("#content>.list >.works .pencel1");
				var pencel2 = document.querySelector("#content>.list >.works .pencel2");
				var pencel3 = document.querySelector("#content>.list >.works .pencel3");
				
				pencel1.style.transform = "translateY(0px)";
				pencel2.style.transform = "translateY(0px)";
				pencel3.style.transform = "translateY(0px)";
			},
			outAn:function(){
				var pencel1 = document.querySelector("#content>.list >.works .pencel1");
				var pencel2 = document.querySelector("#content>.list >.works .pencel2");
				var pencel3 = document.querySelector("#content>.list >.works .pencel3");
				
				pencel1.style.transform = "translateY(-100px)";
				pencel2.style.transform = "translateY(100px)";
				pencel3.style.transform = "translateY(100px)";
			}
		},
			{
			inAn:function(){
				var zZx1= document.querySelector("#content>.list>.about .about3>.item:nth-child(1)");
				var zZx2 = document.querySelector("#content>.list>.about .about3>.item:nth-child(2)");
				zZx1.style.transform = "rotate(0deg)";
				zZx2.style.transform = "rotate(0deg)";
			},
			outAn:function(){
				var zZx1= document.querySelector("#content>.list>.about .about3>.item:nth-child(1)");
				var zZx2 = document.querySelector("#content>.list>.about .about3>.item:nth-child(2)");
				zZx1.style.transform = "rotate(45deg)";
				zZx2.style.transform = "rotate(-45deg)";
			}
		},
		{
			inAn:function(){
				var team1= document.querySelector("#content>.list>.team .team1");
				var team2 = document.querySelector("#content>.list>.team .team2");
				team1.style.transform = "translateX(0px)";
				team2.style.transform = "translateX(0px)";
			},
			outAn:function(){
				var team1= document.querySelector("#content>.list>.team .team1");
				var team2 = document.querySelector("#content>.list>.team .team2");
				team1.style.transform = "translateX(-100px)";
				team2.style.transform = "translateX(100px)";

			}
		}
	
	]
	
	for (var i =0; i<anArr.length; i++) {
		anArr[i]["outAn"]();
	}
	setInterval(function(){
		anArr[0].inAn();	
	},2000);
	
	/*anArr[4].outAn();
		setInterval(function(){
			anArr[4].inAn();	
		},2000);*/
	//第五屏气泡效果
	bubble();
	function bubble() {
		var oc = null;
		var time1 = 0;
		var time2 = 0;
		for(var i = 0; i < team3Lis.length; i++) {
			team3Lis[i].onmouseenter = function() {
				for(var i = 0; i < team3Lis.length; i++) {
					team3Lis[i].style.opacity = 0.5;
				}
				this.style.opacity = 1;
				addCanvas();
				oc.style.left = this.offsetLeft + "px";

			}

		}

		function addCanvas() {
			if(!oc) {
				oc = document.createElement("canvas");
				oc.width = team3Lis[0].offsetWidth;
				oc.height = team3Lis[0].offsetHeight * 2 / 3;
				//这里可以用team3或者oc
				oc.onmouseleave = function() {
					for(var i = 0; i < team3Lis.length; i++) {
						team3Lis[i].style.opacity = 1;
					}
					removeCanvas();
				}
				team3.appendChild(oc);
				QiPao();
			}

		}
		/*气泡事件*/
		function QiPao() {
			if(oc.getContext) {
				var ctx = oc.getContext("2d");
				var arr = [];
				//将数组中的圆绘制到画布上
				time1 = setInterval(function() {
					ctx.clearRect(0, 0, oc.width, oc.height);
					//动画
					for(var i = 0; i < arr.length; i++) {
						arr[i].deg += 10;
						arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step * 2;
						arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step;

						if(arr[i].y <= 50) {
							arr.splice(i, 1)
						}
					}
					//绘制
					for(var i = 0; i < arr.length; i++) {
						ctx.save();
						ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ")";
						ctx.beginPath();
						ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
						ctx.fill();
						ctx.restore();
					}
				}, 1000 / 60)

				//往arr中注入随机圆的信息
				time2 = setInterval(function() {
					var r = Math.random() * 6 + 2;
					var x = Math.random() * oc.width;
					var y = oc.height - r;
					var red = Math.round(Math.random() * 255);
					var green = Math.round(Math.random() * 255);
					var blue = Math.round(Math.random() * 255);
					var alp = 1;

					var deg = 0;
					var startX = x;
					var startY = y;
					//曲线的运动形式
					var step = Math.random() * 20 + 10;
					arr.push({
						x: x,
						y: y,
						r: r,
						red: red,
						green: green,
						blue: blue,
						alp: alp,
						deg: deg,
						startX: startX,
						startY: startY,
						step: step
					})
				}, 50)
			}
		}

		function removeCanvas() {
			oc.remove();
			oc = null;
			clearInterval(time1);
			clearInterval(time2);

		}
	}

	//第四屏图片炸裂效果
	picBoom();
	function picBoom() {
		for(var i = 0; i < aboutUlNodes.length; i++) {
			change(aboutUlNodes[i]);

		}

		function change(UL) {
			var w = UL.offsetWidth / 2;
			var h = UL.offsetHeight / 2;
			var src = UL.dataset.src;
			for(var i = 0; i < 4; i++) {
				var liNode = document.createElement("li");
				liNode.style.width = w + "px";
				liNode.style.height = h + "px";
				var imgNode = document.createElement("img");
				imgNode.src = src;

				/*1.left 0 top 0
					2.left -w top 0
					3.left 0 top -h
					4.left -w top -h*/
				imgNode.style.left = -(i % 2) * w + "px";
				imgNode.style.top = -Math.floor(i / 2) * h + "px";
				liNode.appendChild(imgNode);
				UL.appendChild(liNode);

			}

			UL.onmouseenter = function() {
				var imgNodes = this.querySelectorAll("li>img");
				/*1.left 0 top 0
					2.left -w top 0
					3.left 0 top -h
					4.left -w top -h*/
				/*1.left 0 top h
					2.left -2w top 0
					3.left w top -h
					4.left -w top -2h*/
				imgNodes[0].style.top = h + "px";
				imgNodes[1].style.left = -2 * w + "px";
				imgNodes[2].style.left = w + "px";
				imgNodes[3].style.top = -2 * h + "px";

			}
			UL.onmouseleave = function() {
				var imgNodes = this.querySelectorAll("li>img");
				imgNodes[0].style.top = 0 + "px";
				imgNodes[1].style.left = -w + "px";
				imgNodes[2].style.left = 0 + "px";
				imgNodes[3].style.top = -h + "px";

			}

		}

	}

	//第一屏3D效果
	//home3D();
	function home3D() {
		for(var i = 0; i < home2LiNodes.length; i++) {
			home2LiNodes[i].index = i;
			home2LiNodes[i].onclick = function() {
				//用户要点击的时候就要暂停轮播
				clearInterval(timer3D);

				for(var i = 0; i < home2LiNodes.length; i++) {
					home2LiNodes[i].classList.remove("active");
				}
				this.classList.add("active");
				//从左往右 index>oldindex rightShow leftHide
				if(this.index > oldIndex) {
					home1LiNodes[this.index].classList.remove("leftHide");
					home1LiNodes[this.index].classList.remove("rightHide");
					home1LiNodes[this.index].classList.remove("leftShow");
					home1LiNodes[this.index].classList.add("rightShow");

					home1LiNodes[oldIndex].classList.remove("rightShow");
					home1LiNodes[oldIndex].classList.remove("leftShow");
					home1LiNodes[oldIndex].classList.remove("rightHide");
					home1LiNodes[oldIndex].classList.add("leftHide");

				}
				//从右往左 index<oldindex			leftShow rightHide
				if(this.index < oldIndex) {
					home1LiNodes[this.index].classList.remove("leftHide");
					home1LiNodes[this.index].classList.remove("rightHide");
					home1LiNodes[this.index].classList.remove("rightShow");
					home1LiNodes[this.index].classList.add("leftShow");

					home1LiNodes[oldIndex].classList.remove("rightShow");
					home1LiNodes[oldIndex].classList.remove("leftShow");
					home1LiNodes[oldIndex].classList.remove("leftHide");
					home1LiNodes[oldIndex].classList.add("rightHide");

				}

				oldIndex = this.index;
				//手动逻辑必须告诉自动轮播逻辑刚才点击的是哪一个面，于是轮播从这个面开始
				autoIndex = this.index;
				//根据需要开启自动轮播
				//move();
			}

		}

		//自动轮播效果(从左至右)
		move();
		function move() {
			 clearInterval(timer3D);					
			timer3D = setInterval(function() {
				autoIndex++;
				//无缝轮播		
				if(autoIndex == home2LiNodes.length) {
					autoIndex = 0;
				}

				for(var i = 0; i < home2LiNodes.length; i++) {
					home2LiNodes[i].classList.remove("active");
				}
				home2LiNodes[autoIndex].classList.add("active");

				home1LiNodes[autoIndex].classList.remove("leftShow");
				home1LiNodes[autoIndex].classList.remove("leftHide");
				home1LiNodes[autoIndex].classList.remove("rightHide");
				home1LiNodes[autoIndex].classList.add("rightShow");

				home1LiNodes[oldIndex].classList.remove("leftShow");
				home1LiNodes[oldIndex].classList.remove("rightShow");
				home1LiNodes[oldIndex].classList.remove("rightHide");
				home1LiNodes[oldIndex].classList.add("leftHide");

				oldIndex = autoIndex;

			}, 2000);
		}

		home1.onmouseenter = function() {
			clearInterval(timer3D);
		}
		home1.onmouseleave = function() {
			move();
		}
	}
	window.onresize = function() {
		/*调整分辨率
			1.未点击时视口只能出现一屏 contentBind();
			2.点击后视口只能出现一屏,所以在1的基础上对每一屏的偏移量进行重新调整
			3.小箭头的方向也需要调整*/
		contentBind();
		cList.style.top = -now * (document.documentElement.clientHeight - head.offsetHeight) + "px";
		arrowEl.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";

	}

	//内容区交互
	/*让fn逻辑在频繁被触发的时候只会执行一次*/
	if(content.addEventListener) {
		content.addEventListener("DOMMouseScroll", function(ev) {
			ev = ev || event;
			//当滑动鼠标时间在200ms之内时会清除上一次滚轮事件
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn(ev);
			}, 200);

		});
	}
	content.onmousewheel = function(ev) {
		ev = ev || event;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn(ev);
		}, 200);
	};
	
	//鼠标滚轮事件
	var dir = "";
	function fn(ev) {
		ev = ev || event;
		if(ev.wheelDelta) {
			dir = ev.wheelDelta > 0 ? "up" : "down";
		} else if(ev.detail) {
			dir = ev.detail < 0 ? "up" : "down";
		}
		prevIndex = now;
		switch(dir) {
			case "up":
				if(now > 0) {
					now--;
					move(now);
				}
				break;
			case "down":
				if(now < cLiNodes.length - 1) {
					now++;
					move(now);
				}
				break;

		}
	}
	
	contentBind();
	function contentBind() {
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
		for(var i = 0; i < cLiNodes.length; i++) {
			cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		}
	}

	//头部交互
	headBind();
	function headBind() {
		firstUpNode.style.width = "100%";
		arrowEl.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
		for(var i = 0; i < liNodes.length; i++) {
			liNodes[i].index = i;
			// i : liNodes.lenth 5   转绑
			liNodes[i].onclick = function() {
				prevIndex = now;
				move(this.index);
				now = this.index;
			}
		}
		for(var i = 0; i < dotLiNodes.length; i++) {
			dotLiNodes[i].index = i;
			// i : liNodes.lenth 5   转绑
			dotLiNodes[i].onclick = function() {
				prevIndex = now;		
				move(this.index);
				now = this.index;
			}
		}
	}
	//move(4);
	//动画的核心函数
	function move(index) {
		for(var i = 0; i < upNodes.length; i++) {
			upNodes[i].style.width = "";
		}
		upNodes[index].style.width = "100%";
		arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
		cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";
		//小圆点的同步问题
		for(var i = 0; i < dotLiNodes.length; i++) {
			dotLiNodes[i].className = "";
		}
		dotLiNodes[index].className = "active";
		//出入场动画
		if (anArr[index]&&typeof anArr[index]["inAn"] === "function" ) {
			anArr[index]["inAn"]();
		}
		if (anArr[prevIndex]&&typeof anArr[prevIndex]["inAn"] === "function" ) {
			anArr[prevIndex]["outAn"]();
		}
	}
}