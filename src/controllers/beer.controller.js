import chalk from "chalk";
import FalabelaRepository from '../repository/falabela-repository'
import axios from "axios"
import http from 'http'

const AppDAO = require('../dao/dao')

class Beer {
  constructor() {
    this._logger = chalk;
    this._dao = new AppDAO('./database.sqlite3')
  }

  async getAllBeers(req, res) {
      const eventRepo = new FalabelaRepository(this._dao)
        console.log(`${this._logger.green("[ getAll controller ]")}`)
        eventRepo.getAll().then((data) => {
          console.log(data)
          return res.send(data)
        }).catch((e) => {
          return res.status(400).send()
        })
  
  }

  async getBeerById(req, res) {
    const eventRepo = new FalabelaRepository(this._dao)
      console.log(`${this._logger.green("[ getBeerById controller ]")}`)
      eventRepo.getById(req.params.beerID).then((data) => {
        if(typeof data === "undefined" || data.length == 0) return res.status(404).send()
        return res.send(data)
      })
   }
  async addBeer(req, res) {
    const beerRepo = new FalabelaRepository(this._dao)
    beerRepo.createTable().then(() => {
      console.log(`${this._logger.green("[ createEvent controller ]")} -> ${JSON.stringify(req.body)}`) 
      beerRepo.getById(req.body.Id).then((data) => {
        if(data !== undefined) return res.status(409).send()
        beerRepo.create(req.body).then((data) => {
          return res.status(201).send()
        }).catch((e) => {
          return res.status(400).send()
        })
      }).catch((e) => {
        return res.status(400).send()
      })
    })
  }

  async getBeerBoxPrice(req, res) {
    const eventRepo = new FalabelaRepository(this._dao)
      console.log(`${this._logger.green("[ getBeerBoxPrice controller ]")}`)
      eventRepo.getById(req.params.beerID).then(async (data) => {
        if(typeof data === "undefined" || data.length == 0) return res.status(404).send()
        let { Price, Currency } = data
        let currency = await this.checkCurrency(Currency)
        let { quotes } = currency
        // Precio en Moneda Registrada
        let Price_Total = req.query.quantity * Price * quotes[`USD${Currency}`]
    
        return res.send({ "BeerBox": { "Precio_Total": Price_Total }})
      })
   }

   async checkCurrency(name) {
    console.log(`${this._logger.green('[ Init checkCurrency ] ')} name: ${name}`)
     const options = {
       method: "GET",
       url: `http://www.apilayer.net/api/live?access_key=fe0eb3d63a98df989b9cdeed3175b62f&currencies=CLP,USD,${name}&format=1`
     }
     try {
       return await this.callRest(options)    
     }
     catch(e) {
       console.log(`${this._logger.red('[ Error checkCurrency ] ')} -> : ${e}`)
       return {}
     }
 }

 async callRest(options) {
  return await new Promise((resolve, reject) => {
    options.httpAgent = new http.Agent({
      rejectUnauthorized: false
    })
    axios(options)
      .then(response => {
        let respuesta = response.data;
        if (respuesta.Error == null) {
         console.log(`${this._logger.green('[ callRest ] ')} result: ${JSON.stringify(respuesta)}`)
          return resolve(respuesta)
        } else {
          console.log(`${this._logger.red('[ callRest ] ')} result: 400`)
          return reject(new Error("400"))
        }
      })
      .catch(error => {
        console.log( error.response.status === 401 ? `${this._logger.green('[ callRest ] ')} result: ${error.response.data}` : `${this._logger.red('[ Error ] ')} result-: ${error.response.status}`)
        return  error.response.status === 401 ? resolve( { code: error.response.status, message: error.response.data } ) : reject(new Error("500"))
      })
})
}
}

const beerController = new Beer()
export default beerController
