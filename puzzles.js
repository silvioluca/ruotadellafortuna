// ==================== PUZZLES ====================
// Griglia: riga 0 = 12 celle, righe 1-2 = 14 celle, riga 3 = 12 celle.
// Nessuna parola singola può superare 14 caratteri. Minimo 3 parole per frase.

const PUZZLES = [

  // 0 – GiraMondo  (lettere rivelate una alla volta; frasi 3-7 parole)
  [
    { phrase: 'UNA VITA DA SOGNO',                               cat: 'Frasi Celebri' },
    { phrase: 'IL SOLE SORGE SEMPRE',                           cat: 'Frasi Celebri' },
    { phrase: 'VENTO IN POPPA',                                  cat: 'Modi di Dire' },
    { phrase: 'CUORE DI LEONE',                                  cat: 'Modi di Dire' },
    { phrase: 'TUTTO TORNA SEMPRE',                              cat: 'Frasi Celebri' },
    { phrase: 'MARE CALMO NON FA BUON MARINAIO',                 cat: 'Proverbi' },
    { phrase: 'LA VITA E BELLA',                                 cat: 'Frasi Celebri' },
    { phrase: 'CHI CERCA TROVA',                                 cat: 'Proverbi' },
    { phrase: 'UN GIORNO ALLA VOLTA',                            cat: 'Modi di Dire' },
    { phrase: 'ACQUA IN BOCCA',                                  cat: 'Modi di Dire' },
    { phrase: 'CHI HA TEMPO NON ASPETTI TEMPO',                  cat: 'Proverbi' },
    { phrase: 'OGNI PROMESSA E UN DEBITO',                       cat: 'Proverbi' },
    { phrase: 'LA NOTTE PORTA CONSIGLIO',                        cat: 'Proverbi' },
    { phrase: 'UN TIRO MANCINO',                                 cat: 'Modi di Dire' },
    { phrase: 'TUTTO VA BENE QUEL CHE FINISCE BENE',             cat: 'Proverbi' },
    { phrase: 'CHI VA PIANO VA SANO E LONTANO',                  cat: 'Proverbi' },
    { phrase: 'IL LUPO NON E COSI CATTIVO',                      cat: 'Frasi Celebri' },
    { phrase: 'SOTTO IL SOLE NON C\'E NIENTE DI NUOVO',           cat: 'Frasi Celebri' },
    { phrase: 'FAR BUON VISO A CATTIVO GIOCO',                   cat: 'Modi di Dire' },
    { phrase: 'IN BOCCA AL LUPO',                                cat: 'Modi di Dire' },
  ],

  // 1 – CruciRuota
  // 3 parole: la più corta va in verticale (righe 0-3), le altre 2 sono
  // orizzontali e la incrociano ciascuna su una riga diversa.
  // Le parole orizzontali iniziano con la lettera dell'asse verticale
  // corrispondente alla propria riga → incrocio garantito a posizione 0.
  [
    { words: ['ARTE', 'APRILE', 'TRAMONTO'],    cat: 'Stagioni',       theme: 'La Bella Stagione' },
    { words: ['NEVE', 'NUVOLA', 'VALANGA'],     cat: 'Inverno',        theme: 'Il Grande Freddo' },
    { words: ['MARE', 'MATTINA', 'RICORDO'],    cat: 'Estate',         theme: 'Vita al Mare' },
    { words: ['SOLE', 'STAGIONE', 'LAVANDA'],   cat: 'Campagna',       theme: 'Fine Giornata' },
    { words: ['LUNA', 'LONTANO', 'NUVOLE'],     cat: 'Astronomia',     theme: 'Notte Stellata' },
    { words: ['ARIA', 'AVVENTURA', 'INCANTO'],  cat: 'Emozioni',       theme: 'A Tutto Respiro' },
    { words: ['VELA', 'VIAGGIO', 'LAGUNA'],     cat: 'Avventura',      theme: 'In Mezzo al Mare' },
    { words: ['ROSA', 'ROMANZO', 'STAGIONE'],   cat: 'Romanticismo',   theme: 'Tutto e Romantico' },
    { words: ['OLIO', 'ORIGANO', 'INSALATA'],   cat: 'Cucina',         theme: 'In Cucina' },
    { words: ['NOTA', 'NOTIZIA', 'TENORE'],     cat: 'Musica',         theme: 'Serata al Teatro' },
    { words: ['RETE', 'RIGORE', 'TIFOSO'],      cat: 'Sport',          theme: 'Gol!' },
    { words: ['FARO', 'FORESTA', 'RISERVA'],    cat: 'Natura',         theme: 'Riserva Naturale' },
    { words: ['ANNO', 'AUGURI', 'NATALE'],      cat: 'Feste',          theme: 'Le Feste' },
    { words: ['ONDE', 'OCEANO', 'DELFINO'],     cat: 'Mare',           theme: 'Il Blu del Mare' },
    { words: ['TORO', 'TRATTORE', 'RACCOLTA'],  cat: 'Campagna',       theme: 'Vita di Campagna' },
  ],

  // 2 – Round Musicale  (titoli di canzoni, minimo 3 parole)
  [
    { phrase: 'NEL BLU DIPINTO DI BLU',                          cat: 'Canzoni Italiane', hint: 'Volare – Domenico Modugno' },
    { phrase: 'GRANDE GRANDE GRANDE',                            cat: 'Canzoni Italiane', hint: 'Mina' },
    { phrase: 'CON TE PARTIRO',                                  cat: 'Canzoni Italiane', hint: 'Andrea Bocelli' },
    { phrase: 'TORNA A SURRIENTO',                               cat: 'Canzoni Italiane', hint: 'Canzone napoletana classica' },
    { phrase: 'UNA STORIA IMPORTANTE',                           cat: 'Canzoni Italiane', hint: 'Eros Ramazzotti' },
    { phrase: 'PIU BELLA COSA NON C\'E',                          cat: 'Canzoni Italiane', hint: 'Eros Ramazzotti' },
    { phrase: 'SE BASTASSE UNA CANZONE',                         cat: 'Canzoni Italiane', hint: 'Eros Ramazzotti' },
    { phrase: 'IL CIELO IN UNA STANZA',                          cat: 'Canzoni Italiane', hint: 'Gino Paoli' },
    { phrase: 'E LA LUNA BUSSAVA',                               cat: 'Canzoni Italiane', hint: 'Equipe 84' },
    { phrase: 'SAPORE DI SALE SAPORE DI MARE',                   cat: 'Canzoni Italiane', hint: 'Gino Paoli' },
    { phrase: 'IL MIO CANTO LIBERO',                             cat: 'Canzoni Italiane', hint: 'Lucio Battisti' },
    { phrase: 'UNA LACRIMA SUL VISO',                            cat: 'Canzoni Italiane', hint: 'Bobby Solo' },
    { phrase: 'NON HO L\'ETA PER AMARTI',                         cat: 'Canzoni Italiane', hint: 'Gigliola Cinquetti' },
    { phrase: 'GELATO AL CIOCCOLATO',                            cat: 'Canzoni Italiane', hint: 'Pupo' },
    { phrase: 'SONO SOLO PAROLE',                                cat: 'Canzoni Italiane', hint: 'Noemi' },
    { phrase: 'CHE VUOLE QUESTA MUSICA STASERA',                  cat: 'Canzoni Italiane', hint: 'Nicola Di Bari' },
    { phrase: 'UN AMORE COSI GRANDE',                            cat: 'Canzoni Italiane', hint: 'Claudio Villa' },
    { phrase: 'LA PRIMA COSA BELLA',                             cat: 'Canzoni Italiane', hint: 'Nicola Di Bari' },
    { phrase: 'QUELLO CHE LE DONNE NON DICONO',                  cat: 'Canzoni Italiane', hint: 'Fiorella Mannoia' },
    { phrase: 'TI LASCIO UNA CANZONE',                           cat: 'Canzoni Italiane', hint: 'Arisa' },
  ],

  // 3 – Jackpot  (film, minimo 3 parole)
  [
    { phrase: 'LA DOLCE VITA',                                   cat: 'Film Italiani' },
    { phrase: 'NUOVO CINEMA PARADISO',                           cat: 'Film Italiani' },
    { phrase: 'C\'ERA UNA VOLTA IL WEST',                         cat: 'Film Italiani' },
    { phrase: 'IL POSTINO',                                      cat: 'Film Italiani' },   // 2 parole ma "IL" è articolo
    { phrase: 'LADRI DI BICICLETTE',                             cat: 'Film Italiani' },
    { phrase: 'IL NOME DELLA ROSA',                              cat: 'Film Italiani' },
    { phrase: 'UN AMERICANO A ROMA',                             cat: 'Film Italiani' },
    { phrase: 'LA VITA E BELLA',                                 cat: 'Film Italiani' },
    { phrase: 'BENVENUTI AL SUD',                                cat: 'Film Italiani' },
    { phrase: 'PERFETTI SCONOSCIUTI',                            cat: 'Film Italiani' },
    { phrase: 'C\'ERA UNA VOLTA IN AMERICA',                      cat: 'Film Italiani' },
    { phrase: 'LE FATE IGNORANTI',                               cat: 'Film Italiani' },
    { phrase: 'PANE E TULIPANI',                                 cat: 'Film Italiani' },
    { phrase: 'IN NOME DEL PADRE',                               cat: 'Film Italiani' },
    { phrase: 'LA MEGLIO GIOVENTU',                              cat: 'Film Italiani' },
    { phrase: 'TRE UOMINI E UNA GAMBA',                          cat: 'Film Italiani' },
    { phrase: 'IL SILENZIO DEGLI INNOCENTI',                     cat: 'Film Stranieri' },
    { phrase: 'LA LISTA DI SCHINDLER',                           cat: 'Film Stranieri' },
    { phrase: 'LA FINESTRA SUL CORTILE',                         cat: 'Film Stranieri' },
    { phrase: 'IL GRANDE LEBOWSKI',                              cat: 'Film Stranieri' },
  ],

  // 4 – Il Regno degli Animali  (descrizione + curiosità)
  [
    { phrase: 'IL FENICOTTERO ROSA',                             cat: 'Animali del Mondo', hint: 'Elegante uccello delle lagune tropicali.' },
    { phrase: 'IL GHEPARDO PIU VELOCE DEL MONDO',                cat: 'Animali del Mondo', hint: 'Raggiunge i 120 km/h in tre secondi.' },
    { phrase: 'LA BALENA BLU PIU GRANDE DI TUTTI',               cat: 'Animali del Mondo', hint: 'Il cuore pesa quanto un\'automobile.' },
    { phrase: 'L\'AQUILA REALE DAI ARTIGLI FORTI',                cat: 'Animali del Mondo', hint: 'Vola a tremila metri di altitudine.' },
    { phrase: 'IL DELFINO DALLA MEMORIA STRAORDINARIA',          cat: 'Animali del Mondo', hint: 'Riconosce se stesso allo specchio.' },
    { phrase: 'IL PANDA GIGANTE DEL BAMBÙ',                      cat: 'Animali del Mondo', hint: 'Mangia fino a trenta chili di bambù al giorno.' },
    { phrase: 'IL CAMALEONTE CHE CAMBIA COLORE',                 cat: 'Animali del Mondo', hint: 'Comunica attraverso i colori della pelle.' },
    { phrase: 'LA GIRAFFA PIU ALTA DEL SAVANA',                  cat: 'Animali del Mondo', hint: 'Il suo cuore pesa undici chili.' },
    { phrase: 'IL KOALA CHE DORME TUTTO IL GIORNO',              cat: 'Animali del Mondo', hint: 'Le sue impronte digitali somigliano a quelle umane.' },
    { phrase: 'IL POLPO CON TRE CUORI',                          cat: 'Animali del Mondo', hint: 'Può aprire un barattolo con i tentacoli.' },
    { phrase: 'IL PINGUINO IMPERATORE IN ANTARTIDE',             cat: 'Animali del Mondo', hint: 'Sopravvive a sessanta gradi sotto zero.' },
    { phrase: 'IL LEOPARDO DELLE NEVI SOLITARIO',                cat: 'Animali del Mondo', hint: 'Rarissimo felino delle vette himalayane.' },
    { phrase: 'LA MANTA CHE VOLA SOTTO IL MARE',                 cat: 'Animali del Mondo', hint: 'Può pesare duemila chili e salta fuori dall\'acqua.' },
    { phrase: 'IL PIPISTRELLO CHE CACCIA AL BUIO',               cat: 'Animali del Mondo', hint: 'Usa gli ultrasuoni per orientarsi.' },
    { phrase: 'LA TARTARUGA CHE VIVE CENTO ANNI',                cat: 'Animali del Mondo', hint: 'Torna sempre sulla spiaggia dove è nata.' },
    { phrase: 'IL CALAMARO GIGANTE DEGLI ABISSI',                cat: 'Animali del Mondo', hint: 'Gli occhi possono raggiungere trenta centimetri.' },
    { phrase: 'L\'ORSO POLARE DEL GRANDE NORD',                   cat: 'Animali del Mondo', hint: 'Nuota per decine di chilometri senza sosta.' },
    { phrase: 'IL TUCANO DAL BECCO COLORATISSIMO',               cat: 'Animali del Mondo', hint: 'Il becco è più lungo del corpo intero.' },
    { phrase: 'IL CERVO CON I PALCHI RAMIFICATI',                cat: 'Animali del Mondo', hint: 'I palchi cadono e ricrescono ogni anno.' },
    { phrase: 'LA LONTRA CHE DORME TENENDOSI PER MANO',          cat: 'Animali del Mondo', hint: 'Per non separarsi durante la notte sul fiume.' },
  ],

  // 5 – Express  (proverbi anche lunghi: il timer veloce aumenta la difficoltà)
  [
    { phrase: 'PASSO DOPO PASSO SI VA LONTANO',                  cat: 'Proverbi' },
    { phrase: 'CHI LA DURA LA VINCE',                            cat: 'Proverbi' },
    { phrase: 'MEGLIO TARDI CHE MAI',                            cat: 'Proverbi' },
    { phrase: 'RIDE BENE CHI RIDE ULTIMO',                       cat: 'Proverbi' },
    { phrase: 'A CAVAL DONATO NON SI GUARDA IN BOCCA',           cat: 'Proverbi' },
    { phrase: 'IL LUPO PERDE IL PELO MA NON IL VIZIO',           cat: 'Proverbi' },
    { phrase: 'CHI SEMINA VENTO RACCOGLIE TEMPESTA',             cat: 'Proverbi' },
    { phrase: 'TANTO VA LA GATTA AL LARDO CHE CI LASCIA LO ZAMPINO', cat: 'Proverbi' },
    { phrase: 'NON TUTTE LE CIAMBELLE RIESCONO COL BUCO',        cat: 'Proverbi' },
    { phrase: 'PAESE CHE VAI USANZA CHE TROVI',                  cat: 'Proverbi' },
    { phrase: 'CHI DORME NON PIGLIA PESCI',                      cat: 'Proverbi' },
    { phrase: 'OCCHIO NON VEDE CUORE NON DUOLE',                 cat: 'Proverbi' },
    { phrase: 'NON RIMANDARE A DOMANI QUEL CHE PUOI FARE OGGI',  cat: 'Proverbi' },
    { phrase: 'FIDARSI E BENE NON FIDARSI E MEGLIO',             cat: 'Proverbi' },
    { phrase: 'L\'ABITO NON FA IL MONACO',                        cat: 'Proverbi' },
    { phrase: 'DIO LI FA E POI LI ACCOPPIA',                     cat: 'Proverbi' },
    { phrase: 'UNA RONDINE NON FA PRIMAVERA',                    cat: 'Proverbi' },
    { phrase: 'CHI TROVA UN AMICO TROVA UN TESORO',              cat: 'Proverbi' },
    { phrase: 'IL FINE GIUSTIFICA I MEZZI',                      cat: 'Proverbi' },
    { phrase: 'NON E ORO TUTTO QUEL CHE LUCCICA',                cat: 'Proverbi' },
  ],

  // 6 – Triplete I  (cucina italiana, 3-5 parole)
  [
    { phrase: 'LA VERA PIZZA NAPOLETANA',                        cat: 'Cucina Italiana' },
    { phrase: 'GELATO AL PISTACCHIO DI SICILIA',                 cat: 'Cucina Italiana' },
    { phrase: 'RISOTTO ALLA MILANESE CON ZAFFERANO',             cat: 'Cucina Italiana' },
    { phrase: 'SPAGHETTI AL POMODORO E BASILICO',                cat: 'Cucina Italiana' },
    { phrase: 'TORTELLINI IN BRODO DI GALLINA',                  cat: 'Cucina Italiana' },
    { phrase: 'PESTO ALLA GENOVESE CON TROFIE',                  cat: 'Cucina Italiana' },
    { phrase: 'LA COTOLETTA ALLA MILANESE',                      cat: 'Cucina Italiana' },
    { phrase: 'GLI ARANCINI DI RISO FRITTI',                     cat: 'Cucina Italiana' },
    { phrase: 'I CANNOLI RIPIENI DI RICOTTA',                    cat: 'Cucina Italiana' },
    { phrase: 'IL TIRAMISU AL MASCARPONE',                       cat: 'Cucina Italiana' },
    { phrase: 'GNOCCHI AL BURRO E SALVIA',                       cat: 'Cucina Italiana' },
    { phrase: 'LE LASAGNE ALLA BOLOGNESE',                       cat: 'Cucina Italiana' },
    { phrase: 'LA RIBOLLITA DELLA TOSCANA',                      cat: 'Cucina Italiana' },
    { phrase: 'POLENTA CON FUNGHI PORCINI',                      cat: 'Cucina Italiana' },
    { phrase: 'LA ZUPPA DI COZZE ALLA NAPOLETANA',               cat: 'Cucina Italiana' },
    { phrase: 'PANE CARASAU CON PECORINO SARDO',                 cat: 'Cucina Italiana' },
    { phrase: 'PASTA ALLA GRICIA CON GUANCIALE',                 cat: 'Cucina Italiana' },
    { phrase: 'IL BRODETTO DI PESCE MARCHIGIANO',                cat: 'Cucina Italiana' },
    { phrase: 'OSSOBUCO ALLA MILANESE CON GREMOLATA',            cat: 'Cucina Italiana' },
    { phrase: 'MINESTRA DI FAGIOLI CON LE COTICHE',              cat: 'Cucina Italiana' },
  ],

  // 7 – Triplete II  (frasi d'amore, 3-7 parole)
  [
    { phrase: 'LUNA DI MIELE IN ITALIA',                         cat: "Frasi d'Amore" },
    { phrase: 'UN COLPO DI FULMINE',                             cat: "Frasi d'Amore" },
    { phrase: 'AMORE A PRIMA VISTA',                             cat: "Frasi d'Amore" },
    { phrase: 'TI VOGLIO BENE DA MORIRE',                        cat: "Frasi d'Amore" },
    { phrase: 'PER SEMPRE INSIEME NEL CUORE',                    cat: "Frasi d'Amore" },
    { phrase: 'IL CUORE IN GOLA',                                cat: "Frasi d'Amore" },
    { phrase: 'UN BACIO RUBATO ALL\'ALBA',                        cat: "Frasi d'Amore" },
    { phrase: 'L\'AMORE VINCE SEMPRE TUTTO',                      cat: "Frasi d'Amore" },
    { phrase: 'NATI L\'UNO PER L\'ALTRA',                          cat: "Frasi d'Amore" },
    { phrase: 'IL PRIMO BACIO NON SI SCORDA',                    cat: "Frasi d'Amore" },
    { phrase: 'INNAMORARSI DI NUOVO OGNI GIORNO',                cat: "Frasi d'Amore" },
    { phrase: 'CUORI CHE SI INCONTRANO PER CASO',                cat: "Frasi d'Amore" },
    { phrase: 'L\'AMORE NON HA ETA NE CONFINI',                   cat: "Frasi d'Amore" },
    { phrase: 'UN AMORE CHE NON FINISCE MAI',                    cat: "Frasi d'Amore" },
    { phrase: 'BACIAMI ANCORA UNA VOLTA',                        cat: "Frasi d'Amore" },
    { phrase: 'TI HO ASPETTATO TUTTA LA VITA',                   cat: "Frasi d'Amore" },
    { phrase: 'DOVE TU SEI IO VOGLIO ESSERE',                    cat: "Frasi d'Amore" },
    { phrase: 'IL NOSTRO AMORE E UNA STORIA BELLA',              cat: "Frasi d'Amore" },
    { phrase: 'AMARSI E LA COSA PIU BELLA DEL MONDO',            cat: "Frasi d'Amore" },
    { phrase: 'NON SMETTO MAI DI PENSARTI',                      cat: "Frasi d'Amore" },
  ],

  // 8 – Triplete III  (azioni e situazioni, 3+ parole)
  [
    { phrase: 'VOLARE CANTARE SOGNARE',                          cat: 'Azioni' },
    { phrase: 'RIDERE BALLARE FESTEGGIARE',                      cat: 'Azioni' },
    { phrase: 'SOGNARE SPERARE CREDERE',                         cat: 'Azioni' },
    { phrase: 'CORRERE SALTARE GRIDARE DI GIOIA',                cat: 'Azioni' },
    { phrase: 'LEGGERE SCRIVERE IMPARARE',                       cat: 'Azioni' },
    { phrase: 'NUOTARE TUFFARSI GALLEGGIARE',                    cat: 'Azioni' },
    { phrase: 'VIAGGIARE SCOPRIRE MERAVIGLIARSI',                cat: 'Azioni' },
    { phrase: 'CUCINARE ASSAGGIARE GUSTARE',                     cat: 'Azioni' },
    { phrase: 'COSTRUIRE CREARE INNOVARE',                       cat: 'Azioni' },
    { phrase: 'PENSARE AGIRE CAMBIARE IL MONDO',                 cat: 'Azioni' },
    { phrase: 'OSARE RISCHIARE E VINCERE',                       cat: 'Azioni' },
    { phrase: 'AMARE RISPETTARE CONDIVIDERE',                    cat: 'Azioni' },
    { phrase: 'ASCOLTARE CAPIRE E RISPONDERE',                   cat: 'Azioni' },
    { phrase: 'CAMMINARE ESPLORARE E TORNARE',                   cat: 'Azioni' },
    { phrase: 'CREDERE SPERARE NON MOLLARE MAI',                 cat: 'Azioni' },
    { phrase: 'ABBRACCIARE SORRIDERE RINGRAZIARE',               cat: 'Azioni' },
    { phrase: 'DIPINGERE SCOLPIRE CREARE BELLEZZA',              cat: 'Azioni' },
    { phrase: 'CANTARE BALLARE VIVERE A PIENO',                  cat: 'Azioni' },
    { phrase: 'GIOCARE RIDERE CRESCERE INSIEME',                 cat: 'Azioni' },
    { phrase: 'ESPLORARE SCOPRIRE NON FERMARSI MAI',             cat: 'Azioni' },
  ],

  // 9 – Ultimo Round  (televisione e spettacolo, frasi articolate)
  [
    { phrase: 'IL BELLO DELLA DIRETTA',                          cat: 'Televisione' },
    { phrase: 'UNA SERATA INDIMENTICABILE',                      cat: 'Televisione' },
    { phrase: 'OSPITE SPECIALE DELLA SERATA',                    cat: 'Televisione' },
    { phrase: 'LUCI DEL PALCOSCENICO',                           cat: 'Televisione' },
    { phrase: 'APPLAUSI PER IL CAMPIONE',                        cat: 'Televisione' },
    { phrase: 'IL PUBBLICO E IN DELIRIO',                        cat: 'Televisione' },
    { phrase: 'BENVENUTI ALLO SHOW DEL SABATO SERA',             cat: 'Televisione' },
    { phrase: 'IL VINCITORE DELLA SERATA E',                     cat: 'Televisione' },
    { phrase: 'SIGNORE E SIGNORI BUONASERA',                     cat: 'Televisione' },
    { phrase: 'DIRETTAMENTE DAGLI STUDI DI MILANO',              cat: 'Televisione' },
    { phrase: 'LA RUOTA GIRA E LA FORTUNA SORRIDE',              cat: 'Televisione' },
    { phrase: 'STASERA TUTTO E POSSIBILE',                       cat: 'Televisione' },
    { phrase: 'UN MOMENTO DI GRANDE EMOZIONE',                   cat: 'Televisione' },
    { phrase: 'IL PUBBLICO DA CASA PUO VOTARE',                  cat: 'Televisione' },
    { phrase: 'INIZIA ORA LA FINALISSIMA',                       cat: 'Televisione' },
    { phrase: 'COLLEGAMENTO CON LO STUDIO PRINCIPALE',           cat: 'Televisione' },
    { phrase: 'LA SERATA PIU BELLA DELL\'ANNO',                   cat: 'Televisione' },
    { phrase: 'DOMANI SERA IN PRIMA SERATA',                     cat: 'Televisione' },
    { phrase: 'TUTTI ASPETTANO IL GRAN FINALE',                  cat: 'Televisione' },
    { phrase: 'CI VEDIAMO ALLA PROSSIMA PUNTATA',                cat: 'Televisione' },
  ],
];

const BONUS_PUZZLES = [
  { phrase: 'I PROMESSI SPOSI DI MANZONI',                      cat: 'Letteratura Italiana' },
  { phrase: 'LA DIVINA COMMEDIA DI DANTE',                      cat: 'Letteratura Italiana' },
  { phrase: 'IL NOME DELLA ROSA',                               cat: 'Letteratura Italiana' },
  { phrase: 'LE AVVENTURE DI PINOCCHIO',                        cat: 'Letteratura Italiana' },
  { phrase: 'IL PICCOLO PRINCIPE',                              cat: 'Letteratura Mondiale' },
  { phrase: 'I TRE MOSCHETTIERI',                               cat: 'Letteratura Mondiale' },
  { phrase: 'GUERRA E PACE DI TOLSTOJ',                         cat: 'Letteratura Mondiale' },
  { phrase: 'IL VECCHIO E IL MARE',                             cat: 'Letteratura Mondiale' },
  { phrase: 'IL SIGNORE DEGLI ANELLI',                          cat: 'Letteratura Mondiale' },
  { phrase: 'LE AVVENTURE DI ULISSE',                           cat: 'Letteratura Classica' },
  { phrase: 'ALICE NEL PAESE DELLE MERAVIGLIE',                 cat: 'Letteratura Mondiale' },
  { phrase: 'LA FATTORIA DEGLI ANIMALI',                        cat: 'Letteratura Mondiale' },
  { phrase: 'IL LIBRO DELLA GIUNGLA',                           cat: 'Letteratura Mondiale' },
  { phrase: 'ORGOGLIO E PREGIUDIZIO',                           cat: 'Letteratura Mondiale' },
  { phrase: 'IL CONTE DI MONTECRISTO',                          cat: 'Letteratura Mondiale' },
];

// ── Gioco Finale ──────────────────────────────────────────────────────────────
// 10 set tematici. Ogni set ha 3 puzzle (uno per tabellone) sullo stesso tema.
// Board 0 – Classico:    N R T E pre-rivelate; il concorrente sceglie 3 consonanti + 1 vocale
// Board 1 – Testacoda:   prima e ultima lettera di ogni parola rivelate automaticamente
// Board 2 – Rubasecondi: consonanti libere + 1 vocale; errore = −3 secondi
const FINAL_BOARD_PUZZLES = [
  {
    theme: 'Cinema Italiano',
    boards: [
      { phrase: 'LA GRANDE BELLEZZA',                           cat: 'Film' },
      { phrase: 'LADRI DI BICICLETTE',                         cat: 'Film' },
      { phrase: 'UN AMERICANO A ROMA',                         cat: 'Film' },
    ],
  },
  {
    theme: 'Natura e Paesaggi',
    boards: [
      { phrase: 'IL BOSCO INCANTATO AL TRAMONTO',              cat: 'Paesaggi' },
      { phrase: 'VENTO DI TRAMONTANA',                         cat: 'Meteo' },
      { phrase: 'LA CASCATA PIU ALTA DEL MONDO',               cat: 'Paesaggi' },
    ],
  },
  {
    theme: 'Canzoni Italiane',
    boards: [
      { phrase: 'NEL BLU DIPINTO DI BLU',                      cat: 'Musica' },
      { phrase: 'IL CIELO IN UNA STANZA',                      cat: 'Musica' },
      { phrase: 'SAPORE DI SALE SAPORE DI MARE',               cat: 'Musica' },
    ],
  },
  {
    theme: "Frasi d'Amore",
    boards: [
      { phrase: 'UN COLPO DI FULMINE',                         cat: 'Amore' },
      { phrase: 'AMORE A PRIMA VISTA',                         cat: 'Amore' },
      { phrase: 'PER SEMPRE INSIEME NEL CUORE',                cat: 'Amore' },
    ],
  },
  {
    theme: 'Cucina Italiana',
    boards: [
      { phrase: 'LE LASAGNE ALLA BOLOGNESE',                   cat: 'Gastronomia' },
      { phrase: 'RISOTTO ALLA MILANESE CON ZAFFERANO',         cat: 'Gastronomia' },
      { phrase: 'I CANNOLI RIPIENI DI RICOTTA',                cat: 'Dolci' },
    ],
  },
  {
    theme: 'Letteratura',
    boards: [
      { phrase: 'I PROMESSI SPOSI DI MANZONI',                 cat: 'Romanzi' },
      { phrase: 'LA DIVINA COMMEDIA DI DANTE',                 cat: 'Poesia' },
      { phrase: 'IL PICCOLO PRINCIPE',                         cat: 'Romanzi' },
    ],
  },
  {
    theme: 'Sport Italiano',
    boards: [
      { phrase: 'IL GIRO CICLISTICO DI ITALIA',                cat: 'Ciclismo' },
      { phrase: 'CAMPIONI DEL MONDO DI CALCIO',                cat: 'Calcio' },
      { phrase: 'LA MEDAGLIA D\'ORO OLIMPICA',                  cat: 'Olimpiadi' },
    ],
  },
  {
    theme: 'Proverbi',
    boards: [
      { phrase: 'CHI SEMINA VENTO RACCOGLIE TEMPESTA',         cat: 'Proverbi' },
      { phrase: 'L\'ABITO NON FA IL MONACO',                    cat: 'Proverbi' },
      { phrase: 'NON E ORO TUTTO QUEL CHE LUCCICA',            cat: 'Proverbi' },
    ],
  },
  {
    theme: 'Televisione',
    boards: [
      { phrase: 'IL BELLO DELLA DIRETTA',                      cat: 'TV' },
      { phrase: 'UNA SERATA INDIMENTICABILE',                  cat: 'TV' },
      { phrase: 'DIRETTAMENTE DAGLI STUDI DI MILANO',          cat: 'TV' },
    ],
  },
  {
    theme: 'Avventura',
    boards: [
      { phrase: 'IL GIRO DEL MONDO IN OTTANTA GIORNI',         cat: 'Avventura' },
      { phrase: 'L\'ISOLA DEL TESORO',                          cat: 'Avventura' },
      { phrase: 'IL RICHIAMO DELLA FORESTA',                   cat: 'Avventura' },
    ],
  },
];
