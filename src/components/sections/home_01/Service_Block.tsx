import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
// @ts-ignore
const Service_Block = ({ icon_black, icon_orange, title, text }) => {
  return (
    <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black'>
      <div className='relative mb-9 h-[70px] w-[70px]'>
        <img
          src={icon_black}
          alt='service-icon-black-1'
          width={70}
          height={70}
        />
        <img
          src={icon_orange}
          alt='service-icon-orange-1'
          width={70}
          height={70}
          className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
        />
      </div>
      <h3 className='mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>

      </h3>
      <p className='mb-12 duration-300 group-hover:text-white'>{text}</p>

    </li>
  );
};

export default Service_Block;
