let deck_html = `
<div class="container-fluid">
  <div class="row scrolling-wrapper flex-row flex-nowrap">
    <div class="col-3">
      <form class="deck" id="deck-{0}">
        <input type="hidden" value="{0}">
        <div class="mb-3">
          <label for="deck_name" class="form-label">Name of the deck</label>
          <input type="text" class="form-control name" name="deck_name" placeholder="Decks name" value="{1}">
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-success win" onclick="win({0})">{2} Wins</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger loss" onclick="loss({0})">{3} Losses</button>
          </div>
        </div>
        <span class="games">Games played: {4}</span>
        <br>
        <span class="winrate">Winrate: {5}</span>
      </form>
    </div>
    <div class="col-8">
      Area dedicated for handling history
    </div>
  </div>
</div>
`;
