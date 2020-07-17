const isAuthenticated = () => {
    // 判断是否登录
    let token = localStorage.getItem('token');

    if (token === null) {
        return false;
    }

    return true;
};

const token = () => {
    return localStorage.getItem('token');
}

export {
    isAuthenticated,
    token
};