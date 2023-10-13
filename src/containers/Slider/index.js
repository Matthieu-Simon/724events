import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date));
    // Modification de la méthode sort pour avoir l'ordre décroissant du slider
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    // Correction du .length pour avoir la longueur du tableau
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout d'une div pour ajouter la key
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                // Correction du bug du bullet point en ajoutant l'index et modifiant la key
                <input
                  key={`${radioIdx * 3}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIdx === index}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
