import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");

  const [products, setProducts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
    id: Date.now(),
    title: title,
    information: information,
    price: price,
    company: company,
  };

  if (isEditing) {
    const updatedProducts = [...products];

    updatedProducts[editIndex] = newProduct;

    setProducts(updatedProducts);

    setIsEditing(false);
    setEditIndex(null);
  } else {
    setProducts([...products, newProduct]);
  }

  setTitle("");
  setInformation("");
  setPrice("");
  setCompany("");
}
  function deleteProduct(index) {
    const updatedProducts = products.filter((product, i) => i !== index);

    setProducts(updatedProducts);
  }
  function editProduct(index) {
    const product = products[index];

    setTitle(product.title);
    setInformation(product.information);
    setPrice(product.price);
    setCompany(product.company);

    setIsEditing(true);
    setEditIndex(index);
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
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.information}</td>
              <td>{product.price}</td>
              <td>{product.company}</td>

              <td>
                <button onClick={() => editProduct(index)}>Edit</button>
                <button onClick={() => deleteProduct(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
