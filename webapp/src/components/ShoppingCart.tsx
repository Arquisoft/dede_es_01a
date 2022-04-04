import { Button, Grid } from '@mui/material';
import e from 'express';
import { useEffect, useState } from 'react';
import { Rock } from '../shared/shareddtypes';
import CartItem from './CartItem';
import '../css/ShoppingCart.css';



type Props = {
    cartContent: Rock[];
    handleAddToCart: (selectedItem: Rock) => void;
    handleRemoveFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartContent, handleAddToCart, handleRemoveFromCart }) => {

    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);

    const check2 = (cartContent: Rock[]) => {
        let a = "";
        cartContent.forEach((v, k) => ( a += (v.name + " " + v.quantityCart + "\n") ));
        console.log(a);
        
    }

    return (
        <Grid sx = {{width: 500}}>
            <h1 id='title-cart'>Shopping Cart</h1>
            {cartContent.length === 0 ? <h3>No items in the cart</h3> : null}
            {/* {check2(cartContent)} */}

            <div className="items-cart">
                {cartContent.map(item => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
                ))}
                <h2 id="price-cart">Total: {getTotalPrice().toFixed(2)} €</h2>
            </div>
            <Button
                size="medium"
                disableElevation
                variant="contained"
                disabled={cartContent.length === 0}
                href = "/payment"
            >
                BUY
            </Button>

        </Grid>
    )
};

export default Cart;