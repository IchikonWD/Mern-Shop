import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
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
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          defaultSortFieldId={0}
          responsive
        />
      )}
    </>
  );
};

export default Home;
