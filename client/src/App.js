import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Datetime from 'react-datetime';
import './App.css';

function App() {

  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => setResponse(res));
  }, []);

  return (
    <Container>
      <Row style={{marginTop: '50px'}}>
        <Col sm="4">
          <h3>Servers to analyze</h3>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              b09-11
            </Label>
            <br/>
            <Label check>
              <Input type="checkbox" />{' '}
              b09-12
            </Label>
            <br/>
            <Label check>
              <Input type="checkbox" />{' '}
              b09-13
            </Label>
            <br/>
            <Label check>
              <Input type="checkbox" />{' '}
              b09-14
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <h3>Start date/time</h3>
          <Datetime dateFormat="MM/DD/YYYY" timeFormat="hh:mm:ss"/>
        </Col>
        <Col sm="4">
          <h3>End date/time</h3>
          <Datetime />
        </Col>
      </Row>
      <Row style={{marginTop: '50px'}}>
        <h3>Result will be graphed here.</h3>
        <p>{response}</p>
      </Row>
    </Container>
  );
}

export default App;
