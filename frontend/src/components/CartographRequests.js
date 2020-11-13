import React from 'react'
import ReactDOM from 'react-dom'

const requests = [
    {
        username: "Palma",
        IBAN: "HR12345667890",
        picture: 'https://d.newsweek.com/en/full/520858/supermoon-moon-smartphone-photo-picture.jpg'
    },
    {
        username: "Luka",
        IBAN: "HR12309875521",
        picture: 'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0='
    },
    {
        username: "Matija",
        IBAN: "HR17363636521",
        picture: 'https://media.macphun.com/img/uploads/customer/how-to/579/15349456005b7d69405aabf4.32904503.jpg?q=85&w=1340'
    }
];

function CartographRequests(props) {
    return (
        <div id="requests">
            <div 
                className="text-center text-base geo-text white p-3" 
            >
                Kartografski zahtjevi
            </div>
            <div className="h-8"></div>
            {requests.map((request) => (
                <div 
                    className="text-center text-sm geo-text black p-3 border border-black box-shadow cursor-pointer"
                    onClick={() => {props.setShow(request); props.setRequest(request)}}  
                >
                    { request.username }
                </div>
            ))}
        </div>
    );
}

export default CartographRequests;
