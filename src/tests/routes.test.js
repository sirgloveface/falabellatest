import request from 'supertest'
import app from '../app'

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
})

describe('Health get Endpoint', () => {
  it('should create a new get to health', async () => {
  const res = await request(app)
      .get('/health')   
   expect(res.statusCode).toEqual(200)
   expect(res.body).toHaveProperty('environment')
  })
})


