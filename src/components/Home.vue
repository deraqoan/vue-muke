<template>
	<div class="home">
		<mt-tab-container v-model="selected" :swipeable="false" :value="selected">
			<mt-tab-container-item id="课程">
				<mt-header class="header" fixed :title="selected">
					<router-link to="/sousuo" slot="left" class="blue">
					    <mt-button icon="search"></mt-button>
					 </router-link>
				</mt-header>
				<Course class="tab-container"></Course>
			</mt-tab-container-item>
			<mt-tab-container-item id="直播">
				<mt-header class="header" fixed :title="selected">
				</mt-header>
				<keep-alive include="Bookshelf">
					<Zhibo class="tab-container"></Zhibo>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="资源库">
				<mt-header class="header" fixed :title="selected">
					<router-link to="/sousuo" slot="right"  class="blue">
					    <mt-button icon="search"></mt-button>
					 </router-link>
				</mt-header>
				<keep-alive include="Rank">
					<Resourse class="tab-container"></Resourse>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="我的">
			    <mt-header class="header" fixed :title="selected">
			    	<router-link to="/info" slot="right"  class="blue">
			    	    <mt-button icon="more"></mt-button>
			    	 </router-link>
			    </mt-header>
				  <User class="tab-container"></User>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-tabbar v-model="selected" :fixed="true" :value="selected">
			<mt-tab-item id="课程">
				<img slot="icon" src="../assets/coursel.png" v-if="selected!=='课程'">
				<img slot="icon" src="../assets/course.png" v-if="selected=='课程'">课程
			</mt-tab-item>
			<mt-tab-item id="直播">
				<img slot="icon" src="../assets/zhibo.png" v-if="selected!=='直播'">
				<img slot="icon" src="../assets/zhibol.png" v-if="selected=='直播'">直播
			</mt-tab-item>
			<mt-tab-item id="资源库">
				<img slot="icon" src="../assets/resourse.png" v-if="selected!=='资源库'">
				<img slot="icon" src="../assets/resoursel.png" v-if="selected=='资源库'">资源库
			</mt-tab-item>
			<mt-tab-item id="我的">
				<img slot="icon" src="../assets/user.png" v-if="selected!=='我的'">
				<img slot="icon" src="../assets/userl.png" v-if="selected=='我的'">我的
			</mt-tab-item>
			
			
		</mt-tabbar>
	</div>
</template>

<script>
import Resourse from './resourse/resourse'
import Zhibo from './zhibo/zhibo'
import User from './user/user'
import Course from './course/course'

export default {
  name: 'home',
  components: {
    Resourse,
    Zhibo,
    User,
    Course
  },
  data () {
    return {
      selected: '课程'
    }
  },
  methods: {
    changeSelected (data) {
      this.selected = data
    }
  },
  mounted () {
    this.selected = this.$store.state.previousPosition
  }
}
</script>

<style scoped>
.tab-container {
	box-sizing: border-box;
	padding-top: 2rem;
	padding-bottom: 55px;
	width: 100vw;
	min-height: 100vh;
}
.header {
	color: #3d4145;
	background: #fff;
	border-bottom: 1px solid #ebeff5;
}
.blue{
	color:#2eacbb;
}
.home{
	background: #ebeff5;
}
</style>
