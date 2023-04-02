import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { firstLetterUpper } from "../utils/functions";
import Button from "./Button";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);

  const deleteCategory = (id) => {
    api
      .delete(`${urls.categories}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CATEGORY,
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="my-5 d-flex justify-content-end container">
        <Link to={"/add-category"} className="btn btn-primary">
          Kategori Ekle
        </Link>
      </div>
      {categoriesState.categories.length === 0 && (
        <div className="text-center mt-5">
          <div className="alert alert-warning" role="alert">
            Kategori kaydı bulunmamaktadır.
          </div>
        </div>
      )}
      {categoriesState.categories.length > 0 && (
        <div className="container my-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sıra Nu.</th>
                <th scope="col">Kategori Adı</th>
                <th scope="col">Kitap Sayısı</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {categoriesState.categories.map((category, index) => {
                let myCategoryBook = booksState.books.filter(
                  (item) => item.categoryId === category.id
                );

                return (
                  <tr key={category.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{firstLetterUpper(category.name)}</td>
                    <td>{myCategoryBook.length}</td>
                    <td>
                      <Button
                        onClick={() => deleteCategory(category.id)}
                        text="Sil"
                        type="danger"
                        className="btn-sm"
                      />
                      <Button
                        text="Güncelle"
                        type="success"
                        className="btn-sm"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListCategory;
