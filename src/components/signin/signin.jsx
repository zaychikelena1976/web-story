import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Row, Col } from "react-bootstrap";
import avatar from "../../img/avatar.png";

export default function Signin(props) {
  const navigate = useNavigate();

  const changeUserNameHandler = () => {
    navigate("/book-list");
    props.setUserName(props.userName);
  };

  return (
    <>
      <Row>
        <Col className=" text-center">
          <img
            className="user  border border-2  mx-auto"
            src={avatar}
            alt="user"
          />
        </Col>
      </Row>
      <Row>
        <Col className=" text-center">
          <div>
            <label className="control-lable  fs-5 fw-bold" htmlFor="Username">
              Username
            </label>
          </div>
          <input
            className=" width: 200px, text-center"
            type="text"
            placeholder="type Username"
            onChange={(e) => props.setUserName(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="button"
            className="submit"
            defaultValue="Sign-in"
            disabled={props.userName.length < 4 || props.userName.length > 16}
            onClick={changeUserNameHandler}
          />
        </Col>
      </Row>
    </>
  );
}
