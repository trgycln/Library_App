import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Price from "../components/Price";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { firstLetterUpper } from "../utils/functions";

const BookDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { booksState, categoriesState } = useSelector((state) => state);

  const myBook = booksState.books.find((item) => item.id === params.bookId);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === myBook.categoryId
  );

  return (
    <div>
      <Header />
      <div
        className="my-5"
        style={{
          width: "80%",
          margin: "auto",
          boxShadow: "0 0 10px 0 gray",
          padding: "10px",
        }}
      >
        <div
          style={{ position: "relative" }}
          className="container d-flex justify-content-center"
        >
          <h4
            onClick={() => {
              navigate("/");
            }}
            style={{ position: "absolute", top: "0", left: "0", cursor:"pointer" }}
          >
            <span className="badge bg-secondary">Geri</span>
          </h4>
          <h1>Kitap Bilgileri</h1>
        </div>
        <hr />
        <div className="container d-flex justify-content-between">
          <h3>Kitap Adı</h3>
          <p>{firstLetterUpper(myBook.title)}</p>
        </div>
        <div className="container d-flex justify-content-between">
          <h3>Yazarı</h3>
          <p>{firstLetterUpper(myBook.author)}</p>
        </div>
        <div className="container d-flex justify-content-between">
          <h3>Yayınevi</h3>
          <p>
            {myBook.publisher === ""
              ? "Belirtilmemiş"
              : firstLetterUpper(myBook.publisher)}
          </p>
        </div>
        <div className="container d-flex justify-content-between">
          <h3>Fiyatı</h3>
          <p>
            {myBook.price === "" ? (
              "Belirtilmemiş"
            ) : (
              <Price title={myBook.price} textType="danger" />
            )}
          </p>
        </div>
        <div className="container d-flex justify-content-between">
          <h3>ISBN</h3>
          <p>{myBook.isbn === "" ? "Belirtilmemiş" : myBook.isbn}</p>
        </div>
        <div className="container d-flex justify-content-between">
          <h3>Kategori</h3>
          <p>{firstLetterUpper(myCategory.name)}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
