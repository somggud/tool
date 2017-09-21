var game={
	RN:2,
	CN:2,
	PANEL:null,
	PANELWIDTH:0,
	PANELHEIGHT:0,
	PADDINGRIGHT:0,
	PADDINGBOT:0,
	DIV:null,
	DIVWIDTH:0,
	DIVHEIGHT:0,
	CHANGE:50,
	CHANGECELL:null,
	LEVEL:1,
	SCORE:0,
	state:1,
	RUNNING:1,
	GAMGOVER:0,
	init:function(){
		this.state=this.RUNNING;
		this.SCORE=0;
		this.LEVEL=1;
		this.RN=2;
		this.CN=2;
		this.bgPaint();
	},
	bgPaint(){//根据行数和列数绘出图板
		var level=document.querySelector("p.level");
		level.innerHTML="LEVEL："+this.LEVEL;
		var score=document.querySelector("p.score");
		score.innerHTML="SCORE："+this.SCORE;
		var span=document.querySelector(".box span");
		span.innerHTML=this.SCORE;
		this.PANEL=document.createElement("div");
		document.body.appendChild(this.PANEL);
		this.PANEL.setAttribute("class","container");
		this.colorPaint();
		this.PADDINGRIGHT=parseFloat(getComputedStyle(this.PANEL).paddingRight);
		this.PADDINGBOT=parseFloat(getComputedStyle(this.PANEL).paddingBottom);
		var divtop=parseFloat(getComputedStyle(this.DIV).marginTop);
		var divleft=parseFloat(getComputedStyle(this.DIV).marginLeft);
		var divheight=divwidth=100;
		if(this.LEVEL<10){
			for(var i=0;i<this.PANEL.children.length;i++){
				this.PANEL.children[i].style.width=divwidth-5*this.LEVEL+"px";
				this.PANEL.children[i].style.height=divheight-5*this.LEVEL+"px";
			}
		}else{
			for(var i=0;i<this.PANEL.children.length;i++){
				this.PANEL.children[i].style.width=divwidth-45+"px";
				this.PANEL.children[i].style.height=divheight-45+"px";
			}
		}
		this.DIVWIDTH=parseFloat(getComputedStyle(this.DIV).width);
		this.DIVHEIGHT=parseFloat(getComputedStyle(this.DIV).height);
		this.PANEL.style.width=this.PADDINGRIGHT+(divleft+this.DIVWIDTH)*this.CN+"px";
		this.PANEL.style.marginLeft=-(this.PADDINGRIGHT+(divleft+this.DIVWIDTH)*this.CN)/2+"px";
		this.PANEL.style.height=this.PADDINGBOT+(divtop+this.DIVHEIGHT)*this.RN+"px";
		this.PANEL.style.marginTop=-(this.PADDINGBOT+(divtop+this.DIVHEIGHT)*this.RN)/2+"px";
		if(this.LEVEL<10){
			this.CN++;
			this.RN++;//执行完每次之后行数和列数各加1
		}
		var time=parseInt(document.querySelector("p.time").innerHTML.slice(5));
		this.SCORE+=time;//得分
		this.CHANGE--;
		this.LEVEL++;//关数+1
		document.querySelector(".time").innerHTML="TIME："+30;
	},
	colorPaint(){//添加div子元素，并随机背景颜色
		var frag=document.createDocumentFragment();
		var r=Math.floor(Math.random()*256),
			g=Math.floor(Math.random()*256),
			b=Math.floor(Math.random()*256);
		for(var i=0;i<this.RN*this.CN;i++){
			this.DIV=document.createElement("div");
			frag.appendChild(this.DIV);
			this.DIV.setAttribute("class","fix");
			this.DIV.style.background="rgb("+r+","+g+","+b+")";
		}
		this.PANEL.appendChild(frag);
		this.changeCell(r,g,b);
	},
	changeCell(r,g,b){//改变其中一个div的背景色，r,g,b随机更改
		var n=Math.floor(Math.random()*this.RN*this.CN);
		r+=Math.floor(Math.random()*this.CHANGE-this.CHANGE);
		g+=Math.floor(Math.random()*this.CHANGE-this.CHANGE);
		b+=Math.floor(Math.random()*this.CHANGE-this.CHANGE);
		this.CHANGECELL=this.PANEL.children[n];
		this.CHANGECELL.style.background="rgb("+r+","+g+","+b+")";
		this.CHANGECELL.onclick=function(){
			this.PANEL.parentNode.removeChild(this.PANEL);
			this.bgPaint();
		}.bind(this);
	},
	task(){
		var p=document.querySelector("p.time");
		var n=p.innerHTML.slice(5);
		if(n>1){
			p.innerHTML="TIME："+(--n);
		}else{
			document.querySelector(".over").style.display="block";
			this.state=this.GAMEOVER;
			this.myClose(timer);
		}
	},
	myClose(timer){
		clearInterval(timer);
	}
}
var timer=setInterval(game.task,1000);
game.init();
document.querySelector("button").onclick=function(){
	document.querySelector(".over").style.display="none";
	document.querySelector(".time").innerHTML="TIME："+30;
	game.PANEL.parentNode.removeChild(game.PANEL);
	game.init();
};