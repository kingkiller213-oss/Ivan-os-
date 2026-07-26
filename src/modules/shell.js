/**
 * Shell/layout rendering
 */

export function renderShell(container) {
  container.innerHTML = `
    <section class="view on" id="v-studio">
      <div class="greeting">
        <div class="label date" id="gdate"></div>
        <h1 id="gtext"></h1>
        <div class="streak" id="streak"></div>
      </div>
      <div class="quick" id="quick"></div>
      <div id="heroSlot"></div>
      <div id="albumSlot"></div>
      <div id="studioBlocks"></div>
      <div class="footer"><button id="resetBtn">Reset everything</button></div>
    </section>

    <section class="view" id="v-songs">
      <div class="greeting"><div class="label date">The catalogue</div><h1>All songs</h1></div>
      <div class="filters" id="filters"></div>
      <div id="songList"></div>
      <div style="height:40px"></div>
    </section>

    <section class="view" id="v-album">
      <div id="albumView"></div>
      <div style="height:40px"></div>
    </section>

    <section class="view" id="v-producer">
      <div class="greeting"><div class="label date">The room</div><h1>AI <em>producer</em></h1></div>
      <div class="subnav" id="prodNav"></div>
      <div id="prodBody"></div>
      <div style="height:40px"></div>
    </section>

    <section class="view" id="v-compose">
      <div class="greeting"><div class="label date">Harmony</div><h1>Composition <em>assistant</em></h1></div>
      <div class="subnav" id="compNav"></div>
      <div id="compBody"></div>
      <div style="height:40px"></div>
    </section>

    <section class="view" id="v-gear">
      <div class="greeting"><div class="label date">The setup</div><h1>Studio</h1></div>
      <div class="subnav" id="gearNav"></div>
      <div id="gearBody"></div>
      <div style="height:40px"></div>
    </section>

    <section class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Song"></section>
    <section class="session" id="session" role="dialog" aria-modal="true" aria-label="Studio session"></section>
    <div class="scrim" id="scrim" role="dialog" aria-modal="true" aria-label="Confirm"></div>
    <div class="player" id="player"></div>

    <nav class="nav" id="nav">
      <button data-v="studio" aria-current="true">Studio</button>
      <button data-v="songs">Songs</button>
      <button data-v="album">Album</button>
      <button data-v="compose">Compose</button>
      <button data-v="producer">Producer</button>
      <button data-v="gear">Gear</button>
    </nav>
    <button class="fab" id="fab" aria-label="New song">+</button>
    <div class="toast" id="toast"></div>
  `;
}
