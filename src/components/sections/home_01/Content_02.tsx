import { ReactComponent as Content2Svg } from "../home_01/service/content2.svg";

const Content_02 = () => {
  return (
    <section id="content-section-2">
      <div className="pb-4">
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
            <div
              className="jos order-1 md:order-1"
              data-jos_animation="fade-right"
            >
              <div className="mb-6">
                <h2>Адаптивные тесты</h2>
              </div>
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  Наши адаптивные тесты подстраиваются под ваш уровень знаний,
                  позволяя вам сосредоточиться на тех темах, которые требуют
                  наибольшего внимания. Система автоматически анализирует ваши
                  результаты и предлагает подходящие вопросы.
                </p>
              </div>
            </div>
            <div
              className="jos order-2 overflow-hidden rounded-md"
              data-jos_animation="fade-left"
            >
              <Content2Svg width={526} height={450} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_02;
