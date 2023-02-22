import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import Select from "react-select";
import BookCard from "./bookCard";
import searchIcon from "../img/searchIcon.png";
import { Col } from "react-bootstrap";
import { User } from "../context/use-user";
import { Books } from "../context/use-books";

export default function BooksList() {
  const userName = useContext(User);
  const books = useContext(Books);
  const navigate = useNavigate();

  const [currentBooks, setCurrentBooks] = useState(books);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userName === "Username") {
      navigate("/");
    }
  }, [navigate, userName]);

  const selectableOptions = [
    { value: "All", label: "All" },
    { value: "0-15", label: "0-15" },
    { value: "15-30", label: "15-30" },
    { value: "30 or more", label: "30 or more" }
  ];

  const chooseCurrentPrice = (options) => {
    if (options.value === "All") {
      setCurrentBooks(books);
    } else if (options.value === "0-15") {
      console.log(options.value);
      setCurrentBooks(books.filter((el) => el.price > 0 && el.price <= 15));
    } else if (options.value === "15-30") {
      setCurrentBooks(books.filter((el) => el.price > 15 && el.price <= 30));
    } else if (options.value === "30 or more") {
      setCurrentBooks(books.filter((el) => el.price > 30));
    }
  };

  const searchBooks = currentBooks.filter((el) =>
    el.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Row>
        <Col md={5}>
          <form className="form-group">
            <div className="form-group has-feedback has-feedback-left">
              <Col md={6}>
                <img
                  src={searchIcon}
                  width="20"
                  height="20"
                  alt="cartimage"
                  className="magnifying_glass"
                />
                <input
                  type="text"
                  placeholder="Search by book name"
                  className="input-lg search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
            </div>
          </form>
        </Col>
        <Col md={4}>
          <Select
            className="price"
            placeholder="Select price"
            options={selectableOptions}
            onChange={chooseCurrentPrice}
            autoFocus={true}
          />
        </Col>
      </Row>
      <Row className="d-flex content">
        {search.length > 0
          ? searchBooks.map((item) => <BookCard book={item} key={item.id} />)
          : currentBooks.map((item) => <BookCard book={item} key={item.id} />)}
      </Row>
    </>
  );
}
