
import 'swiper/css';
import 'swiper/css/autoplay';

const Hero = () => {
  return (
    <section id='section-hero'>
      <div className='relative z-[1] overflow-hidden rounded-bl-[30px] rounded-br-[30px] bg-colorLinenRuffle pb-20 pt-28 lg:rounded-bl-[50px] lg:rounded-br-[50px] lg:pb-24 lg:pt-32 xl:pt-40 xxl:pb-[133px] xxl:pt-[195px]'>
        <div className='global-container'>
          <div className='mb-14 flex flex-col items-center text-center lg:mb-20'>
            <h1 className='jos slide-from-bottom mb-6 max-w-[510px] lg:max-w-[768px] xl:max-w-[1076px]'>
              Лучшая платформа для онлайн-обучения
            </h1>
            <p className='jos slide-from-bottom mb-11 max-w-[700px] text-lg font-semibold sm:text-xl xl:max-w-[980px]'>
              Senimtest — это образовательная компания, которая использует ИИ в тестах, чтобы помочь людям эффективно учиться. Мы предоставляем самые передовые технологии и лучшие решения для обучения.
            </p>
          </div>

        </div>
        <div className='blue-gradient-1 absolute -right-[150px] top-[370px] -z-[1] h-[500px] w-[500px] animate-spin rounded-[500px]'></div>
        <div className='blue-gradient-2 absolute right-[57px] top-[620px] -z-[1] h-[450px] w-[450px] animate-spin rounded-[450px]'></div>
      </div>
    </section>
  );
};

export default Hero;
