import React from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const {themeState}=useSelector(state=>state)
  return (
    <div style={{width:"100vw", height:"100vh"}} className={themeState==="light" ? "bg-light" : "bg-dark"} >
      <Header />
      <div className="container mt-5">
        <div className="container d-flex justify-content-end">
          <Button
            onClick={()=>navigate("/add-book")}
            text="Kitap Ekle"
            className="btn-sm"
          />
        </div>
        <ListBooks />
      </div>
      
    </div>
  );
};

export default Home;
