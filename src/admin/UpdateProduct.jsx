import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { Button, Typography } from '@mui/material'
import { useSelector , useDispatch } from 'react-redux'
import { AccountTree, AttachMoney, Category, ChromeReaderModeSharp, Description, Spellcheck, Storage } from '@mui/icons-material'
import { useAlert } from 'react-alert'
import { CLEAR_ERRORS, PRODUCT_UPDATE_RESET } from '../constants/productConstans'
import { AddNewProduct, getProductDetails, updateProducts } from '../actions/productAction'
import "./createProduct.css" 

const UpdateProduct = ({history,match}) => {

    const [Product, setproduct] = useState('')
    const [Price, setPrice] = useState()
    const [productDesc, setproductDesc] = useState('')
    const [category, setcategory] = useState('')
    const [Stock, setStock] = useState('')
    const [images, setimages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setimagesPreview] = useState([])

    const {  loading, success} = useSelector((state)=>state.createProduct)
    const { error, product } = useSelector((state)=>state.productDetails)
    const { isUpdated , error: updateERROR } = useSelector((state)=>state.updateProduct)

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
    const productID = match.params.id

    useEffect(()=>{

        if (product && product._id !== productID) {
            dispatch(getProductDetails(productID));
          } else {
            setproduct(product.name);
            setproductDesc(product.description);
            setPrice(product.price);
            setcategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
          }

          if(updateERROR){
            alert.error(updateERROR)
            dispatch({
                type:CLEAR_ERRORS
            })
          }


        if(error){
            alert.error(error)
        }
        if(isUpdated){
            alert.success("Product Updated Successfully")
            // history.push('/admin/dashboard')
            dispatch({
                type:PRODUCT_UPDATE_RESET
            })
        }
    },[dispatch, alert, error, history, success, productID ,product,isUpdated  ])

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
        dispatch(updateProducts(productID,myForm))
    }

    const createProductImagesChange = (e)=>{

        const files = Array.from(e.target.files)
        
        setimages([])
        setimagesPreview([])
        setOldImages([])

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
        <Typography style={{fontSize:"2.4vmax" , color:"tomato", margin:"2vmax" }} > UPDATE PRODUCT </Typography>
        <form onSubmit={createSubmitHandler}>
            <div className='create-container' >
            <Spellcheck  className='create-svg' />
            <input type="text"
            placeholder='Product Name'
            value={Product}
            onChange={(e)=>setproduct(e.target.value)}
            required
            />

            </div>
            <div className='create-container' >
            <AttachMoney  className='create-svg'/>
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
                    <Storage   className='create-svg' />
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
                <div className='image-mapping' >
                {oldImages.map((image,index)=>{
                   return <img key={index} src={image.url} alt='image' />
                })}
                </div>
                <Button className='create-product-btn'
                type='submit'
                disabled ={ loading ? true : false}
                >
                    UPDATE PRODUCT
                </Button>
        </form>
    </div>
    </div>
  </Fragment>
  )
}

export default UpdateProduct