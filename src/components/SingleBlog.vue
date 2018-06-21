<template>
	<div id="single-blog" v-theme:column="'middle'" class="mt-10">		
		<div class="edit">
			<router-link :to="'/edit/'+id" class="iconfont icon-compile-alt "><span class="fs14 c9 pl-5">编辑</span></router-link>
		</div>
		<div class="fs20 fw-b ta-c pd-20">{{blog.title}}</div>
		<article class="ti-20 fs14 mb-10">{{blog.content}}</article>
		<label class="fs12 pt-10 fs-inta c9"><span class="pr-10 c9">Author:</span>{{blog.author}}</label>
		</br>
		<div class="dis-box justify-content-between">
			<div>
				<label class="pr-10 c9 fs12 fs-inta">Category:</label>
				<label v-for="item in blog.category" class="fs12 fs-inta c9">{{item}}</label>
			</div>			
			<button @click="deleteBlog" class="btn-block mr-10">删除</button>			
	
		</div>
		
		
		
		
	</div>
</template>

<script>
import axios from 'axios'
	export default {
		name:'single-blog',
		data(){
			return{
				id:this.$route.params.id,
				blog:{}
			}
		},
		created(){
			axios.get('/Aposts/'+this.id+'.json').then((res)=> {
				// console.log(888,res.data)
				this.blog = res.data
			})
		},
		methods:{
			deleteBlog(){
				axios.delete('https://wd2206394391jwoklu.wilddogio.com/Aposts/'+this.id+'.json').then(res=>{
					this.$router.push({path:'/'}) //删除成功跳转到主页
				})
			}
		}
	}
</script>

<style scoped>
	#single-blog{
		position: relative;
		box-sizing: border-box;
		max-width: 580px;
		margin: 0 auto;
		background: #ddd;
		padding: 20px 10px;
	}
	.edit{
		position: absolute;
		top: 10px;
		left: 10px;
	}
	article{
		text-indent: 20px;
		padding: 10px;
	}
	.tit{
		font-size: 24px;
		padding:10px 0 20px;
		/* font-weight: bold; */
	}
</style>