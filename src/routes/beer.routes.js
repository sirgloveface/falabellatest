import express from "express"
const router = express.Router()
import beerController from "../controllers/beer.controller"


router.get("/", (req, res) => {
  return beerController.getAllBeers(req, res)
})
router.post("/", (req, res) => {
  return beerController.addBeer(req, res)
})

router.get("/:beerID", (req, res) => {
  return beerController.getBeerById(req, res)
})

router.get("/:beerID/boxprice", (req, res) => {
  return beerController.getBeerBoxPrice(req, res)
})
export default router
