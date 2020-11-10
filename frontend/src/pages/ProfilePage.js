import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProfilePage() {
    return (
        <>
            <Header />
            <div className="text-center text-xs p-3">
                this is profile page
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;