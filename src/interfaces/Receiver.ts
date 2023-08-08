interface Receiver {
  number: string,
  water: number,
  energy: number,
  debt: number,
  housePayment: number,
  payment: number,
  amount: number,
}

interface ReceiverObject {
  date: string,
  priceEnergy: number,
  priceWater: number,
  receiver: Receiver[]
}

export type { Receiver, ReceiverObject };