import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, message, Tag, Tooltip } from 'antd';
import { PlusCircleFilled, ReloadOutlined } from '@ant-design/icons';

import Logo from '../logo/Logo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { authActions } from 'modules/auth/redux/slices/authSlice';

import styles from './Header.module.scss'
import Navbar from 'components/Navbar/Navbar';
import { ModalAddBalance } from 'modules/user/components/ModalAddBalance/ModalAddBalance';
import { useGetAuthUserQuery, useUpdateBalanceMutation } from 'modules/user/redux/slices/api';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useTypedSelector((state) => state.auth);

  const [updateBalance] = useUpdateBalanceMutation();
  const { data: user, isLoading: isUserLoading, refetch: refetchUser } = useGetAuthUserQuery();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(authActions.logOut());
    navigate('/home');
    message.success('Вы успешно вышли!');
  };

  const handleUpdateBalance = () => {
    updateBalance().unwrap().then((res) => {
      message.success(res.success)

      refetchUser()
    }).catch((error) => {
      message.error(error.data.error)
    })
  }

  return (
    <>
      <AntHeader className={styles.header}>
        <Logo />
        <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        <div className='flex items-center gap-6'>
          {!token ? (
            <>
              <Link to='/login' className='button hidden rounded-[50px] border-[#7F8995] bg-transparent text-black after:bg-colorMainPurple hover:border-colorMainPurple hover:text-white lg:inline-block'>Войти</Link>
              <Link to='/signup' className='button hidden rounded-[50px] border-black bg-black text-white after:bg-colorMainPurple hover:border-colorMainPurple hover:text-white lg:inline-block'>Регистрация</Link>
            </>
          ) : (
            <>
              <div className={styles.balanceBlock}>
                <div>Баланс: {Number(user?.balance).toFixed(0)} |</div>
                <Tooltip title="Пополнить баланс">
                  <PlusCircleFilled className={styles.balanceBlock__icon} onClick={() => setIsBalanceModalOpen(true)} />
                </Tooltip>
                <Tooltip title="Обновить баланс">
                  <ReloadOutlined className={styles.balanceBlock__icon} onClick={handleUpdateBalance} />
                </Tooltip>
              </div>

              {!user?.test_is_started ?
                <button
                  onClick={handleLogout}
                  className='button hidden rounded-[50px] border-[#7F8995] bg-transparent text-black after:bg-colorMainPurple hover:border-colorMainPurple hover:text-white lg:inline-block'>
                  Выйти
                </button> : ''
              }
            </>
          )}
          <div className='block lg:hidden'>
            <button
              onClick={() => setMobileMenu(true)}
              className={`mobile-menu-trigger 'is-white'}`}
            >
              <span />
            </button>
          </div>
        </div>
      </AntHeader >
      <ModalAddBalance isOpen={isBalanceModalOpen} setIsOpen={setIsBalanceModalOpen} />
    </>

  );
};

export default Header;
