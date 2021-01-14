import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import PersonalStats from '../components/PersonalStats';

function StatsPage() {
    return (
        <>
        <div className="stats-page geo-color">

            <Header />
            <PersonalStats />
        </div>
        </>
    );
}

export default withRouter(StatsPage);