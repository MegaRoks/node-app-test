class SignUp {
    constructor(firstName, lastName, userEmail, password, createDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
        this.userPassword = password;
        this.createDate = createDate;
    }

    getUserByEmail() {
        const sql = `SELECT EXISTS(SELECT U.USER_EMAIL FROM USERS AS U WHERE LOWER(U.USER_EMAIL) = LOWER('${this.userEmail}')) AS USER_EXISTS`;
        return sql;
    }

    addUser() {
        const sql = `INSERT INTO USERS(FIRST_NAME, LAST_NAME, USER_EMAIL, USER_PASSWORD, CREATE_DATE) VALUES(
            '${this.firstName}', '${this.lastName}', '${this.userEmail}', '${this.userPassword}', '${this.createDate}') RETURNING USER_ID`;
        return sql;
    }
}

module.exports = SignUp;
