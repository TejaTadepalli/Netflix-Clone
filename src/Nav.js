import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css";
export default Nav;

function Nav() {
const [show, handleShow] = useState(false);
const history = useNavigate();   //we use this to redirect to a different page using the "history"

const transitionNavBar = () => {
    if (window.scrollY > 100) {
        handleShow(true);
    } else {
        handleShow(false);
    }
};

useEffect(() => {
window.addEventListener("scroll", transitionNavBar);
return () => window.removeEventListener('scroll', transitionNavBar);
}, [])

return (
    <div className={`nav ${show && "nav_black"}`}>
        <div className="nav_contents">
            <img    class='nav_logo' 
                    src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png' 
                    alt='NETFLIX'
                    onClick={()=>history('/')}  //we will be directed to HomeScreen
            />
            <img    class='nav_profile'
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt='PROFILE' 
                    onClick={()=>history('/profile')}   //We will be directed to ProfileScreen
            />
        </div>
        {/*<h1>NAV</h1>*/}
    </div>
)
}