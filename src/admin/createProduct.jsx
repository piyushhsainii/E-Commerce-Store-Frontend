import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { Button, Typography } from '@mui/material'
import { useSelector , useDispatch } from 'react-redux'
import { AccountTree, AttachMoney, Category, ChromeReaderModeSharp, Description, Spellcheck, Storage } from '@mui/icons-material'
import { useAlert } from 'react-alert'
import { CLEAR_ERRORS, NEW_PRODUCT_RESET } from '../constants/productConstans'
import { AddNewProduct } from '../actions/productAction'
import "./createProduct.css" 

const createProduct = ({history}) => {

    const [Product, setproduct] = useState('')
    const [Price, setPrice] = useState()
    const [productDesc, setproductDesc] = useState('')
    const [category, setcategory] = useState('')
    const [Stock, setStock] = useState('')
    const [images, setimages] = useState([])
    const [imagesPreview, setimagesPreview] = useState([])

    const { error, loading, success} = useSelector((state)=>state.createProduct)
    const alert = useAlert()
    const dispatch = useDispatch()
    const categories = [
        "Electronics",
        "Footwear",
        "Bottom",
        "Top",
        "Attire",
        "Camera",
        "SmartPhones" ,
        "Other"
    ];

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({
                type:CLEAR_ERRORS
            })
        }
        if(success){
            alert.success("Product Created Successfully")
            // history.push('/admin/dashboard')
            dispatch({
                type:NEW_PRODUCT_RESET
            })
        }
    },[dispatch, alert, error, history, success])

    const createSubmitHandler = (e)=>{

        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name",Product)
        myForm.set("description",productDesc)
        myForm.set("price",Price)
        myForm.set("category",category)
        myForm.set("Stock",Stock)

       images.forEach((image, index) => {
        myForm.append(`images[${index}]`, image);
    });
        dispatch(AddNewProduct(myForm))
    }

    const createProductImagesChange = (e)=>{

        const files = Array.from(e.target.files)
        
        setimages([])
        setimagesPreview([])

        files.forEach((file)=>{        
            const reader = new FileReader()              
                reader.onload = ()=>{
                    if(reader.readyState===2){
                        setimagesPreview((old)=>[...old, reader.result])
                        setimages((old)=>[...old, reader.result])
                    }
                };
                reader.readAsDataURL(file)
            });
    };

  return (
<Fragment>
    <div className='sidebar-container'>
        <Sidebar/>
    <div className='create-product-container'  >
        <Typography style={{fontSize:"2.4vmax" , color:"tomato", margin:"2vmax" }} > CREATE PRODUCT </Typography>
        <form onSubmit={createSubmitHandler}>
            <div className='create-container' >
            <Spellcheck  className='create-svg-3'  />
            <input type="text"
            placeholder='Product Name'
            value={Product}
            onChange={(e)=>setproduct(e.target.value)}
            required
            />

            </div>
            <div className='create-container' >
            <AttachMoney  className='create-svg-3'  />
            <input 
            placeholder='Price'
            type='number'
            readOnly={false}
            inputMode='numeric'
            defaultValue={null}
            required
            value={Price}
            onChange={(e)=>setPrice(e.target.value)}
            />
            </div>

            <div className='create-container' >
            <Description className='create-svg-2' />
            <textarea
            style={{resize:"none", border:"none", outline:"none"}}
            type="text" 
            cols="30"
            rows="5"
            contentEditable={false}
            onChange={(e)=>setproductDesc(e.target.value)}
            placeholder='Product Description'
            value={productDesc}
            required
            ></textarea>
            </div>

            <div className='create-container' >
            <AccountTree  className='create-svg' />
            <select onChange={(E)=> setcategory(E.target.value)} required >
                <option >Choose Category</option>
                {categories.map((cate,index)=>{

                   return  <option value={cate} > {cate} </option>
                })}
            </select>
                </div>

                <div className='create-container' >
                    <Storage   className='create-svg-3' />
                <input 
                required
                type="text"
                placeholder='Stock'
                name='Stock'
                value={Stock}
                onChange={(E)=> setStock(E.target.value)}
                />
                </div>
                <div className='create-container' >
                <input 
                required
                type="file"
                accept='image/*'
                name='avatar'
                multiple
                onChange={createProductImagesChange}
                />
                </div>
                <div className='image-mapping' >
                {imagesPreview.map((image,index)=>{
                   return <img key={index} src={image} alt='image' />
                })}
                </div>
                <Button className='create-product-btn'
                type='submit'
                disabled ={ loading ? true : false}
                >
                    Create
                </Button>
        </form>
    </div>
    </div>
  </Fragment>
  )
}

export default createProduct