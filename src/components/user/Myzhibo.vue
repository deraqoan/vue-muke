<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="我的直播">
      <router-link to="/" slot="left">
          <mt-button icon="back" class="blue"></mt-button>
       </router-link>
    </mt-header>
          <div class="kong"  v-if="!zhibo">
            <img src="../../assets/epmty.png">
            <h1>暂无相关直播</h1>
          </div>
   </div>
</template>

<script>
  import { SET_BACK_POSITION } from '@/store/mutationsType'

	export default {
	  data() {
	    return {
	      zhibo: null
	    }
	  },
    created () {
    this.$store.commit(SET_BACK_POSITION, '我的')
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
	margin-top:4.3rem;
	left:0;
	width:100%;
	
	position:absolute;
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