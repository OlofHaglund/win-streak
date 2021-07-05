class Deck {
  constructor(deck) {
    this.id         = deck.id;
    this.name       = deck.name || "";
    this.wins       = deck.wins || 0;
    this.loss       = deck.loss || 0;
    this.start_date = deck.start_date || Date.now();

    this.revisions  = {};
    if (typeof deck.revisions != "undefined") {
      if (Object.keys(deck.revisions).length > 0) {
        for (const [key, value] of Object.entries(deck.revisions)){
          let rev = new Revision(value);
          this.revisions[key] = rev;
        }
      }
    }
  }

  addListeners() {
    let form = document.getElementById(`deck-${this.id}`);
    let that = this;
    form.addEventListener("change", function(e){
      that.name = form.querySelector(".name").value;
      save()
      that.updateForm(form);
    });
    form.querySelector(".win").addEventListener("click", function(e){
      that.wins++;
      save()
      that.updateForm(form);
    });
    form.querySelector(".loss").addEventListener("click", function(e){
      that.loss++;
      save()
      that.updateForm(form);
    });
    form.querySelector(".revision").addEventListener("click", function(e){
      that.newRevision();
      save()
      location.reload();
    });
  }

  newRevision(){
    let rev = new Revision({
      start_date: this.start_date,
      wins: this.wins,
      loss: this.loss
    });
    this.start_date = Date.now();
    this.wins       = 0;
    this.loss       = 0;
    this.revisions[rev.end_date] = rev;
  }

  updateForm(form){
    form.querySelector(".name").value = this.name;
    form.querySelector(".win").innerHTML = `${this.wins} Wins`;
    form.querySelector(".loss").innerHTML = `${this.loss} Losses`;
    form.querySelector(".winrate").innerHTML = `Winrate: ${this.winrateCurrent()}%`;
    form.querySelector(".games").innerHTML = `Games Played: ${this.totalGames()}`;

    let history = document.getElementById(`history-${this.id}`);
    history.querySelector(".total_winrate").innerHTML = `Winrate: ${this.winrateTotal()}%`;
  }

  updateHtml() {
    console.log("update, not implemented yet");
  }

  html() {
    let output = deck_html.replaceAll("{id}", this.id);
    output = output.replace("{name}", this.name);
    output = output.replace("{wins}", this.wins);
    output = output.replace("{loss}", this.loss);
    output = output.replace("{total}", this.totalGames());
    output = output.replace("{winrate}", this.winrateCurrent());
    output = output.replace("{t_winrate}", this.winrateTotal());
    output = output.replace("{revision}", this.fiveLatestRevision());

    return output;
  }

  fiveLatestRevision() {
    let keys = Object.keys(this.revisions);
    keys = keys.sort(function(a, b) {
      return b - a;
    });

    let end = keys.length > 5 ? 5 : keys.length;
    let htm = "";

    for (let i = 0; i < end; i++) {
      htm += this.revisions[keys[i]].html();
    }

    return htm;
  }

  totalGames() {
    return this.wins + this.loss;
  }

  totalGamesWithRevisions() {
    let total = this.wins + this.loss;
    for (const [key, value] of Object.entries(this.revisions)){
      total += value.wins + value.loss;
    }
    return total;
  }

  TotalWinsWithRevisions() {
    let total = this.wins;
    for (const [key, value] of Object.entries(this.revisions)){
      total += value.wins;
    }
    return total;
  }

  winrateCurrent(decimals = 2) {
    let total_games = this.totalGames();
    if(total_games > 0){
      return ((this.wins / total_games) * 100).toFixed(decimals);
    }
    else {
      return "-";
    }
  }

  winrateTotal(decimals = 2) {
    let wins  = this.TotalWinsWithRevisions();
    let total = this.totalGamesWithRevisions();
    if (total > 0){
      return ((wins/total)*100).toFixed(decimals);
    }
    else {
      return "-"
    }
  }
}
