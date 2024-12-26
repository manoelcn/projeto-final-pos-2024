import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Footer() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="bottom">
      <Container className="d-flex justify-content-center">
        <Navbar.Text className="text-white">Stock-Simplify</Navbar.Text>
      </Container>
    </Navbar>
  );
}


export default Footer;