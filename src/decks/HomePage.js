import React, {useState, useEffect} from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {listCards,listDecks, deleteDeck} from "./../utils/api/index.js";

    function HomePage () {
    const [decks,setDecks] = useState([]);
    const history = useHistory();
	let cardsInCurrentDeck = 0
    const {url, path} = useRouteMatch();
    console.log(url)
    console.log(path)
    //history.push("/decks/1")
    
    useEffect( () => {
      async function loadDecks () {
  
        const getDecks = await (listDecks())
        if (Array.isArray(getDecks)) {
          setDecks(getDecks)
  
        } else if (Array.isArray(getDecks) === false) {
          setDecks([getDecks])
  
        } else {
  
          setDecks(getDecks)
          getDecks.map( async (deck) => {
            const getCards = await listCards(deck.id);
            deck["cards"] = getCards;
          })
        }}
      loadDecks();
    },[])
    

    if(decks === undefined) {
        return "Content is Loading..."
    }

    const decksList = decks.map ((deck) => {
        if (deck === undefined) {
            return "Something Went Horribly Wrong!"
        }
		let suffix = ''
		let cardLength = 0
		//const cardsInCurrentDeck = deck.cards
        cardsInCurrentDeck = deck.cards
        if(cardsInCurrentDeck) {
			suffix = (cardsInCurrentDeck.length == 1) ? "card" : "cards";
			cardLength = cardsInCurrentDeck.length
		}
		
		
		const handleDelete = () => {
			const result = window.confirm('Are you sure you want to delete this deck?')
			deleteDeck(deck.id);
			window.location.reload(false);
		};
		

        return (
            <div className = "deck container rounded border border-secondary mb-2" key = {deck.id}>
                <div className = "row">
                    <div className = "deck-title col-12 d-flex justify-content-between">
                        <h3> {deck.name} </h3>
                        <p> {cardLength} {suffix}</p>
                    </div>

                    <div className = "deck-overview col-12 text-left">
                        <p> {deck.description} </p>
                    </div>

                    <div className = "col-12 d-flex justify-content-between mb-2">
                        <div>
                            <Link to = {`/decks/${deck.id}`} type = "button" className = "btn btn-secondary mr-2">View</Link>
                            <Link to = {`/decks/${deck.id}/study`} deckid={deck.id} type = "button" className = "btn btn-primary">Study</Link>
                        </div>
                        <button deckid={deck.id} type = "button" className = "btn btn-danger" aria-label = "Right Align" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className = "deck-list w-75 container">
            <Link to = {"/decks/new"} type = "button" className = "btn btn-secondary mb-3">Create Deck</Link>
            {decksList}
        </div>
    )
}

export default HomePage;
