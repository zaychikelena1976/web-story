import "./App.css";
import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import SpecificBook from "./components/specific-book";
import Signin from "./components/signin/signin";
import BookList from "./components/books-list";
import Cart from "./components/cart";
import Layout from "./routes/Layout";
import NotFoundPage from "./routes/NotFoundPage";
import { User } from "./context/use-user";
import { Books } from "./context/use-books";
import { Order } from "./context/use-order";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [userName, setUserName] = useState("Username");

  function updateUserName(value) {
    setUserName(value);
  }

  const [books, setBooks] = useState();

  const getBookList = async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/3fd7186f-82a1-4b6d-9cd2-d32d7587d436"
    ).then((res) => res.json());
    setBooks(response.books);
  };

  useEffect(() => {
    getBookList();
  }, []);

  const [order, setOrder] = useState([]);

  return (
    <>
      <Books.Provider value={books}>
        <User.Provider value={userName}>
          <Order.Provider value={{ order, setOrder }}>
            <ErrorBoundary>
              <Routes>
                <Route
                  path="/"
                  element={<Layout setUserName={updateUserName} />}
                >
                  <Route
                    index
                    element={
                      <Signin
                        userName={userName}
                        setUserName={updateUserName}
                      />
                    }
                  />
                  <Route path="book-list/" element={<BookList />} />
                  <Route path="book-list/:id" element={<SpecificBook />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </ErrorBoundary>
          </Order.Provider>
        </User.Provider>
      </Books.Provider>
    </>
  );
}
