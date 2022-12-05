import "./CurrentPerson.css";
import userWithStarIcon from "../../../assets/icons/user_with_star.svg";
import correctIcon from "../../../assets/icons/correct.svg";
import { useEffect, useState } from "react";

const CurrentPerson = () => {
  const [apiCounter, setApiCounter] = useState(1);
  const [personProfile, setPersonProfile] = useState<any>(null);
  const apiURL = `https://swapi.py4e.com/api/people/${apiCounter}/`;

  const getNextProfile = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      setPersonProfile(data);
    } catch {
      setPersonProfile("error");
    }
  };

  useEffect(() => {
    getNextProfile();
  }, [apiCounter]);

  return (
    <div className="current-person">
      {personProfile !== null ? (
        <>
          <div className="wrapper">
            <img src="https://picsum.photos/534/383"></img>
            <div className="name-and-buttons-wrapper">
              <p className="name">{personProfile !== "error" ? personProfile.name : "Błąd podczas pobierania danych"}</p>
              <button>
                <img src={userWithStarIcon}></img>
              </button>
              <button>
                <img src={correctIcon}></img>
              </button>
            </div>
            <p className="age">Born in: {personProfile !== "error" && personProfile.birth_year}</p>
            <p className="eye-color">Eye color: {personProfile !== "error" && personProfile.eye_color}</p>
          </div>
          <button className="main-button mb-style-1" onClick={() => setApiCounter(apiCounter + 1)}>
            Next profile
          </button>
        </>
      ) : null}
    </div>
  );
};

export default CurrentPerson;
