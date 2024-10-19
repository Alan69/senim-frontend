import data from './data.json';
import Service_Block from '../Service_Block';

const Service = () => {
  return (
    <section id='section-service'>
      <div className='pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]'>
        <div className='global-container'>
          <div className='jos mb-10 lg:mb-16 xl:mb-20'>
            <div className=''>
              <h2>Лучшие онлайн-курсы</h2>
            </div>
          </div>
          <ul className='jos grid grid-cols-1 gap-[2px] overflow-hidden rounded-[10px] border-2 border-black bg-black sm:grid-cols-2 lg:grid-cols-4'>
            {data.map((item, index) => (
              <Service_Block key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Service;
