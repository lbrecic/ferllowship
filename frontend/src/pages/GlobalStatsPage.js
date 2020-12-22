import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import GlobalStatsTable from '../components/GlobalStatsTable';

function GlobalStatsPage() {
    return (
        <>
            <Header />
            <GlobalStatsTable/>
        </>
    );
}

export default withRouter(GlobalStatsPage);