import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, updateDeck, readDeck } from "./../utils/api/index.js";

function EditDeck({decks}) {
    const params = useParams();
    const deckId = params.deckId;
	
	const [currentDeck, setCurrentDeck] = useState({});
    const [deckName, setCurrentDeckName] = useState('')
	
	
	const fetchDeck = async () => {
        let result = await readDeck(deckId)
        setCurrentDeck(result)
        setCurrentDeckName(result.name)
    }

    useEffect(() => {
        fetchDeck()
    }, [deckId])
	
    const initialFormState = decks.filter((deck) => deck.id == deckId)[0];
    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
    setFormData({
        ...formData,
        [target.name]: target.value,
    });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
		updateDeck(formData)
    };

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item active"> <Link to = {`/decks/${deckId}`}> {deckName} </Link> </li>
                        <li className = "breadcrumb-item"> Edit Deck </li>
                    </ol>
                </nav>
            </div>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className = "form-group"> Name </label>
                        <input
                            className = "form-control"
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="Deck Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className = "form-group"> Description </label>
                        <textarea
                            className = "form-control"
                            id="description"
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            placeholder="Brief description of the deck"/> 
                </div>
                <Link to = {`/decks/${deckId}`} type = "button" className = "btn btn-secondary mr-2"> Cancel </Link>
                <button type="submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;