<template>
	<div class="zhuanti">
	<mt-header fixed :title="$store.state.bookInfo" class="header">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" class="blue"></mt-button>
	     </router-link>
	</mt-header>
	<ul class="video-list">
		<li @click="getVideo(item)" v-for="(item, index) in zhuan" class="item">
		  <div class="thumbnail">
		      <span class="hot">开始学习</span>
		      <img :src="item.thumbnail" class="img">
		  </div>
		  <div class="videoMsg">
		  	<h3 class="title">{{item.title}}</h3>
		  	<div class="data">
		      <div class='watch icon'><span class="badg" v-html="item.viewSum"></span></div>
		      <div class='zan icon'><span class="badg" v-html="item.reviewSum"></span></div>
		    </div>
		  </div>
	    </li>
	</ul>
	
    </div>
</template>
<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import {mapState} from 'vuex'
import {
  SET_CURRENT_SOURCE,
  SET_HEAD_TITLE,
  SET_CURRENT_SPECIALID
} from '@/store/mutationsType'

export default {
	data () {
	  return {
	    zhuan: [],
	    isFollowed: false,
	    backStep: -1,
	    head: null,
	    selected: "1",
	    zhuanti: ["入园指导", "身心培育", "习惯培育", "道德培育", "情感培育", "智力培育"],
	    youzhong: ["身心培育", "习惯培育", "道德培育", "情感培育", "智力培育"],
	    youda: ["身心培育", "习惯培育", "道德培育", "情感培育", "智力培育", "离园与入学链接"]
	  }
	},
	created () {
		Indicator.open()
		api.getCourse (this.$route.params.zhuantiId).then(response => {
		  this.zhuan = response.data.data
		  Indicator.close()
		}, err => {
		  console.log(err)
		})

		this.head = this.$store.state.bookInfo
	},
	methods: {
	  getVideo (item) {
	    
        api.getCourseList (this.$route.params.zhuantiId).then(response => {
          this.CourseList = response.data.data
          this.specialName = response.data.data.specialName
          this.$store.commit(SET_CURRENT_SPECIALID, response.data.data)
        }, err => {
          console.log(err)
        })
        this.$store.commit(SET_HEAD_TITLE, item.id)
        this.$router.push('/coursedetail/' + item.id)
	  }
	}
}
</script>
<style scoped>
    .header{
    	background: #fff;
    	color:#000;
    	border-bottom: 1px solid #ebeff5;
    }
    .blue{
    	color:#5dc5c6;
    }
    .video-list{
    	position: absolute;
    	left:0;
    	top:2rem;
    }
    .item{
    	border-bottom: 1px solid #e8e8e8;
    	padding: 0.5rem 0.35rem;
    	height: 3.875rem;
    	width:100%;
    	display:flex;
    	flex-direction: row; 
    	justify-content: space-between;
    }
    .img{
    	float: left;
    	width: 6.825rem;
    	height: 3.875rem;
    	z-index: -1;
    	position: absolute;
    }
    .hot{
    	position: absolute;
    	bottom: 0;
    	font-size: 12px;
    	color: #fff;
    	width: 100%;
    	height: 1.125rem;
    	line-height: 1.125rem;
    	background: rgba(0, 0, 0, 0.5);
    	text-align: center;
    }
    .thumbnail{
    	width: 6.825rem;
    	height: 3.875rem;
    	float: left;
    	position:relative;
    }
    .videoMsg{
    	width: 8rem;
    	padding-right: 1rem;
    }
    .title{
    	font-size: 14px;
    	font-weight: normal;
    }
    .watch{
    	background: url(../../assets/bofangshu@3x.png) no-repeat;
    	background-size: contain;
    	width: 0.7rem;
    	height: 0.7rem;
    	display: inline-block;
    }
    .zan{
    	background: url(../../assets/bijishu.png) no-repeat;
    	background-size: contain;
    	width: 0.7rem;
    	height: 0.7rem;
    	display: inline-block;
    }
    .badg{
    	font-size: 14px;
    	color: #b1b1b1;
    	margin-left: 1rem;
    }
    .data{
    	width: 5rem;
    	margin-top: 1rem !important;
    	display: flex;
    	justify-content: space-between;
    }
  
</style>