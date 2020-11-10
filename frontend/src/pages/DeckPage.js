import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DeckPage() {
    return (
        <>
            <Header />
            <div className="h-16"></div>
            <div className="text-center p-3">
                this is deck page
            </div>
            <Footer />
        </>
    );
}

export default DeckPage;