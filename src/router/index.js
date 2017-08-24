import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/Home'], resolve)
const Zhuanti = resolve => require(['@/components/common/Zhuanti'], resolve)
const Elective = resolve => require(['@/components/common/elective'], resolve)
const CourseDetail = resolve => require(['@/components/common/CourseDetail'], resolve)
const Zhibodetail = resolve => require(['@/components/common/Zhibodetail'], resolve)
const Live = resolve => require(['@/components/common/Live'], resolve)
const Manage = resolve => require(['@/components/common/Manage'], resolve)
const Mycourse = resolve => require(['@/components/common/Mycourse'], resolve)
const Video = resolve => require(['@/components/common/Video'], resolve)
const Message = resolve => require(['@/components/user/Message'], resolve)
const Sousuo = resolve => require(['@/components/sousuo/Sousuo'], resolve)
const Result = resolve => require(['@/components/sousuo/result'], resolve)
const Info = resolve => require(['@/components/user/Info'], resolve)
const Mynote = resolve => require(['@/components/user/Mynote'], resolve)
const Myzhibo = resolve => require(['@/components/user/Myzhibo'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/coursedetail/:keId',
      name: 'coursedetail',
      component: CourseDetail
    }
    ,{
      path: '/zhibodetail/:zhiboId',
      name: 'zhibodetail',
      component: Zhibodetail
    },{
      path: '/live/:url',
      name: 'live',
      component: Live
    },{
      path: '/sousuo',
      name: 'sousuo',
      component: Sousuo
    },{
      path: '/mycourse',
      name: 'mycourse',
      component: Mycourse
    },{
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/elective/:courseId',
      name: 'elective',
      component: Elective
    },
    {
      path: '/result/:key',
      name: 'result',
      component: Result
    },{
      path: '/zhuanti/:zhuantiId',
      name: 'zhuanti',
      component: Zhuanti
    },{
      path: '/video/:videoId',
      name: 'video',
      component: Video
    },
      {
      path: '/message',
      name: 'message',
      component: Message
    }, {
      path: '/info',
      name: 'info',
      component: Info
    },{
      path: '/mynote',
      name: 'mynote',
      component: Mynote
    },{
      path: '/myzhibo',
      name: 'myzhibo',
      component: Myzhibo
    }
  ]
})
