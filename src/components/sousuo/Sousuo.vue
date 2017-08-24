<template>
	<div class="sousuo">
		<div class="search-head">
			<span class="search-icon">
				<img src="../../assets/search.png">
			</span>
			<input type="text" class="search-input" placeholder="搜索你感兴趣的问题" @keyup.enter="fuzzySearch" v-model="searchWord">
			<router-link to="/">
			  <button class="back"  v-if="!searchWord">取消</button>
			 </router-link>
			  <button class="back"  v-if="searchWord" v-model="selected" @click="Search(selected)">搜索</button>
		</div>
		<mt-navbar v-model="selected" class="tab">
		  <mt-tab-item id="1">课程</mt-tab-item>
		  <mt-tab-item id="2">直播</mt-tab-item>
		  <mt-tab-item id="3">资源库</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected" class="container">
		  <mt-tab-container-item id="1">
		    <div class="search-info">
		    	<div class="search-history" v-if="!searchWord">
		    			<span class="htitle">搜索历史</span>
		    		<ul class="history-list">
		    			<v-touch tag="li" v-for="(history, index) in searchHistory" :key="index" @tap="fuzzySearch">
		    			<span class="icon">
		    				<img src="../../assets/search.png">
		    			</span>
		    			{{history}}</v-touch>
		    			<v-touch tag="li" @tap="clearSearchHistory" class="trash">清除历史记录</v-touch>
		    		</ul>
		    	</div>
		    
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <div class="search-info">
		    	<div class="search-history">
		    		<span class="htitle">大家都在看</span>
		    		<div class="button-group">
		    		   <mt-button size="small" class="button" @click="fuzzySearch">注意力</mt-button>
		    		   <mt-button size="small" class="button" @click="fuzzySearch">情商</mt-button>
		    		   <mt-button size="small" class="button" @click="fuzzySearch">好习惯</mt-button>
		    		   <mt-button size="small" class="button" @click="fuzzySearch">性侵害</mt-button>
		    	    </div>
		    	    <span class="htitle" v-if="!searchWord">搜索历史</span>
		    		<ul class="history-list" v-if="!searchWord">
		    			<v-touch tag="li" v-for="(history, index) in searchHistoryo" :key="index" @tap="fuzzySearch">
		    			<span class="icon">
		    				<img src="../../assets/search.png">
		    			</span>
		    			{{history}}</v-touch>
		    			<v-touch tag="li" @tap="clearSearchHistory" class="trash">清除历史记录</v-touch>
		    		</ul>
		    	</div>
		    
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <div class="search-info" v-if="!searchWord">
		    	<div class="search-history">
		    			<span class="htitle">搜索历史</span>
		    		<ul class="history-list">
		    			<v-touch tag="li" v-for="(history, index) in searchHistoryt" :key="index" @tap="fuzzySearch">
		    			<span class="icon">
		    				<img src="../../assets/search.png">
		    			</span>
		    			{{history}}</v-touch>
		    			<v-touch tag="li" @tap="clearSearchHistory" class="trash">清除历史记录</v-touch>
		    		</ul>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		</mt-tab-container>

		<!--显示搜索历史（优先级最低）-->
		
	</div>
</template>


<script>
import api from '@/api/api'
import util from '@/utils/util'
import {
  Indicator
} from 'mint-ui'
import {
  SET_CURRENT_SOURCE
} from '@/store/mutationsType'

export default {
	name: 'Search',
	data () {
	  return {
	    searchWord: '',
	    searchResult: [],
	    searchHistory: [],
	    searchHistoryo: [],
	    searchHistoryt: [],
	    selected: '1'
	  }
	},
	computed: {
	  back () {
	    return this.$store.state.backPath.secPath
	  }
	},
	created () {
	  this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []

	  this.searchHistoryo = util.getLocalStroageData('searchHistoryo') ? util.getLocalStroageData('searchHistoryo') : []

	  this.searchHistoryt = util.getLocalStroageData('searchHistoryt') ? util.getLocalStroageData('searchHistoryt') : []


	},
	  watch: {
	    'searchWord': function () {
	      if (!this.searchWord) {
	        this.searchResult = []
	        this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory')
						: []
			this.searchHistoryo = util.getLocalStroageData('searchHistoryo') ? util.getLocalStroageData('searchHistoryo')
						: []
			this.searchHistoryt = util.getLocalStroageData('searchHistoryt') ? util.getLocalStroageData('searchHistoryt')
						: []			
	      }
	    }
	  },
	methods: {
	  fuzzySearch (el) {
	  	this.searchWord = el.target.innerText.replace(/(^\s*)|(\s*$)/g, "")
	  	// 设置搜索历史
	  	if(this.selected==1){
	  	let searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
	  	util.setLocalStroageData('searchHistory', [this.searchWord, ...searchHistory])
	    }
	    if(this.selected==2){
	  	let searchHistoryo = util.getLocalStroageData('searchHistoryo') ? util.getLocalStroageData('searchHistoryo') : []
	  	util.setLocalStroageData('searchHistoryo', [this.searchWord, ...searchHistoryo])
	    }
	    if(this.selected==3){
	  	let searchHistoryt = util.getLocalStroageData('searchHistoryt') ? util.getLocalStroageData('searchHistoryt') : []
	  	util.setLocalStroageData('searchHistoryt', [this.searchWord, ...searchHistoryt])
	    }
	  	this.$store.commit(SET_CURRENT_SOURCE, this.selected)
	  	this.$router.push('/result/' + this.searchWord)
	  },
	  Search (selected) {
	  	// 设置搜索历史
	  		if(selected==1){
	  		let searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
	  		util.setLocalStroageData('searchHistory', [this.searchWord, ...searchHistory])
	  	  }
	  	  if(selected==2){
	  		let searchHistoryo = util.getLocalStroageData('searchHistoryo') ? util.getLocalStroageData('searchHistoryo') : []
	  		util.setLocalStroageData('searchHistoryo', [this.searchWord, ...searchHistoryo])
	  	  }
	  	  if(selected==3){
	  		let searchHistoryt = util.getLocalStroageData('searchHistoryt') ? util.getLocalStroageData('searchHistoryt') : []
	  		util.setLocalStroageData('searchHistoryt', [this.searchWord, ...searchHistoryt])
	  	  }
	  	
	  	this.$store.commit(SET_CURRENT_SOURCE, selected)
	  	this.$router.push('/result/' + this.searchWord)
	  },
	  clearSearchHistory () {
	    util.setLocalStroageData('searchHistory', [])
	    this.searchHistory = []
	  }
	}
	
}
</script>


<style scoped>
.sousuo{
	background:#f6f6f6;
	height:100%;
	position:absolute;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #fff;
    background:#2dafb3;
    line-height: 0.5rem;
}
.mint-navbar .mint-tab-item {
    padding: 0.6rem 0 0.4rem 0;
    font-size: 15px;
    border-radius: 5px;
    width:6rem;
}
.search-head {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 2.5rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 0 1rem;
	background: #fff;
}

.search-info {
	width: 100vw;
}

.search-input {
	width: 100%;
	line-height: 1.4rem;
	padding-left: 1.8rem;
	border-radius: .2rem;
	border: none;
    background: #f6f6f6;
}
.search-icon img {
	position: absolute;
	left: 1.4rem;
	line-height: 3.5rem;
	width: 20px;
	top: 0.75rem;
}

.tab{
	display:flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top:4.5rem;
	width:60%;
	border-radius: 5px;
	margin-left:20%;
	height:1.5rem;
	line-height: 1.5rem;
	padding:0;
	border:none;
}
.container{
	margin-top:0.5rem;
	
}
.back{
	border:none;
	color:#2dafb3;
	background:#fff;
	text-align: center;
	width:2.5rem;
	top: 0.4rem;
	line-height: 1.5rem;
	position: absolute;
	right: 0.75rem;
	outline:none;
}
.trash{
	text-align: center;
	height:1.5rem;
	font-size: 0.5rem;
	padding-bottom: 0.4rem;
	padding-left: -0.5rem;
	border-bottom: 1px solid #ccc;
}
.button-group{
	display:flex;
	flex-direction: row;
	justify-content: space-between;
	padding:0 10px 10px 10px;
}
.button{
	background:#fff;
}
.search-input:focus,
.cancel:focus {
	outline: none;
}


.search-word {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-top: 3rem;
	border-bottom: 1px solid #f2f2f2;
}

.search-hot-word {
	font-size: 0.6rem;
	padding: 0.2rem 0.6rem;
	border: 1px solid #f2f2f2;
	border-radius: 0.8rem;
	margin-left: 0.5rem;
	margin-bottom: 0.5rem;
}

.search-hot-word:active {
	background: #f2f2f2;
}
.search-history {
}
.htitle{
	font-size: .7rem;
	color: #a08787;
	line-height: 2rem;
	padding-left:0.8rem;
}
.icon {
	line-height: 2rem;
}
.icon img{
	margin-top:0.4rem;
	height:0.8rem;
}
.history-list{
  background:#fff;
  width:100%;
}
.history-list li {
	line-height: 2rem;
	font-size: 0.8rem;
	width:100%;
	margin-left:1rem;
	border-bottom: 1px solid #f2f2f2;
	color: #a08787;
	border-radius: 10px;
}
</style>
