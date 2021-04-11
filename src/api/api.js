import request from '@/utils/request'

const CheckUrl = '/user/check'
export function checkRepetition(username){
    return request.post(CheckUrl, {
        username: username
    })
}

const RegisterUrl = "/user/register"
export function register(username, password){
    return request.post(RegisterUrl, {
        username: username,
        password: password
    })
}

const LoginUrl = "/user/login"
export function login(username, password){
    return request.post(LoginUrl,{
        username: username,
        password: password
    })
}

const CheckTokenUrl = "/user/token"
export function checkToken(){
    return request.post(CheckTokenUrl);
}

const AllFileUrl = "/file/allfile"
export function allFile(){
    return request.get(AllFileUrl);
}

const uploadUrl = "/file/upload"
export function upload(obj){
    let param = new FormData();
    param.append('files', obj.file)
    return request.post(uploadUrl, param, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const newDirUrl = "/file/newdir"
export function newDir(path){
    return request.post(newDirUrl,{
        path: path
    })
}

//不能用post
const downloadUrl = "/file/download"
export function download(filePath){
    return request.get(downloadUrl + '?filePath=' + filePath,{
        responseType: 'blob'
    })
}

const deleteUrl = "/file/delete"
export function Delete(filePath){
    return request.post(deleteUrl + '?filePath=' + filePath);
}
