class SingIn {
    constructor(email) {
        this.userEmail = email;
    }

    getUserByEmail() {
        const sql = `SELECT U.USER_ID, U.FIRST_NAME, U.LAST_NAME, U.USER_EMAIL, U.USER_PASSWORD FROM USERS AS U WHERE LOWER(U.USER_EMAIL) = LOWER('${this.userEmail}')`;
        return sql;
    }
}

module.exports = SingIn;
