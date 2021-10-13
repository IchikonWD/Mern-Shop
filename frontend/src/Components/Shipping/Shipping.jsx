import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Form';
import CheckoutSteps from '../CheckoutSteps';
import { saveShippingAdress } from '../../actions/cartActions';

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;

  const [adress, setAdress] = useState(shippingAdress.adress);
  const [city, setCity] = useState(shippingAdress.city);
  const [state, setState] = useState(shippingAdress.state);
  const [postalCode, setpostalCode] = useState(shippingAdress.postalCode);
  const [country, setCountry] = useState(shippingAdress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdress({
        adress,
        city,
        state,
        postalCode,
        country,
      })
    );
    history.push('/payment');
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping Adress</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='adress'>
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type='text'
              placeholder='Adress'
              value={adress}
              required
              onChange={(e) => setAdress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
              type='text'
              placeholder='State'
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Postal Code'
              value={postalCode}
              required
              onChange={(e) => setpostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Next
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
