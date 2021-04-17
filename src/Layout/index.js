import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,
Route,
Switch,
useParams,
Link,
useRouteMatch,
NavLink} from "react-router-dom";
import Header from "./Header";
import HomePage from "./../decks/HomePage";
import Study from "./../decks/Study";
import ViewDeck from "./../decks/ViewDeck";
import CreateDeck from "./../decks/CreateDeck";
import EditDeck from "./../decks/EditDeck";
import CreateCard from "./../decks/CreateCard";
import EditCard from "./../decks/EditCard";
import {listCards,listDecks} from "./../utils/api/index.js";
import NoMatch from "./../decks/NoMatch";
import NotFound from "./NotFound"

function Layout() {
  const params = useParams();
  //const jsonData = require("./../data/db.json");
  //const [decks,setDecks] = useState(jsonData.decks);
  //console.log(jsonData)
  //const [cards,setCards] = useState(jsonData.cards);
  //const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

  // try to get rid of useEffect
  const [decks,setDecks] = useState();
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



  if (decks == undefined) {
    return (
    "Not Found"
    )
  } else {
    return (
      <Router>
        <Route>
          <Header />
        </Route>
        <Switch>
			<Route exact={true} path="/">
				<HomePage decks={decks} /> 
			</Route> 
			<Route path={'/decks/:deckId/study'}> 
				<Study decks={decks} /> 
			</Route>
			<Route path={'/decks/new'}> 
				<CreateDeck decks={decks} /> 
			</Route> 
			<Route path={'/decks/:deckId/cards/:cardId/edit'}>
				<EditCard decks={decks} /> 
			</Route>
			<Route path={'/decks/:deckId/cards/new'}>
				<CreateCard decks={decks} /> 
			</Route> 
			<Route path={'/decks/:deckId/edit'}> 
				<EditDeck decks={decks} />
			</Route> 
			<Route path={'/decks/:deckId'}>
				<ViewDeck decks={decks} /> 
			</Route>
			<Route> 
				<NotFound decks={decks} /> 
			</Route>
        </Switch>
      </Router>
    )
  }

}

export default Layout;

