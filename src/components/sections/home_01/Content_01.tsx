import { ReactComponent as Content1Svg } from "../home_01/service/content1.svg";

const Content_01 = () => {
  return (
    <section id="content-section-1">
      <div className="pb-4">
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
            <div
              className="jos order-2 overflow-hidden rounded-md md:order-1"
              data-jos_animation="fade-left"
            >
              <Content1Svg width={526} height={450} className="h-auto w-full" />
            </div>
            <div
              className="jos order-1 md:order-2"
              data-jos_animation="fade-right"
            >
              <div className="mb-6">
                <h2>Интерактивное обучение</h2>
              </div>
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  Мы предлагаем вам уникальный опыт интерактивного обучения с
                  использованием самых современных технологий. Пройдите тесты в
                  реальном времени, получите обратную связь и улучшайте свои
                  навыки.
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
