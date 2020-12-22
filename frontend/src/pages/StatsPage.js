import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function StatsPage() {
    return (
        <>
            <Header />
            <div className="h-16"></div>
            <div className="text-center p-3">
                this is stats page
            </div>
            <Footer />
        </>
    );
}

export default withRouter(StatsPage);