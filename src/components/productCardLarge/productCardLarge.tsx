import "./productCardLarge.scss";
type Props = {
  title: string;
  thumbnail: string;
  description: string;
  id: number;

  handleAddToCart: (arg: number) => void;
  handleNavigate: (arg: number) => void;
};

function ProductCard({
  title,
  thumbnail,
  description,
  handleAddToCart,
  handleNavigate,
  id,
}: Props) {
  return (
    <div className="product-card">
      <h1 className="product-card__title">{title}</h1>
      <img className="product-card__img" src={thumbnail} alt="product" />
      <p className="productCard__descr">{description}</p>
      <div className="product-card__btnWrapper">
        <button
          onClick={() => {
            handleAddToCart(id);
            console.log("added " + id);
          }}
          className="bntAdd"
        >
          add
        </button>
      </div>
      <button onClick={() => handleNavigate(id)} className="bntDeteils">
        details
      </button>
    </div>
  );
}

export default ProductCard;
