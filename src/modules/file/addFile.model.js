class File {
    constructor(fileName, filePath, userId, urlCode, createDate) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.userId = userId;
        this.urlCode = urlCode;
        this.createDate = createDate;
    }

    addFile() {
        const sql = `INSERT INTO FILES(FILE_NAME, FILE_PATH, USER_ID, URL_CODE, CREATE_DATE) VALUES(
            '${this.fileName}', '${this.filePath}', '${this.userId}',  '${this.urlCode}', '${this.createDate}') RETURNING FILE_ID`;
        return sql;
    }

    getFileByFileName() {
        const sql = `SELECT EXISTS(SELECT F.FILE_ID FROM FILES AS F WHERE F.FILE_NAME = '${this.fileName}') AS FILE_EXISTS`;
        return sql;
    }
}

module.exports = File;
