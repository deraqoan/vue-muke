<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="账号管理">
      <router-link to="/" slot="left">
          <mt-button icon="back" class="blue"></mt-button>
       </router-link>
    </mt-header>
    <mt-navbar class="page-part tab"  v-model="selected" :value="selected">
      <mt-tab-item id="1">家长账号</mt-tab-item>
      <mt-tab-item id="2">孩子账号</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="container">
    	<mt-tab-container-item id="1">
    	  <mt-cell class="nick" :title="user.name">
    	      <span>
    	      	<img slot="icon" src="../../assets/success.png" width="30" height="30">
    	      </span>
    	    <img slot="icon" src="../../assets/collect.png" width="50" height="50" class="radiu">
    	  </mt-cell>
    	  <div class="child">
    	  	<br>
    	  	<span class="blue"  @click="toast()">+添加账号</span>
    	  	<p class="shuoming">(长按可以删除账号)</p>
    	  </div>
    	</mt-tab-container-item>
    		  <mt-tab-container-item id="2" class="child">
    		    <br>
    		    <span class="blue" @click="toast()">+添加账号</span>
    		    <p class="shuoming">(长按可以删除账号)</p>

    		  </mt-tab-container-item>
    </mt-tab-container>
    <div class="foot">
    	<p class="child">如信息错误请联系客服修改</p>
    	<p class="child">客服电话<a class="blue" href="tel:18913131393">189-1313-1393</a></p>
    </div>
   </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui'
    import { SET_BACK_POSITION } from '@/store/mutationsType'

	export default {
	  data() {
	    return {
	      selected: "1",
	      video: [],
	      review: []
	    }
	  },
	  methods: {
	  	toast () {
          Toast({
            message: '管理员角色不能添加其他账号',
            duration: 1000
          });
	  	}
	  },
    created() {
      this.$store.commit(SET_BACK_POSITION, '我的')
    },
	  computed: mapState({
	    user () {
	      return this.$store.state.user
	    }
	  })
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
.tab{
	margin-top:2rem;
	width: 100%;
    left:0;
    height: 2rem;
    line-height: 2rem;
	position:absolute;
	border-bottom: 2px solid #ebeff5;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 1px solid #2dafb3;
    color: #2dafb3;
    line-height: 2rem;
    width:5rem;
}
.container{
	margin-top:4.3rem;
	left:0;
	width:100%;
	
	position:absolute;
}
.child{
	text-align: center;
}
.nick{
	width:100%;
	border-bottom: 1px solid #ebeff5;
}
.shuoming{
	color:#8e8e8e;
	font-size: 0.5rem;
}
.foot{
	position: fixed;
	bottom: 10px;
	left:0;
	width: 100%;
	font-size: 0.5rem;
}
</style>