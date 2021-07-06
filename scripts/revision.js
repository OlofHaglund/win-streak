class Revision {
  constructor(revision) {
    this.wins       = revision.wins || 0;
    this.loss       = revision.loss || 0;
    this.start_date = revision.start_date || Date.now();
    this.end_date   = revision.end_date   || Date.now();
  }

  html() {
    let htm = revision_html.replace("{wins}", this.wins);
    htm = htm.replace("{loss}", this.loss);
    htm = htm.replace("{total}", this.total_games());
    htm = htm.replace("{winrate}", `${this.winrate()}%`);

    let date = new Date(this.end_date)
    htm = htm.replace("{date}", `${date.getDate()}/${date.getMonth() + 1}`);
    return htm;
  }

  total_games() {
    return this.wins + this.loss;
  }

  winrate(decimals = 2){
    let total = this.total_games();
    if(total > 0){
      return ((this.wins / total) * 100).toFixed(decimals);
    }
    else {
      return "-";
    }
  }
}
