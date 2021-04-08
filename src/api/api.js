import request from '@/utils/request'

const CheckUrl = 'check'
export function checkRepetition(username){
    return request.post(CheckUrl, {
        username: username
    })
}

const RegisterUrl = "register"
export function register(username, password){
    return request.post(RegisterUrl, {
        username: username,
        password: password
    })
}

const LoginUrl = "login"
export function login(username, password){
    return request.post(LoginUrl,{
        username: username,
        password: password
    })
}

const AllFileUrl = "file/"
export function allFile(username){
    return request.get(AllFileUrl + username);
}
