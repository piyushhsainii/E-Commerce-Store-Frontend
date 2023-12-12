import React, { Fragment } from 'react'
import MetaData from './MetaData'
import { useSelector } from 'react-redux'
import "./about.css"
import { Typography } from '@mui/core'
import { AddBoxOutlined, ArrowUpward, ContactMail, Contacts, Launch } from '@mui/icons'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'



const AboutMe = () => {



  return (
    <Fragment>
        <MetaData title={"Aboout"} ></MetaData>

        <div className='About-container' >        
            <div className='about-subcontainer' >
                <div>
                <img className='about-pfp' src={"./about.jpeg"} alt='image' />
                </div>
                <div style={{marginTop:"4vmax"}} >
                    <Typography style={{fontSize:"2vmax", width:"11vmax"}} > Piyush Saini  </Typography>
                    <Typography  style={{fontSize:"1.1vmax"}} > FULL STACK DEVELOPER </Typography>
                </div>
            </div>
            <div className='about-subcontainer ' >
            <Typography  className='about-subcontainer2' > This is my first MERN Stack E-Commerce Project </Typography>
            <Typography  style={{fontSize:"1.1vmax", textAlign:"center", marginTop:"3vmax"}} > <Link className='about-link' to='/contact' >  <Launch/> <Typography>Connect with me </Typography> </Link>   </Typography>   
            </div>
        </div>
    </Fragment>
  )
}

export default AboutMe