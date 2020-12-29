import { Router } from 'express'

import ReturnPriceService from '../services/ReturnPriceService'

const priceRouter = Router();


priceRouter.post('/', (req, res) => {
  try {
    const returnPrice = new ReturnPriceService();
    let typePlan;
    const {origin, destiny, time, plan} = req.body
    if(plan){
      const planSplitted = plan.split(" ");
       typePlan = planSplitted[1];
    }else{
       typePlan = 0;
    }
    let value = returnPrice.calculate({
      origin,
      destiny,
      time,
      planMinutes: typePlan
    })

    value = returnPrice.transformToCurrency(value);

  return res.json(value);
  } catch (error) {
    return res.status(400).json({ error: error.message})
  }

})



export default priceRouter;
