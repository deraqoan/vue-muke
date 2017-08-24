<template>
  <div class="info"> 
    <mt-header class="header" fixed title="我的消息">
      <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
       </router-link>
    </mt-header>
    <div class="tab-container">
    <mt-cell class="nick">
      <div class="name">
        <span class="number">赞</span>
        <p class="sign">暂无点赞</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    <mt-cell class="nick">
      <div class="name">
        <span class="number">采集</span>
        <p class="sign">暂无采集</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    <mt-cell class="nick">
      <div class="name">
        <span class="number">评论</span>
        <p class="sign">暂无评论</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    <mt-cell class="nick">
      <div class="name">
        <span class="number">私信</span>
        <p class="sign">暂无私信</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    <mt-cell class="nick">
      <div class="name">
        <span class="number">粉丝</span>
        <p class="sign">暂无粉丝</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    <mt-cell class="nick">
      <div class="name">
        <span class="number">通知</span>
        <p class="sign">暂无通知</p>
      </div>
      <img slot="icon" :src="user.image" width="40" height="40">
    </mt-cell>
    
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { MessageBox } from 'mint-ui'
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
  created() {
    this.$store.commit(SET_BACK_POSITION, '我的')
  },
  data() {
    return {
      popupVisible :true,
      page: '2',
      minorSelected: 0,
      sign :false,
      picker:'',
      isA: false,
      isF: false,
      img: false,
      imageUrl: ''
    }
  },
  computed:
    mapState({
      user () {
        return this.$store.state.user
      }
  })
}
</script>

<style scoped>
.info{
  background:#ccc;
}
.header{
  background: #fff;
  color:#5dc5c6;
  border-bottom: 1px solid #ebeff5;
}
.name{
  left:60px;
  position:absolute;
  top:10px;
}
.number{
  color:black;
  weight:500;
}
.sign{
  margin-top:3px;
  font-size: 8px;
}
.nick{
  margin-top:10px;
  height:70px;
}
.tab-container{
  width:100%;
  position:fixed;
  top:40px;
  left:0;
}


</style>