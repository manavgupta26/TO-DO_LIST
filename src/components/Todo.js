import React, { useEffect, useState } from 'react'
import "./style.css"
//fetch data from local storage
const getlocalData=()=>{
  const lists=localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return []; 
  }
}
//this is used when the user clicks on edit the data shows on the input fieeld and is also updated
//in the local host
const Todo = () => {
  const [inputData,setInputData]=useState("");
  const [items,setItems]=useState(getlocalData());
  const [isedcitItem,setisEdititem]=useState("");
  const [togglebtn,setToggleBtn]=useState(false);
  const addItem=()=>{
    if(!inputData){
      alert("please fill the data");
    }
    else if(inputData && togglebtn){
      setItems(
        items.map((currElem)=>{
            if(currElem.id===isedcitItem){
              return {...currElem,name:inputData};
            }
            return currElem;
        })
      )
      setInputData([]);
      setisEdititem(null); 
      setToggleBtn(false);
    }
    else{
      const myNewInputData={
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items,myNewInputData]);
      setInputData('');
    }
  };
  //edit the already existing task
  //first it finds the given task with its unique id
  //then if it finds then it sets it to input data and let the user edit the task.
const editItem=(index)=>{
  const item_todo_edited=items.find((currElem)=>{
    return currElem.id===index;
  });
    setInputData(item_todo_edited.name);
    setisEdititem(index);
    setToggleBtn(true);
};
//delete a task
//first the updateditem searches for the task in the list
//if found then it returns alll other tasks except for the selected task
  const deleteItem=(index)=>{
    const updatedItem=items.filter((currElem)=>{
      return currElem.id!==index;
    });
    setItems(updatedItem);
  }
  //clear list button
  const removeAll=()=>{
    setItems([]);
  }
  useEffect (()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items))
  }, [items]);
  return (
    <>
      <div className="parent">
        <div className="box">
          <img src="./images/notes.svg" alt="" />
          <figcaption>Add your tasks here</figcaption>
          <div className="input-box">
            <input type="text" placeholder='✍️add task' value={inputData} onChange={(event)=> setInputData(event.target.value)}/>
            {togglebtn ? <button onClick={addItem}><i class="fa-solid fa-pen-to-square"></i></button> : <button onClick={addItem}><i class="fa-solid fa-plus"></i></button>}
          </div>
          <div className='showbox'>
            {items.map((currElem,ind)=>{
              return(
                <div className="show" key={currElem.id}>
                <h3>{currElem.name}</h3>
            <div className='btn-grp'>
            <i class="fa-solid fa-pen-to-square" onClick={()=>{ editItem(currElem.id)}}></i>
            <i class="fa-solid fa-trash" onClick={()=> deleteItem(currElem.id)}></i>
            </div>
            </div>
              );
            })}
          </div>
          <button onClick={removeAll} id='clear'>Clear list</button>
       
        </div>
      </div>
    </>
  )
};

export default Todo;
