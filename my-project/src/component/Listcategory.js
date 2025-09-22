import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export default class ListCategories extends Component {
  render() {
    return (
      <Col md={3} className="mt-2">
        <h5><strong>Kategori</strong></h5>
        <hr />
      </Col>
    );
  }
}
