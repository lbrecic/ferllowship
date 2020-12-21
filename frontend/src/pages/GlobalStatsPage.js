import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlobalStatsTable from '../components/GlobalStatsTable';

function GlobalStatsPage() {
    return (
        <>
            <Header />
            <GlobalStatsTable/>
            <Footer />
        </>
    );
}

export default GlobalStatsPage;