class DeleteFile {
    constructor(fileName, userId) {
        this.fileName = fileName;
        this.userId = userId;
    }

    deleteFile() {
        const sql = `DELETE FROM FILES WHERE FILE_NAME = '${this.fileName}' AND USER_ID = '${this.userId}' RETURNING FILE_ID`;
        return sql;
    }

    getFileByFileName() {
        const sql = `SELECT EXISTS(SELECT F.FILE_ID FROM FILES AS F WHERE F.FILE_NAME = '${this.fileName}') AS FILE_EXISTS`;
        return sql;
    }
}

module.exports = DeleteFile;
