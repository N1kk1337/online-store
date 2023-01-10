import visa from "../../assets/images/visa.png";
import mir from "../../assets/images/mir.svg";
import mastercard from "../../assets/images/mastercard.jpg";
import wildcard from "../../assets/images/wildcard.jpg";
import "./ImageSwitcher.scss";
interface Props {
  value: string;
}

const ImageSwitcher: React.FC<Props> = ({ value }) => {
  let image: string;
  switch (value[0]) {
    case "2":
      image = mir;
      break;
    case "4":
      image = visa;
      break;
    case "5":
      image = mastercard;
      break;
    default:
      image = wildcard;
  }

  return <img className="image-switcher" src={image} alt="Bank Card" />;
};

export default ImageSwitcher;
