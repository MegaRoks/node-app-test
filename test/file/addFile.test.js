const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const fs = require('fs');

const server = require('../../src/index');
const utils = require('./../tool/utils');

const { token } = utils.getUserToken();

const imageFile = path.join(__dirname, '../files/imageFile.jpg');
const phpFile = path.join(__dirname, '../files/phpFile.php');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add file', () => {
    it('The file should load', done => {
        chai.request(server)
            .post('/file/add/')
            .set('token', token)
            .attach('file', fs.readFileSync(imageFile), 'imageFile.jpeg')
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).have.property('message');
                expect(res.body.message).to.be.an('string');
                expect(res.body).have.property('file_id');
                expect(res.body.file_id).to.be.an('number');
                expect(res.body).have.property('shortUrl');
                expect(res.body.shortUrl).to.be.an('string');
                done();
            });
    });

    it('Files with php extension cannot be uploaded', done => {
        chai.request(server)
            .post('/file/add/')
            .set('token', token.token)
            .attach('file', fs.readFileSync(phpFile), 'phpFile.php')
            .end((err, res) => {
                expect(res).have.status(500);
                expect(res.body).have.property('err');
                expect(res.body.err).to.be.an('string');
                done();
            });
    });
});
