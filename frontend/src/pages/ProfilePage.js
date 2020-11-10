import React, { useState } from 'react';
import LocationRequests from '../components/LocationRequests';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';

function ProfilePage() {
    const user = "igrac";
    
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
}

export default ProfilePage;