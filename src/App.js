import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import CategoryPage from "./pages/CategoryPage";

import api from "./api/api";
import urls from "./api/urls";
import actionTypes from "./redux/actions/actionTypes";
import Loading from "./components/Loading";
import Error from "./components/Error";
import EditPage from "./pages/EditPage";
import AddCategory from "./pages/AddCategory";



function App() {
  const { booksState, categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();


  useEffect(() => {
    /* get books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "Kitap verilerini çekme esnasında hata oluştu",
        });
      });
    /* get categories */
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_START });
    api
      .get(urls.categories)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.categoryActions.GET_CATEGORİES_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORİES_FAIL,
          payload: "Kategori bilgileri çekilirken hata oluştu",
        });
      });
  }, []);

  if (booksState.pending === true || categoriesState.pending === true)
    return <Loading />;

  if (booksState.error === true || categoriesState.error === true)
    return <Error />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book-details/:bookId" element={<BookDetails/>} />
        <Route path="/edit-page/:bookId" element={<EditPage/>} />
        <Route path="/category-page" element={<CategoryPage/>}/>
        <Route path="/add-category" element={<AddCategory/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
