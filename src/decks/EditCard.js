import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readCard, readDeck } from "./../utils/api/index.js";

//
// Double-check if the handler gets enough time to process the data
// Move the state up if needed

function EditCard ({ decks }) {
	const history = useHistory();
    const params = useParams();
    const deckId = params.deckId;
	const cardId = params.cardId;
	
	const [currentDeck, setCurrentDeck] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('')
    const [cardsList, setCardsList] = useState([])
	const [currentCard, setCurrentCard] = useState([])
	
	const fetchDeck = async () => {
        let result = await readDeck(deckId)
		let cardResult = await readCard(cardId)
        setCurrentDeck(result)
        setCurrentDeckName(result.name)
        setCardsList(result.cards)
		setCurrentCard(cardResult)
    }

    useEffect(() => {
        fetchDeck()
    }, [deckId])

    const initialFormState = {
		front: currentCard.front,
		back: currentCard.back,
		id: currentCard.id,
      };

    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
    setFormData({
        ...formData,
        [target.name]: target.value,
    });
    };

    const handleSave = (event) => {
    event.preventDefault();
    updateCard(formData).then(resolved => history.push('/decks/3/cards/25/decks/3'))
    };

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item active"> <Link to = {`decks/${deckId}`}> {currentDeckName} </Link> </li>
                        <li className = "breadcrumb-item"> {`Edit Card ${cardId}`} </li>
                    </ol>
                </nav>
            </div>
            <h1>{currentDeckName}: Add Card</h1>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label htmlFor="cardFront" className = "form-group"> Front </label>
                        <textarea
                            className = "form-control"
                            id="front"
                            type="text"
                            name="front"
                            onChange={handleChange}
                            value={formData.front}
                            placeholder="Front side of card"/>
                </div>
                <div className="form-group">
                    <label htmlFor="cardBack" className = "form-group"> Back </label>
                        <textarea
                            className = "form-control"
                            id="back"
                            type="text"
                            name="back"
                            onChange={handleChange}
                            value={formData.back}
                            placeholder="Back side of card"/> 
                </div>
                <Link to = {`/decks/${deckId}`} type = "button" className = "btn btn-secondary mr-2"> Cancel </Link>
                <Link to = {`/decks/${deckId}`} type="submit" className = "btn btn-primary" onClick={handleSave} > Submit </Link>
            </form>
        </div>
    )
}

export default EditCard;