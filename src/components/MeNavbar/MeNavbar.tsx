import { Container, Nav, Navbar } from 'react-bootstrap';

const MeNavbar = () => {
  return (
    <Navbar className='mb-3' bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Receiver</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="../receiver">Показания счетчиков</Nav.Link>
          <Nav.Link href="../receiver/new-receiver">Новые показания</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MeNavbar