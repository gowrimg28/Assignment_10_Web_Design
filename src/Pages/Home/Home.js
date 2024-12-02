import React, { useState } from "react";
import SearchBox from "../../Common/SearchBox";

function Home({ user }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  // };

  return (
    <><div className="intial">
      
    </div><div className="form">
        <div className="callstate">Get Quick Call Assistance</div>

        <div className="box">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <input
            type="tel"
            name="phonenumber"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <button type="submit">RequestCallBack</button>
      </div><main>
        {/* ... (rest of your main content) ... */}
      </main><div className="footer-container">
        <div className="footer-info">
          {/* ... (rest of your footer content) ... */}
          Job Portal
        </div>

        <div className="footer-links">
          {/* ... (rest of your footer links) ... */}
        </div>

        <div className="footer-links">
          {/* ... (rest of your footer links) ... */}
        </div>

        <div className="footer-links">
          {/* ... (rest of your footer links) ... */}
        </div>

        <div className="footer-social">
          {/* ... (rest of your social links) ... */}
        </div>
      </div></>
  );
}

export default Home;
