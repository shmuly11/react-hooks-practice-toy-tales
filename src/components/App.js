import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() =>{
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(setToys)
  },[])

  function handleNewToy(newToy){
    // console.log(newToy)
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(res=> res.json())
    .then(toy => setToys(toys=>[...toys, toy]))
    
  }

  function handleDonate(id){
    fetch(`http://localhost:3001/toys/${id}`,{
      method: "DELETE"
    })
    const newToys = toys.filter(toy => id !== toy.id)
    setToys(newToys)
  }

  function handleLike(id, likes){
    // console.log(likes + 1)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: likes + 1})
    })
    .then(res => res.json())
    .then(likedToy => {
      const newToys = toys.map( toy=> {
        if(toy.id === id){
          return {...toy, likes: likes + 1}
        } else {
          return toy
        }
      })
      setToys(newToys)
    })
    
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onNewToy={handleNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDonate={handleDonate} onLike={handleLike}/>
    </>
  );
}

export default App;
