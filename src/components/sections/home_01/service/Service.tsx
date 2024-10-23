import data from "./data.json";
import Service_Block from "../Service_Block";

const Service = () => {
  return (
    <section id="section-service">
      <div className="pb-16 pt-16 xl:pb-[120px] xl:pt-[100px] bg-gray-100">
        <div className="global-container">
          <div className="text-center mb-10 lg:mb-14 xl:mb-18">
            <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl">
              Наши лучшие онлайн-курсы
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Учитесь с комфортом, развивайтесь с лучшими курсами, доступными
              онлайн
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item, index) => (
              // @ts-ignore
              <Service_Block key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Service;
