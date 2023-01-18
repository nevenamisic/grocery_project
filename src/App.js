import List from './List'
import Alert from './Alert';
import { useState } from 'react';
import { useEffect } from 'react';

const getLocalStorage = () => { //ovo pisem da bi mi se sacuvale vrednosti kad ucitam stranicu 
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({show: false, msg:'', type: ''})


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true, 'danger', 'enter value')
    }
    else if(name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID) { //id kod editItem koji zelim da editujem
          return{...item,title: name} //ostavi isti id, promeni title
        }
        return item
      })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    }
    else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, type='', msg='') => {  
    setAlert({show, type, msg}) //da ne bih svuda gore za showAlert pisala show:true, type:danger itd, i tu su default vrednosti
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id)) //vrati mi u listu samo one ciji se id ne poklapaju 
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id) //ako se id poklapaju, vrati mi njih
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>} {/*koristim ...alert, da bih imala pristup show, msg, type*/}
        {/*removeAlert={showAlert} jer mi je u showAlert show=false, i to mi i treba kod useEffect*/}
        <h3>grocery list</h3>
        <div className="form-control">
          <input 
            type='text'
            className='grocery' 
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && ( 
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className="clear-btn" onClick={clearList}>clear items</button>
      </div>
      )}
    </section>
  );
}

export default App;
