
import { apiAddress } from "./ApiAddress"
class ApiManager{
    registerApi:string =apiAddress+"register"
    loginApi:string = apiAddress+"login"
    messageApi:string =apiAddress+"messages"

    getRegisterApi(): string{
        return this.registerApi
    }
    getLoginApi(): string{
        return this.loginApi
    }
    getMessageApi(): string{
        return this.messageApi
    }
}

export {ApiManager};