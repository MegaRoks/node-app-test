class List {
    constructor(userId) {
        this.userId = userId;
    }

    getFilesByUserID() {
        const sql = `SELECT F.FILE_ID, F.FILE_NAME, F.FILE_PATH, F.USER_ID, F.URL_CODE, COUNT_DOWNLOADS, F.CREATE_DATE 
            FROM FILES AS F WHERE F.USER_ID = '${this.userId}'`;
        return sql;
    }
}

module.exports = List;
