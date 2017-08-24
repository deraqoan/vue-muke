<template>
  <div class="zhibo"> 
    <mt-header class="header" fixed title="搜索结果">
      <router-link to="/sousuo" slot="left">
          <mt-button icon="back" class="blue"></mt-button>
       </router-link>
           <mt-button @click="see()" icon="field-warning" slot="right" class="blue"></mt-button>
    </mt-header>
    
    <div class="tab-container">
      <div class="kong"  v-if="!searchResult">
        <img src="../../assets/epmty.png">
        <h1>暂无相关{{kong}}</h1>
      </div>
      <div class="warn"  v-if="warning">
        <span>课程搜索结果只展示你的必修课与解锁年级的结果哦~若想搜索到更多的结果，快去解锁新的选修课吧</span>
      </div>
      <li v-html="item.title" class="top" v-for="(item, index) in searchResult" @click="getVideo(item)">
      </li>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import util from '@/utils/util'
import {mapState} from 'vuex'
import {
  Indicator
} from 'mint-ui'

export default {
  
  data() {
    return {
      searchResult: [],
      warning: false,
      type: null,
      page: null,
      count: null,
      kong: '课程'
    }
  },
  created () {
    this.type = 1
    if(this.$store.state.source==2) {
      this.type = 4
      this.kong = '直播'
    }
    if(this.$store.state.source==3) {
      this.type = 5
      this.kong = '资源'
    }
    this.page = 1
    console.log(this.$store.state.source)
    console.log(this.type)
    console.log(this.$route.params.key)
    console.log(this.page)
    api.fuzzySearch(this.$route.params.key, this.type).then(response => {
      this.searchResult = response.data.data
      console.log(response.data.data)
      Indicator.close()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    see () {
      this.warning =! this.warning
    },
    getVideo (item) {
      this.$router.push('/video/' + item.id)
    }

    
  },
  computed:{}
    
}
</script>

<style scoped>
.header{
  background: #fff;
  color:#000;
  border-bottom: 1px solid #ebeff5;
}
.blue{
  color:#5dc5c6;
}
.tab-container{
  width:100%;
  position:absolute;
  top:40px;
  left:0;
}
.top{
  border-bottom: 1px solid #f6f6f6;
  height:2rem;
  line-height: 2rem;
  padding-left: 1rem; 
}
.warn{
  width:50%;
  position:fixed;
  top:40px;
  border: 1px solid #f6f6f6;
  right:0;
  z-index: 100;
  background:#fff;
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