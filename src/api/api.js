import Vue from 'vue'

export default {

  /**
     * 获取直播分类
     * @returns {null}
     * http://api.zhuishushenqi.com/cats/lv2
     */
  getZhibogory () {
    return Vue.http.get('/activity/getActivityType.do?key=web')
  },

  /**
     * 获取资源的类别
     */
  getCategory () {
    return Vue.http.get('/resource/getAdminResourceType.do?key=web&areaType=2&provId=710000&cityId=710001&regionId=710009&schoolId=1177')
  },
 getSlide () {
   return Vue.http.get('/ad/getAdList.do?key=web&cityId=710001&schoolId=1177&regionId=710009&provId=710000&isPC=1&isExpert=')
 },
  getStudy (Id) {
   return Vue.http.get('/course/getCompulsoryCourse.do?key=web&count=4&memberId=812112&page=' + Id + '&phase=6')
 },
  getCourse (Id) {
   return Vue.http.get('/course/getCourseList.do?key=web&memberId=812112&phase=6&specialId=' + Id)
 },
   getGrade (Id) {
   return Vue.http.get('/special/specialStatus.do?key=mooc&memberId=812112&phase=' + Id)
 },
   getCount (searchWord) {
   return Vue.http.get('/member/searchCount.do?key=web&keyword=' + searchWord + '&type=0&phase=6')
 },
 fuzzySearch (searchWord, type) {
   return Vue.http.get('/member/search.do?key=web&keyword=' + searchWord + '&type=' + type + '&page=1&phase=6')
 },
  getCourseInfo (Id) {
   return Vue.http.get('/course/courseInfo.do?key=mooc&courseId=' + Id + '&memberId=812112')
 },
  getCourseList (Id) {
   return Vue.http.get('/special/getSpecialCourses.do?key=mooc&memberId=812112&specialId=' + Id)
 },
  getNoteList (Id, page) {
   return Vue.http.get('/note/getNoteList.do?key=mooc&courseId=' + Id + '&memberId=812112&page=' + page + '&count=5')
 },

 getVideoByCat (Id) {
   return Vue.http.get('/good/getResourceMediaById.do?key=web&memberId=812112&id=' + Id + '&number=0')
 },
 getReview (Id) {
   return Vue.http.get('/review/getReviewList.do?key=web&objectId=' + Id + '&type=6&page=1&count=10&isPC=1')
 },
 getZhiboByCat (Id) {
   return Vue.http.get('/activity/getActivityList.do?key=web&memberId=812112&areaId=&dataType=&status=&isLive=&number=0&page=1&count=10&cityId=710001&classId=3&gradeId=6&schoolId=1177&regionId=710009&areaType=2&provId=710000&isPC=1&classify=' + Id )
 },
 getZhibodetail (Id) {
   return Vue.http.get('/activity/getActivityInfo.do?key=web&activityId=' + Id + '&number=0&cityId=710001&classId=3&gradeId=6&schoolId=1177&regionId=710009&areaType=2&memberId=812112&provId=710000')
 },
  getZhiboreview (Id) {
   return Vue.http.get('/review/getReviewList.do?key=web&objectId=' + Id + '&type=2&page=1&count=6')
 },
  /**
     * 根据分类获取资源列表
     * https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20
     */
  getCourseByCat (page) {
    return Vue.http.get('/good/getResourceMediaList.do?key=web&categoryId=&sortType=2&page=' + page + '&count=12&isPC=1')
  }
 }