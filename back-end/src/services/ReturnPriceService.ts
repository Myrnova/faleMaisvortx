

interface IRequest{
  origin: string,
  destiny: string,
  time: number,
  planMinutes: number,
}

interface IPredefinedValues {
  [key: number]: {
    origin: string,
    destiny: string,
    priceMinute: number
  }
}



const PredefinedValues: IPredefinedValues = {
  1: {
    origin: '011',
    destiny: '016',
    priceMinute: 1.90
  },
  2: {
    origin: '016',
    destiny: '011',
    priceMinute: 2.90
  },
  3: {
    origin: '011',
    destiny: '017',
    priceMinute: 1.70
  },
  4: {
    origin: '017',
    destiny: '011',
    priceMinute: 2.70
  },
  5: {
    origin: '011',
    destiny: '018',
    priceMinute: 0.90
  },
  6: {
    origin: '018',
    destiny: '011',
    priceMinute: 1.90
  }
}


class ReturnPriceService{
  public calculate({origin, destiny, time, planMinutes}: IRequest) {
    let value = 0;
    for(var key in PredefinedValues){
      if(PredefinedValues[key].origin === origin && PredefinedValues[key].destiny === destiny){
        if(planMinutes){
          if(planMinutes < time) {
             value = (time - planMinutes) * (PredefinedValues[key].priceMinute * 1.1);
             break;
          }
          else {
             value = 0;
             break;
          }
          }else{
             value = time * PredefinedValues[key].priceMinute;
             break;
          }
      }else{
        value = -1;

      }
     }
     return value.toFixed(2);
  }

  public transformToCurrency(value : string){
    let valueFormatted = Number(value);
    if(valueFormatted != -1){
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueFormatted)
  }else{
    return "-"
  }

  }
}

export default ReturnPriceService;
/* var formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL', */
