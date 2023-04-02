import React from 'react'

const Button = ({text="", type="primary", style={}, className="", onClick=()=>{}}) => {
  return (
	<button onClick={onClick} style={style} className={`btn btn-${type} ${className}`} >{text}</button>
  )
}

export default Button;

