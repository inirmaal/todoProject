import React from 'react';
import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import Layout from './components/Layout';
import './components/Footer.css';
import TodoContextProvider from './TodoContext';
import ListItem from './components/ListItem';

const App = () => {
  return (
    <TodoContextProvider>
      <Layout>
        <Header />
        <Form />
        <ListItem />
        <Footer />
      </Layout>
    </TodoContextProvider>
  )
};

export default App;