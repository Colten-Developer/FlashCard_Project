import React, { useState, useEffect } from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "./../utils/api/index.js";

function CreateCard ({decks}) {

    const params = useParams();
    const deckId = params.deckId;
    //cannot use useRouteMatch because we need to go backwards in url, useRouteMatch is equal to our url and cannot go back
	
    const [currentDeck, setCurrentDeck] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('')

    const fetchDeck = async () => {
        let result = await readDeck(deckId)
        setCurrentDeck(result)
        setCurrentDeckName(result.name)

    }

    useEffect(() => {
        fetchDeck()
    }, [deckId])
	

    const initialFormState = {
        front: "",
        back: "",
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
        createCard(deckId, formData);
        setFormData({ ...initialFormState });
      };

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item"> <Link to = {`decks/${deckId}`}> {currentDeckName} </Link> </li>
                        <li className = "breadcrumb-item"> Create Card </li>
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
                    <label htmlFor="back" className = "form-group"> Back </label>
                        <textarea
                            className = "form-control"
                            id="back"
                            type="text"
                            name="back"
                            onChange={handleChange}
                            value={formData.back}
                            placeholder="Back side of card"/> 
                </div>
                <Link to = {`/decks/${deckId}`} type = "button" className = "btn btn-secondary mr-2"> Done </Link>
                <button type="submit" className = "btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default CreateCard;