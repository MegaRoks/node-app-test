const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Index', () => {
    describe('GET /', () => {
        it(`Should return message about work page`, done => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).have.property('message');
                    expect(res.body.message).to.be.equal(`Hello From Express`);
                    done();
                });
        });
    });
});
