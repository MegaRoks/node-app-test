class DownloadFile {
    constructor(urlCode) {
        this.urlCode = urlCode;
    }

    getFileByUrlCode() {
        const sql = `SELECT F.FILE_ID, F.FILE_NAME, F.FILE_PATH, F.USER_ID, F.URL_CODE, COUNT_DOWNLOADS, F.SHORT_URL, F.CREATE_DATE 
            FROM FILES AS F WHERE F.URL_CODE = '${this.urlCode}'`;
        return sql;
    }
}

module.exports = DownloadFile;
