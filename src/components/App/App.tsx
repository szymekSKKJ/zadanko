import "./app.css";
import { useState } from "react";
import CurrentPerson from "./CurrentPerson/CurrentPerson";
import UpSide from "./UpSide/UpSide";
import RegisterForm from "../RegisterForm/RegisterForm";

const App = () => {
  const [isRegisterFormOpend, setIsRegisterFormOpend] = useState(false);

  return (
    <div className="app">
      {isRegisterFormOpend === false ? (
        <>
          <UpSide setIsRegisterFormOpend={setIsRegisterFormOpend}></UpSide>
          <CurrentPerson></CurrentPerson>
        </>
      ) : (
        <RegisterForm></RegisterForm>
      )}
    </div>
  );
};

export default App;
