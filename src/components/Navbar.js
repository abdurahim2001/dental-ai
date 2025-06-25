import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="navbar">
                <div className="logo">🦷 DentalAI</div>

                <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>

                <nav className={menuOpen ? 'open' : ''}>
                    <Link className={isActive('/') ? 'active' : ''} to="/">Главное</Link>
                    <Link className={isActive('/patients') ? 'active' : ''} to="/patients">Пациенты</Link>
                    <Link className={isActive('/appointments') ? 'active' : ''} to="/appointments">Записи</Link>
                    <Link className={isActive('/ai-analysis') ? 'active' : ''} to="/ai-analysis">Анализ ИИ</Link>
                    <Link className={isActive('/doctors') ? 'active' : ''} to="/doctors">Врачи</Link>
                    <Link className="logout" to="/logout">Выход</Link>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
