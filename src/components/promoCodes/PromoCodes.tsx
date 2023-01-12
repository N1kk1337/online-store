type Props = {
  promoObj: [string, number];
  deletePromo: (arg: string) => void;
};

const PromoCodes = ({ promoObj, deletePromo }: Props) => {
  return (
    <div className="active-promo-code">
      <p>{promoObj[0].toUpperCase()}</p> <p>{promoObj[1]}%</p>{" "}
      <button onClick={() => deletePromo(promoObj[0])}> DEL</button>
    </div>
  );
};

export default PromoCodes;
