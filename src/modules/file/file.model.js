class File {
    constructor(fileName, filePath, userId, urlCode, shortUrl, createDate) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.userId = userId;
        this.urlCode = urlCode;
        this.shortUrl = shortUrl;
        this.createDate = createDate;
    }

    addFile() {
        const sql = `INSERT INTO FILES(FILE_NAME, FILE_PATH, USER_ID, URL_CODE, SHORT_URL, CREATE_DATE) VALUES(
            '${this.fileName}', '${this.filePath}', '${this.userId}',  '${this.urlCode}', '${this.shortUrl}', '${this.createDate}') RETURNING FILE_ID`;
        return sql;
    }
}

module.exports = File;
