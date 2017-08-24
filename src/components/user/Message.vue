<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="个人资料">
      <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
       </router-link>
       <router-link to="/" slot="right">
           <mt-button @click="save()">保存</mt-button>
        </router-link>
    </mt-header>
    <div class="tab-container">
    <mt-cell title="头像" class="top">
      <img slot="icon" src="../../assets/image.png" width="24" height="24">
      <span @click="getImg()"><img slot="icon" :src="user.image" width="50" height="50" class="radiu"></span>
    </mt-cell>
    <div v-if="img" class="contan"><input id="id" type="file" /></div>
    <mt-cell title="昵称" class="bottom">
      <span @click="getNick()">{{user.nickname}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/nick.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="真实姓名" class="bottom">
      <span  @click="getName()">{{user.name}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/user.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="性别" class="bottom"> 
        <span @click="getF()">{{user.fende}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/fende.png" width="24" height="24">
    </mt-cell>
    <mt-popup v-model="isF" popup-transition="popup-fade" class="radio">
    <mt-radio
      title="选择性别"
      v-model="user.fende"
      :options="['女', '男']">
    </mt-radio>
    </mt-popup>
    <mt-cell title="出生日期" class="bottom">
      <span @click="openPicker">{{user.birth}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/birth.png" width="24" height="24">
    </mt-cell>
    <template>
      <mt-datetime-picker
        v-model="picker"
        type="date"
        ref="picker"
        @confirm="handleConfirm"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日">
      </mt-datetime-picker>
    </template>
    <mt-cell title="学历">
      <span @click="toggle()">{{user.education}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/education.png" width="24" height="24">
    </mt-cell>
    <mt-popup v-model="isA" popup-transition="popup-fade" class="radio">
    <mt-radio
      title="选择学历"
      v-model="user.education"
      :options="['博士及以上', '研究生', '本科', '大专', '中专', '高中生', '初中及以下']">
    </mt-radio>
    </mt-popup>
    <mt-cell title="手机号" is-link class="bottom">
      <span>{{user.phone}}</span>
      <img slot="icon" src="../../assets/phone.png" width="24" height="24">
    </mt-cell>
    
    <mt-cell title="个性签名" class="bottom">
      <span @click="getSign()">{{user.sign}}&nbsp;&nbsp;></span>
      <img slot="icon" src="../../assets/qian.png" width="24" height="24">
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
    this.value = this.$store.state.user.fende
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
      imageUrl: '',
    }
  },
  methods: {
    getImg() {
      this.img=!this.img
      console.log('eee')
    },
    toggle:function () {
      this.isA=!this.isA
      console.log(this.$store.state.user.education)
    },
    getName:function () {
      MessageBox.prompt('请输入姓名','').then(({ value, action }) => {
        this.$store.state.user.name = value
      })
      
    },
    getF:function () {
      this.isF=!this.isF
      console.log(this.$store.state.user.fende)
    },
    GMTToStr(time) {
      let date = new Date(time)
      let Str=date.getFullYear() + '年' +
      (date.getMonth() + 1) + '月' + 
      date.getDate() + '日' 
      return Str
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(value) {
      let DateTime=value
      let a=this.GMTToStr(DateTime)
      this.$store.state.user.birth = a
      console.log(this.$store.state.user.birth)
    },
    getNick() {
      MessageBox.prompt('请输入昵称','').then(({ value, action }) => {
        console.log(value)
        this.$store.state.user.nickname = value
      })
    },
    getSign() {
      MessageBox.prompt('请输入个性签名','').then(({ value, action }) => {
        console.log(value)
        this.$store.state.user.sign = value
      })
    },
    save() {
      console.log(this.$store.state.user.birth)
      console.log(this.$store.state.user.name)
      console.log(this.$store.state.user.nickname)
      console.log(this.$store.state.user.education)
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
.header{
  background: #fff;
  color:#5dc5c6;
  border-bottom: 1px solid #ebeff5;
}
.tab-container{
  width:100%;
  position:fixed;
  top:40px;
  left:0;
}
.radio{
  width:80%;
}
.radiu {
  border-radius: 50%;
  margin: 0.5rem 0;

}
.top{
  height:70px;
}


</style>