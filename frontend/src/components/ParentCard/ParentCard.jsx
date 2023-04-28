import React from "react";
import Address from "../Address/Address";

const ParentCard = ({ parent }) => {
  return (
    <div>
      <h3>
        {parent.first_name} {parent.last_name}
      </h3>
      <div>
        <h5>Address:</h5>
        <Address address={parent.address} />
      </div>
      <p>
        email: {parent.email}
        <br />
        phone: {parent.phone}
      </p>
    </div>
  );
};

export default ParentCard;
