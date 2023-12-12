import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { AddReviewAction, clearErrors, getProductDetails } from "./actions/productAction";
import ReactStars from 'react-stars'
import './ProductDetials.css'
import Review from './Review.jsx'
import Loader from "../Loader";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import { addToCart } from "./actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button

} from "@material-ui/core";
import { Rating } from '@mui/material'
import { ADD_REVIEW_RESET } from "./constants/productConstans";



 const ProductDetails = ({match}) =>{
    const dispatch = useDispatch();
    const alert = useAlert()
    const [state, setState] = useState(false)
    const [comment, setComment] = useState('')
    const [ratings2, setRatings2] = useState(0)
    const [ open, setOpen]= useState(false)
    const [quantity, setquantity] = useState(1)

    const { success , error: reviewError} = useSelector((State)=>State.newReview)
    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true)
        console.log(open)
    }

    const submitReviewHandler = ()=>{
        const reviewData = new FormData()

        reviewData.set("rating",ratings2)
        reviewData.set("comment",comment)
        reviewData.set("productID",match.params.id)

        dispatch(AddReviewAction(reviewData))
        setOpen(false)
    }

    const increaseQty = ()=>{
        if(product.Stock > quantity){
            const qty = quantity+ 1
            setquantity(qty)
        }
    }

    const decreaseQty = ()=>{{
        if(quantity > 1 ){
            const qty = quantity - 1
            setquantity(qty)
        }
    }}

    let   {product,error,loading} = useSelector(state=>state.productDetails)
    const [ratings, setRatings] = useState()

    const options = {
        edit:false,
        color2:"#fc6f03" , 
        size: window.innerWidth < 600 ? 20 : 25,
        value:product.ratings,
        isHalf:true,
     
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(match.params.id))
        window.scrollTo(0, 0);
    },[dispatch,match.params.id, error, alert, state]);

    
    useEffect(() => {
        if (product) {
            setRatings(product.ratings);
        }
        if(reviewError){
            alert.error(error)
        }
        if(success){
            alert.success("Review Submitted Successfully")
            dispatch({ type: ADD_REVIEW_RESET });
        }

    }, [product,match.params.id, success,reviewError, dispatch]);

    const submitHandler = () =>{
        alert.success("Item added to cart")
        dispatch(addToCart(match.params.id, quantity))
    }

    return <div>
           {loading? <Loader/> : 
           <>
                <MetaData title = {` Product - ${product.name} `} />
            <div className="ProductDetails">
       
       <div className="box1"
        onClick={ ()=> setState(prevstate=> !prevstate)}   
       >
   <Carousel >
       {product.images && product.images.map((image,index)=>
           <img 
        //    style={{zIndex:"-90"}}
           className="CarouselImage"
           src={image.url}
           key={image.url}
           alt={`${index} Slide`}
           />
           )}
   </Carousel>
           </div>
           <div className="box2">
               
       <div className="detailsb-1" >
           <h1 className="name" >{product.name} </h1>
           <p> Product # {product._id} </p>
       </div>
       <div className="detailsBlock-2" >
           <ReactStars 
           color2={'#fffff'}
           onChange={()=> setRatings(product.ratings)}  {...options} />
           <span> ({product.numofReviews}) Num of Reviews </span>                     
       </div>
       <hr></hr>

       <div className="detailsblock-3">
           <h1> ₹ {product.price}  </h1>
           <div className="detailsblock-3-1">
               <div  className="detailsblock-3-1-1" 
               >
                   <button  onClick={decreaseQty} >-</button>
                   <input readOnly className="quanitty" value={quantity} />
                   <button onClick={increaseQty} >+</button>
               </div>
               <button disabled={product.Stock <1 ? true : false} className="addtocart" onClick={submitHandler
            }
            > Add to Cart</button>
           </div>
           <hr></hr>

           <p> <b>Status : </b> 
               <b className={product.Stock < 1 ? "redColor": "greenColor" } 
               >
                   {product.Stock < 1 ? "OutofStock" : "InStock"}
                 </b>
           </p>
       </div>
           <div className="detailsblock-4">
            Description : <div> {product.description}</div>
           <button onClick={submitReviewToggle} className="submit-review"
           > Submit Review </button>
           </div>  
           </div>
      </div>
      <hr></hr>
      <div> 
            <h3 className="sub-heading"> Reviews </h3>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className="dialogBox"
            onClose={submitReviewToggle}
            >
            <DialogTitle> Submit Review </DialogTitle>
            <DialogContent>
            <Rating 
                onChange={(e)=>setRatings2(e.target.value)}
                size="large"
                
                value={ratings2}
            />
            <textarea
            aria-setsize={false}
            className="submitDialogTextArea"
            placeholder="Enter your Review"
             cols="30"
             rows="5"
             value={comment}
             onChange={(e)=>setComment(e.target.value)}
            >
            </textarea>
            </DialogContent>

            <DialogActions>
                <Button
               color="red"
               onClick={submitReviewToggle}
                >Cancel</Button>
                <Button
                onClick={submitReviewHandler}
                >Submit</Button>
            </DialogActions>
            </Dialog>

             {
               product.reviews && product.reviews[0] ? (
                   <div  className="review-container" > 
               {product.reviews && product.reviews.map((review)=>(
                   <Review key={review._id} review = {review} />
                   ))}
               </div>
           ) : (
               <p className="no-review">
                   No Reviews Yet
               </p>
           ) }
           </div>
           </>
           }
    </div>
     
}

export default ProductDetails
