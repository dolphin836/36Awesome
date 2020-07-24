import defaultAvatar from './Assent/Image/default-avatar.png';
/**
 * 判断是否登录
 */
const isAuthenticated = () => {
    let token = localStorage.getItem('token');

    if (token === null) {
        return false;
    }

    return true;
};

/**
 * 获取 Token
 */
const token = () => {
    return localStorage.getItem('token');
}

/**
 * 获取用户头像
 */
const getMemberAvatar = () => {
    let memberText = localStorage.getItem('member');

    if (memberText === null) {
        return defaultAvatar;
    }

    let member = JSON.parse(memberText);

    if (member.avatar === null) {
        return defaultAvatar;
    }

    return member.avatar;
}

/**
 * 获取用户名称
 */
const getMemberName = () => {
    let memberText = localStorage.getItem('member');

    if (memberText === null) {
        return "";
    }

    let member = JSON.parse(memberText);
    // 有昵称返回昵称，没有返回用户名
    if (member.nickname === null) {
        return member.username;
    }

    return member.nickname;
}

export {
    isAuthenticated,
    token,
    getMemberAvatar,
    getMemberName
};