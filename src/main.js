// created by AliceXuxu
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'
import axios from 'axios'
import '../static/css/common.css'
import '../static/css/font/iconfont.css'
// import {Pagination} from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
Vue.config.productionTip = false

//全局配置axios
axios.defaults.baseURL='https://wd2206394391jwoklu.wilddogio.com'
// axios.defaults.headers.common['Authorization'] = 'Token' //配置头部信息
// axios.defaults.headers.post['Content-type'] = 'application/urlencode' //post请求头
// axios.defaults.headers.get['Accepts'] = 'application/json' //get请求头

// Vue.use(VueResource)
Vue.use(VueRouter)
// Vue.use(Pagination)
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.http.options.root = '/root';

//创建路由
const router = new VueRouter({
	routes: Routes,
	mode: 'history'
})

//自定义指令(全局注册)
Vue.directive('rainbow',{
	bind(el,binding,vnode){
		//取得一个随机数，转换为16进制的字符串，切片第2位到第8位。含2不含8
		el.style.color = "#"+Math.random().toString(16).slice(2,8)		
	}
})
Vue.directive('theme',{
	bind(el,binding,vnode){
		if(binding.value == 'wide'){
			el.style.maxWidth = "1260px"
		}else if(binding.value == 'narrow'){
			el.style.maxWidth = '560px'
		}else if(binding.value == 'middle'){
			el.style.maxWidth ='960px'
		}

		if(binding.arg == 'column'){
			el.style.background = '#fff'			
			el.style.margin='0 auto '
		}
	}
})
//自定义过滤器（全局注册）
Vue.filter('to-uppercase',function(value){
	return value.toUpperCase()
})
Vue.filter('snippet',function(value){
	return value.slice(0,140)+"..."
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router,
  render: h => h(App)
})
