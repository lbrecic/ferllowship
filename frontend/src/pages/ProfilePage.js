import React, { useState } from 'react'
import LocationRequests from '../components/LocationRequests';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';
import Request from '../components/Request'

function ProfilePage() {
    const user = "igrac";
    const [show, setShow] = useState(false);
    
    if(user === "igrac")
        return (
            <>
                <Header />
                <Profile component={<CartographForm />} />
                <Footer />
            </>
        );

    if(!show && user === "admin") {
        return (
            <>
                <Header />
                <Profile component={<CartographRequests setShow={ setShow } /> } />
                <Footer />
            </>
        );   
    }

    if(show) {
        return (
            <>
                <Header />
                <Request setShow={ setShow } />
                <Profile component={<CartographRequests setShow={ setShow } /> } />
                <Footer />
            </>
        ); 
    }

    if(user === "kartograf")
        return (
            <>
                <Header />
                <Profile component={<LocationRequests />} />
                <Footer />
            </>
        );
}

export default ProfilePage;