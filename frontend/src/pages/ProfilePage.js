import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../CartographForm';

function ProfilePage() {
    
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
}

export default ProfilePage;