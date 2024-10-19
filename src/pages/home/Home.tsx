import Hero from '../../components/sections/home_01/Hero';
import Content_01 from '../../components/sections/home_01/Content_01';
import Content_02 from '../../components/sections/home_01/Content_02';
import Service from '../../components/sections/home_01/service/Service';
import ProductList from 'modules/product/components/ProductList/ProductList';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Home = () => {
  const { token } = useTypedSelector((state) => state.auth);

  return (
    <main className='main-wrapper relative overflow-hidden'>
      <Hero />
      <Service />
      {token ? <ProductList /> : ''}
      <Content_01 />
      <Content_02 />
      <div className='orange-gradient-1 absolute -left-[15px] top-[61%] -z-[1] h-[400px] w-[400px] -rotate-[-9.022deg] rounded-[400px]'></div>
      <div className='orange-gradient-2 absolute -left-[100px] top-[64%] -z-[1] h-[360px] w-[360px] -rotate-[-9.022deg] rounded-[360px]'></div>
    </main>
  );
};

export default Home;
