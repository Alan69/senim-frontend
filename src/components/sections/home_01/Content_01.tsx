const Content_01 = () => {
  return (
    <section id='content-section-1'>
      <div className='pb-20 xl:pb-[150px]'>
        <div className='global-container'>
          <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32'>
            <div
              className='jos order-2 overflow-hidden rounded-md md:order-1'
              data-jos_animation='fade-left'
            >
              <img
                src='assets/img/th-1/content-image-1.png'
                alt='content-image-1'
                width='526'
                height='450'
                className='h-auto w-full'
              />
            </div>
            <div
              className='jos order-1 md:order-2'
              data-jos_animation='fade-right'
            >
              <div className='mb-6'>
                <h2>Поддержка 24/7</h2>
              </div>
              <div className='text-lg leading-[1.4] lg:text-[21px]'>
                <p className='mb-7 last:mb-0'>
                  Мы всегда готовы помочь вам! Наша служба поддержки доступна круглосуточно, чтобы ответить на все ваши вопросы и решить любые проблемы. Свяжитесь с нами в любое время – мы здесь, чтобы обеспечить вам наилучший опыт.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_01;
