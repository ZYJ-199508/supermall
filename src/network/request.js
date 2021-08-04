import axios from "axios";

//3.拦截器
export function request(config) {
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })
    // 3.1.axios请求拦截
    // ①修改config的信息
    // ②发送请求时，展示请求图标
    // ③携带一些特殊的信息(登录的token),没有就拦截
    instance.interceptors.request.use(config=>{
        // console.log(config);
        return config
    },err=>{
        // console.log(err);
    })
    
    // 3.2.axios响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err);
    })

    return instance(config)
}