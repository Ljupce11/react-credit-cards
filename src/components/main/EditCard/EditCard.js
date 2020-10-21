import React, { useEffect, useRef, useState } from 'react';
import Chip from '../../../assets/images/chip.png';
import Visa from '../../../assets/images/visa.png';
import Discover from '../../../assets/images/discover.png';
import MasterCard from '../../../assets/images/mastercard.png';

export default (props) => {
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState(null)
  const [showDateError, setShowDateError] = useState(false)
  const [cardLogo, setCardLogo] = useState(Visa)
  const [formData, setFormData] = useState({
    name: '',
    cardNumberFirst: '',
    cardNumberSecond: '',
    cardNumberThird: '',
    cardNumberFourth: '',
    date: ''
  })

  const name = useRef(null);
  const cardNumberFirst = useRef(null);
  const cardNumberSecond = useRef(null);
  const cardNumberThird = useRef(null);
  const cardNumberFourth = useRef(null);
  const date = useRef(null);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('cards'))
    if (cards && cards.length > 0) {
      const selectedCard = cards.find(card => card.id === props.match.params.id)
      setCardLogo(selectedCard.cardLogo)
      setFormData({
        name: selectedCard.name,
        cardNumberFirst: selectedCard.cardNumberFirst,
        cardNumberSecond: selectedCard.cardNumberSecond,
        cardNumberThird: selectedCard.cardNumberThird,
        cardNumberFourth: selectedCard.cardNumberFourth,
        date: selectedCard.date
      })
    }
  }, [props.match.params.id])

  const onChangeHandler = (e) => {
    if (e.target.name === 'cardNumberFirst' || e.target.name === 'cardNumberSecond' || e.target.name === 'cardNumberThird' || e.target.name === 'cardNumberFourth') {
      if (e.target.value.length <= 4) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  useEffect(() => {
    if (formData.cardNumberFirst[0] === '4') {
      setCardLogo(Visa)
    } else if (formData.cardNumberFirst[0] === '5') {
      setCardLogo(MasterCard)
    } else if (formData.cardNumberFirst[0] === '6') {
      setCardLogo(Discover)
    }
  }, [formData.cardNumberFirst])

  const onSaveHandler = (e) => {
    e.preventDefault()
    const selectedDate = formData.date.split('-')
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    if (formData.cardNumberFirst.length !== 4 || formData.cardNumberSecond.length !== 4 || formData.cardNumberThird.length !== 4 || formData.cardNumberFourth.length !== 4) {
      setCardNumberErrorMessage('All card number inputs must contain 4 numbers')
    } else if (formData.cardNumberFirst[0] !== '4' && formData.cardNumberFirst[0] !== '5' && formData.cardNumberFirst[0] !== '6') {
      setCardNumberErrorMessage('Invalid card number')
    } else {
      if (Number(selectedDate[0]) < Number(year)) {
        setShowDateError(true)
      } else if (Number(selectedDate[0]) === Number(year) && Number(selectedDate[1]) < Number(month)) {
        setShowDateError(true)
      } else if (Number(selectedDate[0]) === Number(year) && Number(selectedDate[1]) === Number(month) && Number(selectedDate[2]) < Number(day)) {
        setShowDateError(true)
      } else {
        setCardNumberErrorMessage(null)
        setShowDateError(false)
        const cards = JSON.parse(localStorage.getItem('cards'))
        const selectedCard = cards.find(card => card.id === props.match.params.id)
        const selectedCardIndex = cards.indexOf(selectedCard)
        cards[selectedCardIndex] = {
          ...selectedCard,
          cardLogo: cardLogo,
          name: formData.name,
          cardNumberFirst: formData.cardNumberFirst,
          cardNumberSecond: formData.cardNumberSecond,
          cardNumberThird: formData.cardNumberThird,
          cardNumberFourth: formData.cardNumberFourth,
          date: formData.date
        }
        localStorage.setItem('cards', JSON.stringify(cards))
        props.history.push('/')
      }
    }
  }

  const onTextClickHandler = (e) => {
    if (e.target.id === 'name') {
      name.current.focus()
    } else if (e.target.id === 'cardNumberFirst') {
      cardNumberFirst.current.focus()
    } else if (e.target.id === 'cardNumberSecond') {
      cardNumberSecond.current.focus()
    } else if (e.target.id === 'cardNumberThird') {
      cardNumberThird.current.focus()
    } else if (e.target.id === 'cardNumberFourth') {
      cardNumberFourth.current.focus()
    } else if (e.target.id === 'date') {
      date.current.focus()
    }
  }

  return (
    <div className="container">
      <h1 className="text-center py-4">Edit card</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 d-flex justify-content-center px-5">
          <div style={{ borderRadius: '20px' }} className="card-background p-4 text-center mb-5 w-100">
            <div className="d-flex justify-content-between mb-5">
              <img width={50} src={Chip} alt="chip" />
              <img width={100} height={50} src={cardLogo} alt="chip" />
            </div>
            <div className="d-flex justify-content-between">
              <h3 onClick={onTextClickHandler} id="cardNumberFirst">{formData.cardNumberFirst ? formData.cardNumberFirst : 'XXXX'}</h3>
              <h3 onClick={onTextClickHandler} id="cardNumberSecond">{formData.cardNumberSecond ? formData.cardNumberSecond : 'XXXX'}</h3>
              <h3 onClick={onTextClickHandler} id="cardNumberThird">{formData.cardNumberThird ? formData.cardNumberThird : 'XXXX'}</h3>
              <h3 onClick={onTextClickHandler} id="cardNumberFourth">{formData.cardNumberFourth ? formData.cardNumberFourth : 'XXXX'}</h3>
            </div>
            <div className="d-flex justify-content-between">
              <h3 onClick={onTextClickHandler} id="name">{formData.name ? formData.name : 'Name'}</h3>
              <h3 onClick={onTextClickHandler} id="date">{formData.date ? formData.date : 'Date'}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 d-flex justify-content-center">
          <form onSubmit={onSaveHandler} className="w-100">
            <div className="form-group">
              <label for="name">Name</label>
              <input ref={name} required value={formData.name} onChange={onChangeHandler} name="name" type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name"></input>
            </div>
            <div className="form-row mb-3">
              <div className="col">
                <input ref={cardNumberFirst} required value={formData.cardNumberFirst} onChange={onChangeHandler} name="cardNumberFirst" type="number" className="form-control form-control-lg " placeholder="XXXX"></input>
              </div>
              <div className="col">
                <input ref={cardNumberSecond} required value={formData.cardNumberSecond} onChange={onChangeHandler} name="cardNumberSecond" type="number" className="form-control form-control-lg" placeholder="XXXX"></input>
              </div>
              <div className="col">
                <input ref={cardNumberThird} required value={formData.cardNumberThird} onChange={onChangeHandler} name="cardNumberThird" type="number" className="form-control form-control-lg" placeholder="XXXX"></input>
              </div>
              <div className="col">
                <input ref={cardNumberFourth} required value={formData.cardNumberFourth} onChange={onChangeHandler} name="cardNumberFourth" type="number" className="form-control form-control-lg" placeholder="XXXX"></input>
              </div>
            </div>
            {
              cardNumberErrorMessage &&
              <div class="alert alert-danger" role="alert">
                {cardNumberErrorMessage}
              </div>
            }
            <div className="form-group">
              <label for="name">Expires on</label>
              <input ref={date} required value={formData.date} onChange={onChangeHandler} name="date" type="date" className="form-control form-control-lg" id="name" placeholder="Enter date"></input>
            </div>
            {
              showDateError &&
              <div class="alert alert-danger" role="alert">
                Invalid date
            </div>
            }
            <input type="submit" className="btn btn-lg btn-block btn-primary" value="Save"></input>
          </form>
        </div>
      </div>
    </div>
  )
}