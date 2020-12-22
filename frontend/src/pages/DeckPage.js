import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import Deck from '../components/Deck';


function DeckPage() {
    return (
        <>
            <Header />
            <Deck />
        </>
    );
}

export default withRouter(DeckPage);