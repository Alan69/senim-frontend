import { Link } from "react-router-dom";
import logoDark from "assets/img/logo-dark.png";
import Title from "antd/es/typography/Title";

const LogoDark = () => {
  return (
    <Link to="/">
      {/* <img
        src={logoDark}
        alt="AIMass"
        style={{
          filter:
            "invert(0%) sepia(0%) saturate(12%) hue-rotate(41deg) brightness(96%) contrast(101%)",
        }}
        width="96"
        height="32"
      /> */}
      <Title level={3} style={{ marginBottom: 0 }}>
        SapaTest
      </Title>
    </Link>
  );
};

export default LogoDark;
