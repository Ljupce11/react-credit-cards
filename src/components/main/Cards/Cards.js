import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chip from '../../../assets/images/chip.png';

export default () => {
  const [cardsData, setCardsData] = useState([])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cards'))) {
      setCardsData(JSON.parse(localStorage.getItem('cards')))
    }
  }, [])

  return (
    <div className="container-fluid">
      <h1 className="text-center py-4">Cards</h1>
      <div className="row">
        {
          cardsData.map((card, id) => (
            <Link key={id} to={`cards/${card.id}/edit`} className="col-md-3 credit-card">
              <div className="card card-style card-background p-4 text-center flex-column justify-content-around">
                <div className="d-flex justify-content-between mb-5">
                  <img width={50} src={Chip} alt="chip" />
                  <img width={100} height={50} src={card.cardLogo} alt="chip" />
                </div>
                <div className="d-flex justify-content-between">
                  <h3>{card.cardNumberFirst}</h3>
                  <h3>{card.cardNumberSecond}</h3>
                  <h3>{card.cardNumberThird}</h3>
                  <h3>{card.cardNumberFourth}</h3>
                </div>
                <div className="d-flex justify-content-between">
                  <h3>{card.name}</h3>
                  <h3>{card.date}</h3>
                </div>
              </div>
            </Link>
          ))
        }
        <Link to="/add-card" className="col-md-3 credit-card">
          <div className="card card-style card-background flex-column justify-content-center align-items-center">
            <FontAwesomeIcon size="3x" icon={faPlus} />
          </div>
        </Link>
      </div>
    </div>
  )
}