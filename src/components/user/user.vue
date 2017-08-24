<template>
  <div class="zhibo"> 
    <mt-loadmore class="loadmore" :auto-fill="false" ref="loadmore">
    <mt-cell class="nick">
      <div class="name"  @click="change()">
        <span class="number">{{user.name}}</span>
        <div class="lv"><img slot="icon" src="../../assets/level.png" width="15" height="15" class="level"><span class="orange">秀才Lv.{{user.level}}</span></div>
        <p class="sign">{{user.sign}}</p>
      </div>
      <span><img slot="icon" src="../../assets/sign.png" width="30" height="30"></span>
      <img slot="icon" src="../../assets/collect.png" width="50" height="50" class="radiu">

    </mt-cell>
    <mt-navbar>
      <mt-tab-item id="1">关注<span class="text">&nbsp;{{user.contention}}</span></mt-tab-item>
      <mt-tab-item id="2">粉丝<span class="text">&nbsp;{{user.fans}}</span></mt-tab-item>
      <mt-tab-item id="3">积分<span class="text">&nbsp;{{user.integral}}</span></mt-tab-item>
    </mt-navbar>

    <div class="container">
      <mt-cell title="账号管理" class="bottom" to="/manage" is-link>
        <img slot="icon" src="../../assets/manage.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="我的课程" is-link class="bottom" to="/mycourse" is-link>
        <img slot="icon" src="../../assets/kecheng.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="我的成绩" is-link class="bottom">
        <img slot="icon" src="../../assets/grate.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="我的笔记" is-link class="bottom" to="/mynote" is-link> 
          <span>{{user.notes}}</span>
        <img slot="icon" src="../../assets/note.png" width="24" height="24">
      </mt-cell>
    </div>
    <div class="container">
      <mt-cell title="我的直播" is-link class="bottom" to="/myzhibo" is-link> 
          <span>{{user.activities}}</span>
        <img slot="icon" src="../../assets/watch.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="我的收藏" is-link class="bottom">
          <span>{{user.collects}}</span>
        <img slot="icon" src="../../assets/collect.png" width="24" height="24">
      </mt-cell>
    </div>
    <div class="container">
      <mt-cell title="设置" is-link class="bottom">
        <img slot="icon" src="../../assets/shezhi.png" width="24" height="24">
      </mt-cell>
    </div>
</mt-loadmore>

  
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      page: '2',
      minorSelected: 0,
    }
  },
  methods: {
    change() {
      this.$router.push({ path: '/Message' })
    },
    manage() {
      this.$router.push({ path: '/manage' })
    }
  },
  computed: mapState({
    user () {
      return this.$store.state.user
    }
  })
}
</script>

<style scoped>

.container {
  margin:10px 0;
}
.nick{
  border-bottom: 1px solid #ebeff5;
  height:70px;
  
}
.name{
  left:70px;
  position:absolute;
  top:20px;
}
.number{
  color:black;
  weight:500;
}
.sign{
  margin-top:3px;
  font-size: 8px;
}
.radiu {
  border-radius: 50%;
  margin: 0.5rem 0;

}
.level{
  border-radius: 50%;
  margin:-2px 0 0 2px;
}
.lv{
  border-radius: 20px;
  border:1px solid #f5934e;
  height:16px;
  width:65px;
  position:absolute;
  top:-2px;
  left:55px;
  padding: 0;
}
.orange{
  color:#f5934e;
  font-size: 8px;
  line-height: 14px;
  position:absolute;
  top:0;
}
.text {
  color:#5dc5c6;
}
.user{
  background: #ebeff5;
  width:100%;
  position:fixed;
  left:0;
  margin-top:1.9rem;
  height:1000rem;
}

</style>