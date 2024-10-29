import { Outlet, useLocation, useParams } from "react-router-dom";
import cn from "classnames";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useTypedSelector } from "hooks/useTypedSelector";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  const location = useLocation();
  const { id } = useParams();

  const { user } = useTypedSelector((state) => state.auth);

  return (
    <>
      {user?.test_is_started &&
      location.pathname.includes(`${"product/"}${id}`) ? (
        ""
      ) : (
        <Header />
      )}
      <main
        className={cn(
          styles.mainLayout,
          user?.test_is_started &&
            location.pathname.includes(`${"product/"}${id}`)
            ? styles.mainLayout__full
            : ""
        )}
      >
        <Outlet />
      </main>
      {user?.test_is_started &&
      location.pathname.includes(`${"product/"}${id}`) ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

export default MainLayout;
