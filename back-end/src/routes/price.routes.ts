import { Router } from 'express'

import ReturnPriceService from '../services/ReturnPriceService'

const priceRouter = Router();


priceRouter.post('/', (req, res) => {
  try {
    const returnPrice = new ReturnPriceService();
    let typePlan;
    const {origin, destiny, time, plan} = req.body
      let valueWithPlan = returnPrice.calculate({
      origin,
      destiny,
      time,
      planMinutes: plan
    })
    let valueWithoutPlan = returnPrice.calculate({
      origin,
      destiny,
      time,
      planMinutes: 0
    })


    valueWithPlan = returnPrice.transformToCurrency(valueWithPlan);
    valueWithoutPlan = returnPrice.transformToCurrency(valueWithoutPlan);

  return res.json({valueWithPlan, valueWithoutPlan});
  } catch (error) {
    return res.status(400).json({ error: error.message})
  }

})



export default priceRouter;
