
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
      <mt-tab-item id="2">评论</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected" :swipeable="false" :value="selected" class="contianer">
      <mt-tab-container-item id="1">
        <div class="tab1_title">
          <h6 class="type">{{video.type}}</h6>
          <h5 class="video-title">{{video.title}}</h5>
        </div>
        <div class="tab1_title">
          <h6 class="type">课程介绍</h6>
          <h5 class="video-title">{{video.description}}</h5>
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
  </mt-tab-container>
</div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import api from '@/api/api'
  import { SET_BACK_POSITION } from '@/store/mutationsType'

  export default {
    data() {
      return {
        selected: "1",
        video: [],
        review: [],
        videoSrc: [],
        page: 1
      }
    },
     created () {
      Indicator.open()
      api.getVideoByCat (this.$route.params.videoId).then(response => {
        this.video = response.data.data
        this.videoSrc = response.data.data.url
        console.log(response.data.data.url)
        Indicator.close()
      }, err => {
        console.log(err)
      })
      
      api.getReview (this.$route.params.videoId).then(response => {
        this.review = response.data.data
        Indicator.close()
      }, err => {
        console.log(err)
      })

       this.$store.commit(SET_BACK_POSITION, '资源库')

    },
    methods: {
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
  display: block;
  padding:0 0.5rem;
  height: 1.5rem;
  text-align: center;
  border: 1px solid #b47041;
  border-radius: 5px;
  color: #b47041;
  width:3rem;
  font-size: 0.5rem;
  line-height: 1.5rem;
  margin-top: 0.5rem;
}

.tab1_title {
  border-bottom: 1px solid #ebebeb;
  padding: 0 0.725rem;
  display: block;
}
.video-title {
  font-size: 14px;
  line-height: 14px;
  font-weight: normal;
  margin-top: -1rem;
  margin-bottom:0.8rem;
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
#instructions{ 
  width: 100%;
  text-align: center;
  position:fixed;
  top:0;
  left:50%;
  background:#000;
  transform: translateX(-50%);
  
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