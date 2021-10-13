import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Product from './Components/Product';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Shipping from './Components/Shipping';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/shipping' component={Shipping} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
