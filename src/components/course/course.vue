<template>
  <div class="course">
    <div class="index-wrap">
        <transition-group tag='ul' class="slide" name="image">
          <li v-for="(item, index) in slides" :key="index"  v-show="index===nowIndex">
            <a>
                <img :src="item.path" class="slideimg">
            </a>
          </li>
        </transition-group>
        <div class="slide-pages">
          <span v-for="(item, index) in slides" @click="goto(index)" :key="index" v-bind:class="{'active':index===nowIndex}">
          </span>
        </div>
      </div>
      <div class="kecheng">
    <div class="other">
      <p class="ke">本年级课程</p>
      <span class="finish">已完成<span class="strong">0/7</span>个专题</span>
      <div class="video-list">
        <li class="container">
           <div class="pull-left">
               <div class="pName">
                 <i class="pIcon"></i>
                 <span class="fumu">家长姓名:</span>
                 <span class="strong">134240</span>
               
               </div>
               <div class="cName">
                 <i class="cIcon"></i>
                 <span>我的孩子:</span>
                 <span class="strong">默认孩子</span>
               </div>
           </div>
           <div class="pull-right">
             <div tag="div" class="toCourse"  @click="getCourse(6)">
                   <div class="bg"></div>
                   <p class="key">进入课程列表></p>
             </div>
           </div>
        </li>
      </div>
    </div>
    <div class="other">
      <p class="object">智能学习</p>
      <v-touch tag="li" class="blue" @tap="setMinor">换一换</v-touch>
      <div class="video-list">
        <li @click="selectItem(item)" v-for="item in course" class="item">
           <div class="thumbnail">
               <span class="hot">开始学习</span>
               <img :src="item.thumbnail" class="img">
           </div>
           <div class="videoMsg">
             <h3 class="titleo">{{item.title}}</h3>
             <div class="data">
               <div class='watch icon'><span class="badg" v-html="item.viewSum"></span></div>
               <div class='zan icon'><span class="badg" v-html="item.reviewSum"></span></div>
             </div>
           </div>
        </li>
      </div>
    </div>
    <div class="other">
      <p class="object">其他年级课程</p>
      <div class="zhuanti">
        <div class="type" @click="getCourse(-3)">
          <img  src="../../assets/kecheng_you_icon@2x.png">
          <div class="grade">幼儿园</div>
          <div class="title">3个年级</div>
          <div class="title">400+课程</div>
        </div>
        <div class="type" @click="getCourse(1)">
          <img  src="../../assets/kecheng_zhong_icon@2x.png">
          <div class="grade">中小学</div>
          <div class="title">9个年级</div>
          <div class="title">800+课程</div>
        </div>
        <div class="type" @click="getCourse(10)">
          <img  src="../../assets/kecheng_gao_icon@2x.png">
          <div class="grade">高中</div>
          <div class="title">3个年级</div>
          <div class="title">200+课程</div>
        </div>
      </div>
    </div>
    <div class="other">
      <p class="object">选修课程</p>
      <div class="zhuanti">
        <div class="type" @click="getCourse(13)">
          <img  src="../../assets/kecheng_liushou_icon@2x.png">
          <div class="grade">留守儿童</div>
          <div class="title">5个专题</div>
          <div class="title">55个课程</div>
        </div>
        <div class="type" @click="getCourse(14)">
          <img  src="../../assets/kecheng_ge_icon@2x.png">
          <div class="grade">隔代教育</div>
          <div class="title">3个专题</div>
          <div class="title">225个课程</div>
        </div>
        <div class="type" @click="getCourse(15)">
          <img  src="../../assets/kecheng_te_icon@2x.png">
          <div class="grade">特殊教育</div>
          <div class="title">2个专题</div>
          <div class="title">20个课程</div>
        </div>
      </div>
    </div>
    <div class="other">
      <p class="object">家长排名</p>
      <v-touch tag="li" class="blue" @tap="setMinor">查看我的排名></v-touch>
      <div class="zhuan">
        <div class="firth">
          <div class="hang">
            <img  :src="firth.image">
            <div class="pull-right">
              <div class="name">{{firth.name}}</div>
              <div class="amount">积分：{{firth.amount}}</div>
            </div>
        </div>
          <div class="sign" v-if="firth.signature">{{firth.signature}}</div>
        
        </div>
        <div class="video-list no">
        <div class="qita second" v-for="(item, index) in rank" v-if="index===0">
          <div class="hang">
            <img  :src="item.image" v-if="item.image"> 
            <img v-if="!item.image" src="../../assets/default.png">
            <div class="pull-right">
              <div class="name">{{item.name}}</div>
              <div class="amount">积分{{item.amount}}</div>
            </div>
          </div>
          <div class="sign">{{item.signature}}</div>
        </div>
        <div class="qita three" v-for="(item, index) in rank" v-if="index===1">
          <div class="hang">
            <img  :src="item.image" v-if="item.image"> 
            <img v-if="!item.image" src="../../assets/default.png">
            <div class="pull-right">
              <div class="name">{{item.name}}</div>
              <div class="amount">积分{{item.amount}}</div>
            </div>
          </div>
          <div class="sign">{{item.signature}}</div>
        </div>
        <div class="qita forth" v-for="(item, index) in rank" v-if="index===2">
          <div class="hang">
            <img  :src="item.image" v-if="item.image"> 
            <img v-if="!item.image" src="../../assets/default.png">
            <div class="pull-right">
              <div class="name">{{item.name}}</div>
              <div class="amount">积分{{item.amount}}</div>
            </div>
          </div>
          <div class="sign">{{item.signature}}</div>
        </div>
        <div class="qita fifth" v-for="(item, index) in rank" v-if="index===3">
          <div class="hang">
            <img  :src="item.image" v-if="item.image"> 
            <img v-if="!item.image" src="../../assets/default.png">
            <div class="pull-right">
              <div class="name">{{item.name}}</div>
              <div class="amount">积分{{item.amount}}</div>
            </div>
          </div>
          <div class="sign">{{item.signature}}</div>
        </div>
      </div>
      </div>
    </div>
  </div>
  
  
</div>
</template>



<script>
import api from '@/api/api'
import {mapState} from 'vuex'
import {
  SET_CURRENT_SOURCE,
  SET_HEAD_TITLE,
  SET_CURRENT_SPECIALID
} from '@/store/mutationsType'

  export default {
    data() {
      return {
        slider: [],
        course: [],
        btn: false,
        id: 1,
        page: null,
        slides: [],
        nowIndex: 0,
      }
    },
    created() {
      this.play()


      api.getSlide().then(response => {
        this.slides = response.data.data
      }).catch(err => {
        console.log(err)
      })

      api.getStudy (this.id).then(response => {
        this.course = response.data.data
      }).catch(err => {
        console.log(err)
      })

    },
    methods: {
      setMinor () {
        this.page = Math.floor(Math.random()*10+1)
        api.getStudy (this.page).then(response => {
          this.course = response.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      getCourse (item) {
        this.$router.push('/elective/' + item)
      },
      selectItem(item) {
        api.getCourseList (item.specialId).then(response => {
          this.CourseList = response.data.data
          this.specialName = response.data.data.specialName
          this.$store.commit(SET_CURRENT_SPECIALID, response.data.data)
        }, err => {
          console.log(err)
        })
        this.$store.commit(SET_HEAD_TITLE, item.id)
        this.$router.push('/coursedetail/' + item.id)
        
      },
      goto (index) {
        this.nowIndex = index
      },
      autoPlay () {
        this.nowIndex++
        if(this.nowIndex===3){
          this.nowIndex = 0
          return
        }
      },
      play() {
        setInterval(this.autoPlay, 3000)
      }
    },
    computed: mapState({
      rank () {
        return this.$store.state.rank
      },
      firth () {
        return this.$store.state.firth
      }
    })
  }
</script>
<style scoped>
.course{
  background:#fff;
}
.other{
}
.ke{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.6rem 0.7rem 0.5rem 0.7rem;
    border-bottom: 1px solid #cdcdcd;
    font-size: 12px;
    color:#6b6b6b;
}
.zhuanti{
   display: flex;
   flex-direction: row; 
   flex: 1 1 auto;
   width:100%;
   justify-content: space-around;
}
.type{
  border: 1px solid #dcdcdc;
  float: left;
  margin-left: 0.35rem;
  margin-right: 0.35rem;
  margin-top: 0.25rem;
  padding: 0.325rem;
  width: 4.825rem;
  border-radius: 5px;
  text-align: center;
}
.type img{
  width: 2.35rem;
  height: 2.45rem;
  margin-bottom: 0.475rem;
}
.grade{
  font-size: 0.7rem;
  margin-bottom: 0.275rem;
}
.title{
  color: #7b7b7b;
  font-size: 0.6rem;
  margin-bottom: 0.175rem;
}
.object{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0.6rem 0.7rem 0.5rem 0.7rem;
  border-bottom: 1px solid #cdcdcd;
  border-top: 10px solid #ebeff5;
  font-size: 12px;
  color:#6b6b6b;
}
.content{
  width: 100%;
  height: 2.5rem;
  font-size: 12px;
  line-height: 2.5rem;
  border-bottom: 1px solid #ebeff5;
}
.blue{
  color:#5dc5c6;
  height: 0.1rem;
  position:absolute;
  margin-top:-2rem;
  right: 1rem;
  font-size: 1px;
}
.strong{
  color:#5dc5c6;
}
.finish{
  color:#6b6b6b;
  height: 0.1rem;
  position:absolute;
  margin-top:-2rem;
  right: 1rem;
  font-size: 1px;
}
.container{
  font-size: 15px;
  line-height: 1.5rem;
  display: flex;
  flex-direction: row; 
  flex: 1 1 auto;
  padding-left:0.5rem;
  justify-content: space-around;
}
.pIcon{
  display: inline-block;
  width: 1.325rem;
  height: 1.325rem;
  background: url(../../assets/fumu@3x.png) no-repeat;
  background-size: contain;
  margin-right:0.3rem;
}
.cName{
  display: flex;
  flex-direction: row; 
  flex: 1 1 auto;
  }
.pName{
  display: flex;
  flex-direction: row; 
  flex: 1 1 auto;
  }
.cIcon{
  display: inline-block;
  width: 1.325rem;
  height: 1.325rem;
  background: url(../../assets/haizi@3x.png) no-repeat;
  background-size: contain;
  margin-right:0.3rem;
}
.pull-left{
  display: flex;
  flex-direction: column; 
  padding-top:0.5rem;
  width:75%;
}
.toCourse{
  margin-right:-1rem;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
}
 .bg{
   width: 2rem;
   height: 2rem;
   background: url(../../assets/liu@3x.png) no-repeat;
   background-size: contain;
 }
 .key{
  font-size: 14px;
  color:#6b6b6b;
 }
 .video-list{
  left:0;
  width:100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  
 }
 .item{
  width: 6.825rem;
  height: 7rem;
  float: left;
  position: relative;
  margin-right: 0.45rem;
  overflow: hidden;
  margin-bottom: 0.425rem;
  border: 1px solid #d6d6d6;
  padding: 0.275rem 0.2rem;
  border-radius: 3px;
 }
 .img{
  width: 6.825rem;
  height: 3.875rem;
  z-index: 1;
  border-top-right-radius: 0.1rem;
  border-top-left-radius: 0.1rem;
 }
 .slideimg{
  width: 100%;
  height:6.25rem;
  overflow:hidden;
 }
 .hot{
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #fff;
  width: 100%;
  height: 1.125rem;
  line-height: 1.125rem;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
 }
 .thumbnail{
  position: relative;
 }
 .videoMsg{
  width: 8rem;
  padding-right: 1rem;
 }
 .titleo{
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 7.275rem;
  margin-top: 0.5rem;
 }
 .watch{
  background: url(../../assets/bofangshu@3x.png) no-repeat;
  background-size: contain;
  width: 0.7rem;
  height: 0.7rem;
  display: inline-block;
 }
 .zan{
  background: url(../../assets/bijishu.png) no-repeat;
  background-size: contain;
  width: 0.7rem;
  height: 0.7rem;
  display: inline-block;
 }
 .badg{
  font-size: 14px;
  color: #b1b1b1;
  margin-left: 1rem;
 }
 .data{
  width: 5rem;
  margin-top: -0.4rem !important;
  display: flex;
  justify-content: space-between;
 }
.slide{
  width: 100%;
  height: 100%;
  overflow:hidden;
}
.red {
  background: red;
}
.slide li{
  float:left;
  top:0;
  margin-top:2rem;
  position: absolute;
}
.slideimg{
  width: 100%;
  height:6.25rem;
  overflow:hidden;
 }
.index-wrap {
  width:100%;
  overflow: hidden;
  height: 100%;
  margin-bottom: 6.25rem;
}
.slide-pages {
  position: absolute;
  right: 0;
  left: 0;
  top: 7.5rem;
  text-align: center;
  font-size: 0;
  height: 8px;
}
.slide-pages span {
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  margin-bottom: 2rem;
  border-radius: 50%;
  background: #ccc;
}
.active{
  background: red;
}
.image-enter-active {
  transition: all 1s ease;
  transform: translateX(0);
}
.image-enter {
  transform: translateX(100%);
  transition: all 1s ease;
}
.image-leave {
  transform: translateX(0);
}
.image-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}

.firth{
  height: 4.55rem;
  background: #fff;
  display:flex;
  margin-top:-0.7rem;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  background: url(../../assets/first@3x.png) no-repeat left 0rem;
  background-size: 3rem 3rem;
}
.firth img{
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  margin-left: 1.25rem;
}
.qita img{
  width: 2rem;
  height:2rem;
  border-radius: 50%;
  margin-left: 0.55rem;
}
.pull-right{
  margin: 0.5rem 0.55rem 0.75rem 0.7rem;
  font-size: 12px;
  width: 9.375rem;
}
.name{
  font-size: 14px;
  line-height: 1.5rem;
  overflow:hidden;
  height:1.5rem;
}
.amount{
  color: #b7bfd2;
  padding-left:0.5rem;
  background: url(../../assets/jifen.png) no-repeat left 0rem;
  background-size: 0.5rem 0.6rem;
}
.sign{
  color: #b7bfd2;
  margin-left:0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.qita{
  width: 44.8%;
  height: 5.15rem;
  background: #fff;
  margin-top: 0.55rem;
  float: left;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.second{
  background: url(../../assets/second@3x.png) no-repeat left 0rem;
  background-size: 1.9rem 1.9rem;
}
.three{
  background: url(../../assets/third@3x.png) no-repeat left 0rem;
  background-size: 1.9rem 1.9rem;
}
.forth{
  background: url(../../assets/forth@3x.png) no-repeat left 0rem;
  background-size: 1.9rem 1.9rem;
}
.fifth{
  background: url(../../assets/fifth@3x.png) no-repeat left 0rem;
  background-size: 1.9rem 1.9rem;
}
.hang{
  display:flex;
  flex-direction: row; 
  align-items: center; -webkit-justify-content: center; justify-content: center;
}

</style>