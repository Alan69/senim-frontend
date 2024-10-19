import { Link } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import logoLight from 'assets/img/logo-light.png';
import { useTypedSelector } from 'hooks/useTypedSelector';

const LogoDark = () => {
  // const { user } = useTypedSelector((state) => state.auth);

  return (
    <Link
      to='/'
    // style={{ pointerEvents: user?.test_is_started ? 'none' : 'unset' }}
    >
      <img
        src={logoDark}
        alt='AIMass'
        width='96'
        height='24'
      // style={{ pointerEvents: user?.test_is_started ? 'none' : 'unset' }}
      />
    </Link>
  );
};

export default LogoDark;
