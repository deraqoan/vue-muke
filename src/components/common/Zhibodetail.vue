<template>
	<div class="Zhibodetail">
		<mt-header class="header" fixed title="直播详情">
		  <router-link to="/" slot="left">
		      <mt-button icon="back"></mt-button>
		   </router-link>
		   <router-link to="/Info" slot="right">
		       <mt-button icon="more"></mt-button>
		    </router-link>
		</mt-header>
		<div class="container">
		  <div class="videoMsg">
		    <span class="badgo" v-html="item.title"></span>
		    <a href="#" class="pic">
		    	<div class='time icon'>
		          <img  src="../../assets/time.png" width="15" height="15">
		        </div>
		        <span v-html="item.date"></span>
		    </a>
		    <a href="#" class="pic">
		        <div class='user icon'>
		          <img  src="../../assets/default.png" width="30" height="30">
		        </div>
		        <span v-html="item.name" class="name"></span>
		    </a>
		  </div>
		  <div class="middle" v-if="leftTime>0">
		  	<div class="tips">距离直播开始</div>
		  	<div class="days center"><span>{{day}}天</span></div>
		  	<div class="hours center"><span>{{hour}}时</span></div>
		  	<div class="mins center"><span>{{min}}分</span></div>
		  	<div class="seconds center"><span>{{seconds}}秒</span></div>
		  </div>
		  <div class="middle" v-if="leftTime<0">
		  	<div class="tips"><img src="../../assets/shiping.png" height="30" width="30"></div>
		  	<div class="jieshu"><span>直播已结束，回看录制视频</span></div>
		  </div>

		  <div class="bottom">
		  	<p class="detail">直播详情</p>
		  	<img :src="item.actImage" class="main">
		  	<div class="live"></div>
		  	<div class="text">
		  	  <p v-html="item.content"></p>
		  	</div>
		  </div>
	  </div>
	  <ul  class="baoming">
	  <li v-for="(item, index) in review.data">
	  	<img :src="item.image" class="touxiang" v-if="item.image">
	  	<img v-if="!item.image" src="../../assets/default.png" class="touxiang">
	  </li>
	  <span class="blue">{{review.count}}人已报名</span>
	</ul>
	  <div class="review">
	  	<p class="detail">评论({{item.reviewCount}})</p>
	  	<div class="pinglun" v-for="(item, index) in review.data">
	  		<div class="hang">
	  		  <img :src="item.image" class="touxiang" v-if="item.image">
	  		  <img v-if="!item.image" src="../../assets/default.png" class="touxiang">
	  		  <span v-html="item.name" class="nameo"></span>
	  		  <span v-html="item.date" class="date"></span>
	  		</div>
	  		<span v-html="item.content" class="content"></span>
	  		<div class="ping">
	  			<img  src="../../assets/pinglun@3x.png" width="15" height="15">
	  			<span class="hui">回复({{item.replyCount}})</span>
	  		</div>
	  				
	  	</div>
	  </div>
	  <div class="footer">
	  	<div class="left">
	  		<div class="view">
               <img  src="../../assets/pinglun@3x.png" class="panpic">
	  			<span class="pan">评论</span>
	  		</div>
	  		<div class="collect">
              <img  src="../../assets/collect.png" class="panpic">
              <span class="pan">分享</span>
	  		</div>
	  	</div>
	  	<div class="right">
	  		<div class="view" @click="toast" v-if="leftTime>0">立即报名</div>
	  		<div class="view enable" v-if="leftTime<0&&!item.replay">暂无录制</div>
	  		<div class="view" @click="getLive(item)" v-if="item.replay">回看直播</div>
	  	</div>
	  </div>
	</div>
</template>
<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
	data () {
	  return {
	    item: [],
	    isFollowed: false,
	    backStep: -1,
	    review: [],
	    day1: null,
	    hour: null,
	    min: null,
	    seconds: null,
	    leftTime: null
	  }
	},
	created () {
		Indicator.open()
		api.getZhibodetail (this.$route.params.zhiboId).then(response => {
		  this.item = response.data.data
		  this.play()
		  Indicator.close()
		}, err => {
		  console.log(err)
		})

		api. getZhiboreview (this.$route.params.zhiboId).then(response => {
		  this.review = response.data
		  Indicator.close()
		}, err => {
		  console.log(err)
		})

		this.$store.commit(SET_BACK_POSITION, '直播')
	},
	methods: {
	  getLive() {
	  	this.$router.push('/live/' + this.item.id)
	  },
	  getTime () {
	  	let arr = this.item.date.match(/\d+/g)
	  	let endDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
	  	let now = new Date(); 
	  	this.leftTime=endDate.getTime()-now.getTime()
	  	let leftsecond = parseInt(this.leftTime/1000) 
	  	this.day=Math.floor(leftsecond/(60*60*24))
	  	this.hour=Math.floor((leftsecond-this.day*24*60*60)/3600) 
	  	this.min=Math.floor((leftsecond-this.day*24*60*60-this.hour*3600)/60) 
	  	this.seconds=Math.floor(leftsecond-this.day*24*60*60-this.hour*3600-this.min*60) 
	  },
	  play() {
	    
	    setInterval(this.getTime, 1000)
	  },
	  toast() {
	  	MessageBox({
	  	  title: '提示',
	  	  message: '报名成功，请准时参加哦',
	  	  showCancelButton: false
	  	});
	  }
	}
}
</script>
<style scoped>
.Zhibodetail{
  background: #eee;
}
.header{
  background: #fff;
  color:#5dc5c6;
  border-bottom: 1px solid #ebeff5;
}
.container{
  position: absolute;
  margin-top:40px;
  width:100%;
  margin-left:-50%;
  background: #ccc;
}
.videoMsg{
  width:100%;
  background-color: white;
  padding: 0.5rem 1rem;
  border-bottom: 10px solid #ebeff5;
}
.badgo{
  font-size: 0.7rem;
  color: black;
  padding-bottom: 0.2rem;
  font-size: 0.8rem;
  font-weight: 500;
}
.pic{
  display:flex;
  height: 1rem;
  font-size: 0.6rem;
  color: #515151;
  align-content: center;
  align-items: center;
  margin:10px 0;
}
.icon{
  height:0.7rem;
  width:0.7rem;
  display: flex;
  align-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.2rem;
}
.name{
	margin-left:15px;
	font-size: 0.7rem;
}
.middle{
	position:absolute;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	padding: 0.5rem 0.7rem;
}
.tips{
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	align-items: center;
	font-size: 0.7rem;
	margin-right: 0.3rem;
}
.center{
	text-align: center;
	width: 1.8rem;
	height: 1.55rem;
	color: white;
	background-color: #37b3b6;
	display: flex;
	align-items: center;
	font-size: 0.8rem;
	margin: 0 0.1rem 0 0.1rem;
	border-radius: 4px;
	padding-left: 0.2rem;
	
}
.jieshu{
	color: #37b3b6;
	padding-left: 1rem;
	display: flex;
	align-items: center;
}
.bottom{
	border-top: 10px solid #ebeff5;
	position:absolute;
	margin:50px 0;
}
.detail{
	height:0.5rem;
	margin-top: 0.3rem;
	margin-left: 0.3rem;
	color: #999999;
	font-size: 0.5rem;
}
.main{
  width:100%;
  height: 9rem;
}
.text{
  position:absolute;
  margin-left: 0.8rem;
  margin-top:-0.2rem;
  font-size: 0.6rem;
  
}
.text p{
  white-space: pre;
  width:80%;
  word-wrap:break-word;
  word-break:break-all;
}
.baoming{
	display: flex;
	margin-left: -50%;
	position:absolute;
	width:100%;
	margin-top:850px;
	flex-direction: row;
	padding:0.5rem;
    justify-content: flex-start;
    border-top: 1px solid #ebeff5;
    border-bottom: 1px solid #ebeff5;
}
.baoming li{
	margin:0 0.1rem;
}
.blue{
	color:#5dc5c6;
	position:relative;
	margin-left: 1rem;


}
.review{
	border-top: 10px solid #ebeff5;
	position:absolute;
	margin-top:900px;
	width:100%;
	margin-left:-50%;
	padding:0 0.8rem;
}
.pinglun{
	border-top: 1px solid #ebeff5;
	padding:0.4rem 0 0.1rem 0;
}
.hang{
	height: 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
}
.touxiang{
	height:30px;
	width:30px;
	border-radius: 50%;

}
.nameo{
	margin-left: 0.3rem;
	font-size: 0.8rem;
	align-self: center;
	color: #999999;
}
.date{
	font-size: 0.8rem;
	color: #999999;
	position: absolute;
	right: 20px;
	padding-right: 0.3rem;
}
.content{
	height: 1.5rem;
	display: flex;
	padding-right:20px;
	justify-content: flex-start;
}
.ping{
	height: 2rem;
	display: flex;
	margin-right: 30px;
	justify-content: flex-end;
	align-items: center;
}
.hui{
	color:#999999;
	margin-left:0.3rem;
}
.footer{
	display: flex;
	left:0;
	justify-content: space-between;
	width: 100%;
	height: 2.5rem;
	border-top: 1px solid #eeeeee;
	position: fixed;
	bottom: 0;
}
.left{
	flex: 1;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	background-color: white;
}
.view{
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	display: flex; 
	flex-direction: column;
    align-items: center;
    justify-content: center;
}
.enable{
	background:#ccc;
	height:100%;
}
.collect{
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
    display: flex; 
    flex-direction: column;
	 align-items: center;
	 justify-content: center;
}
.pan{
	font-size: 0.4rem;
	color: #999999;
	text-align: center;
}
.panpic{
	width: 1rem;
	height: 1rem;
}
.right{
	-webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-align: center;
	    background-color: #2eafb3;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    -ms-flex-line-pack: center;
	    align-content: center;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    justify-content: center;
}
</style>