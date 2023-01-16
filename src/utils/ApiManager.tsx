
import { apiAddress } from "./ApiAddress"
class ApiManager{
    registerApi:string =apiAddress+"register"
    loginApi:string = apiAddress+"login"
    messageApi:string =apiAddress+"message"

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