import { Button, Container, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { Receiver, ReceiverObject } from '../interfaces/Receiver';
import useJsonFetch from '../hooks/useJsonFetch';

const NewReceiverPage = () => {
  const [newReceiver, setNewReceiver] = useState<ReceiverObject>();  
  const [lastReceiver] = useJsonFetch<ReceiverObject>('http://localhost:3000/api/last');
  console.log(lastReceiver);
  
  useEffect(() => {
    lastReceiver && 
    (typeof lastReceiver !== 'string' && typeof lastReceiver !== 'boolean') &&
    setNewReceiver(lastReceiver);
  }, [lastReceiver])

  const handlerChanged = (type: string, event: React.FormEvent, receiver?: Receiver) => {
    const value = parseInt((event.target as HTMLInputElement).value) || 0;
    if (!newReceiver) return;
    if (type === 'priceEnergy' || type === 'priceWater') {
      return setNewReceiver({...newReceiver, [type]: value});
    }
    if (!receiver) return;

    const index = newReceiver.receiver.findIndex(i => i.number === receiver.number);
    const newData = { ...receiver, [type]: value };    

    index === -1
      ? setNewReceiver({ ...newReceiver, receiver: [...newReceiver.receiver, newData] })
      : setNewReceiver({
        ...newReceiver,
        receiver: newReceiver.receiver.map((item: Receiver) => {
          if (item.number !== receiver.number) return item;
          return { ...item, [type]: value };
        })
      });
  }
  
  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(
      'http://localhost:3000/api/new',
      {
        method: 'POST',
        body: JSON.stringify(newReceiver),
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
  
  
  return (
    <Container>
      { newReceiver && lastReceiver &&
      <Form onSubmit={handlerSubmit}>
      <Form.Group className="mb-3" controlId={'priceEnergy'}>
        <Form.Label>Тариф за электроэнергию</Form.Label>
        <Form.Control
          className='form-control border-success'
          type="text"
          defaultValue={newReceiver.priceEnergy}
          onChange={(e) => handlerChanged('priceEnergy', e)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={'priceWater'}>
        <Form.Label>Тариф на воду</Form.Label>
        <Form.Control
          className='form-control border-success'
          type="text"
          defaultValue={newReceiver.priceWater}
          onChange={(e) => handlerChanged('priceWater', e)}
        />
      </Form.Group>
        { 
          newReceiver.receiver.map(item => (
            <div className="item py-15" key={item.number}>
              <h5>Поазания квартиры № {item.number}</h5>
              <Form.Group className="mb-3" controlId={'energy' + item.number}>
                <Form.Label>Показания электросчетчика</Form.Label>
                <Form.Control
                  className='form-control border-success'
                  type="text"
                  defaultValue={item.energy}
                  onChange={(e) => handlerChanged('energy', e, item)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={'water' + item.number}>
                <Form.Label>Показания воды</Form.Label>
                <Form.Control                
                  className='form-control border-success'
                  type="text"
                  defaultValue={item.water} 
                  onChange={(e) => handlerChanged('water', e, item)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={'housePayment' + item.number}>
                <Form.Label>Общедомовой платеж</Form.Label>
                <Form.Control                
                  className='form-control border-success'
                  type="text"
                  defaultValue={item.housePayment} 
                  onChange={(e) => handlerChanged('housePayment', e, item)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={'debt' + item.number}>
                <Form.Label>Внесенный платеж за прошлый месяц</Form.Label>
                <Form.Control                
                  className='form-control border-success'
                  type="text"
                  defaultValue={item.payment}
                  onChange={(e) => handlerChanged('payment', e, item)}
                />
              </Form.Group>
            </div>
          ))
        }
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>}
    </Container>
  )
}

export default NewReceiverPage