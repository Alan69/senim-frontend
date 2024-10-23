import { ReactComponent as Content3Svg } from "../home_01/service/content3.svg";

const Content_03 = () => {
  return (
    <section id="content-section-3">
      <div className="pb-4">
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
            <div
              className="jos order-1 md:order-1"
              data-jos_animation="fade-right"
            >
              <div className="mb-6">
                <h2>Персонализированное обучение</h2>
              </div>
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  Мы предоставляем индивидуальные учебные программы,
                  адаптированные под ваши цели и темпы обучения. Каждый ученик
                  уникален, и наша платформа настраивает подходящие материалы
                  для максимальной эффективности обучения.
                </p>
              </div>
            </div>
            <div
              className="jos order-2 overflow-hidden rounded-md"
              data-jos_animation="fade-left"
            >
              {/* Используем SVG */}
              <Content3Svg width={526} height={450} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_03;
