import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JQoFcB2tHvNI9Wvt8gs1rbeyqN6rSj1TQRGMRsH3FBw9ttVz5ZWQlkW4XdNAXgjPjlXqXTeAJLOhPJLxntBpuPl00AUXDOF1F';
    
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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