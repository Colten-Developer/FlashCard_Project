import React, {useState,useEffect} from "react"
import { useParams, useHistory, Link, useRouteMatch } from "react-router-dom";
import {readDeck, deleteCard} from "./../utils/api/index.js";

function ViewDeck() {
    const history = useHistory();
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");
    const parameters = useParams();
    const deckId = parameters.deckId;
    const {url, path} = useRouteMatch();

    //console.log(url,path)
	
	//console.log(readDeck(deckId))

    useEffect(() => {
        async function getDeck () {
            const fetchedDeck =  await readDeck(deckId);
            setCurrentDeck(fetchedDeck); 
        }
        getDeck();
    },[])

    if (currentDeck == "Not Fetched Yet") {
        return "Content is loading..."
    }
	

    const currentCardsList = currentDeck.cards.map((card,index) => {
		
		const handleDeleteCard = () => {
		console.log('DELETED')
		const result = window.confirm('Are you sure you want to delete this card?')
		deleteCard(card.id)
		window.location.reload(false)
		}
		
        return (
            <div key={index} className = "container d-flex row border rounded mb-2">
                <p className = "w-50"> {card.front} </p>
                <div className = "w-50">
                    <p className = ""> {card.back} </p>
	<button onClick={handleDeleteCard} type = "button" className = "btn btn-danger mb-2 float-right" aria-label = "Right Align">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                    <Link to = {`/decks/${deckId}/cards/${card.id}/edit`} className = "btn btn-secondary mr-2 float-right">Edit</Link>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className = "container w-75">
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        {/*ADD CARD VIEW HERE */}
                        {/*ADD CARD VIEW HERE */}
                        {/*ADD CARD VIEW HERE */}
                        <li className = "breadcrumb-item"> {currentDeck.name} </li>
                    </ol>
                </nav>
            </div>
            <div className = "container w-75">
                <h4> {currentDeck.name} </h4>
                <p> {currentDeck.description} </p>
                <div className = "d-flex justify-content-between mb-2">
                    <div>
                        <Link to = {`/decks/${deckId}/edit`} className = "btn btn-secondary mr-2">Edit</Link>
                        <Link to = {`/decks/${deckId}/study`} className = "btn btn-primary mr-2">Study</Link>
                        <Link to = {`/decks/${deckId}/cards/new`}className = "btn btn-primary mr-2">Add Cards</Link>
                    </div>
                    <Link to = {`/decks/${deckId}/study`} deckid={deckId} type = "button" className = "btn btn-danger" aria-label = "Right Align">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                    </Link>
                </div>
            </div>
            <div className = "container w-75">
                <h4> Cards </h4>
                {currentCardsList}
            </div>
        </div>
    )
}

export default ViewDeck;