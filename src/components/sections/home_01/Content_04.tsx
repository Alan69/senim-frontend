import { ReactComponent as Content4Svg } from "../home_01/service/content4.svg";

const Content_04 = () => {
  return (
    <section id="content-section-4">
      <div className="pb-4">
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
            <div
              className="jos order-2 overflow-hidden rounded-md"
              data-jos_animation="fade-left"
            >
              {/* Используем SVG */}
              <Content4Svg width={526} height={450} className="h-auto w-full" />
            </div>
            <div
              className="jos order-1 md:order-2"
              data-jos_animation="fade-right"
            >
              <div className="mb-6">
                <h2>Прогрессивная аналитика</h2>
              </div>
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  Отслеживайте свои результаты и успехи с помощью продвинутой
                  аналитики. Получайте детализированные отчеты о вашем
                  прогрессе, а также персонализированные рекомендации для
                  улучшения навыков и повышения результатов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_04;
