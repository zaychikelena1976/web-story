import { Row, Col } from "react-bootstrap";
import avatar from "../../img/avatar.png";
import cart from "../../img/cart.png";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const setActiv = ({ isActive }) => (isActive ? "activ-link" : "");
  return (
    <header>
      <nav className="row navbar navbar-expand-sm  border border-secondary bg-warning">
        <Col md={6}>

          <div className="navbar-brand fs-1">
          <a
            className="navbar-brand"
            aria-current="page"
            href="https://zaychikelena1976.github.io/prometheus-x-course-task"
            style={{ fontSize: 38, fontWeight: 700, }}
          >
            <i>JS BAND STORY/Olena </i>
          </a> 
          </div>
        </Col>
        <div className="Navlink col-xs-12 col-sm-12 col-md-6 text-end">
          <Link to="/cart" className={setActiv}>
            <img width="40" height="40" src={cart} alt="cartimage" />
          </Link>
          <Link to="/signin" className={setActiv}>
            <button className="btn-dark btn-sm rounded-3" type="submit">
              Sign-Out
            </button>
          </Link>

          <img src={avatar} alt="customer" width="40" height="40" />
          <span>Username</span>
        </div>
      </nav>
    </header>
  );
}
