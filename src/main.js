// created by AliceXuxu
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'
import axios from 'axios'
import {store} from './store/store.js'

import '../static/css/common.css'
import '../static/css/font/iconfont.css'
// import {Pagination} from 'element-ui'
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

const router = new VueRouter({
	routes: Routes,
	mode: 'history'
})

import {
	Button,Select, Option,
	Form,
  	FormItem,
  	Input,
  	Icon,
  	Table,
  	TableColumn
  } from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)



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
  render: h => h(App),
  store
})

// 检测表单完整正确性
	window.checkData = function(type,data,nec){
	
		var func = {
			checkIdcard: function (idCard){
				idCard = idCard.replace(/(^\s*)|(\s*$)/g, "");
				var Errors=["验证通过!", "身份证号码错误!", "身份证格式不正确!"]

				//15位和18位身份证号码的正则表达式
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

				//如果通过该验证，说明身份证格式正确，但准确性还需计算
				if(regIdCard.test(idCard)){
				  	if(idCard.length==18){
						var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
						var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
						var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
						for(var i=0;i<17;i++){
							idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
						}

						var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
						var idCardLast=idCard.substring(17);//得到最后一位身份证号码

					    //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
					    if(idCardMod==2){
							if(idCardLast=="X"||idCardLast=="x"){
								return {
								  	status: true,
								  	msg: Errors[0]
								};
							}else{
								return {
								  	status: false,
								  	msg: Errors[1]
								};
							}
					    }else{
							//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
							if(idCardLast==idCardY[idCardMod]){
								return {
								  	status: true,
								  	msg: Errors[0]
								};
							}else{
								return {
								  	status: false,
								  	msg: Errors[1]
								};
							}
					    }
					}
				}else{
					return {
						status: false,
						msg: Errors[2]
					};
				}
			},

			checkPhone: function (sMobile) {
				if(!(/0?(13|14|15|18)[0-9]{9}/.test(sMobile))){ 
				    return {
				    	status: false,
					  	msg: "手机号码格式错误！"
				    }; 
				}else{
					return {
				    	status: true,
					  	msg: ""
				    }; 
				}
			},
			checkEmail: function (Email){
				if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(Email))){ 
				    return {
				    	status: false,
					  	msg: "邮箱格式错误！"
				    }; 
				}else{
					return {
				    	status: true,
					  	msg: ""
				    }; 
				}
			},
			checkAccount: function (Account){
				if(!(/0?(13|14|15|18)[0-9]{9}/.test(Account) ||
					/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(Account))){ 
				    return {
				    	status: false,
					  	msg: "手机号或邮箱格式错误！"
				    }; 
				}else{
					return {
				    	status: true,
					  	msg: ""
				    }; 
				}
			},
			checkDataEmpty: function(data, nec){
				if(!(nec instanceof Array)) return {status: true,msg: ""};
				for (var i= 0; i< nec.length; i++) {
				 	for (var j in data) {
					    if(j === nec[i]){
						    if (data[j] === ""){
						        return {
							    	status: false,
								  	msg: "必填项不能为空!"
							    }
						    }
					    }
				  	}
				}
				return {status: true,msg: ""};
			}
		}

		if(type === 'idcard'){
		    return func.checkIdcard(data)
		}else if(type === 'phone'){
			return func.checkPhone(data)
		}else if(type === 'complement'){
			return func.checkDataEmpty(data,nec)
		}else if(type === 'email'){
			return func.checkEmail(data)
		}else if(type === 'account'){
			return func.checkAccount(data)
		}else{
			return {
		    	status: true,
			  	msg: ""
		    };
		}
			
	}