const userToken = {};

module.exports = {
    setuserToken(token) {
        userToken.token = token;
    },
    getUserToken() {
        return userToken;
    },
};
