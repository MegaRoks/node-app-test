class DownloadFile {
    constructor(urlCode) {
        this.urlCode = urlCode;
    }

    updateCountDownload() {
        const sql = `UPDATE FILES SET COUNT_DOWNLOADS = COUNT_DOWNLOADS + 1 WHERE URL_CODE = '${this.usrCode}'`;
        return sql;
    }
}

module.exports = DownloadFile;
