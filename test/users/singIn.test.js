const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/index');
const utils = require('./../tool/utils');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Sing In', () => {
    describe('POST /api/users/signin/', () => {
        it('Should receive an error message that the user email is required', done => {
            chai.request(server)
                .post('/api/users/signin/')
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('User email is required field');
                    done();
                });
        });

        it('Should receive an error message that invalid email address', done => {
            chai.request(server)
                .post('/api/users/signin/')
                .send({ userEmail: 'MegaRoks.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('Invalid email address');
                    done();
                });
        });

        it('Should receive an error message that the user password is required', done => {
            chai.request(server)
                .post('/api/users/signin/')
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('User password is required field');
                    done();
                });
        });

        it('Should receive an error message that the user password is too short', done => {
            chai.request(server)
                .post('/api/users/signin/')
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '12345' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('Password must not be less than 6 characters');
                    done();
                });
        });

        it('User must login', done => {
            chai.request(server)
                .post('/api/users/signin/')
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '12345678' })
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.an('string');
                    expect(res.body.success).to.be.equal('Welcome to my app');
                    expect(res.body).have.property('token');
                    expect(res.body.token).to.be.an('string');
                    expect(res.body).have.property('token');
                    expect(res.body.userId).to.be.an('number');
                    utils.setuserToken(res.body.token);
                    done();
                });
        });
    });
});
