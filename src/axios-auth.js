import axios from 'axios'

const instance = axios.create({
	baseURL:'https://wd2206394391jwoklu.wilddogio.com'
})

// instance.defaults.headers.common['Something'] ='Something'配置请求头

export default instance