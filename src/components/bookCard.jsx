import { React } from "react";
import { Col } from "react-bootstrap";
import NotFound from "../img/imageNotFound.png";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <>
      <Col md={4} className="product">
        <img
          className=" max-width=200px max-heght=200px"
          src={book.image !== "" ? book.image : NotFound}
          alt={book.title}
          width="259"
          height="340"
        />

        <div className="card-body">
          <h4 className="card-title">
            <span style={{ fontSize: 18, fontWeight: 500 }}>Book name:</span>
            {book.title}
          </h4>

          <p className="card-text">
            <span style={{ fontSize: 18, fontWeight: 500 }}>Book author:</span>
            {book.author}
          </p>
          <p className="card-text">
            <span style={{ fontSize: 18, fontWeight: 500 }}>Price:</span>
            {book.price}
            <span>$</span>
          </p>
        </div>

        <Link key={book.id} to={`/book-list/${book.id}`}>
          <button className="btn btn-light view">View</button>
        </Link>
      </Col>
    </>
  );
}
