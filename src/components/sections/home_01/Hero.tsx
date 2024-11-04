import { Button } from "antd";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { token } = useTypedSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <section id="section-hero">
      <div className="relative z-[1] overflow-hidden rounded-bl-[30px] rounded-br-[30px] bg-gradient-to-r from-blue-500 to-blue-700 pb-16 pt-20 lg:rounded-bl-[50px] lg:rounded-br-[50px] lg:pb-20 lg:pt-24 xl:pt-32 xxl:pb-[120px] xxl:pt-[180px]">
        <div className="global-container">
          <div className="mb-10 flex flex-col items-center text-center lg:mb-16">
            <h1 className="slide-from-bottom mb-4 max-w-[510px] text-3xl font-extrabold text-white lg:max-w-[768px] lg:text-4xl xl:max-w-[1076px] xl:text-5xl">
              Присоединяйтесь к лучшей платформе для онлайн-тестов
            </h1>
            <p className="slide-from-bottom mb-8 max-w-[700px] text-base text-gray-200 sm:text-lg xl:max-w-[980px] xl:text-xl">
              Подготовьтесь к экзаменам с Sapatest — самой передовой платформой
              для пробных тестов. Наши интеллектуальные технологии помогут вам
              учиться быстрее и эффективнее.
            </p>
            <Button
              type="primary"
              size="large"
              className="mt-4"
              onClick={() => navigate(token ? "/product/list" : "/login")}
            >
              Начать тестирование
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
