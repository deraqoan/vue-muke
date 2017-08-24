
<template>
  <div class="video">
    <mt-header fixed title="" class="header">
        <router-link to="/" slot="left">
            <mt-button icon="back" class="white"></mt-button>
         </router-link>
    </mt-header>
    <div id="instructions">

      <video controls="controls" :src="videoSrc" class="video"></video>
    </div>
    <div class="desc">
    <mt-navbar class="page-part tab"  v-model="selected" :value="selected">
      <mt-tab-item id="1">详情</mt-tab-item>
      <mt-tab-item id="2">笔记</mt-tab-item>
      <mt-tab-item id="3">课程列表</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected" :swipeable="false" :value="selected" class="contianer">
      <mt-tab-container-item id="1">
        <div class="tab1_title">
          <h6 class="type">{{video.phase}}年级</h6>
          <h5 class="video-title">{{video.title}}</h5>
        </div>
        <div class="tab1_title">
          <h6 class="type">课程介绍</h6>
          <pre class="video-title">{{video.desc}}</pre>
        </div>
        <div class="next">
          <div class="tab3_title">
            <h6 class="type">下一节</h6>
          </div>
          <div class="post">
            <img :src="video.thumbnail" class="img">
            <div class="pull-right">
            <h5 class="titlen">{{video.courseName}}</h5>
            <div class="data">
              <div class='watch icon'><span class="badg" v-html="video.totalPlayNum"></span></div>
              <div class='zan icon'><span class="badg" v-html="video.reviewNum"></span></div>
            </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="pinglun" v-for="(item, index) in review">
          <div class="hang">
            <img :src="item.image" class="touxiang" v-if="item.image">
            <img v-if="!item.image" src="../../assets/default.png" class="touxiang">
            <span v-html="item.name" class="nameo"></span>
            <span v-html="item.date" class="date"></span>
          </div>
          <span v-html="item.content" class="content"></span>
          <div class="get">
            <div class='watch icon'><span class="badg" v-html="item.isAdopt"></span></div>
            <div class='zan icon'><span class="badg" v-html="item.isParised"></span></div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
          <span class="htitle" v-html="$store.state.specialid.specialName"></span>
          <ul class="history-list">
            <li tag="li" v-for="(item, index) in $store.state.specialid.courses" :key="index"  @click="selectItem(item)">
            <span class="icon">
              <img src="../../assets/bofangshu@3x.png">
            </span>
            <span :class="{'red': item.courseId == mark}">{{item.courseName}}</span></li>
          </ul>
      </mt-tab-container-item>
  </mt-tab-container>
</div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import api from '@/api/api'
  import {mapState} from 'vuex'
  import {
    SET_CURRENT_SOURCE,
    SET_CURRENT_SPECIALID
  } from '@/store/mutationsType'

  export default {
    data() {
      return {
        selected: "1",
        video: [],
        review: [],
        videoSrc: [],
        page: 1,
        CourseList: null,
        specialName: null,
        id: null,
        mark: 1,
        back: true
      }
    },
     created () {
      Indicator.open()
      api.getCourseInfo (this.$route.params.keId).then(response => {
        this.video = response.data.data
        this.videoSrc = response.data.data.url
        Indicator.close()
      }, err => {
        console.log(err)
      })
      this.mark = this.$route.params.keId
      console.log(this.mark)
      api.getNoteList (this.$route.params.keId, this.page).then(response => {
        this.review = response.data.data
        Indicator.close()
      }, err => {
        console.log(err)
      })



    },
    methods: {
      selectItem(item) {
        Indicator.open()
        api.getCourseInfo (item.courseId).then(response => {
          this.video = response.data.data
          this.videoSrc = response.data.data.url
          Indicator.close()
        }, err => {
          console.log(err)
        })
        this.mark = item.courseId
        api.getNoteList (item.courseId, this.page).then(response => {
          this.review = response.data.data
          Indicator.close()
        }, err => {
          console.log(err)
        })
        
      }
    }
    
  }
</script>
<style scoped>
.header{
  background:rgba(254, 254, 254, 0.2);
}
.white{
  color:#fff;
}
.red{
  color:red;
}
.desc{
  position:absolute;
  width:100%;
  left:0;
  top:9.5rem;
  background-color: white;
}
.tab{
  height: 2rem;
  border-bottom: 2px solid #ebeff5;
}
.container{
  margin-top: 10.7rem;
  padding-bottom: 2rem;
  position:absolute;
}
video {
  width: 100%;
  height: 30%;
  background-color: black;
}
.type{
  font-size: 12px;
  color: #969696;
  margin-top: 0.5rem;
}
.tab1_title {
  border-bottom: 1px solid #ebebeb;
  padding: 0 0.725rem;
  display: block;
}
.tab3_title {
  border-bottom: 1px solid #ebebeb;
  padding: 0 0.725rem;
  display: block;
  height:1.45rem;
}
.video-title {
  font-size: 14px;
  line-height: 14px;
  font-weight: normal;
  margin-top: -1rem;
  margin-bottom:0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hang{
  height: 1.75rem;
  display: flex;
  margin-bottom: 0.3rem;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-right: 1rem;
}
.touxiang{
  height:30px;
  width:30px;
  border-radius: 50%;

}
.nameo{
  margin-left: 0.3rem;
  font-size: 14px;
  align-self: center;
  color: #999999;
}
.date{
  font-size: 12px;
  color: #999999;
  position: absolute;
  right: 0;
  padding-right: 0.3rem;
}
.content{
  display: flex;
  justify-content: flex-start;
  padding-right: 1rem;
  font-size: 13px;
  color: #000;
}
.pinglun{
  border-top: 1px solid #ebeff5;
  padding:0.4rem 0 0.1rem 0.8rem;
  border-bottom: 5px solid #eee;
}
.htitle{
  font-size: 15px;
  color: #3c4a54;
  height: 45px;
  line-height: 2rem;
  padding: 0 0.5rem;
}
.get{
  height: 1.25rem;
  display: flex;
  width:3rem;
  margin-left:11rem;
  margin-bottom: 0.3rem;
  justify-content: space-between;;
  align-items: center;
  position: relative;
  padding-right: 1rem;
}
.icon {
  line-height: 2rem;
}
.icon img{
  margin-top:0.4rem;
  height:0.8rem;
}
.history-list{
  background:#fff;
  width:100%;
  border-top: 1px solid #f2f2f2;
}
.history-list li {
  line-height: 2rem;
  font-size: 14px;
  width:100%;
  padding-left:0.5rem;
  border-bottom: 1px solid #f2f2f2;
  color: #6d6d72;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#instructions{ 
  width: 100%;
  text-align: center;
  position:fixed;
  top:0;
  left:50%;
  background:#000;
  transform: translateX(-50%);
  
}
.next{
  border-top: 15px solid #eee;
}
.img{
  float: left;
  width: 6.825rem;
  height: 3.875rem;
}
.post{
    border-bottom: 1px solid #e8e8e8;
    padding: 0.5rem 0.35rem;
    height: 3.875rem;

}
.pull-right{
  float:right;
  width: 8rem;
}
.titlen{
  font-size: 13px;
  font-weight: normal;
  margin-top: 0.25rem;
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
 margin-top:-0.5rem;
 position:absolute;
}
.data{
 width: 5rem;
 margin-top: -0.4rem;
 display: flex;
 justify-content: space-between;
}
</style>