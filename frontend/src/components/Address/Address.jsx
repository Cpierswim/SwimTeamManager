import React from "react";

const Address = ({ address }) => {
  return (
    <p>
      {address.address_line_one}
      <br />
      {address.address_line_two && (
        <>
          address.address_line_two
          <br />
        </>
      )}
      {address.city}, {address.state} {address.zipcode}
    </p>
  );
};

export default Address;
