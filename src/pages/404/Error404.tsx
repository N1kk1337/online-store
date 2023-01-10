import "./Error404.scss";
import errorImg from "../../assets/images/error.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <img
        className="error-image"
        onClick={() => {
          navigate("/");
        }}
        src={errorImg}
        alt="Error 404"
      />
    </div>
  );
};

export default Error404;
