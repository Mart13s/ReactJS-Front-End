import {React, useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'

export const Purchases = () => {
    
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        const getPurchases = async () => {
          const purchasesFromServer = await fetchPurchases()
          setPurchases(purchasesFromServer)
        }
        getPurchases()
     

      }, [])
     
    // Fetch store items
    const fetchPurchases = async () => {
        const res =  await fetch("https://martynasdrestapi.azurewebsites.net/api/purchases", {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage['token']}`, 
            'Content-Type': 'application/json'
          })})
        const data = await res.json()
        return data

      }

    return (
        <div className='content'>
            <CSSTransition in={true}
                   appear={true}
                   timeout={500}
                   classNames="fade"
                   unmountOnExit>
            <div><h1>Purchases.</h1>
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                    <th scope="col">Purchase ID</th>
                    <th scope="col">Buyer ID</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Count</th>
                    <th scope="col">Total Cost</th>
                    </tr>
              </thead>
              { purchases.length > 0 ?
              (<tbody>
                  {purchases.map((p) => (
                <>
                         { localStorage['role'] === 'Admin' || p['buyerID'] == localStorage['userId'] ?
                          (<tr><td>{p['id']}</td>
                          <td>{p['buyerID']}</td>
                          <td>{p['items'][0]['itemName']}</td>
                          <td>{p['items'][0]['qty']}</td>
                          <td>{p['totalCost']}</td></tr>)
                            :(<></>)
                         }
                         </>

                     ))}
              </tbody>) : (<></>)
                }
              </table>
              </div>
            </CSSTransition>
        </div>
    )
}

export default Purchases;