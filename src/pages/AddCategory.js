import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

import api from '../api/api';
import urls from '../api/urls';
import actionTypes from '../redux/actions/actionTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const AddCategory = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [formStates, setFormStates]=useState({
		id:String(new Date().getTime()),
		name:"",
	})

	const handleForm =(event)=>{
		event.preventDefault()
		// Validation
		if(formStates.name===""){
			alert("Bu alan boş bırakılamaz")
			return
		}

		api.post(urls.categories,formStates).then(res=>{
			dispatch({type:actionTypes.categoryActions.ADD_CATEGORY, payload:formStates})
			navigate("/category-page")
		}).catch(err=>{console.log(err);})
	}
  return (
	<div>
	  <Header/>
	  <div className='container my-5'>
		<form onSubmit={handleForm}>
		<div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kategori Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Ör; Roman"
              value={formStates.name}
              onChange={(event) =>
                setFormStates({ ...formStates, name: event.target.value })
              }
            />
          </div>
		  <div className='d-flex justify-content-center'>
			<Button text='Kaydet' className='w-25'/>
		  </div>
		</form>
	  </div>

	</div>
  )
}

export default AddCategory
