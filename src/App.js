import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState([]);

  const [nameEdit, setNameEdit] = useState('');
  const [descEdit, setDescEdit] = useState('');
  const [imgEdit, setImgEdit] = useState('');
  const [priceEdit, setPriceEdit] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id, name, description, image, price) => {
    setShow(id);
    setNameEdit(name)
    setDescEdit(description)
    setImgEdit(image)
    setPriceEdit(price)
  }
  

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response) {
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
        price: parseInt(price)
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

  const handleEdit = () => {
    Axios({
      method: 'put',
      url: `http://localhost:7777/product/${show}`,
      data: {
        name: nameEdit,
        description: descEdit,
        image: imgEdit,
        price: parseInt(priceEdit)
      }
    })
      .then(function (response) {
        handleClose()
        setNameEdit('')
        setDescEdit('')
        setImgEdit('')
        setPriceEdit('')
        getData()
      });
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            My CRUD
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className='container'>
        <div className='cc'>
          <div className='cForm'>
            <h1>Input Product</h1>
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
                <Form.Text className="text-muted">
                  link must be ended with .jpg .png .gif
                </Form.Text>
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
                  <th style={{ width: '15%', height: '15%' }}>Image</th>
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
                      <Button size="sm" variant="primary" onClick={() => handleShow(item.id, item.name, item.description, item.image, item.price)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                    </ButtonGroup></td>
                  </tr>
                })}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleEdit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit product name"
                      autoFocus
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit description"
                      value={descEdit}
                      onChange={(e) => setDescEdit(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit image link"
                      value={imgEdit}
                      onChange={(e) => setImgEdit(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Edit price"
                      value={priceEdit}
                      onChange={(e) => setPriceEdit(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
