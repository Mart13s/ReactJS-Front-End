import {React, useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'
import { BsXLg } from "react-icons/bs";

export const Trades = () => {
    
    const [trades, setTrades] = useState([])

    useEffect(() => {
        const getTrades = async () => {
          const tradesFromServer = await fetchTrades()
          setTrades(tradesFromServer)
        }
        getTrades()
     

      }, [])

     
    // Fetch
    const fetchTrades= async () => {
        const res =  await fetch(`https://martynasdrestapi.azurewebsites.net/api/trades/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage['token']}`, 
            'Content-Type': 'application/json'
          })})
        const data = await res.json()
        return data

      }

      
      const handleDelete = async (q) => {
        await deleteItem(q);
        window.location.reload(false);
    }

    // Delete API request
    const deleteItem = async (q) => {
        const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/trades/${q}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage['token']}`
          }
        })
        .catch(error => {
          alert('Delete request failed.');
          return '';
        });
    
        const data = await res.json().catch(error => {
            alert('Delete request failed.');
            return '';
          });
    
        return data;
        
      }

    return (
        <div className='content'>
            <CSSTransition in={true}
                   appear={true}
                   timeout={500}
                   classNames="fade"
                   unmountOnExit>
            <div><h1>Trades.</h1>
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                    <th scope="col">Trade ID</th>
                    <th scope="col">Sender</th>
                    <th scope="col">Sender Item Count</th>
                    <th scope="col">Receiver</th>
                    <th scope="col">Receiver Item Count</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Status</th>
                    {localStorage['role'] === 'Admin' ? (<th scope="col">Edit/Del [Admin]</th>) : (<></>)}

                    </tr>
              </thead>
              { trades.length > 0 ?
              (<tbody>
                  {trades.map((i) => (
                          
                        <tr><td className='align-middle'>{i['id']}</td>
                          <td className='align-middle'>{i['senderID']}</td>
                          <td className='align-middle'>{i['senderItems'].length}</td>
                          <td className='align-middle'>{i['receiverID']}</td>
                          <td className='align-middle'>{i['receiverItems'].length}</td>
                          <td className='align-middle'>{i['date']}</td>
                          <td className='align-middle'>{i['status'] === 0 ? 'Sent' : <></> }
                          {i['status'] === 1 ? 'Accepted' : (<></>)}{i['status'] === 2 ? 'Declined' : <></> }
                          {i['status'] === 3 ? 'Cancelled' : <></> }{i['status'] === 4 ? 'Failed' : <></> }</td>
                          {localStorage['role'] === 'Admin' ? (
                          <td className='align-middle'>
                          <button className='btn btn-danger'  onClick={(e) => { handleDelete(i['id'])}}><BsXLg/></button>
                          </td>) : (<></>)}
                          
                          </tr>

                     ))}
              </tbody>) : (<></>)
                }
              </table>
              </div>
            </CSSTransition>
        </div>
    )
}

export default Trades;