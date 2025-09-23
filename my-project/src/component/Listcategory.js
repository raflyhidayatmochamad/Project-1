import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constants";

export default class ListCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data });
      })
      .catch((err) => console.error("Error:", err));
  }

  render() {
    const { categories } = this.state;

    return (
      <Col md={3} className="mt-2">
        <h5><strong>Kategori</strong></h5>
        <hr />
        <ListGroup>
          {categories.map((cat) => (
            <ListGroup.Item key={cat.id}>{cat.nama}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
