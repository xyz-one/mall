import axios from 'axios'

export function request(config) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
    // headers: {}
  })

  // 2. axios 拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config)
    // 1. 可用于修改 config 中的一些信息不符合服务器的要求 eg：herders 的修改
    
    // 2. 可用于每次发送网络请求时，都希望在界面中显示一个请求的图标

    // 3. 某些网络请求（比如登陆 token ），必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })


  // 3. 发送真正的网络请求
  return instance(config)
  
}
 

