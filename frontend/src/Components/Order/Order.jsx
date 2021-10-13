import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getOrderDetails } from '../../actions/orderActions';

const Order = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2);
    };

    // Calculate prices
    order.data.itemsPrice = addDecimals(
      order.data.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    if (!order || order.data._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        <h1>Order {orderId}</h1>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name </strong> {order.data.user.name}
              <p>
                <strong>Adress:</strong>
                {order.data.shippingAddress.adress},{' '}
                {order.data.shippingAddress.city},
                {order.data.shippingAddress.postalCode},{' '}
                {order.data.shippingAddress.country}
              </p>
              {order.data.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.data.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment Method:</strong>
                {order.data.paymentMethod}
              </p>
              {order.data.isPaid ? (
                <Message variant='success'>Paid on {order.data.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.data.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.data.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}€ = {item.qty * item.price}€
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.data.itemsPrice}€ </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.data.shippingPrice}€ </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.data.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.data.totalPrice}€ </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
