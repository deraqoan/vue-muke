<template>
  <div class="resourse">
    <ul class="select-bar">
    	<v-touch tag="li" @tap="setMinor(-1)" :class="{'active': -1 === minorSelected}">全部</v-touch>
    	<v-touch tag="li" :class="{'active': index === minorSelected}" v-for="(item, index) in gory" @tap="setMinor(index)" :key="index">{{item.name}}</v-touch>
    </ul>
   <mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
   	<ul class="video-list">
        <li @click="getVideo(item)" v-for="item in course" class="item">
           <div class="thumbnail">
               <span class="hot">开始学习</span>
               <img :src="item.thumbnail" class="img">
           </div>
           <div class="videoMsg">
             <p class="titleo">{{item.name}}</p>
             <div class="data">
               <div class='watch icon'><span class="badg" v-html="item.viewSum"></span></div>
               <div class='zan icon'><span class="badg" v-html="item.reviewSum"></span></div>
             </div>
           </div>
        </li>
   	</ul>
   </mt-loadmore>
  </div>
</template>

<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
  created() {
    api.getZhibogory().then(response => {
      this.gory = response.data.data
    }).catch(err => {
      console.log(err)
    })

    api.getCourseByCat (this.page).then(response => {
      this.course = response.data.data
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      gory: [],
      course: null,
      page: 2,
      minorSelected: -1,
      currentPage: 1,
      allLoaded: false,
    }
  },
  methods: {
    getCourseByCat (page) {
      Indicator.open('加载中')
      api.getCourseByCat (page).then(response => {
        Indicator.close()
        this.course = response.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    setMinor (index) {
      this.minorSelected = index
      this.page = index + 2
      Indicator.open('加载中')
      this.course = null
      this.getCourseByCat (this.page)
      Indicator.close()
    },
    loadTop () {
      // 加载更多数据
      this.getCourseByCat (this.page)
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      let that = this
      Indicator.open('加载中')
      api.getCourseByCat (this.page + 1).then(response => {
        that.course = [...that.course, ...response.data.data]
        that.page++
        Indicator.close()
      }).catch(err => {
        console.log(err)
      })
      this.$refs.loadmore.onBottomLoaded()
    },
    getVideo (item) {
      this.$router.push('/video/' + item.id)
    }
  }
}
</script>

<style scoped>
.select-bar {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: nowrap;
	height: 2rem;
	width: 100vw;
	overflow-x: auto;
	overflow-y: hidden;
	background:#fff;
	border-bottom: 1px solid #f2f2f2;
}

.select-bar li {
	flex-shrink: 0;
	line-height: 2rem;
	padding-left: 0.6rem;
	padding-right: 0.6rem;
	font-size: 0.7rem;
}

.active {
	color: #5dc5c6;
}
.resourse{
	background: #eee;
}
.video-list{
  left:0;
  width:100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding-left:0.2rem;
  padding-right:0.2rem;
  
 }
 .item{
  width: 44%;
  height: 7rem;
  float: left;
  background:#fff;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.425rem;
  border: 1px solid #d6d6d6;
  padding: 0.275rem 0.2rem;
  border-radius: 3px;
 }
 .img{
  width: 100%;
  height: 3.875rem;
  z-index: 1;
  border-top-right-radius: 0.1rem;
  border-top-left-radius: 0.1rem;
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
  position: relative;
 }
 .videoMsg{
  width: 90%;
  padding-right: 1rem;
 }
 .titleo{
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  margin-top: 0.5rem;
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
  margin-top: -0.4rem !important;
  display: flex;
  justify-content: space-between;
 }
</style>