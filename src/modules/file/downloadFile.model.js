class DownloadFile {
    constructor(urlCode) {
        this.urlCode = urlCode;
    }

    getFileByUrlCode() {
        const sql = `SELECT F.FILE_NAME FROM FILES AS F WHERE F.URL_CODE = '${this.urlCode}'`;
        return sql;
    }

    updateCountDownload() {
        const sql = `UPDATE FILES SET COUNT_DOWNLOADS = COUNT_DOWNLOADS + 1 WHERE URL_CODE = '${this.urlCode}'`;
        return sql;
    }
}

module.exports = DownloadFile;
