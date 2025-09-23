import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyNavbar from "./component/navbar";
import ListCategories from "./component/ListCategory";
import Hasil from "./component/Hasil";
import Menus from "./component/Menus";
import { API_URL } from "./utils/constants";

function App() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/product`)
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="App">
      <MyNavbar />
      <Container fluid>
        <Row>
          <ListCategories />
          <Col md={6} className="mt-2">
            <h5><strong>Daftar Produk</strong></h5>
            <hr />
            <Row>
              {menus.map((menu) => (
                <Menus key={menu.id} menu={menu} />
              ))}
            </Row>
          </Col>
          <Hasil />
        </Row>
      </Container>
    </div>
  );
}

export default App;
