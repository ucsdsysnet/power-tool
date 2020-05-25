import React, { useState } from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button, Navbar, NavbarBrand } from 'reactstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import Logo from './logo.png';
import './App.css';
import NavbarText from 'reactstrap/lib/NavbarText';

function App() {

  const [serverOne, setServerOne] = useState('');
  const [serverTwo, setServerTwo] = useState('');
  const [serverThree, setServerThree] = useState('');
  const [serverFour, setServerFour] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [powerUri, setPowerUri] = useState('');
  const [cpuUri, setCpuUri] = useState('');

  /*useEffect(() => {
    fetch("http://power-tool.sysnet.ucsd.edu/api")
      .then(res => res.text())
      .then(res => setResponse(res));
  }, []);*/

  const generateGraphs = e => {
    e.preventDefault();

    let servers = [];
    if (serverOne === 'on') servers[0] = 1; else servers[0] = 0;
    if (serverTwo === 'on') servers[1] = 1; else servers[1] = 0;
    if (serverThree === 'on') servers[2] = 1; else servers[2] = 0;
    if (serverFour === 'on') servers[3] = 1; else servers[3] = 0;

    console.log(`http://power-tool.sysnet.ucsd.edu/api/power?startTime=${startTime}&endTime=${endTime}&serverOne=${servers[0]}&serverTwo=${servers[1]}&serverThree=${servers[2]}&serverFour=${servers[3]}`);
    console.log(`http://power-tool.sysnet.ucsd.edu/api/cpu?startTime=${startTime}&endTime=${endTime}&serverOne=${servers[0]}&serverTwo=${servers[1]}&serverThree=${servers[2]}&serverFour=${servers[3]}`);

    fetch(`http://power-tool.sysnet.ucsd.edu/api/power?startTime=${startTime}&endTime=${endTime}&serverOne=${servers[0]}&serverTwo=${servers[1]}&serverThree=${servers[2]}&serverFour=${servers[3]}`)
      .then(res => res.text())
      .then(res => setPowerUri(res));

    fetch(`http://power-tool.sysnet.ucsd.edu/api/cpu?startTime=${startTime}&endTime=${endTime}&serverOne=${servers[0]}&serverTwo=${servers[1]}&serverThree=${servers[2]}&serverFour=${servers[3]}`)
      .then(res => res.text())
      .then(res => setCpuUri(res));
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={Logo} style={{height: '50px', marginLeft: '250px'}}/></NavbarBrand>
        <NavbarText>Power Metrics Tool</NavbarText>
      </Navbar>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col sm="4">
            <h3>Servers to analyze</h3>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={e => setServerOne(e.target.value)}/>{' '}
                c09-13
              </Label>
              <br/>
              <Label check>
                <Input type="checkbox" onChange={e => setServerTwo(e.target.value)}/>{' '}
                c09-14
              </Label>
              <br/>
              <Label check>
                <Input type="checkbox" onChange={e => setServerThree(e.target.value)}/>{' '}
                c09-15
              </Label>
              <br/>
              <Label check>
                <Input type="checkbox" onChange={e => setServerFour(e.target.value)}/>{' '}
                c09-16
              </Label>
            </FormGroup>
          </Col>
          <Col sm="4">
            <h3>Start date/time</h3>
            <Datetime dateFormat="MM/DD/YYYY" timeFormat="HH:mm:ss" onChange={e => setStartTime(moment(e).format('MM/DD/YYYY::HH:mm:ss'))}/>
          </Col>
          <Col sm="4">
            <h3>End date/time</h3>
            <Datetime dateFormat="MM/DD/YYYY" timeFormat="HH:mm:ss" onChange={e => setEndTime(moment(e).format('MM/DD/YYYY::HH:mm:ss'))}/>
          </Col>
        </Row>
        <Row style={{marginTop: '50px'}}>
            <Button color="primary" onClick={generateGraphs}>Graph</Button>
        </Row>
        <Row style={{marginTop: '50px'}}>
            <img src={powerUri && `http://power-tool.sysnet.ucsd.edu/power-graphs/${powerUri}`} />
            <img src={cpuUri && `http://power-tool.sysnet.ucsd.edu/cpu-graphs/${cpuUri}`} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
