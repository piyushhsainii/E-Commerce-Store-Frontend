import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Country, State} from "country-state-city"
import { Home, LocationCity, PhoneOutlined, PinDrop, PublicOutlined, TransferWithinAStation } from '@material-ui/icons'
import MetaData from '../src/MetaData'
import "./ShippingInfo.css"
import CheckOutSteps from "./CheckOutSteps.jsx"
import {ShippingInfoAction} from "../src/actions/cartAction"
import { SAVE_SHIPPING_INFO } from '../src/constants/cartConstants'

const ShippingInfo = ({ history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { shippingInfo } = useSelector((state)=> state.cart)

    const [address, setaddress] = useState(shippingInfo.address)
    const [City, setCity] = useState(shippingInfo.City)
    const [state, setState] = useState(shippingInfo.State)
    const [country, setCountry] = useState(shippingInfo.country)
    const [PinCode, setPinCode] = useState(shippingInfo.PinCode)
    const [phoneNo, setphoneNo] = useState('')

    const ContinueHandler = (e)=>{
        e.preventDefault();
        if(phoneNo.length <10 || phoneNo.length > 10 ){
            return alert.error("PHONE NUMBER SHOULD BE OF 10 DIGITS")
        }
        dispatch(
            ShippingInfoAction({
                address,
                City, 
                state,
                country,
                PinCode,
                phoneNo,})
        )
        history.push('/order/confirm')
    }

  return (
    <Fragment>
        <MetaData title={"Shipping Info"} ></MetaData>

        <div id='steppermargin'>  </div>
        <CheckOutSteps activeStep={0} />
        <form onSubmit={ContinueHandler}>
                   <div className='shipping justforspace' >
       <Home/>
        <input type="text"
        required
        placeholder='Enter your Address'
        value={address}
        onChange={(e)=> setaddress(e.target.value)}
        />
       </div>
       <div className='shipping' >
        <PublicOutlined />
        <input type="text"
        required
        value={City}
        placeholder='Enter your City'
        onChange={(e)=> setCity(e.target.value)}
        />
        </div>
        
        <div className='shipping' >
        <PinDrop />
        <input type="text"
        required
        placeholder='Enter your Pincode'
        value={PinCode}
        onChange={(e)=> setPinCode(e.target.value)}
        />
        </div>

        <div className='shipping' >
        <PhoneOutlined />
        <input type="text"
        required
        placeholder='Enter your Phone Number'
        value={phoneNo}
        onChange={(e)=> setphoneNo(e.target.value)}
        />
        </div>

        <div className={`shipping country`} >
        <PublicOutlined />
            <select
            required
            value={country}
             onChange={(e)=> setCountry(e.target.value)}
            >
            <option className='country'  value="" >Country </option>
            { 
            Country && 
             Country.getAllCountries().map((item)=>
            <option key={item.isoCode} value={item.isoCode}  > {item.name}  </option>
            )}
            </select>
        </div>
            {
                country && (
                    <div className={`country }`} >
                        <TransferWithinAStation/>
                        <select required 
                        value={state}
                        onChange={(E)=>setState(E.target.value)}
                        >
                            {
                                State && State.getStatesOfCountry(country).map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}  > {item.name} </option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
            <input
            type="submit"
             value={'Continue'}
             className={`continueBtn downspace  `}
            // disabled={state? false:true }
            />


        </form>



    </Fragment>
  )
}

export default ShippingInfo