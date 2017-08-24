<template>
  <div class="wrapper">
      <mt-header fixed title="" class="header">
          <router-link to="/" slot="left">
              <mt-button icon="back" class="white"></mt-button>
           </router-link>
      </mt-header>
      
      <div >
            <video controls="controls" :src="videoSrc" class="video"></video>                  
      </div>   

      
  </div>

</template>

<script>
import api from '@/api/api'

export default {
  data() {
      return {
           videoSrc: ''
      }
  },
  computed: {
    
  },
  mounted() {
         api.getZhibodetail (this.$route.params.url).then(response => {
           this.videoSrc = response.data.data.replay
           console.log(response.data.data.replay)
         }, err => {
           console.log(err)
         })
         
  },
  created() {
        
  },
  methods: {
    
  }

}
</script>

<style scoped>
  .video{
    position:fixed;
    left: 0;
    bottom:10px;

  }
  .header{
    background:rgba(254, 254, 254, 0.2);
  }
  .white{
    color:#000;
  }
</style>

