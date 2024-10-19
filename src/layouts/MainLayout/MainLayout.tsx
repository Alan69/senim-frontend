import { Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './MainLayout.module.scss'
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useTypedSelector } from 'hooks/useTypedSelector';

const MainLayout = () => {
  const location = useLocation();
  const { id } = useParams();

  const { user } = useTypedSelector((state) => state.auth);

  return (
    <div className='page-wrapper relative z-[1] bg-white'>
      {user?.test_is_started && location.pathname.includes(`${'product/'}${id}`) ? '' : <Header />}
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
      {/* {location.pathname.includes('product') ? '' : <Footer />} */}
      {user?.test_is_started && location.pathname.includes(`${'product/'}${id}`) ? '' : <Footer />}
    </div>
  );
};

export default MainLayout;
