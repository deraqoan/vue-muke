import Vue from 'vue'
import Vuex from 'vuex'
// import action from 'action'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  weekRankId: '',
  monthRankId: '',
  totalRankId: '',
  headTitle: '', // 头部文字
  previousPosition: '课程',
  source: '', 
  specialid: '',
  backPath: {},
  bookInfo: {},
  user: {
    notes:0,
    posts:0,
    activities:0,
    collects:0,
    fans:0,
    level:3,
    contention:0,
    integral:1386,
    name:'134324',
    sign:'人生开车旅游一趟。',
    birth:'2015年04月03日',
    phone:'13024539845',
    image:'http://mooc-10050339.file.myqcloud.com/image/201707/1500454416193.jpg',
    fende:'男',
    education:'高中',
    nickname:'rever'

  },
  firth: {"amount":71198,"id":776942,"pariseSum":5,"name":"kalala","gender":0,"image":"http://mooc-10050339.cos.myqcloud.com/image/201704/1491355323289.jpg","isPraised":0,"signature":" "},
  rank: [
  {"amount":40050,"id":764276,"pariseSum":17,"name":"考虑考虑兔兔喇叭罢了","gender":1,"image":"http://mooc-10050339.file.myqcloud.com/image/201705/17049211056917.jpg","isPraised":0,"signature":"hhbvhhhhhh"},
  {"amount":14482,"id":52250,"pariseSum":43,"name":"墨丶刃","gender":1,"image":"http://mooc-10050339.cos.myqcloud.com/image/201701/1483849439403.jpg","isPraised":0,"signature":""},
  {"amount":14021,"id":41727,"pariseSum":23,"name":"汪汪汪","gender":1,"image":"http://mooc-10050339.cos.myqcloud.com/image/201701/1484630242986.gif","isPraised":0,"signature":"这个人不忙，但什么也没留下"},
  {"amount":13317,"id":310413,"pariseSum":58,"name":"天后","gender":0,"image":"","isPraised":0,"signature":"不能说的秘密"}]
}

export default new Vuex.Store({
  state,
  mutations
})
