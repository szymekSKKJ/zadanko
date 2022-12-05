import "./UpSide.css";

type UpSideTypes = {
  setIsRegisterFormOpend: Function;
};

const UpSide = ({ setIsRegisterFormOpend }: UpSideTypes) => {
  return (
    <div className="up-side">
      <p>Szymon Stępniak</p>
      <button className="main-button mb-style-2" onClick={() => setIsRegisterFormOpend(true)}>
        Formularz rejestracyjny
      </button>
    </div>
  );
};

export default UpSide;
