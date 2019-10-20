class DeleteFile {
    constructor(fileId, userId) {
        this.fileId = fileId;
        this.userId = userId;
    }

    deleteFile() {
        const sql = `DELETE FROM FILES WHERE FILE_ID = '${this.fileId}' AND USER_ID = '${this.userId}' RETURNING FILE_ID`;
        return sql;
    }

    getFileById() {
        const sql = `SELECT F.FILE_NAME FROM FILES AS F WHERE F.FILE_ID = '${this.fileId}'`;
        return sql;
    }
}

module.exports = DeleteFile;
