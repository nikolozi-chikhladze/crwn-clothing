import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux'
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router';
import { toggleCartHidden } from '../../redux/cart/cart.actions';


const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                (
                    cartItems.map(cartItem => (
                        <CartItem
                            key={cartItem.id}
                            item={cartItem}
                        />
                        )
                    ) 
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
        </div>
        <CustomButton
            type="button"
            onClick={() => {
                dispatch(toggleCartHidden());
                history.push('/checkout');
            }}
        >GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown));