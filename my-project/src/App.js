import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyNavbar from "./component/navbar";
import ListCategories from "./component/ListCategory";
import Hasil from "./component/Hasil";
import Menus from "./component/Menus";
import { API_URL } from "./utils/constants";

function App() {
  const [menus, setMenus] = useState([]);
  const [kategoriAktif, setKategoriAktif] = useState("Makanan");
  const [keranjang, setKeranjang] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/product?category.nama=${kategoriAktif}`)
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Error:", err));
  }, [kategoriAktif]);

  const changeCategory = (value) => {
    setKategoriAktif(value);
    setMenus([]);
  };

  const tambahKeranjang = (menu) => {
    const keranjangSama = keranjang.find((item) => item.id === menu.id);

    if (keranjangSama) {
      const keranjangUpdate = keranjang.map((item) =>
        item.id === menu.id
          ? { ...item, qty: item.qty + 1, total: item.total + menu.harga }
          : item
      );
      setKeranjang(keranjangUpdate);
    } else {
      const itemBaru = {
        ...menu,
        qty: 1,
        total: menu.harga,
      };
      setKeranjang([...keranjang, itemBaru]);
    }
  };

  const hapusItem = (id) => {
    const keranjangUpdate = keranjang.filter((item) => item.id !== id);
    setKeranjang(keranjangUpdate);
  };

  return (
    <div className="App">
      <MyNavbar />
      <Container fluid>
        <Row>
          {/* Sidebar Kategori */}
          <ListCategories
            changeCategory={changeCategory}
            kategoriAktif={kategoriAktif}
          />

          {/* Daftar Produk */}
          <Col md={6} className="mt-2">
            <h5>
              <strong>Daftar Produk - {kategoriAktif}</strong>
            </h5>
            <hr />
            <Row>
              {menus.map((menu) => (
                <Col
                  md={4}
                  xs={6}
                  className="mb-4"
                  key={menu.id}
                  onClick={() => tambahKeranjang(menu)}
                >
                  <Menus menu={menu} />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Keranjang */}
          <Hasil keranjang={keranjang} hapusItem={hapusItem} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
