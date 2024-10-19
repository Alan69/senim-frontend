const Content_02 = () => {
  return (
    <>
      <section id='content-section-2'>
        <div className='pb-20 xl:pb-[150px]'>
          <div className='global-container'>
            <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32'>
              <div
                className='jos order-1 md:order-1'
                data-jos_animation='fade-right'
              >
                <div className='mb-6'>
                  <h2>Поддержка 24/7</h2>
                </div>
                <div className='text-lg leading-[1.4] lg:text-[21px]'>
                  <p className='mb-7 last:mb-0'>
                    Наши сотрудники - это команда высококвалифицированных специалистов с многолетним опытом. Мы гордимся нашим профессионализмом и стремимся обеспечить вас лучшим сервисом. Доверьтесь нам - мы знаем, как сделать вашу жизнь проще и удобнее.
                  </p>
                </div>
              </div>
              <div
                className='jos order-2 overflow-hidden rounded-md'
                data-jos_animation='fade-left'
              >
                <img
                  src='assets/img/th-1/content-image-2.jpg'
                  alt='content-image-2'
                  width='526'
                  height='450'
                  className='h-auto w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content_02;
