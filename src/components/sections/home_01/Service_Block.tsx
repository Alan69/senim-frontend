import {
  SmileOutlined,
  BookOutlined,
  TeamOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

// @ts-ignore
const Service_Block = ({ title, text, iconType }) => {
  // Массив иконок для подмены в зависимости от типа услуги
  const icons = {
    smile: <SmileOutlined style={{ fontSize: "70px", color: "#ffa500" }} />,
    book: <BookOutlined style={{ fontSize: "70px", color: "#ffa500" }} />,
    team: <TeamOutlined style={{ fontSize: "70px", color: "#ffa500" }} />,
    laptop: <LaptopOutlined style={{ fontSize: "70px", color: "#ffa500" }} />,
  };

  return (
    <li className="group bg-white p-8 transition-all duration-300 ease-in-out hover:bg-black">
      <div className="relative mb-9 h-[70px] w-[70px] flex items-center justify-center">
        {/* Используем иконки Ant Design */}
        <Tooltip title={title}>
          {/* @ts-ignore */}
          {icons[iconType] || icons.smile}{" "}
          {/* Подставляем иконку на основе iconType */}
        </Tooltip>
      </div>
      <h3 className="mb-4 text-xl font-semibold leading-tight text-gray-900 group-hover:text-white xl:text-2xl">
        {title}
      </h3>
      <p className="text-gray-600 group-hover:text-white">{text}</p>
    </li>
  );
};

export default Service_Block;
