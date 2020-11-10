import React from 'react';

function showCartographApproval(x) {
    alert(x)
}

function CartographRequests() {
    return (
        <div>
            <div 
                className="text-center text-base geo-text white p-3" 
            >
                Cartograph Requests
            </div>
            <div className="h-8"></div>
            <div 
                className="text-center text-sm geo-text black p-3 border border-black box-shadow cursor-pointer"
                onClick={() => showCartographApproval(1)}  
            >
                username example 1
            </div>
            <div 
                className="text-center text-sm geo-text black p-3 border border-black box-shadow cursor-pointer"
                onClick={() => showCartographApproval(2)}  
            >
                username example 2
            </div>
        </div>
    );
}

export default CartographRequests;
