import React, {useState} from "react";

function ToyForm({onNewToy}) {

  const [name, setName] = useState("")
  const [image, setImage] = useState("") 

  function handleSubmit(e){
    e.preventDefault()
    const formData = {
      name,
      image,
      likes: 0
    }
    onNewToy(formData)
    setImage("")
    setName("")
  }
  
  return (
    <div className="container" >
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e)=> setImage(e.target.value)}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
