import {useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Container, Col, Row, Modal} from 'react-bootstrap'
import { BsFillQuestionSquareFill, BsBootstrapFill, BsCurrencyEuro, BsBoxSeam, BsFillCameraFill, BsFillChatTextFill
, BsFillChatRightTextFill, BsFillFilePersonFill, BsFillHandThumbsUpFill } from 'react-icons/bs'

export const Store = () => {



  
  const [storeItems, setStoreItems] = useState([])
  const [itemReviews, setItemReviews] = useState([])
  const [storeItem, setStoreItem] = useState([])
  const [showID, setshowID] = useState('')
  const [showEditItem, setShowEditItem] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemQty, setItemQty] = useState('')
  const [itemImageUrl, setItemImageUrl] = useState('')
  const [editError, setEditError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [addItemError, setAddItemError] = useState('')
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [showReview, setShowReview] = useState('')
  const [buyCount, setBuyCount] = useState('')
  const [buyError, setBuyError] = useState('')






    useEffect(() => {
        const getStoreItems = async () => {
          const storeItemsFromServer = await fetchStoreItems()
          setStoreItems(storeItemsFromServer)
        }
        getStoreItems()

      }, [])

      

      // Show Add Form
     const handleShowAddForm = () => {
      setItemDescription('')
      setItemName('')
      setItemPrice('')
      setItemQty('')
      setItemImageUrl('')

      setShowAddForm(true);

    }
  
     // Close Add Form info
     const handleCloseAddForm = () => {
      setItemName('')
      setItemDescription('')
      setItemImageUrl('')
      setItemPrice('')
      setItemQty('')
      setShowAddForm(false);
     }

    // Fetch store items
    const fetchStoreItems = async () => {
    const res =  await fetch("https://martynasdrestapi.azurewebsites.net/api/store", {
    method: 'GET'})

    const data = await res.json()
    return data
  }

     // Fetch item reviews
    const fetchItemReviews = async () => {
        if(storeItem['id'] === undefined) return;
        else {
        const res =  await fetch(`https://martynasdrestapi.azurewebsites.net/api/store/${storeItem['id']}/reviews`, {
        method: 'GET'
        })

        const data = await res.json()
        return data
        }
      }

      // DELETE REVIEW
      const deleteReview = async (id) => {
        const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/store/${storeItem['id']}/reviews/${id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Authorization': `Bearer ${localStorage['token']}`, 
            'Content-Type': 'application/json'
          })

          
        })
        console.log(await res.json());
      }

      const handleDeleteItem = async (id) => {
      await  deleteItem(id);      
      setshowID('')
      setStoreItem('');
      window.location.reload();
      }

           // DELETE Item
           const deleteItem = async () => {
            await fetch(`https://martynasdrestapi.azurewebsites.net/api/store/${storeItem['id']}`, {
              method: 'DELETE',
              headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage['token']}` 
              })
              
            }).catch(error => {
              alert('Request failed.');
              return '';
            });

         
          }
    
          const handleDeleteReview = async (id) => {
          await  deleteReview(id);      
          }

    const [showInfo, setShowInfo] = useState(false);

    const getItemReviews = async () => {
      const itemReviewsFromServer = await fetchItemReviews()
      setItemReviews(itemReviewsFromServer)
    }

     // Show info
     const handleShowInfo = () => {
      setShowInfo(true);
      setShowEditItem(false);

    }
  
     // Close info
     const handleCloseInfo = () => {
       setShowInfo(false);
       setshowID('');
       
       setShowReview(false);
       setReviewName('');
       setReviewText('');
       setReviewRating('');
       setShowReview('')

       setItemName('')
       setItemDescription('')
       setItemImageUrl('')
       setItemPrice('')
       setItemQty('')

       setBuyCount('')
       
       setShowEditItem(false);
     }

     const handleStoreItem = (item) => {
       if(item === storeItem) return;
       else {
         setStoreItem(item);
         getItemReviews();
       }
     }

     const handleEdit = async (e) => {

      e.preventDefault();

      if(itemName === '') 
      {
        setEditError('Item name cannot be empty');
        return;
      }

      if(itemDescription === '') 
      {
        setEditError('Item description cannot be empty');
        return;
      }

      if(itemPrice === '') 
      {
        setEditError('Item price cannot be empty');
        return;
      }

      if(itemImageUrl === '') 
      {
        setEditError('Item URL cannot be empty');
        return;
      }

      if(itemQty === '') 
      {
        setEditError('Item description cannot be empty');
        return;
      }

      let editInfo =  {
        itemName:`${itemName}`,
        description:`${itemDescription}`,
        price:`${itemPrice}`,
        qty:`${itemQty}`,
        imageUrl:`${itemImageUrl}`
      };

      await editItem(editInfo);
      window.location.reload(false);
    }

  // Edit API request
  const editItem = async (editJSON) => {
    const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/store/${storeItem['id']}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage['token']}`
      },
      body: JSON.stringify(editJSON),
    })
    .catch(error => {
      setEditError('Request failed.');
      return '';
    });

    const data = await res.json();

    return data;
    
  }

  // Handle add store item form on submit
  const handleAddStoreItem = async (e) => {
    
      e.preventDefault();

      if(itemName === '') 
      {
        setAddItemError('Item name cannot be empty');
        return;
      }

      if(itemDescription === '') 
      {
        setAddItemError('Item description cannot be empty');
        return;
      }

      if(itemPrice === '') 
      {
        setAddItemError('Item price cannot be empty');
        return;
      }

      if(itemImageUrl === '') 
      {
        setAddItemError('Item URL cannot be empty');
        return;
      }

      if(itemQty === '') 
      {
        setAddItemError('Item description cannot be empty');
        return;
      }

      let addItemInfo =  {
        itemName:`${itemName}`,
        description:`${itemDescription}`,
        price:`${itemPrice}`,
        qty:`${itemQty}`,
        imageUrl:`${itemImageUrl}`
      };

      await addItem(addItemInfo);

      setShowAddForm(false);
      alert("New item added.")
      window.location.reload(false);

  }
  
    // Add item API request
    const addItem = async (AddJSON) => {
      const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/store`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage['token']}`
        },
        body: JSON.stringify(AddJSON),
      })
      .catch(error => {
        setAddItemError('Request failed.');
        return '';
      });
  
      const data = await res.json();
  
      return data;
      
    }
    
  // Handle add review
  const handleAddReview = async (e) => {
    
    e.preventDefault();

    if(reviewName === '') 
    {
      setReviewError('Reviewer name cannot be empty');
      return;
    }

    if(reviewText === '') 
    {
      setReviewError('Review text cannot be empty');
      return;
    }

    if(reviewRating === '') 
    {
      setReviewError('Review rating cannot be empty');
      return;
    }

    if(0 > reviewRating || 10 < reviewRating ) 
    {
      setReviewError('Review rating must be between 1 and 10');
      return;
    }

    let reviewInfo =  {
      rating:`${reviewRating}`,
      reviewName:`${reviewName}`,
      reviewText:`${reviewText}`
    };

    await addReview(reviewInfo);

    setShowReview(false);
    setReviewName('');
    setReviewText('');
    setReviewRating('');
    alert("New review added.")

}

  // Add item API request
  const addReview = async (AddJSON) => {
    const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/store/${storeItem['id']}/reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(AddJSON),
    })
    .catch(error => {
      setReviewError('Request failed.');
      return '';
    });

    const data = await res.json()
    .catch(error => {
      setReviewError('Request failed.');
      return '';
    });;

    return data;
    
  }

  const handlePurchase = async (e) => {
    
    if(buyCount === '' || buyCount > storeItem['qty']) {
      setBuyError('Please enter a number between 1 and max quantity')
      return;
    }

    let purchaseINFO =  {
      buyerID:`${localStorage['userId']}`,
      items: [
        {id:`${storeItem['id']}`,
         qty:`${buyCount}`}
      ]
    };

    let inventoryDTO = {
      itemName:`${storeItem['itemName']}`,
      description:`${storeItem['description']}`,
      imageUrl:`${storeItem['imageUrl']}`
    }

    for(let i = 0; i < buyCount; i++) {
      await addInventoryItem(inventoryDTO)
    }    

    const data = await addPurchase(purchaseINFO);

    setBuyCount('');
    setBuyError('')
    setShowInfo(false)
    setStoreItem('')

    return data;
  }

  const addPurchase = async (AddJSON) => {

    const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/purchases`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage['token']}`
      },
      body: JSON.stringify(AddJSON),
    })
    .catch(error => {
      setBuyError('Request failed.');
      return '';
    });

    const data = await res.json()
    .catch(error => {
      setBuyError('Request failed.');
      return '';
    });;

    return data;
    
  }

  const addInventoryItem = async (AddJSON) => {

    const res = await fetch(`https://martynasdrestapi.azurewebsites.net/api/users/${localStorage['userId']}/inventory`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage['token']}`
      },
      body: JSON.stringify(AddJSON),
    })
    .catch(error => {
      setBuyError('Request failed.');
      console.log('HERE')
      return '';
    });

    const data = await res.json()
    .catch(error => {
      setBuyError('Request failed.');
      console.log('HERE2')
      return '';
    });;

    return data;
    
  }
    

    return (
        <div className='content'>
            <CSSTransition in={true}
                   appear={true}
                   timeout={500}
                   classNames="fade"
                   unmountOnExit>
            <Container >
            {localStorage['role'] === 'Admin' ? (<Row><Col lg={12} sm={12}><button className='btn' onClick={handleShowAddForm}>[ADMIN ONLY] Add new item.</button></Col></Row>) : (<></>) }
            {storeItems.length > 0 ? 
            (<Row className='justify-content: space-between'>
            {storeItems.map((item) => (
            <Col sm={6} lg={4} onClick={async () => {
              setshowID(item['id']);
              await getItemReviews(item['id']);
              handleShowInfo();
              }} className='card-box' key={item['id']}>
              <b>{item['itemName']}</b>
              <div className='image-box'><img src={require(`../${item['imageUrl']}`)} alt='error'></img></div>
              <Row>
              <Col lg={6} sm={6}><b>Price:</b> <br/>{item['price']}</Col>
              <Col lg={6} sm={6}><b>Qty:</b><br/> {item['qty']}</Col>
              </Row>
            </Col>))}
            </Row>)
       : ('No store items were loaded.')}
            </Container>
            </CSSTransition>

            <Modal show={showInfo} onHide={handleCloseInfo}>
          { storeItems.map((item) => {
            if(item['id'] === showID) {
              handleStoreItem(item);
              getItemReviews(item['id']);
            }

            return null;

            }) 
          }
<Modal.Header>
<Modal.Title>{storeItem['itemName']}</Modal.Title>
<button className='float: right; btn' style={{backgroundColor:'red'}} onClick={handleCloseInfo}>Cancel</button>
</Modal.Header>
<Modal.Body>
{ localStorage['role'] === 'Admin' ? (<div className='margin:10px'><button className='float: left; btn' style={{backgroundColor:'red'}} onClick={handleDeleteItem}>DELETE ITEM</button>
<button className='float: right; btn' onClick={() => setShowEditItem(!showEditItem)}>EDIT ITEM</button></div>) : (<></>)}
{ localStorage['username'] !== undefined ? (<div className="input-group form-group">
               <input id="buy_count" style={{marginTop:'10px'}} type="number" className="form-control" min="1" step="1" max={`${storeItem['qty']}`} placeholder='How much would you like to buy?' onChange={(e) => setBuyCount(e.target.value)}/>
               <button className='btn' onClick={(e) => {handlePurchase(e)}}>Buy</button>
               <h4 className='error-msg'>{buyError}</h4>
</div>) : (<></>)} {/* Review form */}
{ showEditItem ? (
  <form>
					<div className="margin-top:10px; input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsBootstrapFill/></span>
						</div>
						<input id="edit_itemname" type="text" className="form-control" placeholder={`${storeItem['itemName']}`} onChange={(e) => setItemName(e.target.value)}/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsFillQuestionSquareFill/></span>
						</div>
						<input id="edit_itemdesc" type="text" className="form-control" placeholder={`${storeItem['description']}`} onChange={(e) => setItemDescription(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsCurrencyEuro/></span>
						</div>
						<input id="edit_price" type="number" className="form-control" min="0" step="0.01" placeholder={`${storeItem['price']}`} onChange={(e) => setItemPrice(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsBoxSeam/></span>
						</div>
						<input id="edit_qty" type="number" className="form-control" min="0" placeholder={`${storeItem['qty']}`} onChange={(e) => setItemQty(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsFillCameraFill/></span>
						</div>
						<input id="edit_url" type="text" className="form-control" minLength='1' placeholder={`${storeItem['imageUrl']}`} onChange={(e) => setItemImageUrl(e.target.value)}/>
					</div>
          <h4 className="error-msg">{editError}</h4>
          <button className='btn' onClick={(e) => (handleEdit(e))}>Save</button>
				</form>) : (<></>) 
}
{ storeItem['imageUrl'] !== undefined ? (<div className='image-box'><img src={require(`../${storeItem['imageUrl']}`)} alt='error'></img></div>) : (<></>)}
<h5><i>{storeItem['description']}</i></h5>
<div><h5>Price: <i>{storeItem['price']}</i></h5><h5> Qty: <i>{storeItem['qty']}</i></h5></div>
<button className='btn' onClick={() => setShowReview(!showReview)}><BsFillChatTextFill/></button>
{ /* Add review form*/}
{ showReview ? 
  (
    <form>
    <div className="margin-top:10px; input-group form-group">
      <div className="input-group-prepend">
        <span className="input-group-text"><BsFillFilePersonFill/></span>
      </div>
      <input id="review_name" type="text" className="form-control" placeholder='Reviewers name' onChange={(e) => setReviewName(e.target.value)}/>
    </div>
    <div className="input-group form-group">
      <div className="input-group-prepend">
        <span className="input-group-text"><BsFillChatRightTextFill/></span>
      </div>
      <input id="review_text" type="text" className="form-control" placeholder='Comment' onChange={(e) => setReviewText(e.target.value)}/>
    </div>
    <div className="input-group form-group">
      <div className="input-group-prepend">
        <span className="input-group-text"><BsFillHandThumbsUpFill/></span>
      </div>
      <input id="review_rating" type="number" className="form-control" min="1" step="1" max="10" placeholder='Rating from 1 to 10' onChange={(e) => setReviewRating(e.target.value)}/>
    </div>
    <h4 className="error-msg">{reviewError}</h4>
    <button className='btn' onClick={(e) => (handleAddReview(e))}>Post</button>
  </form>
  )

  :(<></>)
}
{ /* Add review form over*/}
<div className='container-box'>
  { itemReviews !== undefined ? 
  (<div><span><h3>Reviews</h3></span>
      {itemReviews.length > 0 ? (
        itemReviews.map((review) => (
          <div className='review-box'><h5><b>{review['reviewName']}</b> (product rating:  <i>{review['rating']}</i>) says: </h5><p> {review['reviewText']} </p>
          {localStorage['role'] === 'Admin' ? (<button className='btn danger' onClick={
            () => (handleDeleteReview(review['id']))
          }>[ADMIN ONLY] DELETE</button>) : (<></>)}</div>
        ))
      ) : (<></>)}</div>
  ) : (<></>) }
</div>
</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>

{/* Add item form */
}
<Modal show={showAddForm} onHide={handleCloseAddForm}>
<Modal.Header>
<Modal.Title>Add new store item.</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
					<div className="margin-top:10px; input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsBootstrapFill/></span>
						</div>
						<input id="add_itemname" type="text" className="form-control" placeholder='Item name' onChange={(e) => setItemName(e.target.value)}/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsFillQuestionSquareFill/></span>
						</div>
						<input id="add_itemdesc" type="text" className="form-control" placeholder='Description' onChange={(e) => setItemDescription(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsCurrencyEuro/></span>
						</div>
						<input id="add_price" type="number" className="form-control" min="0" step="0.01" placeholder='Price' onChange={(e) => setItemPrice(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsBoxSeam/></span>
						</div>
						<input id="add_qty" type="number" className="form-control" min="0" placeholder='Quantity' onChange={(e) => setItemQty(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><BsFillCameraFill/></span>
						</div>
						<input id="add_url" type="text" className="form-control" minLength='1' placeholder='Image URL' onChange={(e) => setItemImageUrl(e.target.value)}/>
					</div>
          <h4 className="error-msg">{addItemError}</h4>
          <button className='btn' onClick={(e) => (handleAddStoreItem(e))}>Save</button>
				</form>
        </Modal.Body>
<Modal.Footer>
 <h4 className="error-msg">{addItemError}</h4>
<button className='btn' style={{backgroundColor:'red'}} onClick={handleCloseAddForm}>Cancel</button>
</Modal.Footer>
</Modal>
        </div>
    )
}

export default Store;
