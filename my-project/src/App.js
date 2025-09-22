import React, { useEffect, useState } from "react";
import MyNavbar from "./component/navbar";
import { API_URL } from "./utils/constansts";   // pastikan path sesuai

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/product`)   // endpoint sesuai db.json
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA BACKEND:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="App">
      <MyNavbar />
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.nama} - Rp {item.harga}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
