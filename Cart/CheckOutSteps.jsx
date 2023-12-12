import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
import React from 'react'
import { Fragment } from 'react'


const CheckOutSteps = ( { activeStep } ) => {
    const steps = [
        {
            label: <Typography> Shipping Details </Typography>,
            icon: <LocalShipping/>
        },
        {
            label: <Typography> Confirm Orders </Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography> Payment </Typography>,
            icon: <AccountBalance />
        },
    ]

    const stepStyles = {
        boxSizing: "border-box",
    }

    return (
    <Fragment  >
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            { 
                steps.map((item, index)=>(
                    <Step
                    key={index}
                    active={index===activeStep}
                    completed={activeStep >= index ? true : false }
                    >
                        <StepLabel 
                        icon={item.icon}
                        style={{color:activeStep >= index ? "tomato" : "" }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </Fragment>
  )
}

export default CheckOutSteps