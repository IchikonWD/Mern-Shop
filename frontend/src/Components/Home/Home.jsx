import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Rating from '../../Components/Rating';
import Message from '../Message';
import Loader from '../Loader';
import { listProducts } from '../../actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <div className='product-card'>
                <img src={product.image} alt={product.name} />
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p>{product.description}</p>
                <p>{product.price} €</p>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
