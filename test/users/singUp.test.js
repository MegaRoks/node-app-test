const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Sing Up', () => {
    describe('POST /api/users/signup/', () => {
        it('Should receive an error message that the first name is required', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('First name is required field');
                    done();
                });
        });

        it('Should receive an error message that the first name is too short', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Ma' })
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal(
                        'First name must be at no less 3 characters and no more than 15 characters',
                    );
                    done();
                });
        });

        it('Should receive an error message that the first name is too long', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'MaximMaximMaximMaxim' })
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal(
                        'First name must be at no less 3 characters and no more than 15 characters',
                    );
                    done();
                });
        });

        it('Should receive an error message that the last name is too short', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Ka' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal(
                        'Last name must be at no less 3 characters and no more than 15 characters',
                    );
                    done();
                });
        });

        it('Should receive an error message that the last name is too long', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'KamenevKamenevKamenevKamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal(
                        'Last name must be at no less 3 characters and no more than 15 characters',
                    );
                    done();
                });
        });

        it('Should receive an error message that the last name is required', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '1234556' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('Last name is required field');
                    done();
                });
        });

        it('Should get an error that the password is too short', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '12345' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('Password must not be less than 6 characters');
                    done();
                });
        });

        it('Should receive an error message that the user email is required', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
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
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
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
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
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
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '12345' })
                .end((err, res) => {
                    expect(res).have.status(422);
                    expect(res.body).have.property('err');
                    expect(res.body.err).to.be.equal('Password must not be less than 6 characters');
                    done();
                });
        });

        it('Should new user register', done => {
            chai.request(server)
                .post('/api/users/signup/')
                .send({ firstName: 'Maxim' })
                .send({ lastName: 'Kamenev' })
                .send({ userEmail: 'MegaRoks@ya.ru' })
                .send({ userPassword: '12345678' })
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).have.property('user_id');
                    expect(res.body.user_id).to.be.an('number');
                    done();
                });
        });
    });
});
