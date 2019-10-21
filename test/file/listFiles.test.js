const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/index');
const utils = require('./../tool/utils');

const { token } = utils.getUserToken();

const expect = chai.expect;

chai.use(chaiHttp);

describe('List files', () => {
    it('Should get list files', done => {
        chai.request(server)
            .get('/files/list/')
            .set('token', token)
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).have.property('filesList');
                expect(res.body.filesList).to.be.an('array');
                res.body.filesList.forEach(element => {
                    expect(element.file_id).to.be.an('number');
                    expect(element.file_name).to.be.an('string');
                    expect(element.file_path).to.be.an('string');
                    expect(element.user_id).to.be.an('number');
                    expect(element.url_code).to.be.an('string');
                    expect(element.count_downloads).to.be.an('number');
                });
                done();
            });
    });
});
