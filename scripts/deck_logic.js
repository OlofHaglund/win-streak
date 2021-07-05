// Load all decks
let decks = [];

{
  let load = JSON.parse(localStorage.getItem('decks'));
  if(load !== null) {
    load.forEach(function (d){
      decks.push(new Deck(d));
    });
  }
}

decks.forEach((deck) => {
  populate_deck(deck);
  deck.addListeners();
});

let new_deck_button = document.getElementById('new_deck');
new_deck_button.addEventListener("click", create_new_deck);

function populate_deck(deck){
  let doc       = new DOMParser().parseFromString(deck.html(), 'text/html').body.childNodes;
  let deck_list = document.getElementById('decklist');
  deck_list.append(doc[0]);
}

function create_new_deck(){
  let id  = decks.length;
  let deck = new Deck({id:id});
  decks.push(deck);
  populate_deck(deck);
  deck.addListeners();
  save();
}

function save(){
  localStorage.setItem('decks', JSON.stringify(decks));
}
