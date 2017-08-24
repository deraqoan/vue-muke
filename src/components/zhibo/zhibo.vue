<template>
  <div class="zhibo">
    <ul class="select-bar">
      <v-touch tag="li" :class="{'active': index === minorSelected}" :key="index" v-for="(item, index) in gory" @tap="setMinor(index)">{{item.name}}</v-touch>
    </ul>
   <mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
    <ul class="video-list">
      <li @click="getVideo(item)" v-for="(item, index) in course" >
        <div class="thumbnail">
            <div class="live start" v-if="intervel[index]"></div>
            <div class="live end" v-if="!intervel[index]"></div>
            <div class="interval" v-if="intervel[index]">
              {{intervel[index]}}</div>
            <img :src="item.url" class="main">
            <div class="number"><span>报名人数 {{item.count}}</span></div>
        </div>
        <span class="badgo" v-html="item.title"></span>
        <mt-cell :title="item.date" class="bottom">
          <img slot="icon" src="../../assets/time.png" width="15" height="15">
        </mt-cell>
        <mt-cell :title="item.name" class="bottom">
          <img slot="icon" src="../../assets/user.png" width="15" height="15">
        </mt-cell>
        
        </li>
    </ul>
   </mt-loadmore>

  </div>
</template>

<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
  created() {
    

    api.getZhibogory().then(response => {
      this.gory = response.data.data
      this.gory.unshift({"id":0,"name":"全部"})
    }).catch(err => {
      console.log(err)
    })

    api.getZhiboByCat (this.page).then(response => {
      this.course = response.data.data
      this.play()
    }).catch(err => {
      console.log(err)
    })

    
  },
  data() {
    return {
      gory: [],
      course: null,
      page: 0,
      minorSelected: 0,
      currentPage: 1,
      allLoaded: false,
      end: '',
      time: [],
      intervel: [],
      after: []
    }
  },
  methods: {
    getZhiboByCat (page) {
      Indicator.open('加载中')
      api.getZhiboByCat (page).then(response => {
        Indicator.close()
        this.course = response.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    setMinor (index) {
      this.minorSelected = index
      this.page = index 
      Indicator.open('加载中')
      this.getZhiboByCat (this.page)
      Indicator.close()
    },
    loadTop () {
      // 加载更多数据
      this.getZhiboByCat (this.page)
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      let that = this
      Indicator.open('加载中')
      api.getZhiboByCat (this.page + 1).then(response => {
        that.course = [...that.course, ...response.data.data]
        that.page++
        Indicator.close()
      }).catch(err => {
        console.log(err)
      })
      this.$refs.loadmore.onBottomLoaded()
    },
    getVideo (item) {
      this.$router.push('/zhibodetail/' + item.id)
    },
    getTime () {
         this.intervel = []
      for(let i = 0; i<this.course.length; i++){
        this.$set(this.intervel, null)
        let arr = this.course[i].beginDate.match(/\d+/g)
        let endDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
        let now = new Date(); 
        let leftTime=endDate.getTime()-now.getTime(); 
        let leftsecond = parseInt(leftTime/1000); 
        let day1=Math.floor(leftsecond/(60*60*24)); 
        let hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
        let minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
        let second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
        if(leftTime<0){
          this.end = ''
        } 
        else{
        this.end = day1 + '天' + hour + '时' + minute + '分' + second + '秒'
        }
        this.intervel.push(this.end)
      }

    },
    play() {
      
      setInterval(this.getTime, 1000)
    }
  }
}
</script>

<style scoped>
.select-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 2rem;
  width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
  background:#fff;
  border-bottom: 1px solid #f2f2f2;
}

.select-bar li {
  flex-shrink: 0;
  line-height: 2rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  font-size: 0.7rem;
}
.active {
  color: #5dc5c6;
}
.number{
  position: absolute;
  margin-top: -2.20rem;
  width: 100%;
  height: 1rem;
  font-weight: 500;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.0), rgba(0, 0, 0, 0.4) 2rem);
  color: white;
  padding: 1rem 0 0 1rem;
  font-size: 0.6rem;
}
.live{
  position: absolute;
  margin-top: 0;
  left: 0;
  height:5rem;
  width:5rem;
  
}
.start{
  background: url(../../assets/baominzhong.png) no-repeat center;
  background-size: contain;
}
.end{
  background: url(../../assets/jieshu.png) no-repeat center;
  background-size: contain;
}
.interval{
  position: absolute;
  margin-top: 20px;
  right: 9px;
  height: 1rem;
  border-radius: 9px;
  background-color: rgba(81, 96, 102, 0.51);
  color: white;
}
.zhibo{
  background: #eee;
  font-family: "Helvetica Neue",Helvetica,sans-serif;
}
.video-list li{
  background-color: white;
  border: 1px solid #eeeeee;
  margin: 0 0 0.3rem 0;
  height:12.2rem;
  border-radius: 0.3rem;
}
.thumbnail img{
  width:100%;
  height: 8.5rem;
  border-radius: 0.3rem;
}
.videoMsg{
  margin-left: 0.7rem;
  position: absolute;
}
.badgo{
  font-size: 0.8rem;
  color: black;
  margin-left: 0.7rem;
  font-weight: 500;
}
.mint-cell {
  font-size: 12px;
  min-height:0.8rem;
  color: #515151;
}
.mint-cell-label {
  font-size: 12px;
}
.pic{
  display:flex;
  height: 1rem;
  font-size: 0.5rem;
  color: #515151;
  align-content: center;
  align-items: center;
}
.icon{
  height:20px;
  width:20px;
  position:absolute;
  margin-right: 0.2rem;

}

.hot{
  display:block;
  height:3rem;
  width:3rem;
  position: absolute;
  margin-top:-3px;
  margin-left:-3px;
  background-size: contain;
 }

</style>