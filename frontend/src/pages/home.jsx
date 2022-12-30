import React, { useEffect, useState } from "react";

function Home() {

    return (
        <div className="background">
            <div className="title">
                <h1>Transportation & Distribution: Lemon</h1>
            </div>

            <a class="customer" >
                Login as a Customer
            </a>

            <br/>
            
            <a class="employee" >
                Login as a Employee
            </a>

            <p class="total-bikes">
                Total of 20000 bikes all around Portugal
            </p>
        </div>
    );
}

export default Home;