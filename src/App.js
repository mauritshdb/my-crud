import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response) {
        console.log(response);
        setData(response.data.data);
      });
  }

  const handleAdd = (e) => {
    // e.preventDefault()
    const name = e.target[0].value;
    const description = e.target[1].value;
    const image = e.target[2].value;
    const price = e.target[3].value;
    Axios({
      method: 'post',
      url: 'http://localhost:7777/product',
      data: {
        name: name,
        description: description,
        image: image,
        price: price
      }
    })
      .then(function (response) {
        getData()
      })
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios({
        method: 'post',
        url: `http://localhost:7777/product/delete/${id}`,
      }).
        then(function (response) {
          getData()
        });
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <h1>CRUD</h1>

      <div className='container'>
        <div>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImageLink">
              <Form.Label>Image Address</Form.Label>
              <Form.Control type="text" placeholder="Enter image address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className='cTable'>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Product name</th>
                <th>Description</th>
                <th style={{width: '15%', height: '15%'}}>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><img src={item.image} width='50%'></img></td>
                  <td>{'Rp. ' + item.price}</td>
                  <td><ButtonGroup aria-label="Action">
                    <Button size="sm" variant="primary">Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </ButtonGroup></td>
                </tr>
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
