import should from 'should';
import request from 'supertest';
import server from 'src/server';


describe('API', () => {
  it('GET / returns a "hello"', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);

        res.text.should.eql('hello');

        done();
      });
  });

  it('POST / returns a message', (done) => {
    request(server)
      .post('/')
      .set('Accept', 'application/json')
      .send({ to: 'someone' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);

        res.body.should.eql({ status: 'ok', message: 'hello someone!' });

        done();
      });
  });
});
