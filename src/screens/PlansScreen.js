import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import './PlansScreen.css'
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products,setProducts]=useState([]);
    const user=useSelector(selectUser);
    const [subscription,setSubscription]=useState(null);

    useEffect(()=>{
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(async subscription=>{
                // console.log(subscription.data());    to see the data on console
                setSubscription({
                    role:subscription.data().role,  
                    current_period_end:subscription.data().current_period_end.seconds,
                    current_period_start:subscription.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid])

    useEffect(()=>{
        db.collection('products')
        .where('active','==',true)
        .get()
        .then(querySnapshot=>{
            const products={};
            querySnapshot.forEach(async productDoc=>{
                products[productDoc.id]=productDoc.data();
                const priceSnap=await productDoc.ref.collection('prices').get();    //async request is made
                priceSnap.docs.forEach(price=>{ //for each thingy under prices we will be able to list them down
                    products[productDoc.id].prices={
                        priceId:price.id,
                        priceData:price.data()
                    }
                })
            });
            setProducts(products);
        });
    },[])

    //console.log(products); we will be able to see the products in the console (pulling the information from extension stripe)
    //console.log(subscription); we will be able to see the subscription in the console (pulling the information from extension stripe)

    const loadCheckout=async(priceId)=>{    //asynchronous function used here
        //load stripe checkout
        const docRef=await db
        .collection('customers')  //async request is made
        .doc(user.uid)  //id of the customer (pulling the information from extension stripe)
        .collection('checkout_sessions')
        .add({
            price:priceId,
            success_url:window.location.origin, //we will send the user to this screen if successful payment
            cancel_url:window.location.origin,  //we will send the user to this screen if unsuccessful payment
        });
        docRef.onSnapshot(async(snap)=>{    //async request is made
            const {error,sessionId}=snap.data();    //destructuring the data
            if(error){
                //show an error to customer and inspect your cloud function logs in firebase
                alert(`An error occured: ${error.message}`);
            }
            if(sessionId){
                //we have a session, lets redirect to checkout
                //init stripe
                const stripe=await loadStripe('pk_test_51Ie8c6JbU6K7U3qB3C2Qz1GJy6Y7Y3q3oKw8QzJGd0a7o9p9Xs1sVYpY0d1YVvJyjwP8lQgZt2Q2t9r9X8z8tCZM00jYgYiZjM');
                //above we have used the PUBLISHABLE KEY from stripe
                stripe.redirectToCheckout({sessionId}); //sessionId is the id of the session from the Snapshot
            }
        });
    };

    return (
        <div className='plansScreen'>
            {subscription && ( //if subscription is true then only show the below
                <p>Renewal Date: {" "} {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>   //multiply by 1000 as it is a timestamp
            )}
            {Object.entries(products).map(([productId,productData])=>{  //we will map the products here
                // we will get it in the form of a (key,value) pair
                const isCurrentPackage=productData.name?.toLowerCase().includes(subscription?.role); //subscription?.role will be used as if subscription is not there, then it will not give an error
                //we will check if the user's subscription is active

                return(
                    <div key={productId} //now for the ClassName part, we want to disable the currently selected package, hence we will use the isCurrentPackage to identify the current package
                        className={`${isCurrentPackage && "plansScreen_plan--disabled"}plansScreen_plan`}>
                        <div className='plansScreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage?'Current Package':'Subscribe'}  {/*we will get the respective subscribe button for each product available*/}
                        </button>
                    </div>
                );
            }
            )}
        </div>
    );
}

export default PlansScreen