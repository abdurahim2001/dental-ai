import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import HouseIcon from './Icons/hospital-solid.svg';
import Pacients from './Icons/hospital-user-solid.svg';
import Doctors from './Icons/stethoscope-solid.svg';
import Schedule from './Icons/clipboard-list-solid.svg';

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
          <Link className={isActive('/') ? 'active nav-content' : 'nav-content'} to="/">
            <img src={HouseIcon} alt="Главная" className="icon" /> Главное
          </Link>

          <Link
            className={isActive('/patients') ? 'active nav-content' : 'nav-content'}
            to="/patients"
          >
            <img src={Pacients} alt="Пациенты" className="icon" /> Пациенты
          </Link>

          <Link
            className={isActive('/appointments') ? 'active nav-content' : 'nav-content'}
            to="/appointments"
          >
            <img src={Schedule} alt="Записи" className="icon" /> Записи
          </Link>

          <Link
            className={isActive('/ai-analysis') ? 'active nav-content' : 'nav-content'}
            to="/ai-analysis"
          >
            Анализ ИИ
          </Link>

          <Link
            className={isActive('/doctors') ? 'active nav-content' : 'nav-content'}
            to="/doctors"
          >
            <img src={Doctors} alt="Врачи" className="icon" /> Врачи
          </Link>

          <Link className="logout" to="/logout">
            Выход
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
