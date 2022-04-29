import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
// import '../css/PaymentProcess.css'
import { CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Rock } from '../../shared/shareddtypes';
import { getDeliveryCosts } from '../../api/api';
import { findConfigFile } from 'typescript';
import PaymentSummary from './PaymentSummary';
import CartItem from '../CartItem';
import PaymentItem from './PaymentItem';
import React from 'react';
import PaymentPayForm from './PaymentPayForm';
import PaymentComplete from './PaymentComplete';
import { useSession } from '@inrupt/solid-ui-react';
import PaymentListItems from './PaymentListItems';


const NUM_VIEWS = 3;
const PAYMENT_FORM_VIEW = 0;
const ITEMS_TO_BUY_VIEW = 1;
const PAYMENT_COMPLETE = 2;

type Props = {
    cartContent: Rock[];
    setNewCart: (isNewCart: boolean) => void;
};

const PaymentPage: React.FC<Props> = ({cartContent, setNewCart}) => {

    
    const [paymentView, setPaymentView] = React.useState(PAYMENT_FORM_VIEW);
    useEffect(() => {
        if(paymentView>=NUM_VIEWS) {
            window.location.href = '/home';
            setPaymentView(0);
        } else if(paymentView<0) {
            window.location.href = '/home';
            setPaymentView(0);
        } 
    }, [paymentView]);


    const nextView = () => {
        setPaymentView((paymentView) => paymentView + 1);
    };
    const previusView = () => {
        setPaymentView((paymentView) => paymentView - 1);
    };

    const getView = (paymentView: number) => {
        switch (paymentView) {
          case ITEMS_TO_BUY_VIEW:
            return (
                
                <PaymentListItems 
                    cartContent={cartContent} 
                    nextView={nextView} 
                    previusView={previusView} 
                    handlePay={handlePay}
                ></PaymentListItems>
                
            );

          case PAYMENT_FORM_VIEW:
            return (
                <PaymentPayForm 
                    nextView={nextView} 
                    previusView={previusView}
                    setLoggedPod={setLoggedPod}
                    isLoggedPod={isLoggedPod}
                ></PaymentPayForm>
            );

            case PAYMENT_COMPLETE:
            return (
                <PaymentComplete nextView={nextView} ></PaymentComplete>
            );
      }
    }

    
    const [isLoggedPod, setLoggedPod] = React.useState(false);
    
    const getPaymentSummary = () => {
        return <PaymentSummary cartContent={cartContent} simplificate={(!isLoggedPod)}></PaymentSummary>
    }

    const handlePay = () => {
        setNewCart(true);
        //TODO: añadir a bd
        alert("Pagado -> no se añade bd");
    }
    
    return (
        <div className='PaymentProcess-payment' >
            <h1 id='title-payment' >Mi compra</h1>
            <div id='info-payment' >
                {getView(paymentView)}
                {getPaymentSummary()}
            </div>
        </div>
    )
};

export default PaymentPage;
