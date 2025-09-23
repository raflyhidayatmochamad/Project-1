import React, { Component } from "react";
import { Col, ListGroup, Badge, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { keranjang, hapusItem } = this.props;

    // Hitung total belanja
    const totalBelanja = keranjang.reduce((acc, item) => acc + item.total, 0);

    return (
      <Col md={3} className="mt-2">
        <h5><strong>Keranjang</strong></h5>
        <hr />
        <ListGroup>
          {keranjang.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.nama}</strong> <br />
                  Rp {numberWithCommas(item.harga)} x {item.qty}
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="success" className="me-2">
                    Rp {numberWithCommas(item.total)}
                  </Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => hapusItem(item.id)} // ✅ Hapus item
                  >
                    ❌
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />
        <h5>Total: Rp {numberWithCommas(totalBelanja)}</h5>
      </Col>
    );
  }
}
