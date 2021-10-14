import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Rating from '../../Components/Rating';
import Message from '../Message';
import Loader from '../Loader';
import { listProducts } from '../../actions/productActions';

const Home = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 992px)',
  });

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const columns = [
    {
      name: 'Image',
      selector: (row) => row.image,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Rating',
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
  ];

  const tableData = products.map((product) => ({
    ...product,
    image: <img src={product.image} alt='product' width='100' height='100' />,
    name: <Link to={`/product/${product._id}`}>{product.name}</Link>,
    rating: <Rating value={product.rating} />,
    price: `${product.price}$`,
    stock: product.countInStock > 0 ? 'In Stock' : 'Out of Stock',
  }));

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : isDesktopOrLaptop ? (
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          defaultSortFieldId={0}
          responsive
        />
      ) : (
        <>
          {products.map((product) => (
            <Card key={product._id} className='my-3 p-3 rounded'>
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
              </Link>

              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as='div'>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>

                <Card.Text as='div'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>

                <Card.Text as='h3'>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Home;
