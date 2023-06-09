import React from "react";
import Address from "../Address/Address";
import "./ParentCard.css";

const ParentCard = ({ parent }) => {
  return (
    <div className="parent_card">
      <div>
        <Address address={parent.address} />
      </div>
      <p className="non-address-details">
        {parent.email}
        <br />
        {parent.phone}
      </p>
    </div>
  );
};

export default ParentCard;
