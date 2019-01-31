document.body.onload=snow
var bg=new Image()
var snow=null

//雪的构造函数
var snowObj=function(){
  this.snowpic=new Image()
  this.x=[]
  this.y=[]
  this.drowR=[] //下落速度
  this.alpha=[] //alpha*sin(l)控制左右晃动的幅度
  this.l=[] //sin(l) l自增,实现左右晃动
}
snowObj.prototype.num=40

//宽度800，其中显示40个，所以平均20的宽度会出现一次
snowObj.prototype.init=function(){
  for(var i=0;i<this.num;i++){
    this.y[i]=Math.floor(Math.random()*40)*15+Math.random()*15  //一开始随机出现在屏幕任意位置
    this.x[i]=i*20+Math.random()*20
    this.drowR[i] = Math.random()*1  //随机下落速度---此时为匀速的速度
    this.alpha[i]=Math.random()*1*0.8
    this.l[i]=Math.random()*100
  }
  this.snowpic.src="src/snow.png"
}

snowObj.prototype.draw=function(){
  var pic=this.snowpic
  for(var i=0;i<this.num;i++){
    if(this.y[i]>canHeight){
      this.y[i]=0
      this.drowR[i] = Math.random()*1 
    }
    this.y[i]=this.y[i]+this.drowR[i]
    this.l[i]+=1*0.009
    var l=this.alpha[i]*Math.sin(this.l[i])
    this.x[i]+=l
    ctx.drawImage(pic,this.x[i],this.y[i])
  }
}

function init(){
  var can=document.getElementById("canvas")
  ctx=can.getContext("2d")
  canWidth=can.width
  canHeight=can.height
  bg.src="src/background.jpg"
  snow=new snowObj()
  snow.init()
}

function bgdraw(){
  ctx.drawImage(bg,0,0,canWidth,canHeight)
}

var i=0

function loop(){
  // i++
  // if(i>30) return
  requestAnimationFrame(loop)  //每次执行后再次调用，重绘
  bgdraw()
  snow.draw()
}

function snow(){
  init()
  loop()
}
