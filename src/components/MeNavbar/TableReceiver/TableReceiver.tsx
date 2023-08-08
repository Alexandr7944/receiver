import React from 'react';
import './TableReceiver-style.css';
import { Receiver, ReceiverObject } from '../../../interfaces/Receiver';
import { Table } from 'react-bootstrap';

type TableReceiverProps = {
  monthRow: ReceiverObject,
  item: Receiver,
  prevItem?: Receiver,
};

export const TableReceiver: React.FC<TableReceiverProps> = ({ monthRow, item, prevItem }) => {
  console.log(item);
  
  const totalPayment = Number(
    ((item.energy - (prevItem?.energy || 0)) * monthRow.priceEnergy + 
    (item.water - (prevItem?.water || 0)) * monthRow.priceWater).toFixed(2)
  );
  
  return (
    <div className='table-receiver mb-5'>
      <strong>Оплата коммунальных услуг за {monthRow.date}</strong>
      <strong>Адрес: с. Веселое, пер. Васильковый, д. 33 "Д", пом. {item.number}</strong>
      
      <Table bordered className='text-center'>
        <thead>
          <tr>
            <td colSpan={8} className='text-start'>Расчет оплаты коммунальных услуг</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Вид услуги, ед. изм.</td>
            <td>Предыдущие показания</td>
            <td>Текущие показания</td>
            <td>Тариф, руб.</td>
            <td>Начислено за расчетный период</td>
            <td>Долг (+)/аванс (-)</td>
            <td>Итого к оплате</td>
            <td>Оплатил сумму</td>
          </tr>
          <tr>
            <td>Электроэнергия</td>
            <td>{prevItem?.energy || 0}</td>
            <td>{item.energy}</td>
            <td>{monthRow.priceEnergy}</td>
            <td rowSpan={2}>{totalPayment}</td>
            <td rowSpan={3}>{item.debt}</td>
            <td rowSpan={3}>{item.amount}</td>
            <td rowSpan={3}></td>
          </tr>
          <tr>
            <td>Водоснабжение</td>
            <td>{prevItem?.water || 0}</td>
            <td>{item.water}</td>
            <td>{monthRow.priceWater}</td>
          </tr>
          <tr>
            <td colSpan={4} className='text-start'>Общедомовые нужды, общедомовое электричество ТО септика, расходные материалы</td>
            <td>{item.housePayment}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
