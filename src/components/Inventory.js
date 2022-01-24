import {React, useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'
import { BsSdCardFill, BsXLg, BsBootstrapFill, BsFillQuestionSquareFill, BsFillCameraFill } from "react-icons/bs";
import { Modal } from 'react-bootstrap';

export const Inventory = () => {
    
    const [inventory, setInventory] = useState([])
    const [itemID, setItemID] = useState('') 
    const [showModal, setShowModal] = useState(false)
    const [editItemError, setEditItemError] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemURL, setItemUrl] = useState('')
    const [item, setItem] = useState([])

    useEffect(() => {
        const getInventory = async () => {
          const inventoryFromServer = await fetchInventory()
          setInventory(inventoryFromServer)
        }
        getInventory()
     

      }, [])

      const handleCloseModal = () => {
          setShowModal(false);
          setItemID('');
          setItem('');
          setItemName('');
          setItemDescription('');
          setItemUrl('');
      }
     
    // Fetch store items
    const fetchInventory = async () => {
        const res =  await fetch(`https://martynasdrestapi.azurewebsites.net/api/users/${localStorage['userId']}/inventory`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage['token']}`, 
            'Content-Type': 'application/json'
          })})
        const data = await res.json()
        return data

      }

      const handleEdit = async (e) => {

        e.preventDefault();
  
        if(itemName === '') 
        {
          setEditItemError('Item name cannot be empty');
          return;
        }
  
        if(itemDescription === '') 
        {
          setEditItemError('Item description cannot be empty');
          return;
        }
  
        if(itemURL === '') 
        {
          setEditItemError('Item URL cannot be empty');
          return;
        }

        let editInfo =  {
          itemName:`${itemName}`,
          description:`${itemDescription}`,
          imageUrl:`${itemURL}`
        };
  
        await editItem(editInfo);

        handleCloseModal();
        window.location.reload(false);
      }
  
    // Edit API request
    const editItem = async (editJSON) => {
      const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/users/${localStorage['userId']}/inventory/${itemID}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage['token']}`
        },
        body: JSON.stringify(editJSON),
      })
      .catch(error => {
        setEditItemError('Request failed.');
        return '';
      });
  
      const data = await res.json();
  
      return data;
      
    }
      const handleDelete = async (q) => {
        await deleteItem(q);
        setItemID('')
        setItem('')
        window.location.reload(false);
    }

    // Delete API request
    const deleteItem = async (q) => {
        const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/users/${localStorage['userId']}/inventory/${q}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage['token']}`
          }
        })
        .catch(error => {
          setEditItemError('Request failed.');
          return '';
        });
    
        const data = await res.json().catch(error => {
            setEditItemError('Request failed.');
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
            <div><h1>Inventory.</h1>
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                    <th scope="col">Item ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Description</th>
                    {localStorage['role'] === 'Admin' ? (<th scope="col">Edit/Del [Admin]</th>) : (<></>)}

                    </tr>
              </thead>
              { inventory.length > 0 ?
              (<tbody>
                  {inventory.map((i) => (
                          <>
                          <tr><td className='align-middle'>{i['id']}</td>
                          <td className='align-middle'><img style={{maxWidth:'95px', maxHeight:'113px'}} src={require(`../${i['imageUrl']}`)} alt='error'></img></td>
                          <td className='align-middle'>{i['itemName']}</td>
                          <td className='align-middle'>{i['description']}</td>
                          {localStorage['role'] === 'Admin' ? (
                          <td className='align-middle'>
                          <button className='btn btn-primary' onClick={(e) => { setItemID(i['id']); setItem(i); setShowModal(true)}}><BsSdCardFill/></button>
                          <button className='btn btn-danger'  onClick={(e) => { setItemID(i['id']); setItem(i); handleDelete(i['id'])}}><BsXLg/></button>
                          </td>) : (<></>)}
                          
                          </tr>
                            
                         </>

                     ))}
              </tbody>) : (<></>)
                }
              </table>

              {/* Editing item Modal*/}
              {
                showModal ? (<><Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                    <Modal.Title>EDIT existing inventory item.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                                        <div className="margin-top:10px; input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><BsBootstrapFill/></span>
                                            </div>
                                            <input id="edit_itemname" type="text" className="form-control" placeholder={item['itemName']} onChange={(e) => setItemName(e.target.value)}/>
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><BsFillQuestionSquareFill/></span>
                                            </div>
                                            <input id="edit_itemdesc" type="text" className="form-control" placeholder={item['description']} onChange={(e) => setItemDescription(e.target.value)}/>
                                        </div>
                              <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><BsFillCameraFill/></span>
                                            </div>
                                            <input id="edit_url" type="text" className="form-control" minLength='1' placeholder={item['imageUrl']} onChange={(e) => setItemUrl(e.target.value)}/>
                                        </div>
                              <h4 className="error-msg">{editItemError}</h4>
                              <button className='btn' onClick={(e) => (handleEdit(e))}>Save</button>
                                    </form>
                            </Modal.Body>
                    <Modal.Footer>
                    <button className='btn' style={{backgroundColor:'red'}} onClick={handleCloseModal}>Cancel</button>
                    </Modal.Footer>
                    </Modal></>)
                
                :(<></>)
              }
              </div>
            </CSSTransition>
        </div>
    )
}

export default Inventory;