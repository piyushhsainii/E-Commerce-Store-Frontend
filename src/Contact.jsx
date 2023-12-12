import React, { Fragment } from 'react'
import './contact.css'
import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Contact = () => {
  return (
    <Fragment>
    <div className='contact-container' >
        <div className="contact-sub-container">
            <GitHub/> 
            <Typography style={{fontSize:"1.5vmax",backgroundColor:"transparent"}} > 
             <a style={{textDecoration:"none", color:"black"}} href="https://github.com/piyushhsainii" > GitHub </a> </Typography>
            
        </div>
        <div className="contact-sub-container">
            <LinkedIn  style={{color:"darkblue"}} /> 
            <Typography style={{fontSize:"1.5vmax",backgroundColor:"transparent"}} >
            <a style={{textDecoration:"none", color:"black"}} href="https://www.linkedin.com/in/piyush-saini-b860ab1bb/" > 
            LinkedIn </a></Typography>
        </div>
        <div className="contact-sub-container">
         <span style={{fontSize:"1.8VMAX"}} >
         <a style={{textDecoration:"none", color:"black"}} href="https://www.linkedin.com/in/piyush-saini-b860ab1bb/" >
         𝕏 </a>
            </span> 
            <Typography style={{fontSize:"1.5vmax",backgroundColor:"transparent"}} >
         <a style={{textDecoration:"none", color:"black"}} href="https://twitter.com/piyushsainii" >            
                 Twitter</a> </Typography>
                 
        </div>
        <div className="contact-sub-container">
            <Instagram style={{background: "linear-gradient(90deg, #8a3ab9, #e95950)", color:"white", borderRadius:"20%"}} />
            <Typography style={{fontSize:"1.5vmax",backgroundColor:"transparent"}} > 
         <a style={{textDecoration:"none", color:"black"}} href="https://www.instagram.com/piyushhsainii/" >            
            Instagram 
            </a> </Typography>
        </div>
    </div>

    </Fragment>
  )
}

export default Contact