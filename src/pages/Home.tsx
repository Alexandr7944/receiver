import { useState } from 'react';
import { Container, Dropdown, Spinner } from 'react-bootstrap';
import useJsonFetch from '../hooks/useJsonFetch';
import { Receiver, ReceiverObject } from '../interfaces/Receiver';
import { TableReceiver } from '../components/MeNavbar/TableReceiver/TableReceiver';

export const Home = () => {
  const [data, loading] = useJsonFetch<ReceiverObject>('http://localhost:3000/api/all');
  const [date, setDate] = useState('');

  let prevFilterData: ReceiverObject | null = null;

  const dataFilter = Array.isArray(data) && data.filter((item, index, arr) => {
    if (item.date !== date) return;
    prevFilterData = arr[index - 1];      
    return item;
  })

  return (
    <Container>
      <Dropdown className='my-4'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Выбрать месяц
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { Array.isArray(data) && data.length > 0 &&
            [...data].reverse()
              .map((i) => <Dropdown.Item 
                key={i.date}
                onClick={() => setDate(i.date)}
                >{i.date}</Dropdown.Item>
              )
          }
        </Dropdown.Menu>
      </Dropdown>

      { dataFilter &&
        dataFilter.map((monthRow) => (
          <div  className='mb-5' key={monthRow.date}>
            <h3 className='mb-3'>{monthRow.date}</h3>
            { 
              monthRow.receiver.map((item: Receiver, index: number) => (
                <div className="receiver" key={item.number}>
                  <TableReceiver
                    monthRow={monthRow}
                    item={item}
                    prevItem={
                      prevFilterData?.receiver &&
                      prevFilterData.receiver[index]
                    }
                  />
                </div>
              ))
            }
          </div>
        ))
      }
      {
        loading &&
        <Spinner animation="border" role="status" className='text-center'>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }
    </Container>
  )
}
