import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComp } from "./component"; // Ini akan berfungsi setelah Langkah 1
import { Home, Sukses } from "./pages";   // Ini akan berfungsi setelah Langkah 2

// Dependensi yang dibutuhkan oleh komponen Receipt
import axios from "axios";
import { API_URL } from "./utils/constants";
import { numberWithCommas } from "./utils/utils";
import { Button, Container, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// ===================================================================
// KODE KOMPONEN RECEIPT 
// ===================================================================
const printStyles = `
  @media print { .no-print { display: none !important; } .receipt-container { border: none !important; box-shadow: none !important; } }
`;

class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = { keranjangs: [], totalBayar: 0, loading: true, };
    }

    componentDidMount() {
        axios.get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                const totalBayar = keranjangs.reduce((result, item) => result + item.total_harga, 0);
                this.setState({ keranjangs, totalBayar, loading: false });
            })
            .catch(error => { console.log("Error fetching data: ", error); this.setState({ loading: false }); });
    }

    handlePrint = () => { window.print(); }

    render() {
        const { keranjangs, totalBayar, loading } = this.state;
        const today = new Date();
        const date = today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        const time = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        return (
            <Container className="mt-4 d-flex justify-content-center">
                <style>{printStyles}</style>
                <Col md={6}>
                    <div className="p-4 border rounded shadow-sm receipt-container">
                        <div className="text-center mb-4">
                            <h4><strong>Rafly Store</strong></h4>
                            <p>Struk Pesanan</p>
                            <small>{date} - {time}</small>
                        </div>
                        <hr />
                        {loading ? (<p>Memuat data...</p>) : keranjangs.length === 0 ? (
                            <div className="text-center">
                                <p>Keranjang kosong. Tidak ada yang bisa dicetak.</p>
                                <Button as={Link} to="/" variant="primary" className="no-print"><FontAwesomeIcon icon={faArrowLeft} /> Kembali</Button>
                            </div>
                        ) : (
                            <>
                                <Table striped responsive="sm">
                                    <thead><tr><th>#</th><th>Item</th><th className="text-center">Qty</th><th className="text-end">Harga</th><th className="text-end">Subtotal</th></tr></thead>
                                    <tbody>
                                        {keranjangs.map((item, index) => (
                                            <tr key={item.id}><td>{index + 1}</td><td>{item.product.nama}</td><td className="text-center">{item.jumlah}</td><td className="text-end">Rp. {numberWithCommas(item.product.harga)}</td><td className="text-end">Rp. {numberWithCommas(item.total_harga)}</td></tr>
                                        ))}
                                    </tbody>
                                    <tfoot><tr><td colSpan="4" className="text-end"><strong>Total Bayar:</strong></td><td className="text-end"><strong>Rp. {numberWithCommas(totalBayar)}</strong></td></tr></tfoot>
                                </Table>
                                <div className="d-flex justify-content-between mt-4 no-print">
                                    <Button as={Link} to="/" variant="secondary"><FontAwesomeIcon icon={faArrowLeft} /> Kembali</Button>
                                    <Button variant="primary" onClick={this.handlePrint}><FontAwesomeIcon icon={faPrint} /> Cetak Struk</Button>
                                </div>
                            </>
                        )}
                    </div>
                </Col>
            </Container>
        );
    }
}
// ===================================================================
// AKHIR DARI KODE RECEIPT
// ===================================================================

function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Sukses" component={Sukses} exact />
          <Route path="/receipt" component={Receipt} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;