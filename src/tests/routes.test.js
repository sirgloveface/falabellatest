import request from 'supertest'
import app from '../app'

describe('Health get Endpoint', () => {
  it('should create a new get to health', async () => {
  const res = await request(app)
      .get('/health')   
   expect(res.statusCode).toEqual(200)
   expect(res.body).toHaveProperty('environment')
  })
})

describe('Get Endpoints', () => {
  it('should return all beers', async () => {
  const res = await request(app)
      .get('/beers')   
   expect(res.statusCode).toEqual(200)
  })
  it('should return single beers', async () => {
    const res = await request(app)
        .get('/beers/5')   
     expect(res.statusCode).toEqual(200)
     expect(res.body.Name).toBe("Golden")
  })
  it('should return beerBox price', async () => {
    const res = await request(app)
        .get('/beers/4/boxprice?currency=USD&quantity=8')
     expect(res.statusCode).toEqual(200)
     console.log(res.body)
     expect(res.body.BeerBox.Precio_Total).toBe(92.50184453082845)
  })
})

describe('Post Endpoints', () => {
  it('should create a new beer', async () => {
    const res = await request(app)
      .post('/beers')
      .send({
          "Name": "Golden",
          "Brewery": "Kross ",
          "Country": "Chile",
          "Price": 10.5,
          "Currency": "EUR"
      })
    expect(res.statusCode).toEqual(201)
  })



})