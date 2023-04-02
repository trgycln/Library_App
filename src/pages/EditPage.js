import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { firstLetterUpper2 } from "../utils/functions";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const { booksState, categoriesState } = useSelector((state) => state);

  const myBook = booksState.books.find((item) => item.id === bookId);

  const [formStates, setFormStates] = useState(myBook);

  const handleEditBook = (event) => {
    event.preventDefault();

    /* Validations */
    if (formStates.title === "") {
      alert("Kitap adı boş bırakılamaz");
      return;
    }

    if (formStates.author === "") {
      alert("Kitabın yazarı boş bırakılamaz");
      return;
    }

    if (formStates.categoryId === "empty") {
      alert("Kategori bilgisi boş bırakılamaz");
      return;
    }

    api
      .put(`${urls.books}/${bookId}`, formStates)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: actionTypes.bookActions.EDİT_BOOK,
          payload: res.data,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleEditBook}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Ör; Beyaz Zambaklar Ülkesinde"
              value={formStates.title}
              onChange={(event) =>
                setFormStates({ ...formStates, title: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Kitabın Yazarı
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Ör; Grigory Petrov"
              value={formStates.author}
              onChange={(event) =>
                setFormStates({ ...formStates, author: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publiaher" className="form-label">
              Yayınevi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="Ör; Koridor Yayıncılık"
              value={formStates.publisher}
              onChange={(event) =>
                setFormStates({ ...formStates, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Fiyatı
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Ör; 70"
              value={formStates.price}
              onChange={(event) =>
                setFormStates({ ...formStates, price: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="Ör; 9789944983990"
              value={formStates.isbn}
              onChange={(event) =>
                setFormStates({ ...formStates, isbn: event.target.value })
              }
            />
          </div>
          <select
            value={formStates.categoryId}
            onChange={(event) =>
              setFormStates({ ...formStates, categoryId: event.target.value })
            }
            className="form-select"
            aria-label="Default select example"
          >
            <option value="empty">Kitabın kategorisini seçiniz</option>
            {categoriesState.categories.map((category) => (
              <option value={category.id} key={category.id}>
                {firstLetterUpper2(category.name)}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-end my-5">
            <button type="submit" className="btn btn-primary w-25">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
