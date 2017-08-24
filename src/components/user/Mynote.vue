<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="我的笔记">
      <router-link to="/" slot="left">
          <mt-button icon="back" class="blue"></mt-button>
       </router-link>
    </mt-header>[文件]

    <mt-navbar class="page-part tab"  v-model="selected" :value="selected">
      <mt-tab-item id="1">我的笔记</mt-tab-item>
      <mt-tab-item id="2">采集笔记</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="container">
    	<mt-tab-container-item id="1">
          <div class="kong"  v-if="!mynote">
            <img src="../../assets/epmty.png">
            <h1>暂无相关笔记</h1>
          </div>
    	  <mt-cell class="nick" :title="user.name" v-if="mynote">
    	      <span>
    	      	<img slot="icon" src="../../assets/success.png" width="30" height="30">
    	      </span>
    	    <img slot="icon" src="../../assets/collect.png" width="50" height="50" class="radiu">
    	  </mt-cell>
    	</mt-tab-container-item>
    		  <mt-tab-container-item id="2" class="child">
    		    <div class="kong"  v-if="!adoptnote">
                  <img src="../../assets/epmty.png">
                  <h1>暂无相关笔记</h1>
                </div>
    		  </mt-tab-container-item>
    </mt-tab-container>
   
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
	      mynote: null,
          adoptnote: null
	    }
	  },
    created () {
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
.kong{
  position:fixed;
  top:30%;
  left:50%;
  transform:translateX(-50%);
}
.kong img{
  width:10rem;
  height: 10rem;
}
.kong h1{
  color:#ccc;
}
</style>