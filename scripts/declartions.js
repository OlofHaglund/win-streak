let deck_html = `
<div class="container-fluid mb-4">
  <div class="row scrolling-wrapper flex-row flex-nowrap">
    <div class="col-3">
      <form class="deck" id="deck-{id}">
        <input type="hidden" value="{id}">
        <div class="mb-3">
          <label for="deck_name" class="form-label">Name of the deck</label>
          <input type="text" class="form-control name" name="deck_name" placeholder="Decks name" value="{name}">
        </div>
        <div class="row mb-2">
          <div class="col">
            <button type="button" class="btn btn-success win">{wins} Wins</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger loss">{loss} Losses</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span class="games">Games Played: {total}</span>
            <br>
            <span class="winrate">Winrate: {winrate}%</span>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary revision"> New Revision</button>
          </div>
        </div>
      </form>
    </div>
    <div id="history-{id}" class="col-9">
      <div class="row">
        <div class="col-2">
          <span class="total_winrate">Winrate: {t_winrate}%</span>
        </div>

        {revision}
        </div>
      </div>
    </div>
  </div>
</div>
`;

let revision_html = `
<div class="col-2">
  <div class="row">
   Winrate: {winrate}
  </div>
  <div class="row">
   Total: {total}
  </div>
  <div class="row">
   Wins: {wins}
  </div>
  <div class="row">
   Loss: {loss}
  </div>
</div>
`;
