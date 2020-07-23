import axios from 'axios';

const DEV  = 'http://localhost:8080';

const PRO  = 'https://account.haibing.site';

const HOST = process.env.NODE_ENV === 'production' ? PRO : DEV;

const API  = axios.create({
    baseURL: HOST,
    headers: {
             'Client': 1,
        'Application': 3
    }
});
// 登录
const signIn = function (data) {
    // 添加到 Axios 实例中
    API.defaults.headers['Token'] = data.token;
    // 添加到 Local Storage 中
    localStorage.setItem('token', data.token);
    localStorage.setItem('member', JSON.stringify(data.member));
}

// 退出登录
const signOut = function (token) {
    // 添加到 Local Storage 中
    localStorage.removeItem('token');
    localStorage.removeItem('member');
}

export {
    API,
    signIn,
    signOut
};