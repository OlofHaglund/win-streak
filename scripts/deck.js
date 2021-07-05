let decks = JSON.parse(localStorage.getItem('decks')) || [];

decks.forEach(i => populate_deck(i));

let new_deck_button = document.getElementById('new_deck');
new_deck_button.addEventListener("click", create_new_deck);

function populate_deck(deck){
  let html      = deck_html.replaceAll("{0}", deck.id);
  html          = html.replace("{1}", deck.name);
  html          = html.replace("{2}", deck.wins);
  html          = html.replace("{3}", deck.loss);
  total_games = deck.wins + deck.loss;
  html          = html.replace("{4}", total_games);
  if(total_games > 0){
    winrate = (deck.wins/total_games)*100;
    html = html.replace("{5}", `${winrate.toFixed(2)}%`)
  }
  html = html.replace("{t_winrate}", `${get_total_winrate(deck.id)}%`)

  let revision = build_revisions(deck);
  html = html.replace("{revision}", revision)

  let doc       = new DOMParser().parseFromString(html, 'text/html').body.childNodes;
  let deck_list = document.getElementById('decklist');
  deck_list.append(doc[0]);
  let form = document.getElementById("deck-" + deck.id)
  form.addEventListener("change", function(e) {
    update_form(deck.id, form);
  });
}

function build_revisions(deck) {
  let revisions = Object.keys(deck.revisions).sort((a,b) => b - a );
  console.log(revisions);
  let end = revisions.length > 5 ? 5 : revisions.length;
  let html = ""

  for (i = 0; i < end; i++) {
    htm = revision_html.replace("{wins}", deck.revisions[revisions[i]].wins);
    htm = htm.replace("{loss}", deck.revisions[revisions[i]].loss);

    total = deck.revisions[revisions[i]].wins + deck.revisions[revisions[i]].loss;
    percentage = (deck.revisions[revisions[i]].wins / total) * 100;
    htm = htm.replace("{winrate}",`${percentage.toFixed("2")}%`);

    html += htm;
  }
  return html;
}

function create_new_deck(){
  let id  = decks.length;
  let obj = {
    id:         id,
    revisions:  {},
    name:       "",
    wins:       0,
    loss:       0,
    start_date: Date.now(),
    version:    1,
  }
  decks.push(obj);
  populate_deck(obj);
  localStorage.setItem('decks', JSON.stringify(decks));
}

function update_form(id, form){
  decks[id].name = form.querySelector(".name").value;
  localStorage.setItem('decks', JSON.stringify(decks));
}

function win(id){
  decks[id].wins++;
  localStorage.setItem('decks', JSON.stringify(decks));

  form_id = "deck-" + id;
  button = document.getElementById(form_id).querySelector(".win");
  button.innerHTML = decks[id].wins + " Wins";

  games_played(id);
  update_winrate(id);
}

function loss(id){
  decks[id].loss++;
  localStorage.setItem('decks', JSON.stringify(decks));

  form_id = "deck-" + id;
  button = document.getElementById(form_id).querySelector(".loss");
  button.innerHTML = decks[id].loss + " Losses";

  games_played(id);
  update_winrate(id);
}

function games_played(id){
  form_id = "deck-" + id;
  text = document.getElementById(form_id).querySelector(".games");
  total_games = decks[id].wins + decks[id].loss;
  text.innerHTML = `Games played: ${total_games}`;
}

function update_winrate(id){
  form_id = "deck-" + id;
  text = document.getElementById(form_id).querySelector(".winrate");
  total_games = decks[id].wins + decks[id].loss;
  if (total_games > 0) {
    rate = (decks[id].wins/total_games)*100;
    text.innerHTML = `Winrate: ${rate.toFixed(2)}%`;
  }
  else {
    text.innerHTML = `Winrate: -`;
  }
}

function new_revision(id){
  decks[id].revisions[Date.now()] ={
    wins: decks[id].wins,
    loss: decks[id].loss
  }
  decks[id].wins = 0;
  decks[id].loss = 0;

  form_id = "deck-" + id;
  button = document.getElementById(form_id).querySelector(".win");
  button.innerHTML = decks[id].wins + " Wins";

  form_id = "deck-" + id;
  button = document.getElementById(form_id).querySelector(".loss");
  button.innerHTML = decks[id].loss + " Losses";

  games_played(id);
  update_winrate(id);

  localStorage.setItem('decks', JSON.stringify(decks));

  populate_deck(decks[id]);
}

function get_total_winrate(id){
  let total_wins = decks[id].wins;
  let total_loss = decks[id].loss;
  for(let i in decks[id].revisions){
    total_wins += decks[id].revisions[i].wins;
    total_loss += decks[id].revisions[i].loss;
  }
  let total = total_wins + total_loss;
  if(total > 0){
    return ((total_wins/total)*100).toFixed(2);
  }
  else{
    return 0;
  }
}
