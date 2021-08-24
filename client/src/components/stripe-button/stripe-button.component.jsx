import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JQoFcB2tHvNI9Wvt8gs1rbeyqN6rSj1TQRGMRsH3FBw9ttVz5ZWQlkW4XdNAXgjPjlXqXTeAJLOhPJLxntBpuPl00AUXDOF1F';
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'POST',
            data: {
                amount: priceForStripe,
                token,
            }
        }).then(res => {
            alert('Payment successful');
            console.log(res);
        }).catch(err => {
            alert('Payment failed');
            console.log('Payment error: ', JSON.parse(err))
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            description={`Your total is $${price}`}
            amout={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            billingAddress
            shippingAddress
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;