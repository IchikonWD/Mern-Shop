import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      &nbsp;
      <Button variant='primary' className='p-2' type='submit'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
