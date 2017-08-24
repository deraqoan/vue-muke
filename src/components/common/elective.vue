<template>
	<div class="elective">
	<mt-header fixed :title="select[0]" class="header"  v-if="this.$route.params.courseId>-4&&this.$route.params.courseId<0">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" class="blue"></mt-button>
	     </router-link>
	</mt-header>
	<mt-header fixed :title="select[1]" class="header" v-if="this.$route.params.courseId>0&&this.$route.params.courseId<10">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" class="blue"></mt-button>
	     </router-link>
	</mt-header>
	<mt-header fixed :title="select[2]" class="header" v-if="this.$route.params.courseId>9&&this.$route.params.courseId<13">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" class="blue"></mt-button>
	     </router-link>
	</mt-header>
	<mt-header fixed :title="select[3]" class="header" v-if="this.$route.params.courseId>12">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" class="blue"></mt-button>
	     </router-link>
	</mt-header>
	<img src="../../assets/you.png" class="img" v-if="this.$route.params.courseId>-4&&this.$route.params.courseId<0">
	<img src="../../assets/zhong.png" class="img" v-if="this.$route.params.courseId>0&&this.$route.params.courseId<10">
	<img src="../../assets/gao.png" class="img" v-if="this.$route.params.courseId>9&&this.$route.params.courseId<13">
	<img src="../../assets/liushou.png" class="img" v-if="this.$route.params.courseId==13">
	<img src="../../assets/gedai.png" class="img" v-if="this.$route.params.courseId==14">
	<img src="../../assets/teshu.png" class="img" v-if="this.$route.params.courseId==15">
	<div  v-if="this.$route.params.courseId>-4&&this.$route.params.courseId<0">
		<ul class="lefttab">
		  <li class="tabitem" v-for="(item, index) in you" :class="{'active': index == minorSelected}" @click="setMinor(index-3)">
		    {{item}}
		  </li>
		</ul>
		<ul class="tabtext">
		    <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
		</ul>
	</div>
	<div  v-if="this.$route.params.courseId>0&&this.$route.params.courseId<10">
	  <ul class="lefttab">
	    <li class="tabitem" v-for="(item, index) in grade" :class="{'active': index ==   minorSelected}" @click="change(index)">
	      {{item}}
	    </li>
	  </ul>
	  <ul class="tabtext">
	      <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
	  </ul>
    </div>
    <div  v-if="this.$route.params.courseId>9&&this.$route.params.courseId<13">
	  <ul class="lefttab">
	    <li class="tabitem" v-for="(item, index) in gao" :class="{'active': index ==   minorSelected}" @click="setMino(index)">
	      {{item}}
	    </li>
	  </ul>
	  <ul class="tabtext">
	      <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
	  </ul>
    </div>
   	<div  v-if="this.$route.params.courseId==13">
   		<ul class="lefttab">
   		  <li class="tabitem" v-for="(item, index) in xuanxiu" :class="{'active': index == minorSelected}" @click="Minor(index)">
   		    {{item}}
   		  </li>
   		</ul>
   		<ul class="tabtext">
   		    <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
   		</ul>
   	</div>
   	<div  v-if="this.$route.params.courseId==14">
   	  <ul class="lefttab">
   	    <li class="tabitem" v-for="(item, index) in xuanxiu" :class="{'active': index ==   minorSelected}" @click="setge(index)">
   	      {{item}}
   	    </li>
   	  </ul>
   	  <ul class="tabtext">
   	      <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
   	  </ul>
       </div>
       <div  v-if="this.$route.params.courseId==15">
   	  <ul class="lefttab">
   	    <li class="tabitem" v-for="(item, index) in xuanxiu" :class="{'active': index ==   minorSelected}" @click="sette(index)">
   	      {{item}}
   	    </li>
   	  </ul>
   	  <ul class="tabtext">
   	      <li  class="textitem" v-for="(item, index) in gradeb" @click="getZhuanti(item)">{{item.specialName}}</li>
   	  </ul>
       </div>
	
	
    </div>
</template>
<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import {mapState} from 'vuex'
import {
  SET_CURRENT_SOURCE,
  SET_READ_BOOK
} from '@/store/mutationsType'

export default {
	data () {
	  return {
	    isFollowed: false,
	    backStep: -1,
	    selected: "1",
	    page: 1,
	    minorSelected: 0,
	    you: ["幼小班", "幼中班", "幼大班"],
	    grade: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级" ,"七年级", "八年级", "九年级"], 
	    gao: ["高一", "高二", "高三"], 
	    xuanxiu: ["留守儿童", "隔代教育", "特殊教育"],
	    gradeb: [],
	    select: ["幼儿园", "中小学", "高中", "选修课程", "选修课程", "选修课程"],
	  }
	},
	created () {
		Indicator.open()
		api.getGrade (this.$route.params.courseId).then(response => {
		  this.gradeb = response.data.data
		  Indicator.close()
		}, err => {
		  console.log(err)
		})

		if(this.$route.params.courseId==14) {
			this.minorSelected = 1
		}

		if(this.$route.params.courseId==15) {
			this.minorSelected = 2
		}

		if(this.$route.params.courseId>9&&this.$route.params.courseId<13) {
			this.minorSelected = this.$route.params.courseId - 10
		}

		if(this.$route.params.courseId>0&&this.$route.params.courseId<10) {
			this.minorSelected = this.$route.params.courseId - 1
		}

		if(this.$route.params.courseId>-4&&this.$route.params.courseId<0) {
			this.minorSelected = this.$route.params.courseId + 3
		}
	},
	methods: {
	  getZhuanti (item) {
	    // 只记录从不是搜索结果中进入书本详情的路径，不然会出现死循环
	    // if(this.$route.path.indexOf('/search') === -1){
	    //     this.$store.commit('setPrePath', this.$route.fullPath);
	    // } 
	    this.$store.commit(SET_READ_BOOK, item.specialName)
	    this.$router.push('/zhuanti/' + item.id)

	  },
	  getGrade (page) {
	    Indicator.open('加载中')
	    api.getGrade (page).then(response => {
	      Indicator.close()
	      this.gradeb = response.data.data
	    }).catch(err => {
	      console.log(err)
	    })
	  },
	  setMinor (index) {
	  	this.minorSelected = index + 3
	    this.page = index
	    Indicator.open('加载中')
	    this.getGrade (this.page)
	    Indicator.close()
	  },
	  change (index) {
	  	this.minorSelected = index
	  	this.page = index + 1
	  	Indicator.open('加载中')
	  	this.getGrade (this.page)
	  	Indicator.close()
	  },
	  setMino (index) {
	  	this.minorSelected = index
	    this.page = index + 10
	    Indicator.open('加载中')
	    this.getGrade (this.page)
	    Indicator.close()
	  },
	  Minor (index) {
	  	this.minorSelected = index
	    this.page = index + 13
	    Indicator.open('加载中')
	    this.getGrade (this.page)
	    Indicator.close()
	  },
	  setge (index) {
	  	this.minorSelected = index
	  	this.page = index + 13
	  	Indicator.open('加载中')
	  	this.getGrade (this.page)
	  	Indicator.close()
	  },
	  sette (index) {
	  	this.minorSelected = index
	  	this.page = index + 13
	  	Indicator.open('加载中')
	  	this.getGrade (this.page)
	  	Indicator.close()
	  }
	}
}
</script>
<style scoped>
     .elective{
     	font-family: "Helvetica Neue",Helvetica,sans-serif;
     }
    .header{
    	background: #fff;
    	color:#000;
    	border-bottom: 1px solid #ebeff5;
    }
    .active {
      color: #5dc5c6;
    }
    .lefttab{
    	 width: 4.35rem;
    	 background: #f8f8f8;
    	 position: absolute;
    	 top: 9.5rem;
    	 left: 0;
    }
    .tabitem{
    	height: 1.5rem;
    	line-height: 1.5rem;
    	font-size: 12px;
    	color:#989898;
    	padding-top:0.4rem;
    	text-align: center;
    	width:4.35rem;
    	}
    .active {
      color: #5dc5c6;
      background:#fff;
    }
    .tabtext{
    	margin-left: 4.35rem;
    	padding-left: 0.5rem;
    	margin-top:0.1rem;
    }
    .textitem{
    	border-bottom: 1px solid #f8f8f8;
    	line-height: 2rem;
    	height: 2rem;
    	font-size: 14px;
    	color: #727272;
    }
    .blue{
    	color:#5dc5c6;
    }
    .img{
    	height:7.5rem;
    	width: 100%;
    	margin-top: 2rem;
    }
</style>