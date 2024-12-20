import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">StockSimplify</a>
                <a className="navbar-brand text-white" href="/brands">Marcas</a>
                <a className="navbar-brand text-white" href="/categories">Categorias</a>
                <a className="navbar-brand text-white" href="/inflows">Entradas</a>
            </div>
        </nav>
    );
};

export default Navbar;
