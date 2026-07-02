import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");

  const [products, setProducts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:5000/products");

      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function addProduct() {
  if (
    title === "" ||
    information === "" ||
    price === "" ||
    company === ""
  ) {
    alert("Please fill all the fields.");
    return;
  }

  const newProduct = {
    title,
    information,
    price,
    company,
  };

  if (isEditing) {
    axios
      .put(`http://localhost:5000/products/${editId}`, newProduct)
      .then(() => {
        getProducts();

        setIsEditing(false);
        setEditId(null);

        setTitle("");
        setInformation("");
        setPrice("");
        setCompany("");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    axios
      .post("http://localhost:5000/products", newProduct)
      .then(() => {
        getProducts();

        setTitle("");
        setInformation("");
        setPrice("");
        setCompany("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  function editProduct(product) {
    setTitle(product.title);
    setInformation(product.information);
    setPrice(product.price);
    setCompany(product.company);

    setIsEditing(true);
    setEditId(product._id);
  }
  return (
    <div className="container">
      <h1>React CRUD Operations</h1>
      <h3>Title: {title}</h3>
      <h3>Information: {information}</h3>
      <h3>Price: {price}</h3>
      <h3>Company: {company}</h3>
      <h3>Total Products: {products.length}</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Information</th>
            <th>Price</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>

          <tr>
            <td>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>

            <td>
              <input
                type="text"
                placeholder="Information"
                value={information}
                onChange={(e) => setInformation(e.target.value)}
              />
            </td>

            <td>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>

            <td>
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </td>

            <td>
              <button onClick={addProduct}>
                {isEditing ? "Update Product" : "Add New Row"}
              </button>
            </td>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.information}</td>
              <td>{product.price}</td>
              <td>{product.company}</td>

              <td>
                <button onClick={() => editProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
