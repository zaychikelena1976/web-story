import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../context/use-user";
import { Order } from "../context/use-order";
import { Col, Row } from "react-bootstrap";
import Orders from "./order";
import cart from "../img/cart.png";
import NotFound from "../img/imageNotFound.png";

const showOrder = (order, price, count, image) => {
  return (
    <>
      <section className="ordersContainer">
        {order.map((el) => (
          <Orders key={el.id} item={el} />
        ))}
      </section>
      <Row className="data__total d-flex p-2">
        <Col md={3}></Col>
        <Col md={3} className="total__count">
          <b>{count}</b>
        </Col>
        <Col md={1} className="total__price">
          <b>$ {price}</b>
        </Col>
      </Row>
    </>
  );
};

const showNothing = () => {
  return (
    <>
      <div className="empty__cart">
        <img src={cart} className="cartimg" />
        <p>Cart empty...</p>
      </div>
    </>
  );
};

export default function Cart() {
  const { order, setOrder } = useContext(Order);

  const [total, setTotal] = useState({
    price: order.reduce((prev, curr) => prev + curr.priceTotal, 0).toFixed(2),
    count: order.reduce((prev, curr) => prev + curr.count, 0)
  });

  useEffect(() => {
    setTotal({
      price: order.reduce((prev, curr) => prev + curr.priceTotal, 0).toFixed(2),
      count: order.reduce((prev, curr) => prev + curr.count, 0)
    });
  }, [order]);

  const userName = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName === "Username") {
      navigate("/");
    }
  }, [navigate, userName]);

  const clearCart = () => {
    setOrder([]);
  };

  console.log(order.length);

  return (
    <>
    <Row>
        <Col xs={6} md={6} sm={6} ></Col>
        <Col xs={6} md={6} sm={6} className=" border-2 text-end">
      
        
          <button
            className="btn btn-light purchase"
            disabled={order.length < 1}
            onClick={clearCart}
          >
            Purchase
          </button>
        
        
        </Col>
        <main className="cart__main">
          {order.length > 0
            ? showOrder(order, total.price, total.count)
            : showNothing()}
        </main>
    </Row>  
    </>
  );
}
