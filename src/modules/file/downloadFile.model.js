class DownloadFile {
    constructor(usrCode) {
        this.usrCode = usrCode;
    }
    updateCountDownload() {
        const sql = `UPDATE FILES SET COUNT_DOWNLOADS = COUNT_DOWNLOADS + 1 WHERE URL_CODE = '${usrCode}'`;
        return sql;
    }
}

module.exports = DownloadFile;
