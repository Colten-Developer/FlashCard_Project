import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "./../utils/api/index.js";

function Study({ decks }) {


    const history = useHistory();
    const deckId = useParams().deckId;

    const [currentCardNumber, setCurrentCardNumber] = useState(1);
    const [cardFlipped, setCardFlipped] = useState(false);
    const [currentDeck, setCurrentDeck] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('')
    const [cardsList, setCardsList] = useState([])
	const [totalCardsNumber, setTotalCardsNumber] = useState('')

    const fetchDeck = async () => {
        let result = await readDeck(deckId)
        setCurrentDeck(result)
        setCurrentDeckName(result.name)
        setCardsList(result.cards)
        setTotalCardsNumber(result.cards.length)
    }

    useEffect(() => {
        fetchDeck()
    }, [deckId])
	

    const flipButtonHandler = (event) => {
        setCardFlipped(true);
    }

    const nextButtonHandler = (event) => {
        if (currentCardNumber < totalCardsNumber) {
            setCardFlipped(false);
            setCurrentCardNumber((currentCardNumber) => currentCardNumber + 1);
        }
    }

    const cancelButtonHandler = (event) => {
        history.push("/")
    }

    const restartButtonHandler = (event) => {
        setCurrentCardNumber(1);
        setCardFlipped(false);
    }

	if(totalCardsNumber === '') {
		return (
			'Loading'
		)
	}

    return (
        totalCardsNumber <= 2 ? (<div className="container w-75">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item active"> <Link to="/"> Home </Link> </li>
                    {/*ADD CARD VIEW HERE */}
                    {/*ADD CARD VIEW HERE */}
                    {/*ADD CARD VIEW HERE */}
                    <li className="breadcrumb-item active"> <Link to = {`decks/${deckId}`}> {currentDeckName} </Link> </li>
                    <li className="breadcrumb-item"> Study </li>
                </ol>
            </nav>
            <h1>Study: {currentDeckName}</h1>
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {totalCardsNumber} in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">Add Cards</Link>
            </div>
        </div>)
            :
            (<div className="container w-75">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li className="breadcrumb-item active"> <Link to="/"> Home </Link> </li>
                        {/*ADD CARD VIEW HERE */}
                        {/*ADD CARD VIEW HERE */}
                        {/*ADD CARD VIEW HERE */}
                        <li className="breadcrumb-item active"> <Link to=""> {currentDeckName} </Link> </li>
                        <li className="breadcrumb-item"> Study </li>
                    </ol>
                </nav>
                <h1>Study: {currentDeckName}</h1>
                <div className="container border border-secondary rounded">
                    <h5>Card {currentCardNumber} of {totalCardsNumber}</h5>
                    {/*Show front if the card is not flipped, else show back*/}
                    {cardFlipped ? (<p>{cardsList[currentCardNumber - 1].back}</p>) : (<p>{cardsList[currentCardNumber - 1].front}</p>)}
                    <button onClick={flipButtonHandler} data-toggle="modal" data-target="#exampleModal" className="btn btn-secondary mb-2 mr-2">Flip</button>
                    {/*Show the "Next" button if card is flipped*/}
                    {cardFlipped ? (<button onClick={nextButtonHandler} className="btn btn-primary mb-2">Next</button>) : null}
                    {/*Show modal if the user flipped the last card*/}
                    {currentCardNumber == totalCardsNumber ?
                        (
                            <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Restart cards?</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Click "Cancel" to return to the home page
                            </div>
                                        <div class="modal-footer">
                                            <button onClick={cancelButtonHandler} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button onClick={restartButtonHandler} type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>)

    )

}

export default Study;
