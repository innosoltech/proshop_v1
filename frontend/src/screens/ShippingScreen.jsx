import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress?.phoneNumber || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = function (event) {
    event.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phoneNumber })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phoneNumber" className="my-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></Form.Control>
          <p style={{ color: "red", fontSize: "small" }}>
            Phone number should include country code - e.g. +233 xxx xxx xxx
          </p>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;