<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="六年级">
      <router-link to="/" slot="left">
          <mt-button icon="back" class="blue"></mt-button>
       </router-link>
    </mt-header>
    <ul class="container">
      <li class="nick" v-for="(item, index) in special" @click="getZhuanti(item)">
          <span class="percent">{{item.percent}}%</span>
        <span class="title">{{item.specialName}}</span>
        <span class="blue start">
            开始学习
        </span>
      </li>
  </ul>
   </div>
</template>

<script>
    import {
      SET_BACK_POSITION,
      SET_READ_BOOK
    } from '@/store/mutationsType'
    import { Toast, Indicator } from 'mint-ui'
    import api from '@/api/api'

	export default {
	  data() {
	    return {
	      special: []
	    }
	  },
      created () {
        Indicator.open()
        api.getGrade (6).then(response => {
          this.special = response.data.data
          Indicator.close()
        }, err => {
          console.log(err)
        })

        this.$store.commit(SET_BACK_POSITION, '我的')
      },
	  methods: {
	  	toast () {
          Toast({
            message: '管理员角色不能添加其他账号',
            duration: 1000
          });
	  	},
        getZhuanti (item) {
          this.$store.commit(SET_READ_BOOK, item.specialName)
          this.$router.push('/zhuanti/' + item.id)

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
	color:#2eacbb;
}
.container{
	margin-top:2.1rem;
	left:0;
	width:100%;
	position:absolute;
}
.nick{
	border-bottom: 1px solid #e8e8e8;
    padding: 0 0.5rem;
    height: 3.175rem;
    line-height: 3.175rem;
}
.percent{
    width: 2.1rem;
    height: 2.1rem;
    text-align: center;
    line-height: 2.1rem;
    display: inline-block;
    color: #696969;
    font-size: 11px;
    font-style: normal;
    background:url(../../assets/bixiu@3x.png);
    background-size: contain;
}
.title{
    color: #252525;
    font-size: 14px;
}
.start{
    float: right;
    line-height: 3.1rem;
    text-align: center;
}
</style>