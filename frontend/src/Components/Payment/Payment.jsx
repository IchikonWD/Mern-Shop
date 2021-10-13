import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Form';
import CheckoutSteps from '../CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';

const Payment = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;

  if (!shippingAdress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              as='select'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value='PayPal'>PayPal</option>
              <option value='Stripe' disabled>
                Stripe
              </option>
              <option value='Credit Card' disabled>
                Credit Card
              </option>
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Next
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Payment;
