<template>
	<div class="top">
		<div class="tit">
			<div class="tips">
				<div class="dis-box justify-content-between plr-20">
					<div class="fs24 fw-b ce pr-30">Fatimah.Xu Blog</div>
					<div class="dis-box">
						<div class="ce fw-b pr-15 pointer" @click="login">Login</div>
						<div class="ce fw-b pointer" @click="register">Register</div>
					</div>
				</div>
			</div>		
			<div class="banner pb-20">
				<div class="cf up">X.X &nbspBlog</div>
				<div class="cf ta-c down">Just do it!</div>
			</div>
		</div>	
		<nav class="dis-box">
			<router-link  to="/" exact>OVERVIEW</router-link>
			<router-link to="/add" exact>ADDBLOG</router-link>	
		</nav>
		<!-- 登陆与注册的弹窗 -->
		<!-- <div class="popup b">
			<login></login>	
		</div> -->
	</div>	
</template>

<script>
	export default {
		name: 'blog-header',
		components: { 
		    // Login
		},
		data(){
			return{
				itemImg :[]
			}
		},
		methods:{
			login(){
				this.$store.commit("setPopLog",true)
				this.$store.commit("setPopReg",false)
			},
			register(){
				this.$store.commit("setPopReg",true)
				this.$store.commit("setPopLog",false)
			}
		}

	}
	
</script>

<style scoped>
	.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
	 background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
	 background-color: #d3dce6;
	}
	nav{
		position: absolute;
		bottom: 0;
		left: 0;		
		padding: 0 10px ;	
		margin-bottom: 5px;	
		width: 98%;
	}	
	a{
		display: inline-block;
		width: 80px;
		color: #eee;
		font-weight: bold;
		text-decoration: none;
		padding: 10px;
		text-align: center;
		opacity: 0.4;
	}
	.router-link-active{	
		color: #ccc;
		/* background: #aaa; */
		opacity: 1;
		/* box-shadow: 1px 1px 1px #aaa */

	}
	.top{
		position: relative;
		margin: 0 auto;
	}
	@media screen and (max-width: 768px) {
	  	.tit{
			overflow: hidden;
			height: 300px;
			width: 100%;
			background-attachment: scroll;
			
			background-image:  url("../../src/assets/home-bg.jpg");	
			background-size: 100% 100%;
			-moz-background-size:100% 100%;
		} 
		.tit .up{
			font-size: 36px;
		}
		.tit .down{
			font-size: 16px;
			font-style: italic;
			padding: 5px;
		}
	}
	@media screen and (min-width: 768px) {
	  	.tit{
			overflow: hidden;
			height: 485px;
			width: 100%;
			background-attachment: scroll;
			background-image:  url("../../src/assets/home-bg.jpg");	
			background-size: 100% 100%;
			-moz-background-size:100% 100%;
		} 
		
		.tit .down{
			font-size: 30px;
			padding: 10px;
			font-style: italic;
		}
	}
	/* .tit img{
		max-height: 485px;
		width: 100%;
		min-width: 1208px;
		object-fit: cover;
	} */
	.banner{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		z-index: 1;
		font-size: 76px;
		font-weight: bold;
		color: #ffffff;
	}
	.tips{
		position: absolute;
		top: 15px;
		width: 100%;
		z-index: 998;
	}
	.popup{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background: #aaa;
		z-index: 3;		
		width: 340px;
		height: 355px;
		border-radius: 8px;
	}
	.pointer{
		cursor: pointer;
	}
		
</style>