//This is the file Mocha will run to trigger tests against the service. More or less integration testing as opposed to unit due to requring the Express module

var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    delete require.cache[require.resolve('./server')]; //Required due to really-need having issues on node v > 4.0.0
    server = require('./server');
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /api', function testSlash(done) {
    request(server)
      .get('/api')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/404')
      .expect(404, done);
  });

  it('test authentication route', function testAuth(done) {
    request(server)
      .post('/api/authenticate')
      .send('name=Eric')
      .send('password=password')
      .expect(200, done);
  });
});
