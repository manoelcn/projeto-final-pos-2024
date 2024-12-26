import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Menu = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Stock-Simplify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/brands">Marcas</Nav.Link>
                        <Nav.Link href="/categories">Categorias</Nav.Link>
                        <Nav.Link href="/inflows">Entradas</Nav.Link>
                        <Nav.Link href="/outflows">Saídas</Nav.Link>
                        <Nav.Link href="/products">Produtos</Nav.Link>
                        <Nav.Link href="/suppliers">Fornecedores</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
