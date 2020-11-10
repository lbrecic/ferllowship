import React, { useState } from 'react';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';
import LocationRequests from '../components/LocationRequests';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../CartographForm';

function ProfilePage() {
<<<<<<< HEAD
    
    let show = false;

    function onClose() {
        show = false;
    };

    function showRegister() {
        show = !show;
    };

      

    return (
        <>
            <Header />
            <div className="text-center text-xs p-3">
                this is profile page
            </div>

            <button className="btn" onClick={showRegister()}
              text='Registriraj se'> Postani kartograf! </button>
            
            <CartographForm  show={true} onClose={onClose()} />             

            <Footer />
        </>
    );
=======
    const [user, setUser] = useState("igrac");
    
    if(user === "igrac")
        return (
            <>
                <Header />
                <Profile component={<CartographForm />} />
                <Footer />
            </>
        );

    if(user === "admin")
        return (
            <>
                <Header />
                <Profile component={<CartographRequests />} />
                <Footer />
            </>
        );

    if(user === "kartograf")
        return (
            <>
                <Header />
                <Profile component={<LocationRequests />} />
                <Footer />
            </>
        );
>>>>>>> f5598e5b4961145c0e7d0b3e47ab516bbe55d9fd
}

export default ProfilePage;