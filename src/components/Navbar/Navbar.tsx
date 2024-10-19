import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TProps = {
  mobileMenu: boolean
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ mobileMenu, setMobileMenu }: TProps) => {
  const { token, user } = useTypedSelector((state) => state.auth);

  const [mobileSubMenu, setMobileSubMenu] = useState('');
  const [mobileSubMenuSub, setMobileSubMenuSub] = useState('');

  const handleMenu = () => {
    setMobileMenu(false);
    setMobileSubMenu('');
    setMobileSubMenuSub('');
  };

  const handleGoBack = () => {
    if (mobileSubMenuSub) {
      setMobileSubMenuSub('');
      return;
    }
    if (mobileSubMenu) {
      setMobileSubMenu('');
      return;
    }
  };

  return (
    <div className='flex justify-center'>
      <div
        onClick={handleMenu}
        className={`menu-overlay ${mobileMenu && 'active'}`}
      />
      <nav
        className={`menu-block ${mobileMenu && 'active'}`}
        id='append-menu-header'
      >
        <div className={`mobile-menu-head ${mobileSubMenu && 'active'}`}>
          <div onClick={handleGoBack} className='go-back'>
            <img
              className='dropdown-icon'
              src='assets/img/icon-black-long-arrow-right.svg'
              alt='cheveron-right'
              width={16}
              height={16}
            />
          </div>
          <div onClick={handleMenu} className='mobile-menu-close'>
            ×
          </div>
        </div>
        <ul className={`site-menu-main`}>
          <li className='nav-item'>
            {/* <Link to='/' className='nav-link-item' style={{ pointerEvents: user?.test_is_started ? 'none' : 'unset' }} onClick={handleMenu}>
              Главная
            </Link> */}
            <Link to='/' className='nav-link-item' onClick={handleMenu}>
              Главная
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={token ? '/profile' : '/login'} className='nav-link-item' onClick={handleMenu}>
              Профиль
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={token ? '/product/list' : '/login'} className='nav-link-item'>
              Продукты
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={token ? '/completed-test/list' : '/login'} className='nav-link-item'>
              Результаты
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link to='/contact' className='nav-link-item'>
              Контакты
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
