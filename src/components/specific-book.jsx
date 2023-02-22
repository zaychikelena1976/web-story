import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { User } from "../context/use-user";
import { Books } from "../context/use-books";
import { Order } from "../context/use-order";
import NotFound from "../img/imageNotFound.png";

export default function SpecificBook() {
  const userName = useContext(User);
  const books = useContext(Books);
  const { order, setOrder } = useContext(Order);

  const { id } = useParams();
  const [bookPage, setBookPage] = useState({});

  useEffect(() => {
    let bookPageData;

    for (let item of books) {
      if (item["id"].toString() === id) {
        console.log(item["id"]);
        bookPageData = item;
      }
    }

    let count = 1;
    let priceTotal = bookPageData.price;
    console.log(bookPageData);
    setBookPage({ ...bookPageData, count, priceTotal });
  }, [books, id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userName === "Username") {
      navigate("/");
    }
  }, [navigate, userName]);

  const changeTotalPrice = (value) => {
    let inputValue = value <= 0 || value > 42 ? 1 : value;
    setBookPage({
      ...bookPage,
      count: inputValue,
      priceTotal: +(inputValue * bookPage.price).toFixed(2)
    });
  };

  const addToOrder = (item) => {
    let isInArray = false;
    order.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) setOrder([...order, item]);
  };

  console.log(bookPage);
  console.log(order);

  return (
    <>
      <Row>
        <Col md={3} className=" text-left ">
          <img
            className=" max-width=200px max-heght=200px"
            src={bookPage.image !== "" ? bookPage.image : NotFound}
            alt={bookPage.title}
            width="259"
            height="340"
          />
        </Col>
        <Col md={4} className="text-left">
          <p className="fw-bold fs-5">
            <span style={{ fontSize: 18, fontWeight: 500 }}>Book name: </span>
            {bookPage.title}
          </p>
          <p>
            <span style={{ fontSize: 18, fontWeight: 500 }}>Book author: </span>
            {bookPage.author}
          </p>
        </Col>

        <Col md={4} className=" border-2 px-0 mx-0 text-left">
          <div className="container  border border-secondary pt-2 pb-2 m-4">
            <Row>
              <Col xs={10} md={10} sm={10} className=" border-2 ">
                <p className="fw-bold">Price</p>
              </Col>
              <Col xs={2} md={2} sm={2} className=" border-2">
                <p className="fw-bold">
                  <span className="price">{bookPage.price}</span>$
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={9} md={9} sm={9}>
                <label className="label" for="number">
                  Count
                </label>
              </Col>
              <Col xs={3} md={3} sm={3}>
                <input
                  className="book-quantity form-control max-width:100px"
                  type="number"
                  id="number"
                  name="number"
                  value="1"
                  defaultValue={bookPage.count}
                  step="1"
                  min="1"
                  max="42"
                  onChange={(e) => {
                    changeTotalPrice(+e.target.value);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={10} md={10} sm={10}>
                <p className="fw-bold">Total price:</p>
              </Col>
              <Col xs={2} md={2} sm={2} class=" border-2">
                <p className="fw-bold">
                  <span className="total">{bookPage.priceTotal}</span>$
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={6} sm={6}></Col>
              <Col xs={6} md={6} sm={6} class=" border-2 text-end">
                <button
                  class="btn-sm btn-warning border rounded "
                  type="button"
                  onClick={() => addToOrder(bookPage)}
                >
                  Add to cart
                </button>
              </Col>
            </Row>
          </div>
        </Col>
        <Row>
          <Col xs={12} md={12} sm={12}>
            <p>
              <span style={{ fontSize: 18, fontWeight: 500 }}>
                Book description:
              </span>
              {bookPage.description}
            </p>
          </Col>
        </Row>
      </Row>
    </>
  );
}
