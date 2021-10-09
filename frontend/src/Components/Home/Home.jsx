import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../../products';
import Rating from '../../Components/Rating';

const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <div className='product-card'>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
