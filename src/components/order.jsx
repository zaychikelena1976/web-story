import { Row, Col } from "react-bootstrap";
import NotFound from "../img/imageNotFound.png";

export default function Orders({ item }) {
  return (
    <section className="item">
      <Row className="d-flex p-2">
        <Col md={3}>
          <img
            className=" max-width=50 px max-heght=50px"
            src={item.image !== "" ? item.image : NotFound}
            alt="book"
            width="59"
            height="80"
          />
        </Col>
        <Col md={3}>{item.count}</Col>
        <Col md={1}>{item.priceTotal}</Col>
      </Row>
    </section>
  );
}
