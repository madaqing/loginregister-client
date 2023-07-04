//login module
import { makeAutoObservable } from "mobx"

class LoginStore {
    token = ''
    constructor() {
        //响应式
        makeAutoObservable(this)
    }

    //getToken = async ({ mobile, code }) => {
    //调用登录接口
    //const res = await http.post('http://localhost:3000/graphql', {
    //    mobile, code
    //})

    //存入token
    //console.log(res.data)
    //this.token = res.data.token
    //}
}

export default LoginStore