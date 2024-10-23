import Hero from "../../components/sections/home_01/Hero";
import Content_01 from "../../components/sections/home_01/Content_01";
import Content_02 from "../../components/sections/home_01/Content_02";
import Content_03 from "../../components/sections/home_01/Content_03";
import Content_04 from "components/sections/home_01/Content_04";
import Service from "../../components/sections/home_01/service/Service";

const Home = () => {
  return (
    <main className="main-wrapper relative overflow-hidden">
      <Hero />
      <Service />
      <Content_01 />
      <Content_02 />
      <Content_04 />
      <Content_03 />
      <div className="orange-gradient-1 absolute -left-[15px] top-[61%] -z-[1] h-[400px] w-[400px] -rotate-[-9.022deg] rounded-[400px]"></div>
      <div className="orange-gradient-2 absolute -left-[100px] top-[64%] -z-[1] h-[360px] w-[360px] -rotate-[-9.022deg] rounded-[360px]"></div>
    </main>
  );
};

export default Home;
