import axios from 'axios';
import { isAuthenticated, token } from './Auth';

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

if (isAuthenticated()) {
    API.defaults.headers['Token'] = token();
}
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

// 更新用户信息
const updateMember = function (data) {
    localStorage.setItem('member', JSON.stringify(data));
}

export {
    API,
    signIn,
    signOut,
    updateMember
};