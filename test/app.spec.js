const app = require('../src/app')

describe.skip('App', () => {
  //initial test
  it('GET / responds with 200 containing "Hello, 24/7 REcruit!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, 24/7 REcruit!')
  })
})