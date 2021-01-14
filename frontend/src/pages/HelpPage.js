import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function HelpPage() {
    return (
        <>
            <Header />
            <div className="h-16"></div>
            <div className="text-center p-3">
                this is help page
            </div>
            <Footer />
        </>
    );
}

export default withRouter(HelpPage);