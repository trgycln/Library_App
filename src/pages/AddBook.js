import React, { useState } from "react";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { firstLetterUpper2 } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

const AddBook = () => {
  const[errorMessage,setErrorMessage]=useState("")
  const { categoriesState, themeState } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formStates, setFormStates] = useState({
    id: String(new Date().getTime()),
    title: "",
    author: "",
    publisher: "",
    price: "",
    isbn: "",
    categoryId: "empty"
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    /* Validations */
    if (formStates.title === "") {
      setErrorMessage("name");
      return;
    }

    if (formStates.author === "") {
      setErrorMessage("author");
      return;
    }

    if (formStates.categoryId === "empty") {
      setErrorMessage("categoryId");
      return;
    }

    api
      .post(urls.books, formStates)
      .then((res) => {
        dispatch({ type:actionTypes.bookActions.ADD_BOOK, payload: formStates })
        setFormStates("")
        navigate("/")
      })
      .catch((err) => {});
  };

  return (
    <div style={{width:"100vw",height:"100vh"}} className={themeState==="light" ? "bg-light" : "bg-dark"}>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
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
           {
            errorMessage==="name" && (
              <p className="text-danger fw-bold">Bu alan boş bırakılamaz</p>
            )
           }
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
                {
            errorMessage==="author" && (
              <p className="text-danger fw-bold">Bu alan boş bırakılamaz</p>
            )
           }
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
          {
            errorMessage==="categoryId" && (
              <p className="text-danger fw-bold">Bu alan boş bırakılamaz</p>
            )
           }
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

export default AddBook;
