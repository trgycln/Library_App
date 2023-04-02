import React, { useState } from "react";
import Modal from "./Modal";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { firstLetterUpper } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";
import { useNavigate } from "react-router-dom";

const ListBooks = () => {
  const { booksState, categoriesState, themeState } = useSelector(
    (state) => state
  );
  const [willDeleteBook, setWillDeleteBook] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBook = (id) => {
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK, payload: id });
      })
      .catch((err) => {});
  };

  return (
    <div>
      {booksState.books.length === 0 && (
        <div className="text-center mt-5">
          <div className="alert alert-warning" role="alert">
            Kayıtlı kitap bulunmamaktadır.
          </div>
        </div>
      )}
      {booksState.books.length > 0 && (
        <div className="container">
          <table
            className={`table table-${themeState} table-striped text-center`}
          >
            <thead>
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Kitap Adı</th>
                <th scope="col">Kategorisi</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {booksState.books.map((book, index) => {
                const myCategory = categoriesState.categories.find(
                  (item) => item.id === book.categoryId
                );

                return (
                  <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{firstLetterUpper(book.title)}</td>
                    <td>{firstLetterUpper(myCategory.name)}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          onClick={() => navigate(`/book-details/${book.id}`)}
                          type="button"
                          className="btn btn-sm btn-secondary"
                        >
                          Detay
                        </button>
                        <button
                          onClick={() => {
                            setWillDeleteBook("true");
                            setDeleteBookId(book.id);
                          }}
                          type="button"
                          className="btn btn-sm btn-danger"
                        >
                          Sil
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-warning"
                          onClick={()=>{navigate(`/edit-page/${book.id}`)}}
                        >
                          Güncelle
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        title="Kitap Sil"
        description="Silmek istediğinize emin misiniz?"
        hasConfirmBtn="true"
        confirmBtnType="primary"
        visible={willDeleteBook}
        closeBtnClick={() => {
          setWillDeleteBook("false");
        }}
        confirmBtnClick={() => {
          deleteBook(deleteBookId);
          setWillDeleteBook("false");
        }}
      />
    </div>
  );
};

export default ListBooks;
