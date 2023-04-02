import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Header = () => {
  const { themeState } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div style={{ position: "relative" }}>
      <nav
        className={`navbar navbar-${themeState} navbar-expand-sm bg-${themeState === "light" ? "warning" : "secondary"}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Library App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Anasayfa
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/category-page"}>
                  Kategoriler
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        {themeState==="light" ? (      <button
        onClick={() =>
          dispatch({
            type: actionTypes.themeActions.CHANGE_THEME,
            payload: "dark",
          })
        }
        style={{ position: "absolute", right: "20px", top: "10px" }}
      >
        Light
      </button>):(      <button
        onClick={() =>
          dispatch({
            type: actionTypes.themeActions.CHANGE_THEME,
            payload: "light",
          })
        }
        style={{ position: "absolute", right: "20px", top: "10px", backgroundColor:"yellow" }}
      >
        Dark
      </button>)}
    </div>
  );
};

export default Header;
