import React,{useState} from "react"
import "../App.css";
//imported the useParams 
// import { useParams,Link } from "react-router-dom"
import { Link,useParams } from "react-router-dom"
function UpdateProduct(){
   // set initial state for form data using the useState hook
   const [formData,setFormData]=useState({
    name:"",
    image_url:"",
    price:"",
    description:"",
    category_id:"",
    stock:""

  })
  const {id}=useParams()
  console.log(id)
   // function to handle form submission
  function handleSubmit(e){
      e.preventDefault()
      // creating a new PRODUCT object using the form data
      const newProduct ={
  name:formData.name,
  image_url:formData.image_url,
  price:formData.price,
  description:formData.description,
  category_id:formData.category_id,
  stock:formData.stock
 
};

      fetch(
        `http://127.0.0.1:8000/add_products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
  }
  // display the form with input fields and a submit button
  return (
    <div className="updating">
      <nav>
        <Link to="/AddProduct">AddProduct</Link>
        <Link exact to="/">
          ProductList
        </Link>
        <Link to="/User">User</Link>
       
      </nav>
      <form className="animal-form" onSubmit={handleSubmit}>
        <h5>UPDATE PROCUCT </h5>
        <br />
        <label type="text">name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />
        <label type="text">image-url:</label>
        <input
          type="img"
          id="image"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />
        <br />
        <label type="text">price:</label>
        <input
          type="text"
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <br />
        <label type="text">description:</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <br />
        <label type="text">category_id:</label>
        <input
          type="text"
          id="category"
          value={formData.category_id}
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
        />
        <br />
        <label type="text">stock:</label>
        <input
          type="number"
          id="stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          UPDATE-ANIMAL
        </button>
      </form>
    </div>
  );
}
export default UpdateProduct