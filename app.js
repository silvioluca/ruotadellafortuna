// ==================== CONFIG ====================

const VOWELS = new Set(['A','E','I','O','U']);
const VOWEL_COST = 250;
const QUICK_REWARD = 1000;
const SOLVE_BONUS = 1000;
const GERRY_BONUS = 1000;
const IT_ALPHA = 'ABCDEFGHILMNOPQRSTUVZ';
const GRID_CONFIG = [12, 14, 14, 12];  // caselle per ogni riga
const GRID_ROWS   = 4;
const FLIP_DUR    = 650;  // ms animazione flip per singola tile
const FLIP_GAP    = 480;  // ms tra l'inizio di un flip e il successivo
const COLOR_DUR   = 1000; // ms animazione cambio colore
const COLOR_GAP   = 280;  // ms tra un cambio colore e il successivo
const COLOR_PAUSE = 220;  // ms di pausa dopo l'ultima colorazione, prima dei flip

const ROUND_COLORS = [
  { bg:'#c2185b', bd:'#7b003a' },  // 1  GiraMondo          – fucsia
  { bg:'#1565C0', bd:'#003c8f' },  // 2  CruciRuota         – blu
  { bg:'#2E7D32', bd:'#005005' },  // 3  Musicale           – verde
  { bg:'#E65100', bd:'#ac1900' },  // 4  Jackpot            – arancione
  { bg:'#6A1B9A', bd:'#38006b' },  // 5  Animali            – viola
  { bg:'#00695C', bd:'#003d33' },  // 6  Express            – verde teal
  { bg:'#B71C1C', bd:'#7f0000' },  // 7  Triplete I         – rosso
  { bg:'#0277BD', bd:'#014f86' },  // 8  Triplete II        – azzurro
  { bg:'#4527A0', bd:'#000070' },  // 9  Triplete III       – indaco
  { bg:'#558B2F', bd:'#255d00' },  // 10 Ultimo Round       – verde militare
  { bg:'#F57F17', bd:'#bc5100' },  // bonus                 – oro
];

const PLAYER_COLORS = ['#e91e8c','#1565C0','#2E7D32','#E65100','#7B1FA2'];

const SEGMENTS = [
  { label:'500€',      value:500,           color:'#c2185b', text:'#fff' },
  { label:'900€',      value:900,           color:'#1565C0', text:'#fff' },
  { label:'PASSA',     value:'passa',       color:'#546E7A', text:'#fff' },
  { label:'1500€',     value:1500,          color:'#2E7D32', text:'#fff' },
  { label:'BANCAROTTA',value:'bancarotta',  color:'#111',    text:'#ff4444' },
  { label:'350€',      value:350,           color:'#E65100', text:'#fff' },
  { label:'700€',      value:700,           color:'#6A1B9A', text:'#fff' },
  { label:'2500€',     value:2500,          color:'#F57F17', text:'#111' },
  { label:'JACKPOT',   value:'jackpot',     color:'#FFD700', text:'#111' },
  { label:'300€',      value:300,           color:'#B71C1C', text:'#fff' },
  { label:'600€',      value:600,           color:'#00695C', text:'#fff' },
  { label:'3000€',     value:3000,          color:'#4527A0', text:'#fff' },
  { label:'EXPRESS',   value:'express',     color:'#BF360C', text:'#fff' },
  { label:'250€',      value:250,           color:'#1B5E20', text:'#fff' },
  { label:'800€',      value:800,           color:'#880E4F', text:'#fff' },
  { label:'150€',      value:150,           color:'#0D47A1', text:'#fff' },
  { label:'?',         value:'mystery',     color:'#AD1457', text:'#fff' },
  { label:'2000€',     value:2000,          color:'#C62828', text:'#fff' },
  { label:'400€',      value:400,           color:'#004D40', text:'#fff' },
  { label:'1000€',     value:1000,          color:'#33691E', text:'#fff' },
  { label:'PASSA',     value:'passa',       color:'#546E7A', text:'#fff' },
  { label:'200€',      value:200,           color:'#283593', text:'#fff' },
  { label:'1200€',     value:1200,          color:'#4E342E', text:'#fff' },
  { label:'450€',      value:450,           color:'#37474F', text:'#fff' },
];

const ROUNDS = [
  { n:1,  name:'GiraMondo',              type:'quick',   desc:'Round rapido: indovina la frase e vinci 1.000 €! Il vincitore gira per primo al round successivo.' },
  { n:2,  name:'CruciRuota',             type:'classic', desc:'Parole legate da un tema. Chiama consonanti, compra vocali! Per risolvere pronuncia le parole una dopo l\'altra — dire "e" tra le parole = risposta sbagliata!' },
  { n:3,  name:'Round Musicale',         type:'classic', desc:'Tutto in musica! Cantanti, canzoni e spettacoli. Quando la frase viene indovinata il brano risuona in sala!' },
  { n:4,  name:'Jackpot',                type:'classic', desc:'Ogni giro aggiunge soldi al salvadanaio! Chi atterra su JACKPOT e risolve immediatamente vince tutto l\'accumulato.' },
  { n:5,  name:'Il Regno degli Animali', type:'classic', desc:'Animali rari e curiosi protagonisti del tabellone. Segue una curiosità sull\'animale!' },
  { n:6,  name:'Express',                type:'classic', desc:'Attento all\'Express! Se atterra su EXPRESS il concorrente gioca da solo: +500€ per consonante, −500€ per vocale, lettera sbagliata = BANCAROTTA immediata!' },
  { n:7,  name:'Triplete I',             type:'quick',   desc:'Primo mini-round veloce! Frase breve, risposta immediata.' },
  { n:8,  name:'Triplete II',            type:'quick',   desc:'Secondo mini-round veloce!' },
  { n:9,  name:'Triplete III',           type:'quick',   desc:'Terzo mini-round veloce — poi il gran finale!' },
  { n:10, name:'Ultimo Round',           type:'classic', desc:'Il round finale. Il Giro Gerry determina il valore fisso delle consonanti. Ogni lettera corretta = obbligo di tentare soluzione entro 3 secondi!' },
];

// PUZZLES, BONUS_PUZZLES e FINAL_BOARD_PUZZLES sono definiti in puzzles.js

const MERA_CHARS = ['R','U','O','T','A','★','D','E','L','L','E','★','M','E','R','A','V','I','G','L','I','E','★','★'];

// 24 prize segments: distribution matches the table (total = 24)
const MERA_PRIZE_POOL = [
  100,100,100,100,100,          // ×5
  1000,1000,1000,1000,          // ×4
  5000,5000,5000,               // ×3
  10000,10000,10000,10000,      // ×4
  15000,15000,15000,            // ×3
  20000,20000,                  // ×2
  100000,100000,                // ×2
  200000,                       // ×1
];
// Arrow positions (screen angles): top, bottom-right, bottom-left
const _ARC24 = 2 * Math.PI / 24;
const MERA_ARROW_ANGLES = [-Math.PI/2 - _ARC24, -Math.PI/2, -Math.PI/2 + _ARC24];

function fmtShort(v) {
  if (v >= 1000) return (v / 1000) + 'K€';
  return v + '€';
}


// ==================== STATE ====================

let G = null;

function newGame(players) {
  G = {
    players,
    scores:      players.map(() => 0),
    roundScores: players.map(() => 0),
    currentRound:  0,
    currentPlayer: 0,
    puzzle:      null,
    revealed:    new Set(),
    usedLetters: new Set(),
    wheelValue:  0,
    turnScore:   0,
    jackpot:     0,
    jackpotLanded: false,
    expressMode: false,
    gerryDone:   false,
    gerryValue:  0,
    bonusThenContinue: false,
    gerryTimeout: null,
    phase: 'CHOOSE',   // CHOOSE | SPINNING | PICK_LETTER | QUICK | BONUS_SELECT | DONE
    timerInterval: null,
    timerLeft:   0,
    bonusTimerInterval: null,
    firstPlayerNextRound: 0,
    final: null,
  };
}

// ==================== UTILS ====================

const fmt = n => n.toLocaleString('it-IT') + ' €';

function normalize(s) {
  return s.trim().toUpperCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/['‘’`]/g, "'");
}

function getPhrase() {
  return G.puzzle.words
    ? G.puzzle.words.join(' ')
    : G.puzzle.phrase;
}

function countLetter(ch) {
  return getPhrase().split('').filter(c => c === ch).length;
}

function getAllLetters() {
  return new Set(getPhrase().replace(/[ ']/g, '').split(''));
}

function isPuzzleSolved() {
  const all = getAllLetters();
  for (const ch of all) if (!G.revealed.has(ch)) return false;
  return true;
}

// ==================== SCREENS ====================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('btn-skip-round').style.display = id === 'screen-game' ? 'flex' : 'none';
}

function showModal(emoji, title, body, cb) {
  document.getElementById('modal-emoji').textContent  = emoji;
  document.getElementById('modal-title').textContent  = title;
  document.getElementById('modal-body').textContent   = body;
  document.getElementById('overlay').style.display    = 'flex';
  document.getElementById('modal-ok').onclick = () => {
    document.getElementById('overlay').style.display = 'none';
    if (cb) cb();
  };
}

// ==================== SCOREBOARD ====================

function renderScoreboard() {
  const el = document.getElementById('scoreboard');
  el.innerHTML = G.players.map((p, i) => `
    <div class="player-card ${i === G.currentPlayer ? 'active' : ''}" style="--pc:${PLAYER_COLORS[i]};cursor:pointer" data-i="${i}">
      <div class="pc-name">${p}</div>
      <div class="pc-score">${fmt(G.scores[i])}</div>
      ${G.roundScores[i] > 0 ? `<div class="pc-round">+${fmt(G.roundScores[i])}</div>` : ''}
    </div>`).join('');
  el.querySelectorAll('.player-card').forEach(card => {
    card.onclick = () => {
      const i = +card.dataset.i;
      const val = prompt(`Punteggio di ${G.players[i]}:`, G.scores[i]);
      if (val === null) return;
      const n = parseInt(val, 10);
      if (!isNaN(n) && n >= 0) { G.scores[i] = n; renderScoreboard(); }
    };
  });
}

// ==================== PUZZLE BOARD ====================

function layoutPhrase(phrase) {
  const words = phrase.split(' ');
  // assegna parole alle righe rispettando GRID_CONFIG
  const rowWords = [];
  let curRow = [], curLen = 0;

  for (const word of words) {
    const ri   = rowWords.length;
    if (ri >= GRID_ROWS) break;
    const cap  = GRID_CONFIG[ri];
    const need = curLen === 0 ? word.length : word.length + 1;

    if (curLen + need > cap && curLen > 0) {
      rowWords.push(curRow);
      curRow = [word]; curLen = word.length;
    } else {
      curRow.push(word); curLen += need;
    }
  }
  if (curRow.length) rowWords.push(curRow);

  return GRID_CONFIG.map((cap, ri) => {
    const rw = rowWords[ri];
    if (!rw || rw.length === 0) return Array(cap).fill(null).map(() => ({ type: 'empty' }));
    const cells = [];
    rw.forEach((w, wi) => {
      if (wi > 0) cells.push({ type: 'space' });
      const parts = w.split("'");
      parts.forEach((part, pi) => {
        if (pi > 0) cells.push({ type: 'apostrophe', char: "'" });
        for (const ch of part) cells.push({ type: 'letter', char: ch });
      });
    });
    const pad = Math.floor((cap - cells.length) / 2);
    return Array(cap).fill(null).map((_, ci) => {
      const li = ci - pad;
      return (li >= 0 && li < cells.length) ? cells[li] : { type: 'empty' };
    });
  });
}

function layoutCrossword(words) {
  // Rows 0 and 3 have 12 cells; rows 1 and 2 have 14 cells.
  // All rows are visually centered, so rows 0/3 are offset by 1 cell
  // relative to rows 1/2. We work in "visual column" space (0-13) and
  // convert to per-row cell indices to keep vertical words aligned.
  const ROWS    = GRID_CONFIG.length;
  const MAX_CAP = Math.max(...GRID_CONFIG); // 14
  // offset[r] = how many visual columns row r is shifted inward from the left
  const OFFSET  = GRID_CONFIG.map(cap => (MAX_CAP - cap) / 2); // [1,0,0,1]

  // visual col → row cell index (may be out of range)
  function rc(vc, row) { return vc - OFFSET[row]; }
  // row cell index → visual col
  function vc(col, row) { return col + OFFSET[row]; }

  function makeGrid() {
    return Array.from({length: ROWS}, (_, r) =>
      Array(GRID_CONFIG[r]).fill(null).map(() => ({ type: 'empty' }))
    );
  }

  // placements: [{ word, dir:'h'|'v', row (start row), vc (start visual col) }]
  function fillGrid(pls) {
    const g = makeGrid();
    for (const p of pls) {
      for (let i = 0; i < p.word.length; i++) {
        if (p.dir === 'h') {
          const c = rc(p.vc + i, p.row);
          if (c >= 0 && c < GRID_CONFIG[p.row]) g[p.row][c] = { type: 'letter', char: p.word[i] };
        } else {
          const r = p.row + i;
          const c = rc(p.vc, r);
          if (r < ROWS && c >= 0 && c < GRID_CONFIG[r]) g[r][c] = { type: 'letter', char: p.word[i] };
        }
      }
    }
    return g;
  }

  function canH(word, row, vcStart, pls) {
    const c0 = rc(vcStart, row);
    if (row < 0 || row >= ROWS || c0 < 0 || c0 + word.length > GRID_CONFIG[row]) return false;
    const g = fillGrid(pls);
    for (let i = 0; i < word.length; i++) {
      const cell = g[row][c0 + i];
      if (cell.type === 'letter' && cell.char !== word[i]) return false;
    }
    return true;
  }

  function canV(word, rowStart, vcCol) {
    if (rowStart + word.length > ROWS) return false;
    for (let i = 0; i < word.length; i++) {
      const c = rc(vcCol, rowStart + i);
      if (c < 0 || c >= GRID_CONFIG[rowStart + i]) return false;
    }
    return true;
  }

  // centered start visual col for a horizontal word on a given row
  function ctrVC(word, row) { return vc(Math.floor((GRID_CONFIG[row] - word.length) / 2), row); }

  const ws = [...words].sort((a, b) => a.length - b.length);
  const vw = ws[0];   // shortest → vertical candidate
  const hw = ws.slice(1);

  if (vw.length <= ROWS) {
    // Compute valid visual-column range for each possible start row
    for (let sr = 0; sr <= ROWS - vw.length; sr++) {
      // vc must satisfy: rc(vc, r) in [0, GRID_CONFIG[r]-1] for every r in sr..sr+vw.length-1
      let vcMin = 0, vcMax = MAX_CAP - 1;
      for (let i = 0; i < vw.length; i++) {
        const r = sr + i;
        vcMin = Math.max(vcMin, OFFSET[r]);                          // rc >= 0
        vcMax = Math.min(vcMax, GRID_CONFIG[r] - 1 + OFFSET[r]);    // rc < cap
      }

      // Try visual columns sorted by distance from centre
      const centre = Math.round((vcMin + vcMax) / 2);
      const range  = [];
      for (let v = vcMin; v <= vcMax; v++) range.push(v);
      range.sort((a, b) => Math.abs(a - centre) - Math.abs(b - centre));

      for (const vcCol of range) {
        if (!canV(vw, sr, vcCol)) continue;

        const pls      = [{ word: vw, dir: 'v', row: sr, vc: vcCol }];
        const usedRows = new Set(Array.from({ length: vw.length }, (_, i) => sr + i));
        let ok = true;

        for (const h of hw) {
          let placed = false;

          // Try crossing the vertical word at a shared letter
          outer:
          for (let hi = 0; hi < h.length; hi++) {
            for (let vi = 0; vi < vw.length; vi++) {
              if (h[hi] !== vw[vi]) continue;
              // shared letter is at visual col vcCol on row sr+vi
              // horizontal word starts at vcCol - hi
              const crossRow = sr + vi;
              const hvcStart = vcCol - hi;
              if (canH(h, crossRow, hvcStart, pls)) {
                pls.push({ word: h, dir: 'h', row: crossRow, vc: hvcStart });
                usedRows.add(crossRow);
                placed = true;
                break outer;
              }
            }
          }

          if (!placed) { ok = false; break; }
        }

        if (ok) return fillGrid(pls);
      }
    }
  }

  // All-horizontal fallback: one word per row, centered
  return fillGrid(words.map((word, i) => ({
    word, dir: 'h', row: Math.min(i, ROWS - 1), vc: ctrVC(word, Math.min(i, ROWS - 1)),
  })));
}

function renderPuzzleBoard() {
  const board = document.getElementById('puzzle-board');
  const grid  = G.puzzle.words
    ? layoutCrossword(G.puzzle.words)
    : layoutPhrase(G.puzzle.phrase);

  board.innerHTML = grid.map(row =>
    `<div class="puzzle-row">${
      row.map(cell => {
        if (cell.type === 'empty') return '<div class="tile empty"></div>';
        if (cell.type === 'space') return '<div class="tile space"></div>';
        if (cell.type === 'apostrophe') return '<div class="tile revealed apostrophe">\'</div>';
        const rev = G.revealed.has(cell.char);
        return `<div class="tile${rev ? ' revealed' : ''}" data-l="${cell.char}">${rev ? cell.char : ''}</div>`;
      }).join('')
    }</div>`
  ).join('');
}

// ==================== ALPHABET GRID ====================

function updateExhaustedNotice() {
  const el = document.getElementById('exhausted-notice');
  if (el) el.style.display = 'none';
}

function renderAlphabetGrid(mode = 'all', handler = null) {
  // mode: 'all' | 'consonants' | 'vowels'
  const grid = document.getElementById('alphabet-grid');
  grid.innerHTML = [...IT_ALPHA].map(ch => {
    const used    = G.usedLetters.has(ch);
    const isVowel = VOWELS.has(ch);
    let disabled  = false;
    if (mode === 'consonants' && isVowel)  disabled = true;
    if (mode === 'vowels'     && !isVowel) disabled = true;
    return `<button class="letter-btn ${isVowel ? 'vowel' : 'consonant'} ${used ? 'used' : ''}"
      data-l="${ch}" ${disabled ? 'disabled' : ''}>${ch}</button>`;
  }).join('');
  const fn = handler || pickLetter;
  grid.querySelectorAll('.letter-btn:not([disabled])').forEach(btn => {
    const ch = btn.dataset.l;
    btn.addEventListener('click', () => {
      if (G.usedLetters.has(ch)) {
        playBuzzer();
        showModal('❌', 'Lettera già usata!', `La lettera ${ch} è già stata scelta. Turno passato.`, () => nextPlayer());
      } else {
        fn(ch);
      }
    });
  });
}

// ==================== WHEEL ====================

let wheelAngle  = 0;
let spinning    = false;
let lastSegment = null;
const wheelSound       = new Audio('sounds/wheel_sound.mp3');
const dingSound        = new Audio('sounds/ding.mp3');
const buzzerSound      = new Audio('sounds/buzzer.mp3');
const prenotationSound = new Audio('sounds/prenotation.mp3');
const passSound        = new Audio('sounds/pass.mp3');
const correctSound     = new Audio('sounds/correct.mp3');
const nuovoRoundSound  = new Audio('sounds/nuovo_round.mp3');
// Web Audio API per loop senza stacco
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let fastMusicBuffer    = null, fastMusicNode    = null;
let expressMusicBuffer = null, expressMusicNode = null;
let siglaMusicBuffer   = null, siglaMusicNode   = null;
let roundMusicBuffer   = null, roundMusicNode   = null;
let finalMusicBuffer   = null, finalMusicNode   = null;
let meraviglieMusicBuffer = null, meraviglieMusicNode = null;
fetch('sounds/round_veloce.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => { fastMusicBuffer = buf; })
  .catch(() => {});
fetch('sounds/express.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => { expressMusicBuffer = buf; })
  .catch(() => {});
fetch('sounds/sigla.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => {
    siglaMusicBuffer = buf;
    if (audioCtx.state === 'running' &&
        document.getElementById('screen-splash').classList.contains('active')) {
      startSiglaMusic();
    }
  })
  .catch(() => {});
fetch('sounds/round.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => { roundMusicBuffer = buf; })
  .catch(() => {});
fetch('sounds/final.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => { finalMusicBuffer = buf; })
  .catch(() => {});
fetch('sounds/ruota_meraviglie.mp3', { cache: 'reload' })
  .then(r => r.arrayBuffer())
  .then(ab => audioCtx.decodeAudioData(ab))
  .then(buf => { meraviglieMusicBuffer = buf; })
  .catch(() => {});

function playBuzzer() {
  buzzerSound.currentTime = 0;
  buzzerSound.play().catch(() => {});
}
function startFastMusic() {
  if (!fastMusicBuffer) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stopFastMusic();
  fastMusicNode = audioCtx.createBufferSource();
  fastMusicNode.buffer = fastMusicBuffer;
  fastMusicNode.loop   = true;
  fastMusicNode.connect(audioCtx.destination);
  fastMusicNode.start(0);
}
function stopFastMusic() {
  if (fastMusicNode) {
    try { fastMusicNode.stop(); } catch(e) {}
    fastMusicNode.disconnect();
    fastMusicNode = null;
  }
}
function startExpressMusic() {
  if (!expressMusicBuffer) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stopExpressMusic();
  expressMusicNode = audioCtx.createBufferSource();
  expressMusicNode.buffer = expressMusicBuffer;
  expressMusicNode.loop   = true;
  expressMusicNode.connect(audioCtx.destination);
  expressMusicNode.start(0);
}
function stopExpressMusic() {
  if (expressMusicNode) {
    try { expressMusicNode.stop(); } catch(e) {}
    expressMusicNode.disconnect();
    expressMusicNode = null;
  }
}
function startSiglaMusic() {
  if (!siglaMusicBuffer) return;
  stopSiglaMusic();
  const play = () => {
    siglaMusicNode = audioCtx.createBufferSource();
    siglaMusicNode.buffer = siglaMusicBuffer;
    siglaMusicNode.loop   = true;
    siglaMusicNode.connect(audioCtx.destination);
    siglaMusicNode.start(0);
  };
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(play).catch(() => {});
  } else {
    play();
  }
}
function stopSiglaMusic() {
  if (siglaMusicNode) {
    try { siglaMusicNode.stop(); } catch(e) {}
    siglaMusicNode.disconnect();
    siglaMusicNode = null;
  }
}
function startRoundMusic() {
  if (!roundMusicBuffer) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stopRoundMusic();
  roundMusicNode = audioCtx.createBufferSource();
  roundMusicNode.buffer = roundMusicBuffer;
  roundMusicNode.loop   = true;
  roundMusicNode.connect(audioCtx.destination);
  roundMusicNode.start(0);
}
function stopRoundMusic() {
  if (roundMusicNode) {
    try { roundMusicNode.stop(); } catch(e) {}
    roundMusicNode.disconnect();
    roundMusicNode = null;
  }
}
function startFinalMusic() {
  if (!finalMusicBuffer) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stopFinalMusic();
  finalMusicNode = audioCtx.createBufferSource();
  finalMusicNode.buffer = finalMusicBuffer;
  finalMusicNode.loop   = true;
  finalMusicNode.connect(audioCtx.destination);
  finalMusicNode.start(0);
}
function stopFinalMusic() {
  if (finalMusicNode) {
    try { finalMusicNode.stop(); } catch(e) {}
    finalMusicNode.disconnect();
    finalMusicNode = null;
  }
}
function startMeraviglieMusic() {
  if (!meraviglieMusicBuffer) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stopMeraviglieMusic();
  meraviglieMusicNode = audioCtx.createBufferSource();
  meraviglieMusicNode.buffer = meraviglieMusicBuffer;
  meraviglieMusicNode.connect(audioCtx.destination);
  meraviglieMusicNode.start(0);
}
function stopMeraviglieMusic() {
  if (meraviglieMusicNode) {
    try { meraviglieMusicNode.stop(); } catch(e) {}
    meraviglieMusicNode.disconnect();
    meraviglieMusicNode = null;
  }
}

function getActiveSegments() {
  const roundN = G && ROUNDS[G.currentRound] ? ROUNDS[G.currentRound].n : 0;
  return SEGMENTS.map(seg => {
    if (seg.value === 'jackpot' && roundN !== 4)
      return { label:'1000€', value:1000, color:'#FFD700', text:'#111' };
    if (seg.value === 'express' && roundN !== 6)
      return { label:'550€',  value:550,  color:'#BF360C', text:'#fff' };
    return seg;
  });
}

function drawWheel(angle) {
  const canvas = document.getElementById('wheel-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2, r = cx - 4;
  const segs = getActiveSegments();
  const n   = segs.length;
  const arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, W, H);

  segs.forEach((seg, i) => {
    const start = angle + i * arc - Math.PI / 2;
    const end   = start + arc;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = seg.text;
    const scale = r / 132;
    const fs = Math.round((seg.label.length > 6 ? 8 : 10) * scale);
    ctx.font = `bold ${fs}px Arial`;
    ctx.fillText(seg.label, r - Math.round(6 * scale), Math.round(3.5 * scale));
    ctx.restore();
  });

  // border ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // center hub
  const hubR = Math.round(r * 0.055);
  ctx.beginPath();
  ctx.arc(cx, cy, hubR, 0, 2 * Math.PI);
  ctx.fillStyle = '#07073a';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  setPhase('SPINNING');

  wheelSound.currentTime = 0;
  wheelSound.play().catch(() => {});

  const totalRot = (6 + Math.random() * 8) * 2 * Math.PI;
  const duration = 4000;
  const t0       = performance.now();
  const a0       = wheelAngle;

  function frame(now) {
    const p  = Math.min((now - t0) / duration, 1);
    const ep = 1 - Math.pow(1 - p, 3); // ease-out cubic
    wheelAngle = a0 + totalRot * ep;
    drawWheel(wheelAngle);
    if (p < 1) { requestAnimationFrame(frame); return; }

    spinning = false;
    const seg = getSegmentAtTop();
    lastSegment = seg;
    showWheelResult(seg);
    handleSegment(seg);
  }
  requestAnimationFrame(frame);
}

function getSegmentAtTop() {
  const segs = getActiveSegments();
  const n   = segs.length;
  const arc = (2 * Math.PI) / n;
  const norm = ((-wheelAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const idx  = Math.floor(norm / arc) % n;
  return segs[idx];
}

function showWheelResult(seg) {
  const el = document.getElementById('wheel-result-display');
  el.textContent = seg.label;
  el.style.color = typeof seg.value === 'number' ? '#FFD700' : '#ff6b6b';
}

// ==================== SEGMENT HANDLING ====================

function handleSegment(seg) {
  const round = ROUNDS[G.currentRound];
  const v     = seg.value;

  // Express mode override: no wheel effect, but we got here by spin → ignore (express spin didn't happen)
  // Express mode means NO spinning at all — handled in setPhase

  if (v === 'bancarotta') {
    G.scores[G.currentPlayer]      = 0;
    G.roundScores[G.currentPlayer] = 0;
    G.turnScore = 0;
    passSound.currentTime = 0; passSound.play().catch(() => {});
    playBuzzer();
    showModal('💥', 'BANCAROTTA!', `${G.players[G.currentPlayer]} perde TUTTO il montepremi!`, () => nextPlayer());
    return;
  }
  if (v === 'passa') {
    passSound.currentTime = 0; passSound.play().catch(() => {});
    showModal('➡️', 'PASSA', `${G.players[G.currentPlayer]} passa il turno.`, () => nextPlayer());
    return;
  }
  if (v === 'mystery') {
    const amounts = [500,750,1000,1500,2000];
    const mystery = amounts[Math.floor(Math.random() * amounts.length)];
    G.wheelValue = mystery;
    showModal('❓', 'MISTERO!', `La casella ? vale ${fmt(mystery)}! Scegli una consonante.`, () => setPhase('PICK_LETTER'));
    return;
  }
  if (v === 'jackpot') {
    G.jackpot += 1000;
    G.jackpotLanded = true;
    updateJackpotDisplay();
    showModal('🐷', 'JACKPOT!', `Il jackpot è ${fmt(G.jackpot)}! Se risolvi la frase adesso, vinci tutto!`, () => setPhase('PICK_LETTER'));
    G.wheelValue = 500; // fallback per consonanti
    return;
  }
  if (v === 'express' && round.n === 6) {
    G.expressMode = true;
    G.turnScore   = 0;
    document.getElementById('express-banner').style.display = 'flex';
    stopRoundMusic();
    startExpressMusic();
    showModal('⚡', 'EXPRESS!', `${G.players[G.currentPlayer]} entra in modalità EXPRESS!\n+500€ per ogni consonante, −500€ per ogni vocale, lettera sbagliata = BANCAROTTA!`, () => setPhase('CHOOSE'));
    return;
  }

  // Normal money value
  G.wheelValue = v;

  // Round 4: add to jackpot each spin
  if (round.n === 4 && !G.jackpotLanded) {
    G.jackpot += Math.floor(v / 2);
    updateJackpotDisplay();
  }

  setPhase('PICK_LETTER');
}

// ==================== LETTER MECHANICS ====================

function pickLetter(ch) {
  const canPick = G.phase === 'PICK_LETTER'
    || (G.expressMode && G.phase === 'CHOOSE')
    || (G.gerryDone   && G.phase === 'CHOOSE');
  if (!canPick) return;

  G.usedLetters.add(ch);
  updateExhaustedNotice();
  const isVowel = VOWELS.has(ch);
  const count   = countLetter(ch);

  if (G.expressMode) {
    if (count === 0) {
      G.scores[G.currentPlayer]      = 0;
      G.roundScores[G.currentPlayer] = 0;
      G.expressMode = false;
      document.getElementById('express-banner').style.display = 'none';
      renderPuzzleBoard();
      playBuzzer();
      showModal('💥', 'BANCAROTTA EXPRESS!', `${G.players[G.currentPlayer]} ha sbagliato e perde TUTTO!`, () => nextPlayer());
      return;
    }
    const earn = isVowel ? -(500 * count) : 500 * count;
    G.roundScores[G.currentPlayer] = Math.max(0, G.roundScores[G.currentPlayer] + earn);
    revealLetter(ch, count);
    renderScoreboard();
    updateTurnScore();
    renderAlphabetGrid('all');
    checkPuzzleSolvedAuto();
    return;
  }

  if (isVowel) {
    // Should not happen from consonant phase; handled by buyVowel
    return;
  }

  if (count === 0) {
    playBuzzer();
    showModal('❌', 'Lettera assente!', `La lettera ${ch} non è nella frase. Turno passato.`, () => nextPlayer());
    return;
  }

  // Gerry mode: valore fisso + bonus 1000€
  const earn = G.gerryDone
    ? (G.gerryValue + GERRY_BONUS) * count
    : G.wheelValue * count;
  G.roundScores[G.currentPlayer] += earn;

  // blocca la griglia durante l'animazione
  document.getElementById('alphabet-grid').innerHTML = '';

  const animTime = revealLetter(ch);
  renderScoreboard();
  updateTurnScore();

  setTimeout(() => {
    if (G.gerryDone) {
      setPhase('CHOOSE');
      // 3s silenziosi: nessuna barra. Se non clicca "Tenta Soluzione" suona il buzzer
      // poi apre automaticamente il pannello con 10s + barra
      G.gerryTimeout = setTimeout(() => {
        G.gerryTimeout = null;
        playBuzzer();
        nextPlayer();
      }, 3000);
      return;
    }
    setPhase('CHOOSE');
    checkPuzzleSolvedAuto();
  }, animTime + 100);
}

function buyVowel() {
  if (G.gerryTimeout) { clearTimeout(G.gerryTimeout); G.gerryTimeout = null; }
  if (!G.gerryDone) {
    if (G.scores[G.currentPlayer] + G.roundScores[G.currentPlayer] < VOWEL_COST) {
      showModal('💸', 'Fondi insufficienti', `Servono ${fmt(VOWEL_COST)} per comprare una vocale.`, null);
      return;
    }
    if (G.roundScores[G.currentPlayer] >= VOWEL_COST) {
      G.roundScores[G.currentPlayer] -= VOWEL_COST;
    } else {
      const diff = VOWEL_COST - G.roundScores[G.currentPlayer];
      G.roundScores[G.currentPlayer] = 0;
      G.scores[G.currentPlayer] = Math.max(0, G.scores[G.currentPlayer] - diff);
    }
    renderScoreboard();
  }
  setPhase('PICK_VOWEL');
}

function pickVowel(ch) {
  if (G.phase !== 'PICK_VOWEL') return;
  G.usedLetters.add(ch);
  updateExhaustedNotice();
  document.getElementById('alphabet-grid').innerHTML = '';
  const count = countLetter(ch);

  if (count > 0) {
    const animTime = revealLetter(ch);
    setTimeout(() => {
      setPhase('CHOOSE');
      checkPuzzleSolvedAuto();
    }, animTime + 100);
  } else {
    setPhase('CHOOSE');
  }
}

function revealLetter(ch) {
  G.revealed.add(ch);
  const rc    = ROUND_COLORS[G.currentRound] || ROUND_COLORS[0];
  const tiles = [...document.querySelectorAll(`.tile[data-l="${ch}"]`)]
    .filter(t => !t.classList.contains('revealed'));

  if (tiles.length === 0) return 0;

  // FASE 1: ogni tile cambia colore una alla volta + ding
  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add('coloring');
      dingSound.currentTime = 0;
      dingSound.play().catch(() => {});
    }, i * COLOR_GAP);
  });

  // FASE 2: dopo che tutte si sono colorate, flip uno alla volta
  const allColoredAt = (tiles.length - 1) * COLOR_GAP + COLOR_DUR + COLOR_PAUSE;

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.remove('coloring');
      tile.style.setProperty('--flip-from', '#1565C0');
      tile.classList.add('flipping');
      setTimeout(() => {
        tile.classList.remove('flipping');
        tile.style.removeProperty('--flip-from');
        tile.classList.add('revealed');
        tile.textContent = ch;
      }, FLIP_DUR);
    }, allColoredAt + i * FLIP_GAP);
  });

  return allColoredAt + tiles.length * FLIP_GAP + FLIP_DUR;
}

function revealLetterInstant(ch) {
  G.revealed.add(ch);
  const tiles = [...document.querySelectorAll(`.tile[data-l="${ch}"]`)]
    .filter(t => !t.classList.contains('revealed'));
  shuffleArr(tiles).forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add('revealed');
      tile.textContent = ch;
      dingSound.currentTime = 0;
      dingSound.play().catch(() => {});
    }, i * COLOR_GAP);
  });
}

function checkPuzzleSolvedAuto() {
  if (isPuzzleSolved()) solveCorrect();
}

// ==================== SOLVING ====================

function openSolvePanel() {
  // Nell'ultimo round gerry: annulla il countdown silenzioso
  if (G && G.gerryTimeout) {
    clearTimeout(G.gerryTimeout);
    G.gerryTimeout = null;
  }
  document.getElementById('solve-panel').style.display = 'flex';
  document.getElementById('action-btns').style.display = 'none';
  document.getElementById('solve-input').value = '';
  document.getElementById('solve-input').focus();
}

function closeSolvePanel() {
  document.getElementById('solve-panel').style.display = 'none';
  document.getElementById('action-btns').style.display = 'flex';
}

function confirmSolve() {
  const raw   = document.getElementById('solve-input').value;
  const input = normalize(raw);
  const round = ROUNDS[G.currentRound];

  // CruciRuota: no "E" conjunction allowed
  if (round.n === 2) {
    const words = input.split(/\s+/);
    if (words.includes('E')) {
      showModal('❌', 'Risposta non valida!', 'Nel CruciRuota non puoi dire "e" tra le parole!', () => {
        closeSolvePanel();
        nextPlayer();
      });
      return;
    }
  }

  let correct;
  if (G.puzzle.words) {
    const given    = input.split(/\s+/).filter(Boolean);
    const expected = G.puzzle.words.map(normalize);
    correct = expected.length === given.length &&
              expected.every(w => given.includes(w)) &&
              given.every(w => expected.includes(w));
  } else {
    correct = normalize(G.puzzle.phrase) === input;
  }

  closeSolvePanel();
  if (correct) {
    stopExpressMusic();
    solveCorrect();
  } else {
    stopExpressMusic();
    playBuzzer();
    showModal('❌', 'Risposta errata!', `"${raw}" non è corretto. Turno passato.`, () => nextPlayer());
  }
}

function solveCorrect() {
  if (G.phase === 'DONE') return;
  G.phase = 'DONE';
  stopTimer();
  const all = getAllLetters();
  all.forEach(ch => G.revealed.add(ch));
  renderPuzzleBoard();

  const p      = G.currentPlayer;
  let   earned = G.roundScores[p] + SOLVE_BONUS; // +1000€ bonus risoluzione

  // Jackpot win?
  let jackpotMsg = '';
  if (G.jackpotLanded) {
    earned      += G.jackpot;
    jackpotMsg   = ` + JACKPOT ${fmt(G.jackpot)}!`;
    G.jackpot    = 0;
    G.jackpotLanded = false;
    updateJackpotDisplay();
  }

  G.scores[p] += earned;
  G.roundScores[p] = 0;
  G.turnScore = 0;
  G.firstPlayerNextRound = p;
  renderScoreboard();

  stopRoundMusic();
  correctSound.currentTime = 0;
  correctSound.play().catch(() => {});
  setTimeout(() => nextRound(), 3000);
}

// ==================== QUICK ROUNDS ====================

function setupQuickRound() {
  setPhase('QUICK');
}

function submitQuickAnswer() {
  stopFastMusic();
  const raw   = document.getElementById('quick-input').value;
  const input = normalize(raw);
  const correct = normalize(G.puzzle.phrase) === input;

  if (correct) {
    if (G.phase === 'DONE') return;
    G.phase = 'DONE';
    G.roundScores[G.currentPlayer] += QUICK_REWARD;
    G.scores[G.currentPlayer]      += QUICK_REWARD;
    G.firstPlayerNextRound = G.currentPlayer;
    getAllLetters().forEach(ch => G.revealed.add(ch));
    renderPuzzleBoard();
    renderScoreboard();
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
    setTimeout(() => nextRound(), 3000);
  } else {
    playBuzzer();
    showModal('❌', 'Risposta errata!', `"${raw}" non è corretto.`, () => {
      nextPlayer();
      document.getElementById('quick-input').value = '';
    });
  }
}

// ==================== GIRO GERRY ====================

function doGiroGerry() {
  document.getElementById('btn-gerry').style.display = 'none';
  showModal('🎡', 'GIRO GERRY!', 'Il conduttore gira la ruota per determinare il valore fisso delle consonanti!', () => {
    spinning = false;
    wheelSound.currentTime = 0;
    wheelSound.play().catch(() => {});
    const totalRot = (3 + Math.random() * 4) * 2 * Math.PI;
    const duration = 3000;
    const t0 = performance.now(), a0 = wheelAngle;
    function frame(now) {
      const p = Math.min((now - t0) / duration, 1);
      wheelAngle = a0 + totalRot * (1 - Math.pow(1 - p, 3));
      drawWheel(wheelAngle);
      if (p < 1) { requestAnimationFrame(frame); return; }
      let seg = getSegmentAtTop();
      // ensure money value
      while (typeof seg.value !== 'number' || seg.value < 150) {
        wheelAngle += (2 * Math.PI) / SEGMENTS.length;
        seg = getSegmentAtTop();
      }
      G.gerryDone  = true;
      G.gerryValue = seg.value;
      G.wheelValue = seg.value;
      document.getElementById('gerry-banner').style.display = 'flex';
      document.getElementById('gerry-val').textContent = fmt(G.gerryValue);
      showModal('🎡', 'GIRO GERRY', `Valore fisso consonanti: ${fmt(G.gerryValue)}!\nLe vocali sono gratis. Ogni consonante corretta = obbligo di tentare soluzione in 3 secondi!`, () => setPhase('CHOOSE'));
    }
    requestAnimationFrame(frame);
  });
}

// ==================== TIMER ====================

function startTimer(seconds, onExpire) {
  stopTimer();
  G.timerLeft = seconds;
  document.getElementById('timer-wrap').style.display = 'flex';
  document.getElementById('timer-text').textContent   = seconds;
  document.getElementById('timer-fill').style.width   = '100%';

  G.timerInterval = setInterval(() => {
    G.timerLeft--;
    document.getElementById('timer-text').textContent  = G.timerLeft;
    const pct = (G.timerLeft / seconds) * 100;
    document.getElementById('timer-fill').style.width  = pct + '%';
    if (G.timerLeft <= 0) {
      stopTimer();
      if (onExpire) onExpire();
    }
  }, 1000);
}

function stopTimer() {
  if (G.timerInterval) { clearInterval(G.timerInterval); G.timerInterval = null; }
  document.getElementById('timer-wrap').style.display = 'none';
}

// ==================== TURN / PLAYER MGMT ====================

function nextPlayer() {
  stopTimer();
  if (G.gerryTimeout) { clearTimeout(G.gerryTimeout); G.gerryTimeout = null; }
  G.jackpotLanded = false;
  G.turnScore     = 0;
  if (!G.expressMode) {
    G.currentPlayer = (G.currentPlayer + 1) % G.players.length;
  }
  G.expressMode = false;
  stopExpressMusic();
  document.getElementById('express-banner').style.display = 'none';
  if (ROUNDS[G.currentRound].type === 'classic') startRoundMusic();
  setPhase('CHOOSE');
}

function setPhase(phase) {
  G.phase = phase;
  const round      = ROUNDS[G.currentRound];
  const isClassic  = round.type === 'classic';
  const isQuick    = round.type === 'quick';

  // elements
  const wheelCol   = document.getElementById('wheel-section');
  const spinBtn    = document.getElementById('btn-spin');
  const wheelCanvas= document.getElementById('wheel-canvas');
  const alphGrid   = document.getElementById('alphabet-grid');
  const actionBtns = document.getElementById('action-btns');
  const solvePanel = document.getElementById('solve-panel');
  const quickPanel = document.getElementById('quick-panel');
  const buyVowelBtn= document.getElementById('btn-buy-vowel');

  const setSpin = enabled => {
    spinBtn.disabled = !enabled;
    wheelCanvas.classList.toggle('spin-disabled', !enabled);
  };

  // hide all panels first
  solvePanel.style.display = 'none';
  quickPanel.style.display = 'none';

  wheelCol.style.display = isClassic ? 'flex' : 'none';

  // Update current player display
  document.getElementById('turn-player').textContent  = G.players[G.currentPlayer];
  updateTurnScore();
  renderScoreboard();

  if (isQuick) {
    actionBtns.style.display = 'none';
    alphGrid.innerHTML = '';
    quickPanel.style.display = 'flex';
    document.getElementById('quick-hint').textContent =
      `Turno di ${G.players[G.currentPlayer]} — Chi indovina la frase vince ${fmt(QUICK_REWARD)}!`;
    document.getElementById('quick-input').value = '';
    return;
  }

  // Classic rounds
  switch (phase) {
    case 'CHOOSE':
      actionBtns.style.display = 'flex';
      buyVowelBtn.disabled = !canBuyVowel();
      if (G.expressMode) {
        renderAlphabetGrid('all');
        setSpin(false);
      } else if (G.gerryDone) {
        renderAlphabetGrid('consonants');
        setSpin(false);
      } else {
        alphGrid.innerHTML = '';
        setSpin(true);
      }
      break;

    case 'SPINNING':
      setSpin(false);
      alphGrid.innerHTML = '';
      actionBtns.style.display = 'none';
      break;

    case 'PICK_LETTER':
      setSpin(false);
      actionBtns.style.display = 'none';
      renderAlphabetGrid('consonants');
      break;

    case 'PICK_VOWEL':
      setSpin(false);
      actionBtns.style.display = 'none';
      renderAlphabetGrid('vowels', pickVowel);
      break;
  }
}

function updateTurnScore() {
  document.getElementById('turn-score').textContent = fmt(G.roundScores[G.currentPlayer]);
}

function canBuyVowel() {
  const total = G.scores[G.currentPlayer] + G.roundScores[G.currentPlayer];
  const allVowels = [...getAllLetters()].filter(c => VOWELS.has(c));
  const unusedVowels = allVowels.filter(c => !G.usedLetters.has(c));
  return total >= VOWEL_COST && unusedVowels.length > 0;
}

// ==================== JACKPOT DISPLAY ====================

function updateJackpotDisplay() {
  const pill = document.getElementById('jackpot-pill');
  const round = ROUNDS[G.currentRound];
  if (round.n === 4 && G.jackpot > 0) {
    pill.style.display = 'flex';
    document.getElementById('jackpot-val').textContent = fmt(G.jackpot);
    // grow piggy
    const size = G.jackpot >= 10000 ? '2rem' : G.jackpot >= 5000 ? '1.6rem' : '1.2rem';
    document.getElementById('jackpot-icon').style.fontSize = size;
  } else {
    pill.style.display = 'none';
  }
}

// ==================== ROUND MANAGEMENT ====================

function startRound() {
  stopSiglaMusic();
  const round  = ROUNDS[G.currentRound];
  const puzzles = PUZZLES[G.currentRound];
  G.puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  G.phase       = 'CHOOSE';
  if (G.gerryTimeout) { clearTimeout(G.gerryTimeout); G.gerryTimeout = null; }
  if (G.bonusTimerInterval) { clearInterval(G.bonusTimerInterval); G.bonusTimerInterval = null; }
  document.getElementById('bonus-select-panel').style.display = 'none';
  document.getElementById('fp-timer-display').style.display   = 'none';
  G.revealed    = new Set();
  G.usedLetters = new Set();
  G.turnScore   = 0;
  const exn = document.getElementById('exhausted-notice');
  if (exn) exn.style.display = 'none';
  G.roundScores = G.players.map(() => 0);
  G.jackpotLanded = false;
  G.expressMode = false;
  G.gerryDone   = false;
  G.gerryValue  = 0;
  G.wheelValue  = 0;

  // reset banners
  document.getElementById('express-banner').style.display = 'none';
  document.getElementById('gerry-banner').style.display   = 'none';
  document.getElementById('wheel-result-display').textContent = '';

  // round 10: show gerry button
  const gerryBtn = document.getElementById('btn-gerry');
  gerryBtn.style.display = round.n === 10 ? 'block' : 'none';

  // category / theme
  const themeText = G.puzzle.theme || G.puzzle.cat || '';
  document.getElementById('theme-label').textContent = themeText;
  document.getElementById('theme-strip').style.display = themeText ? 'flex' : 'none';

  // round pill
  document.getElementById('round-pill').textContent = `Round ${round.n} – ${round.name}`;

  // colore round sul tabellone
  const rc = ROUND_COLORS[G.currentRound] || ROUND_COLORS[0];
  const pb = document.getElementById('puzzle-board');
  pb.style.setProperty('--tile-bg', rc.bg);
  pb.style.setProperty('--tile-bd', rc.bd);

  updateJackpotDisplay();
  renderPuzzleBoard();

  showScreen('screen-game');
  nuovoRoundSound.currentTime = 0;
  nuovoRoundSound.play().catch(() => {});

  if (round.type === 'classic') {
    startRoundMusic();
  } else {
    stopRoundMusic();
  }

  if (round.type === 'quick') {
    initGiraMondo();
  } else {
    setPhase('CHOOSE');
  }
}

// ==================== GIRAMONDO ====================

function initGiraMondo() {
  document.getElementById('wheel-section').style.display   = 'none';
  document.getElementById('alphabet-grid').innerHTML       = '';
  document.getElementById('action-btns').style.display     = 'none';
  document.getElementById('solve-panel').style.display     = 'none';
  document.getElementById('quick-panel').style.display     = 'none';
  const th = document.getElementById('turn-header');
  if (th) th.style.display = 'none';

  G.gmQueue    = shuffleArr([...document.querySelectorAll('.tile[data-l]')]);
  G.gmIdx      = 0;
  G.gmTimer    = null;
  // gmPass: 0 = normale, 1 = prima passata (Triplete III), 2 = seconda passata
  G.gmPass     = ROUNDS[G.currentRound].n === 9 ? 1 : 0;
  G.gmInterval = G.gmPass > 0 ? 1000 : 3000;

  const hintEl = document.querySelector('#gm-buzz-area .gm-hint');
  document.getElementById('btn-buzz').style.display = '';

  showGmArea('buzz');
  document.getElementById('giramondo-panel').style.display = 'flex';
  startFastMusic();

  G.gmTimer = setInterval(gmRevealNext, G.gmInterval);
}

function gmRevealNext() {
  if (G.gmIdx >= G.gmQueue.length) {
    clearInterval(G.gmTimer);
    G.gmTimer = null;
    if (G.gmPass !== 1) {
      showModal('😔', 'Nessuno ha risposto!', 'Tutte le lettere sono state rivelate senza una soluzione.', () => nextRound());
    }
    // pass 1: la transizione è avviata dal timeout dell'ultima tile
    return;
  }
  const tile = G.gmQueue[G.gmIdx++];
  if (tile.classList.contains('revealed') && G.gmPass === 2) { gmRevealNext(); return; }
  const ch = tile.dataset.l;
  tile.classList.add('revealed');
  tile.textContent = ch;
  dingSound.currentTime = 0;
  dingSound.play().catch(() => {});
  if ([...document.querySelectorAll(`.tile[data-l="${ch}"]`)].every(t => t.classList.contains('revealed'))) {
    G.revealed.add(ch);
  }

  if (G.gmPass === 1) {
    const isLast = G.gmIdx >= G.gmQueue.length;
    setTimeout(() => {
      tile.classList.remove('revealed');
      tile.textContent = '';
      if ([...document.querySelectorAll(`.tile[data-l="${ch}"]`)].every(t => !t.classList.contains('revealed'))) {
        G.revealed.delete(ch);
      }
      if (isLast) startGmPass2();
    }, 1000);
  }
}

function startGmPass2() {
  if (document.getElementById('giramondo-panel').style.display === 'none') return;
  G.gmPass     = 2;
  G.gmIdx      = 0;
  G.gmInterval = 1000;
  G.gmQueue    = shuffleArr(G.gmQueue);

  document.querySelector('#gm-buzz-area .gm-hint').innerHTML =
    'Seconda passata — le lettere rimangono!<br>Premi quando conosci la risposta!';

  G.gmTimer = setInterval(gmRevealNext, G.gmInterval);
}

function gmBuzzIn() {
  prenotationSound.currentTime = 0;
  prenotationSound.play().catch(() => {});
  stopFastMusic();
  if (G.gmTimer) { clearInterval(G.gmTimer); G.gmTimer = null; }
  // Mostra i pulsanti dei giocatori
  const btns = document.getElementById('gm-player-btns');
  btns.innerHTML = G.players.map((p, i) =>
    `<button class="btn-gm-player" style="--pc:${PLAYER_COLORS[i]}" data-i="${i}">${p}</button>`
  ).join('');
  btns.querySelectorAll('.btn-gm-player').forEach(b =>
    b.addEventListener('click', () => gmSelectPlayer(+b.dataset.i))
  );
  showGmArea('select');
}

function gmSelectPlayer(i) {
  G.currentPlayer = i;
  renderScoreboard();
  document.getElementById('gm-answering-label').textContent =
    `Risponde: ${G.players[i]}`;
  document.getElementById('giramondo-input').value = '';
  showGmArea('answer');
  document.getElementById('giramondo-input').focus();
}

function gmConfirmAnswer() {
  const raw   = document.getElementById('giramondo-input').value;
  const input = normalize(raw);
  const correct = normalize(G.puzzle.phrase) === input;

  if (correct) {
    if (G.phase === 'DONE') return;
    G.phase = 'DONE';
    clearInterval(G.gmTimer);
    G.scores[G.currentPlayer]      += QUICK_REWARD;
    G.roundScores[G.currentPlayer] += QUICK_REWARD;
    G.firstPlayerNextRound = G.currentPlayer;
    getAllLetters().forEach(ch => G.revealed.add(ch));
    renderPuzzleBoard();
    renderScoreboard();
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
    setTimeout(() => nextRound(), 3000);
  } else {
    playBuzzer();
    showModal('❌', 'Risposta errata!', `"${raw}" non è corretto. Le lettere continuano…`, () => {
      showGmArea('buzz');
      startFastMusic();
      G.gmTimer = setInterval(gmRevealNext, G.gmInterval || 3000);
    });
  }
}

function showGmArea(section) {
  document.getElementById('gm-buzz-area').style.display   = section === 'buzz'   ? 'flex' : 'none';
  document.getElementById('gm-select-area').style.display = section === 'select' ? 'flex' : 'none';
  document.getElementById('gm-answer-area').style.display = section === 'answer' ? 'flex' : 'none';
}

function endRound(winner) {
  const round = ROUNDS[G.currentRound];
  if (round.n >= 10) {
    // check bonus
    offerBonus();
    return;
  }
  G.currentRound++;
  showRoundIntro();
}

function nextRound() {
  stopFastMusic();
  stopRoundMusic();
  if (G.gmTimer) { clearInterval(G.gmTimer); G.gmTimer = null; }
  document.getElementById('giramondo-panel').style.display = 'none';

  G.currentRound++;
  if (G.currentRound >= ROUNDS.length) {
    endGame();
    return;
  }
  // Raddoppia automatico dopo "Il Regno degli Animali" (n:5)
  if (ROUNDS[G.currentRound - 1].n === 5) {
    const winner = G.players[G.firstPlayerNextRound];
    G.bonusThenContinue = true;
    showModal('🎲', 'RADDOPPIA!',
      `${winner} ha vinto il round!\nScegli 4 consonanti e 1 vocale, poi hai 10 secondi per raddoppiare!`,
      () => startBonusRound());
    return;
  }
  showRoundIntro();
}

function showRoundIntro() {
  const round = ROUNDS[G.currentRound];
  document.getElementById('intro-num').textContent  = `ROUND ${round.n}`;
  document.getElementById('intro-name').textContent = round.name;
  document.getElementById('intro-type').textContent = round.type === 'quick' ? '⚡ Round Veloce' : '🎡 Round Classico';
  document.getElementById('intro-desc').textContent = round.desc;
  G.currentPlayer = G.firstPlayerNextRound;
  showScreen('screen-round-intro');
}

// ==================== BONUS ROUND ====================

function offerBonus() {
  showModal('📚', 'Se la sai raddoppi!', 'Il concorrente in testa può tentare di RADDOPPIARE il proprio montepremi! Vuoi giocare il round bonus?', () => {
    startBonusRound();
  });
  document.getElementById('modal-ok').textContent = 'GIOCA!';
  // add skip button
  const skip = document.createElement('button');
  skip.className = 'btn-secondary';
  skip.textContent = 'Salta';
  skip.style.marginTop = '8px';
  skip.onclick = () => {
    document.getElementById('overlay').style.display = 'none';
    endGame();
  };
  document.getElementById('modal').appendChild(skip);
}

function startBonusRound() {
  // clean up extra skip button if present
  const modal = document.getElementById('modal');
  while (modal.children.length > 4) modal.removeChild(modal.lastChild);

  // leader plays
  G.currentPlayer  = G.firstPlayerNextRound ?? G.scores.indexOf(Math.max(...G.scores));
  G.puzzle = BONUS_PUZZLES[Math.floor(Math.random() * BONUS_PUZZLES.length)];
  G.revealed    = new Set();
  G.usedLetters = new Set();
  G.turnScore   = 0;
  G.roundScores = G.players.map(() => 0);

  document.getElementById('theme-label').textContent = '📚 BONUS';
  document.getElementById('round-pill').textContent  = 'BONUS – Se la sai raddoppi!';
  document.getElementById('express-banner').style.display = 'none';
  document.getElementById('gerry-banner').style.display   = 'none';
  document.getElementById('btn-gerry').style.display      = 'none';
  const rc = ROUND_COLORS[ROUND_COLORS.length - 1];
  const pb = document.getElementById('puzzle-board');
  pb.style.setProperty('--tile-bg', rc.bg);
  pb.style.setProperty('--tile-bd', rc.bd);
  updateJackpotDisplay();
  renderPuzzleBoard();

  showScreen('screen-game');
  setBonusPhase();
}

function setBonusPhase() {
  G.phase = 'BONUS_SELECT';
  document.getElementById('wheel-section').style.display       = 'none';
  document.getElementById('action-btns').style.display     = 'none';
  document.getElementById('solve-panel').style.display     = 'none';
  document.getElementById('quick-panel').style.display     = 'none';
  document.getElementById('bonus-select-panel').style.display = 'flex';

  // reset bonus count tracking
  G._bonusSelected = [];
  updateBonusCount();

  renderAlphabetGrid('all');
  // override letter click for bonus selection
  document.getElementById('alphabet-grid').querySelectorAll('.letter-btn').forEach(btn => {
    btn.onclick = null;
    btn.addEventListener('click', () => selectBonusLetter(btn.dataset.l, btn));
  });
}

function selectBonusLetter(ch, btn) {
  const isVowel = VOWELS.has(ch);
  const sel = G._bonusSelected;

  const consonants = sel.filter(c => !VOWELS.has(c));
  const vowels     = sel.filter(c =>  VOWELS.has(c));

  if (isVowel  && vowels.length >= 1) return;
  if (!isVowel && consonants.length >= 4) return;
  if (sel.includes(ch)) return;

  sel.push(ch);
  btn.classList.add('used');
  btn.disabled = true;
  updateBonusCount();

  if (consonants.length + (!isVowel ? 1 : 0) >= 4 && vowels.length + (isVowel ? 1 : 0) >= 1) {
    document.getElementById('btn-bonus-confirm').disabled = false;
  }
}

function updateBonusCount() {
  const sel = G._bonusSelected || [];
  document.getElementById('bonus-count').textContent =
    `${sel.filter(c => !VOWELS.has(c)).length}/4 consonanti, ${sel.filter(c => VOWELS.has(c)).length}/1 vocale`;
}

function confirmBonusLetters() {
  const sel = G._bonusSelected;
  document.getElementById('bonus-select-panel').style.display = 'none';
  renderPuzzleBoard(); // all tiles hidden

  // glow+flip each selected letter sequentially, then start solve phase
  const GAP = 550;
  sel.forEach((ch, i) => {
    setTimeout(() => {
      const dur = revealLetter(ch);
      if (i === sel.length - 1) setTimeout(_startBonusSolvePhase, dur + 350);
    }, i * GAP);
  });
}

function _startBonusSolvePhase() {
  const fpTimer  = document.getElementById('fp-timer-display');
  const btnSolve = document.getElementById('btn-quick-solve');
  const input    = document.getElementById('quick-input');
  const hint     = document.getElementById('quick-hint');

  document.getElementById('quick-panel').style.display = 'flex';
  input.style.display  = 'none';
  btnSolve.style.display = '';
  btnSolve.textContent = 'DO LA SOLUZIONE';
  hint.textContent = `${G.players[G.currentPlayer]} — hai 10 secondi per risolvere e raddoppiare il tuo montepremi!`;
  input.value = '';
  G.phase = 'BONUS_SOLVE';

  let left = 10;
  fpTimer.textContent = left;
  fpTimer.style.display = 'flex';

  G.bonusTimerInterval = setInterval(() => {
    left--;
    fpTimer.textContent = left;
    if (left <= 0) {
      clearInterval(G.bonusTimerInterval);
      G.bonusTimerInterval = null;
      fpTimer.style.display = 'none';
      const cont = G.bonusThenContinue;
      G.bonusThenContinue = false;
      getAllLetters().forEach(ch => G.revealed.add(ch));
      renderPuzzleBoard();
      _showBonusResult('⏱️', 'Tempo scaduto! Il montepremi rimane invariato.', cont);
    }
  }, 1000);

  // Phase 1: stop countdown, reveal input
  btnSolve.onclick = () => {
    if (G.phase !== 'BONUS_SOLVE') return;
    clearInterval(G.bonusTimerInterval);
    G.bonusTimerInterval = null;
    fpTimer.style.display = 'none';
    input.style.display = '';
    input.focus();
    btnSolve.textContent = '✓ CONFERMO';
    btnSolve.onclick = () => submitBonusSolve();
  };
}

function _showBonusResult(icon, text, cont) {
  if (G.bonusTimerInterval) { clearInterval(G.bonusTimerInterval); G.bonusTimerInterval = null; }
  document.getElementById('fp-timer-display').style.display = 'none';
  // restore btn-quick-solve to default handler for future rounds
  document.getElementById('btn-quick-solve').onclick = () => {
    if (G.phase === 'BONUS_SOLVE') { submitBonusSolve(); return; }
    submitQuickAnswer();
  };
  G.phase = 'DONE';
  document.getElementById('quick-hint').textContent = icon + ' ' + text;
  document.getElementById('quick-input').style.display = 'none';
  document.getElementById('btn-quick-solve').style.display = 'none';
  setTimeout(() => cont ? showRoundIntro() : endGame(), 3500);
}

function submitBonusSolve() {
  if (G.phase !== 'BONUS_SOLVE') return;
  if (G.bonusTimerInterval) { clearInterval(G.bonusTimerInterval); G.bonusTimerInterval = null; }
  document.getElementById('fp-timer-display').style.display = 'none';
  stopTimer();
  const raw    = document.getElementById('quick-input').value;
  const input  = normalize(raw);
  const correct = normalize(G.puzzle.phrase) === input;
  const cont = G.bonusThenContinue;
  G.bonusThenContinue = false;

  getAllLetters().forEach(ch => G.revealed.add(ch));
  renderPuzzleBoard();

  if (correct) {
    const p = G.currentPlayer;
    G.scores[p] *= 2;
    renderScoreboard();
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
    _showBonusResult('🎊', `RADDOPPIO! ${G.players[p]}: ${fmt(G.scores[p])}!`, cont);
  } else {
    playBuzzer();
    _showBonusResult('❌', 'Risposta errata! Il montepremi rimane invariato.', cont);
  }
}

// ==================== END GAME ====================

function endGame() {
  startFinalGame();
}

// ==================== FINAL GAME: RUOTA DELLE MERAVIGLIE ====================

let meraWheelAngle    = 0;
let meraSpinning      = false;
let finalTimerPaused  = false;
let meraGlowing       = false;
let meraGlowStart     = 0;

function startFinalGame() {
  const maxScore  = Math.max(...G.scores);
  const winnerIdx = G.scores.indexOf(maxScore);

  G.final = {
    winnerIdx,
    boardIdx:       -1,
    timeLeft:       60,
    timerInterval:  null,
    revealed:       new Set(),
    revealedPositions: new Set(),
    usedLetters:    new Set(),
    puzzle:         null,
    puzzleSet:      null,
    wheelSegments:   shuffleArr([...MERA_PRIZE_POOL]),
    selectedIndices: [],
    prizes:          [],
    boardResults:    [null, null, null],
    totalWon:        0,
    envelopesRevealed: 0,
    consonantsLeft:  0,
    vowelsLeft:      0,
  };

  showScreen('screen-final');
  startMeraviglieMusic();
  document.getElementById('mera-winner-tag').textContent     = G.players[winnerIdx];
  document.getElementById('final-wheel-phase').style.display = 'flex';
  document.getElementById('final-boards-phase').style.display    = 'none';
  document.getElementById('final-envelope-phase').style.display  = 'none';
  document.getElementById('mera-ready-area').style.display    = 'none';
  document.getElementById('mera-hint-line').textContent       = 'Clicca la ruota per girare!';
  document.getElementById('fp-timer-display').style.display   = 'none';
  document.getElementById('fp-timer-display').classList.remove('urgent');
  meraWheelAngle   = 0;
  meraSpinning     = false;
  meraGlowing      = false;
  finalTimerPaused = false;
  document.getElementById('mera-canvas').classList.remove('mera-spinning');
  drawMeraviglieWheel(0);
}

function drawMeraviglieWheel(angle) {
  const canvas = document.getElementById('mera-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const r  = cx - 22;
  const n  = MERA_PRIZE_POOL.length; // 24
  const arc = (2 * Math.PI) / n;
  const segs = (G.final && G.final.wheelSegments) ? G.final.wheelSegments : MERA_PRIZE_POOL;
  const sel  = (G.final && G.final.selectedIndices) ? G.final.selectedIndices : [];
  const glowPulse = meraGlowing
    ? 0.5 + 0.5 * Math.sin((performance.now() - meraGlowStart) / 180)
    : 1;

  ctx.clearRect(0, 0, W, H);

  segs.forEach((v, i) => {
    const start      = angle + i * arc - Math.PI / 2;
    const end        = start + arc;
    const isSelected = sel.includes(i);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    if (isSelected) {
      const g = Math.round(180 + 75 * glowPulse);
      ctx.fillStyle = `rgb(255,${g},0)`;
    } else {
      ctx.fillStyle = i % 2 === 0 ? '#0a2880' : '#0d32a0';
    }
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(start) * r, cy + Math.sin(start) * r);
    ctx.strokeStyle = 'rgba(255,215,0,0.5)';
    ctx.lineWidth   = 1;
    ctx.stroke();

    const mid = start + arc / 2;
    const lr  = r * 0.66;
    const ch  = MERA_CHARS[i];
    ctx.save();
    ctx.translate(cx + Math.cos(mid) * lr, cy + Math.sin(mid) * lr);
    ctx.rotate(mid + Math.PI / 2);
    ctx.fillStyle    = isSelected ? '#1a237e' : (ch === '★' ? '#FFD700' : '#ffffff');
    ctx.font         = `bold ${Math.round(r * 0.09)}px Arial`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // dark hub circle
  const hubAreaR = r * 0.26;
  ctx.beginPath();
  ctx.arc(cx, cy, hubAreaR, 0, 2 * Math.PI);
  ctx.fillStyle   = '#04043a';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,215,0,0.5)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  // gold outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth   = 3;
  ctx.stroke();

  // 3 fixed arrow pointers (outside ring)
  const tipR  = r - 1;
  const baseR = r + 16;
  const hw    = 8;
  MERA_ARROW_ANGLES.forEach(a => {
    const tipX  = cx + Math.cos(a) * tipR;
    const tipY  = cy + Math.sin(a) * tipR;
    const baseX = cx + Math.cos(a) * baseR;
    const baseY = cy + Math.sin(a) * baseR;
    const px = -Math.sin(a), py = Math.cos(a);
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(baseX + px * hw, baseY + py * hw);
    ctx.lineTo(baseX - px * hw, baseY - py * hw);
    ctx.closePath();
    ctx.fillStyle   = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  });

  // center knob
  const hubR = r * 0.08;
  ctx.beginPath();
  ctx.arc(cx, cy, hubR, 0, 2 * Math.PI);
  const grd = ctx.createRadialGradient(cx - hubR * 0.3, cy - hubR * 0.3, 1, cx, cy, hubR);
  grd.addColorStop(0, '#ffe066');
  grd.addColorStop(1, '#b8860b');
  ctx.fillStyle   = grd;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
}

function spinMeraviglieWheel() {
  if (meraSpinning) return;
  meraSpinning = true;
  document.getElementById('mera-canvas').classList.add('mera-spinning');
  document.getElementById('mera-hint-line').textContent = '';
  wheelSound.currentTime = 0;
  wheelSound.play().catch(() => {});

  const totalRot = (4 + Math.random() * 5) * 2 * Math.PI;
  const duration = 4000;
  const t0 = performance.now(), a0 = meraWheelAngle;

  function frame(now) {
    const p  = Math.min((now - t0) / duration, 1);
    const ep = 1 - Math.pow(1 - p, 3);
    meraWheelAngle = a0 + totalRot * ep;
    drawMeraviglieWheel(meraWheelAngle);
    if (p < 1) { requestAnimationFrame(frame); return; }
    meraSpinning = false;
    document.getElementById('mera-canvas').classList.remove('mera-spinning');
    document.getElementById('mera-hint-line').textContent = '';

    // Compute 3 selected segment indices from fixed arrow positions
    const n2  = MERA_PRIZE_POOL.length;
    const arc2 = (2 * Math.PI) / n2;
    G.final.selectedIndices = MERA_ARROW_ANGLES.map(a => {
      let norm = ((a - meraWheelAngle + Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      return Math.floor(norm / arc2) % n2;
    });
    G.final.prizes = G.final.selectedIndices.map(i => G.final.wheelSegments[i]);

    meraGlowing   = true;
    meraGlowStart = performance.now();
    function glowFrame(now) {
      drawMeraviglieWheel(meraWheelAngle);
      if (now - meraGlowStart < 2500) { requestAnimationFrame(glowFrame); return; }
      meraGlowing = false;
      drawMeraviglieWheel(meraWheelAngle);
      document.getElementById('mera-ready-text').textContent = 'Tre premi pronti nelle buste!';
      document.getElementById('mera-ready-area').style.display = 'flex';
    }
    requestAnimationFrame(glowFrame);
  }
  requestAnimationFrame(frame);
}

function beginFinalBoards() {
  stopMeraviglieMusic();
  document.getElementById('final-wheel-phase').style.display  = 'none';
  document.getElementById('final-boards-phase').style.display = 'flex';

  G.final.timeLeft = 60;
  updateFinalTimerUI();
  // Timer starts only after letter selection on board 0 (via confirmFinalLetters)
  setupFinalBoard(0);
}

function updateFinalTimerUI() {
  const t = G.final.timeLeft;
  const el = document.getElementById('fp-timer-display');
  el.textContent = t;
  if (t <= 10) el.classList.add('urgent');
  else el.classList.remove('urgent');
}

function startFinalTimer() {
  if (G.final.timerInterval) return;
  startFinalMusic();
  finalTimerPaused = false;
  document.getElementById('fp-btn-pause').style.display   = 'inline-block';
  document.getElementById('fp-btn-pause').textContent     = '⏸';
  document.getElementById('fp-btn-pause').classList.remove('paused');
  document.getElementById('fp-timer-display').style.display = 'block';
  G.final.timerInterval = setInterval(() => {
    G.final.timeLeft--;
    updateFinalTimerUI();
    if (G.final.timeLeft <= 0) {
      clearInterval(G.final.timerInterval);
      G.final.timerInterval = null;
      finalTimeUp();
    }
  }, 1000);
}

function toggleFinalTimerPause() {
  if (finalTimerPaused) {
    finalTimerPaused = false;
    document.getElementById('fp-btn-pause').textContent = '⏸';
    document.getElementById('fp-btn-pause').classList.remove('paused');
    startFinalTimer();
  } else {
    finalTimerPaused = true;
    clearInterval(G.final.timerInterval);
    G.final.timerInterval = null;
    document.getElementById('fp-btn-pause').textContent = '▶';
    document.getElementById('fp-btn-pause').classList.add('paused');
  }
}

function setupFinalBoard(idx) {
  G.final.boardIdx = idx;
  if (idx === 0) {
    G.final.puzzleSet = FINAL_BOARD_PUZZLES[Math.floor(Math.random() * FINAL_BOARD_PUZZLES.length)];
  }
  G.final.puzzle = G.final.puzzleSet.boards[idx];
  G.final.revealed    = new Set();
  G.final.usedLetters = new Set();
  G.final.revealedPositions = new Set();
  G.final.vowelsLeft  = 1;

  const labels = ['Tabellone 1 – Classico', 'Tabellone 2 – Testacoda', 'Tabellone 3 – Rubasecondi'];
  document.getElementById('fp-board-label').textContent = labels[idx];
  const fpThemeText = G.final.puzzle.cat || G.final.puzzleSet.theme || '';
  document.getElementById('fp-theme-label').textContent = fpThemeText;
  document.getElementById('fp-theme-strip').style.display = fpThemeText ? 'flex' : 'none';
  document.getElementById('fp-solve-input').value        = '';

  document.getElementById('fp-action-btns').style.display = 'none';
  document.getElementById('fp-solve-wrap').style.display  = 'none';

  const confirmBtn = document.getElementById('fp-btn-confirm-letters');
  const solveWrap  = document.getElementById('fp-solve-wrap');

  if (idx === 0) {
    G.final.consonantsLeft = 3;
    document.getElementById('fp-instructions').textContent = 'Rivelazione N R T E…';
    document.getElementById('fp-alpha-grid').style.display = 'none';
    confirmBtn.style.display = 'none';
    solveWrap.style.display  = 'none';
    renderFinalPuzzle();
    // Animate NRTE reveal, then let player choose letters
    animateFinalRevealByLetters(['N','R','T','E'], () => {
      ['N','R','T','E'].forEach(ch => G.final.usedLetters.add(ch));
      document.getElementById('fp-instructions').textContent = 'N R T E rivelate. Scegli 3 consonanti e 1 vocale!';
      document.getElementById('fp-alpha-grid').style.display = 'flex';
      renderFinalAlphabet();
    });
  } else if (idx === 1) {
    G.final.consonantsLeft = 0;
    G.final.revealedPositions = getTestacodaPositions(G.final.puzzle.phrase);
    document.getElementById('fp-instructions').textContent = 'Prima e ultima lettera di ogni parola sono visibili. Risolvi!';
    document.getElementById('fp-alpha-grid').innerHTML     = '';
    document.getElementById('fp-alpha-grid').style.display = 'none';
    confirmBtn.style.display = 'none';
    solveWrap.style.display  = 'none';
    document.getElementById('fp-solve-input').value = '';
    renderFinalPuzzle(true);
    animateFinalRevealByPositions(G.final.revealedPositions, () => {
      document.getElementById('fp-action-btns').style.display = 'flex';
      if (!G.final.timerInterval && G.final.timeLeft > 0) startFinalTimer();
    });
  } else {
    G.final.consonantsLeft = Infinity;
    document.getElementById('fp-instructions').textContent = 'Consonanti illimitate (lettera sbagliata = −3s), 1 vocale. Risolvi!';
    document.getElementById('fp-alpha-grid').style.display = 'flex';
    confirmBtn.style.display = 'none';
    solveWrap.style.display  = 'none';
    document.getElementById('fp-solve-input').value = '';
    renderFinalAlphabet();
    renderFinalPuzzle();
    document.getElementById('fp-action-btns').style.display = 'flex';
    if (!G.final.timerInterval && G.final.timeLeft > 0) startFinalTimer();
  }
}

function getTestacodaPositions(phrase) {
  const grid = layoutPhrase(phrase);
  const pos  = new Set();
  grid.forEach((row, ri) => {
    let wordStart = null;
    row.forEach((cell, ci) => {
      if (cell.type === 'letter') {
        if (wordStart === null) wordStart = `${ri},${ci}`;
        const next = row[ci + 1];
        if (!next || (next.type !== 'letter' && next.type !== 'apostrophe')) {
          pos.add(wordStart);
          pos.add(`${ri},${ci}`);
          wordStart = null;
        }
      } else if (cell.type !== 'apostrophe') {
        wordStart = null;
      }
    });
  });
  return pos;
}

function renderFinalPuzzle(suppressReveal = false) {
  const board  = document.getElementById('fp-puzzle-board');
  const phrase = G.final.puzzle.phrase;
  const grid   = layoutPhrase(phrase);
  const idx    = G.final.boardIdx;

  board.innerHTML = grid.map((row, ri) =>
    `<div class="puzzle-row">${
      row.map((cell, ci) => {
        if (cell.type === 'empty') return '<div class="tile empty"></div>';
        if (cell.type === 'space') return '<div class="tile space"></div>';
        if (cell.type === 'apostrophe') return '<div class="tile revealed apostrophe">\'</div>';
        const rev = !suppressReveal && (idx === 1
          ? G.final.revealedPositions.has(`${ri},${ci}`)
          : G.final.revealed.has(cell.char));
        return `<div class="tile${rev ? ' revealed' : ''}" data-l="${cell.char}" data-ri="${ri}" data-ci="${ci}">${rev ? cell.char : ''}</div>`;
      }).join('')
    }</div>`
  ).join('');
}

function renderFinalAlphabet() {
  const grid = document.getElementById('fp-alpha-grid');
  const idx  = G.final.boardIdx;

  grid.innerHTML = [...IT_ALPHA].map(ch => {
    const used    = G.final.usedLetters.has(ch);
    const isVowel = VOWELS.has(ch);
    // Disable only when quota is exhausted for new picks; used letters stay clickable
    let disabled = false;
    if (!used) {
      if (isVowel  && G.final.vowelsLeft <= 0)     disabled = true;
      if (!isVowel && G.final.consonantsLeft <= 0) disabled = true;
    }
    return `<button class="letter-btn ${isVowel ? 'vowel' : 'consonant'} ${used ? 'used' : ''}"
      data-l="${ch}" ${disabled ? 'disabled' : ''}>${ch}</button>`;
  }).join('');

  grid.querySelectorAll('.letter-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => finalPickLetter(btn.dataset.l));
  });

  // Show selected letters summary for board 0
  const selDiv = document.getElementById('fp-selected-letters');
  if (selDiv) {
    if (idx === 0) {
      const AUTO = new Set(['N','R','T','E']);
      const parts = [...G.final.usedLetters].map(ch =>
        `<span class="${AUTO.has(ch) ? 'fp-auto-lbl' : 'fp-user-lbl'}">${ch}</span>`
      );
      selDiv.innerHTML = parts.length ? '🔤 ' + parts.join(' · ') : '';
      selDiv.style.display = 'block';
    } else {
      selDiv.style.display = 'none';
    }
  }
}

function finalPickLetter(ch) {
  const idx     = G.final.boardIdx;
  const isVowel = VOWELS.has(ch);
  const phrase  = G.final.puzzle.phrase;
  const count   = phrase.split('').filter(c => c === ch).length;

  // Re-pick an already-used letter: buzzer error (silent on board 0)
  if (G.final.usedLetters.has(ch)) {
    if (idx !== 0) playBuzzer();
    return;
  }

  G.final.usedLetters.add(ch);
  if (isVowel)  G.final.vowelsLeft--;
  else          G.final.consonantsLeft--;

  if (count > 0) {
    dingSound.currentTime = 0;
    dingSound.play().catch(() => {});
    if (idx !== 0) {
      G.final.revealed.add(ch);
      renderFinalPuzzle();
      renderFinalAlphabet();
      if (isFinalPuzzleSolved()) { finalSolveCorrect(); return; }
    } else {
      renderFinalAlphabet();
    }
  } else {
    if (idx !== 0) {  // board 0: no buzzer on wrong picks
      playBuzzer();
      if (idx === 2) {
        G.final.timeLeft = Math.max(0, G.final.timeLeft - 3);
        updateFinalTimerUI();
        if (G.final.timeLeft <= 0) {
          clearInterval(G.final.timerInterval);
          G.final.timerInterval = null;
          finalTimeUp();
          return;
        }
      }
    }
    renderFinalAlphabet();
  }

  // Board 0: show confirm button when all picks are done
  if (idx === 0 && G.final.consonantsLeft <= 0 && G.final.vowelsLeft <= 0) {
    document.getElementById('fp-btn-confirm-letters').style.display = 'block';
    document.getElementById('fp-alpha-grid').style.display = 'none';
    const selDiv = document.getElementById('fp-selected-letters');
    if (selDiv) selDiv.style.display = 'none';
  }
}

function confirmFinalLetters() {
  document.getElementById('fp-btn-confirm-letters').style.display = 'none';
  document.getElementById('fp-alpha-grid').style.display = 'none';
  const selDiv = document.getElementById('fp-selected-letters');
  if (selDiv) selDiv.style.display = 'none';

  const phrase = G.final.puzzle.phrase;
  const lettersToReveal = [...G.final.usedLetters].filter(ch => phrase.includes(ch));
  // Board is already rendered blank; animate reveal
  animateFinalRevealByLetters(lettersToReveal, () => {
    document.getElementById('fp-action-btns').style.display = 'flex';
    startFinalTimer();
  });
}

function animateFinalRevealByLetters(letters, callback) {
  const board = document.getElementById('fp-puzzle-board');
  const tiles = [];
  letters.forEach(ch => {
    board.querySelectorAll(`.tile[data-l="${ch}"]`).forEach(t => {
      if (!t.classList.contains('revealed')) tiles.push({ tile: t, ch });
    });
  });
  _runFinalTileAnimation(tiles, callback);
}

function animateFinalRevealByPositions(posSet, callback) {
  const board = document.getElementById('fp-puzzle-board');
  const tiles = [];
  posSet.forEach(pos => {
    const [ri, ci] = pos.split(',');
    const t = board.querySelector(`.tile[data-ri="${ri}"][data-ci="${ci}"]`);
    if (t && !t.classList.contains('revealed')) tiles.push({ tile: t, ch: t.dataset.l });
  });
  _runFinalTileAnimation(tiles, callback);
}

function _runFinalTileAnimation(tiles, callback) {
  if (tiles.length === 0) { if (callback) callback(); return; }

  tiles.forEach(({ tile }, i) => {
    setTimeout(() => {
      tile.classList.add('coloring');
      dingSound.currentTime = 0;
      dingSound.play().catch(() => {});
    }, i * COLOR_GAP);
  });

  const allColoredAt = (tiles.length - 1) * COLOR_GAP + COLOR_DUR + COLOR_PAUSE;
  tiles.forEach(({ tile, ch }, i) => {
    setTimeout(() => {
      tile.classList.remove('coloring');
      tile.style.setProperty('--flip-from', '#1565C0');
      tile.classList.add('flipping');
      setTimeout(() => {
        tile.classList.remove('flipping');
        tile.style.removeProperty('--flip-from');
        tile.classList.add('revealed');
        tile.textContent = ch;
        G.final.revealed.add(ch);
      }, FLIP_DUR);
    }, allColoredAt + i * FLIP_GAP);
  });

  const total = allColoredAt + tiles.length * FLIP_GAP + FLIP_DUR;
  if (callback) setTimeout(callback, total + 200);
}

function revealFinalPhraseInstant() {
  const phrase = G.final.puzzle.phrase;
  const allLetters = new Set(phrase.replace(/[ ']/g, '').split(''));
  allLetters.forEach(ch => G.final.revealed.add(ch));
  if (G.final.boardIdx === 1) {
    const grid = layoutPhrase(phrase);
    grid.forEach((row, ri) => row.forEach((cell, ci) => {
      if (cell.type === 'letter') G.final.revealedPositions.add(`${ri},${ci}`);
    }));
  }
  renderFinalPuzzle();
}

function _hideFinalActionBtns() {
  document.getElementById('fp-btn-pause').style.display  = 'none';
  document.getElementById('fp-action-btns').style.display = 'none';
  document.getElementById('fp-solve-wrap').style.display  = 'none';
}

function failAndProceedFinalBoard() {
  stopFinalMusic();
  if (G.final.timerInterval) { clearInterval(G.final.timerInterval); G.final.timerInterval = null; }
  _hideFinalActionBtns();
  G.final.boardResults[G.final.boardIdx] = 'lost';
  revealFinalPhraseInstant();
  const next = G.final.boardIdx + 1;
  if (next >= 3) setTimeout(() => endFinalGame(), 1400);
  else setTimeout(() => setupFinalBoard(next), 1600);
}

function isFinalPuzzleSolved() {
  if (G.final.boardIdx === 1) return false;
  const letters = new Set(G.final.puzzle.phrase.replace(/[ ']/g, '').split(''));
  for (const ch of letters) {
    if (!G.final.revealed.has(ch)) return false;
  }
  return true;
}

function submitFinalSolve() {
  const raw   = document.getElementById('fp-solve-input').value;
  const input = normalize(raw);
  if (!input) return;

  if (normalize(G.final.puzzle.phrase) === input) {
    finalSolveCorrect();
  } else {
    playBuzzer();
    failAndProceedFinalBoard();
  }
}

function finalSolveCorrect() {
  stopFinalMusic();
  correctSound.currentTime = 0;
  correctSound.play().catch(() => {});
  if (G.final.timerInterval) { clearInterval(G.final.timerInterval); G.final.timerInterval = null; }
  _hideFinalActionBtns();
  G.final.boardResults[G.final.boardIdx] = 'won';
  revealFinalPhraseInstant();
  const next = G.final.boardIdx + 1;
  if (next >= 3) setTimeout(() => endFinalGame(), 1400);
  else setTimeout(() => setupFinalBoard(next), 1600);
}

function finalTimeUp() {
  _hideFinalActionBtns();
  playBuzzer();
  G.final.boardResults[G.final.boardIdx] = 'lost';
  revealFinalPhraseInstant();
  setTimeout(() => endFinalGame(), 1400);
}

function endFinalGame() {
  if (G.final.timerInterval) { clearInterval(G.final.timerInterval); G.final.timerInterval = null; }
  document.getElementById('fp-timer-display').style.display = 'none';
  document.getElementById('fp-timer-display').classList.remove('urgent');
  showFinalEnvelopes();
}

function showFinalEnvelopes() {
  stopFinalMusic();
  document.getElementById('final-boards-phase').style.display   = 'none';
  document.getElementById('final-envelope-phase').style.display = 'flex';
  document.getElementById('fp-env-prize-box').style.display     = 'none';

  const wonCount = G.final.boardResults.filter(r => r === 'won').length;
  document.getElementById('fp-env-subtitle').textContent = wonCount > 0
    ? `Hai vinto ${wonCount} tabellone${wonCount !== 1 ? 'i' : ''}! Scegli la tua busta.`
    : 'Nessun tabellone vinto. Scegli ugualmente una busta…';

  G.final.selectedEnvIdx = -1;
  G.final.totalWon       = 0;
  document.getElementById('fp-btn-env-confirm').disabled = wonCount > 0;

  const cont = document.getElementById('fp-envelopes');
  cont.innerHTML = G.final.prizes.map((_, i) => {
    const cls = G.final.boardResults[i] === 'won' ? 'env-won' : 'env-lost';
    return `
    <div class="mera-envelope ${cls}" id="fp-env-${i}" data-idx="${i}" style="cursor:pointer;transition:transform 0.2s,box-shadow 0.2s,outline 0.15s">
      <div class="mera-envelope-card">📩</div>
      <div class="mera-envelope-num">Busta ${i + 1}</div>
      <div class="mera-envelope-val" id="fp-env-val-${i}"></div>
    </div>`;
  }).join('');

  cont.querySelectorAll('.mera-envelope').forEach(el => {
    el.addEventListener('click', () => pickFinalEnvelope(+el.dataset.idx));
  });
}

function _flipEnvelope(el, onHalfway) {
  const card = el.querySelector('.mera-envelope-card');
  card.classList.remove('flipping-env');
  void card.offsetWidth;
  card.classList.add('flipping-env');
  if (onHalfway) setTimeout(onHalfway, 185);
  card.addEventListener('animationend', () => card.classList.remove('flipping-env'), { once: true });
}

function pickFinalEnvelope(i) {
  const el  = document.getElementById(`fp-env-${i}`);
  const won = G.final.boardResults[i] === 'won';

  _flipEnvelope(el, () => {
    if (!el.classList.contains('env-revealed')) {
      el.classList.add('env-revealed');
      el.querySelector('.mera-envelope-card').textContent = won ? '✅' : '❌';
      document.getElementById(`fp-env-val-${i}`).textContent = fmt(G.final.prizes[i]);
    }
  });

  if (won) {
    document.querySelectorAll('#fp-envelopes .mera-envelope.env-won').forEach(e => e.classList.remove('env-selected'));
    G.final.selectedEnvIdx = i;
    el.classList.add('env-selected');
    document.getElementById('fp-btn-env-confirm').disabled = false;
  }
}

// ==================== PLAYERS SETUP ====================

function renderPlayerInputs() {
  const list = document.getElementById('players-list');
  list.innerHTML = '';
  G.players.forEach((_, i) => {
    const row = document.createElement('div');
    row.className = 'player-input-row';
    row.dataset.index = i;
    row.innerHTML = `
      <span class="player-num" style="color:${PLAYER_COLORS[i]}">${i + 1}</span>
      <input type="text" placeholder="Nome Giocatore ${i + 1}" maxlength="20" value="${G.players[i]}">
      ${i >= 2 ? `<button class="btn-remove" data-i="${i}" style="background:none;border:none;color:#ff6b6b;cursor:pointer;font-size:1.2rem">✕</button>` : ''}
    `;
    list.appendChild(row);
  });
  document.getElementById('btn-add-player').disabled = G.players.length >= 5;
}

// ==================== HELPERS ====================

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==================== EVENT LISTENERS ====================

function setupListeners() {

  // Splash
  document.getElementById('btn-start').onclick = () => {
    const prevPlayers = G && G.players && G.players.length >= 2 && G.players.some(p => p.trim())
      ? G.players : ['', ''];
    newGame(prevPlayers);
    renderPlayerInputs();
    showScreen('screen-players');
  };

  // Players screen
  document.getElementById('btn-add-player').onclick = () => {
    if (G.players.length >= 5) return;
    document.querySelectorAll('#players-list input').forEach((inp, i) => { G.players[i] = inp.value; });
    G.players.push('');
    renderPlayerInputs();
  };

  document.getElementById('players-list').addEventListener('click', e => {
    const btn = e.target.closest('.btn-remove');
    if (btn) {
      document.querySelectorAll('#players-list input').forEach((inp, i) => { G.players[i] = inp.value; });
      G.players.splice(+btn.dataset.i, 1);
      renderPlayerInputs();
    }
  });

  document.getElementById('btn-play').onclick = () => {
    const inputs = document.querySelectorAll('#players-list input');
    const names = [...inputs].map(i => i.value.trim() || `Giocatore ${+i.closest('.player-input-row').dataset.index + 1}`);
    const err = document.getElementById('players-error');
    if (names.length < 2) { err.textContent = 'Servono almeno 2 giocatori!'; return; }
    err.textContent = '';
    G.players = names;
    G.scores  = names.map(() => 0);
    G.firstPlayerNextRound = 0;
    G.currentPlayer = 0;
    G.currentRound  = 0;
    showRoundIntro();
  };

  // Round intro
  document.getElementById('btn-start-round').onclick = startRound;

  // Canvas click = spin
  document.getElementById('wheel-canvas').addEventListener('click', () => {
    if (!document.getElementById('btn-spin').disabled) spinWheel();
  });

  // Buy vowel
  document.getElementById('btn-buy-vowel').onclick = buyVowel;

  // Solve
  document.getElementById('btn-solve').onclick = openSolvePanel;
  document.getElementById('btn-confirm-solve').onclick = confirmSolve;
  document.getElementById('btn-cancel-solve').onclick  = closeSolvePanel;
  document.getElementById('solve-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmSolve();
    if (e.key === 'Escape') closeSolvePanel();
  });

  // Quick solve
  document.getElementById('btn-quick-solve').onclick = () => {
    if (G.phase === 'BONUS_SOLVE') { submitBonusSolve(); return; }
    submitQuickAnswer();
  };
  document.getElementById('quick-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (G.phase === 'BONUS_SOLVE') submitBonusSolve();
      else submitQuickAnswer();
    }
  });

  // GiraMondo
  document.getElementById('btn-buzz').onclick = gmBuzzIn;
  document.getElementById('btn-giramondo-confirm').onclick = gmConfirmAnswer;
  document.getElementById('giramondo-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') gmConfirmAnswer();
  });

  // Giro Gerry
  document.getElementById('btn-gerry').onclick = doGiroGerry;

  // Bonus confirm
  document.getElementById('btn-bonus-confirm').onclick = confirmBonusLetters;

  // Final game
  document.getElementById('mera-canvas').addEventListener('click', spinMeraviglieWheel);
  document.getElementById('btn-mera-go').onclick = beginFinalBoards;
  document.getElementById('fp-btn-confirm-letters').onclick = confirmFinalLetters;
  document.getElementById('fp-btn-pause').onclick = toggleFinalTimerPause;
  document.getElementById('fp-btn-open-solve').onclick = () => {
    if (G.final.timerInterval) { clearInterval(G.final.timerInterval); G.final.timerInterval = null; }
    stopFinalMusic();
    document.getElementById('fp-btn-pause').style.display  = 'none';
    document.getElementById('fp-action-btns').style.display = 'none';
    document.getElementById('fp-solve-wrap').style.display  = 'flex';
    document.getElementById('fp-solve-input').value = '';
    document.getElementById('fp-solve-input').focus();
  };
  document.getElementById('fp-btn-pass').onclick = () => { playBuzzer(); failAndProceedFinalBoard(); };
  document.getElementById('fp-btn-solve').onclick = submitFinalSolve;
  document.getElementById('fp-solve-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitFinalSolve();
  });
  document.getElementById('fp-btn-env-confirm').onclick = () => {
    const chosen = G.final.selectedEnvIdx;
    const prize  = (chosen >= 0 && G.final.boardResults[chosen] === 'won') ? G.final.prizes[chosen] : 0;
    G.final.totalWon = prize;
    document.getElementById('fp-btn-env-confirm').disabled = true;

    const unrevealed = [];
    for (let j = 0; j < 3; j++) {
      if (!document.getElementById(`fp-env-${j}`).classList.contains('env-revealed')) unrevealed.push(j);
    }

    const revealNext = (idx) => {
      if (idx >= unrevealed.length) {
        setTimeout(() => {
          startSiglaMusic();
          const winnerIdx = G.final.winnerIdx;
          const total = G.final.totalWon || 0;
          document.querySelector('.crown-anim').textContent  = total > 0 ? '🏆' : '😔';
          document.querySelector('.end-title').textContent   = total > 0 ? 'CAMPIONE!' : 'PECCATO!';
          document.querySelector('.end-title').style.color   = total > 0 ? '' : '#ff6b6b';
          G.scores[winnerIdx] += total;
          document.getElementById('winner-name').textContent  = G.players[winnerIdx];
          document.getElementById('winner-prize').textContent = total > 0 ? fmt(total) : 'Nessun premio';
          document.getElementById('end-scores').innerHTML = G.players.map((p, k) =>
            `<div>${p}: ${fmt(G.scores[k])}</div>`).join('');
          showScreen('screen-end');
        }, 500);
        return;
      }
      const j  = unrevealed[idx];
      const el = document.getElementById(`fp-env-${j}`);
      const w  = G.final.boardResults[j] === 'won';
      _flipEnvelope(el, () => {
        el.classList.add('env-revealed');
        el.querySelector('.mera-envelope-card').textContent = w ? '✅' : '❌';
        document.getElementById(`fp-env-val-${j}`).textContent = fmt(G.final.prizes[j]);
      });
      setTimeout(() => revealNext(idx + 1), 620);
    };

    revealNext(0);
  };
  document.getElementById('fp-btn-env-ok').onclick = () => {
    const winnerIdx = G.final.winnerIdx;
    const total = G.final.totalWon || 0;
    document.querySelector('.crown-anim').textContent  = total > 0 ? '🏆' : '😔';
    document.querySelector('.end-title').textContent   = total > 0 ? 'CAMPIONE!' : 'PECCATO!';
    document.querySelector('.end-title').style.color   = total > 0 ? '' : '#ff6b6b';
    G.scores[winnerIdx] += total;
    document.getElementById('winner-name').textContent  = G.players[winnerIdx];
    document.getElementById('winner-prize').textContent = total > 0 ? fmt(total) : 'Nessun premio';
    document.getElementById('end-scores').innerHTML = G.players.map((p, i) =>
      `<div>${p}: ${fmt(G.scores[i])}</div>`).join('');
    showScreen('screen-end');
  };

  // Restart
  document.getElementById('btn-restart').onclick = () => {
    showScreen('screen-splash');
    startSiglaMusic();
  };

  document.getElementById('btn-skip-round').onclick = () => {
    if (!G) return;
    stopFastMusic();
    stopRoundMusic();
    stopExpressMusic();
    stopTimer();
    if (G.gerryTimeout) { clearTimeout(G.gerryTimeout); G.gerryTimeout = null; }
    if (G.bonusTimerInterval) { clearInterval(G.bonusTimerInterval); G.bonusTimerInterval = null; }
    if (G.gmTimer) { clearInterval(G.gmTimer); G.gmTimer = null; }
    document.getElementById('giramondo-panel').style.display    = 'none';
    document.getElementById('bonus-select-panel').style.display = 'none';
    document.getElementById('quick-panel').style.display        = 'none';
    document.getElementById('solve-panel').style.display        = 'none';
    document.getElementById('fp-timer-display').style.display   = 'none';
    G.phase = 'DONE';
    G.currentRound++;
    if (G.currentRound >= ROUNDS.length) { endGame(); return; }
    if (ROUNDS[G.currentRound - 1].n === 5) {
      G.bonusThenContinue = true;
      showModal('🎲', 'RADDOPPIA!',
        `${G.players[G.firstPlayerNextRound]} ha vinto il round!\nScegli 4 consonanti e 1 vocale, poi hai 10 secondi per raddoppiare!`,
        () => startBonusRound());
      return;
    }
    showRoundIntro();
  };
}

// ==================== INIT ====================

(function init() {
  setupListeners();
  drawWheel(0);
  // I browser bloccano l'autoplay finché non c'è un gesto utente.
  // Al primo click: sblocca l'AudioContext e avvia la sigla se siamo ancora sullo splash.
  // Primo gesto utente → sblocca AudioContext e avvia la sigla
  document.addEventListener('click', function onFirstGesture() {
    audioCtx.resume().then(() => {
      if (!siglaMusicNode) startSiglaMusic();
    }).catch(() => {});
  }, { once: true, passive: true });
})();
