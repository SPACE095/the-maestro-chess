(() => {
  const files = "abcdefgh";

  const pieceSymbols = {
    wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔",
    bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚"
  };

  const wikiPieceImageUrls = {
    wp: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_plt45.svg",
    wn: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_nlt45.svg",
    wb: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_blt45.svg",
    wr: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_rlt45.svg",
    wq: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_qlt45.svg",
    wk: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_klt45.svg",
    bp: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_pdt45.svg",
    bn: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_ndt45.svg",
    bb: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_bdt45.svg",
    br: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_rdt45.svg",
    bq: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_qdt45.svg",
    bk: "https://commons.wikimedia.org/wiki/Special:FilePath/Chess_kdt45.svg"
  };

  const boardThemes = [
    { id: "classic", nameAr: "كلاسيك chess.com", nameEn: "Chess.com Classic" },
    { id: "green", nameAr: "أخضر chess.com", nameEn: "Chess.com Green" },
    { id: "wood", nameAr: "خشب فاتح", nameEn: "Light Wood" },
    { id: "blue", nameAr: "أزرق هادئ", nameEn: "Calm Blue" },
    { id: "brown", nameAr: "بني دافئ", nameEn: "Warm Brown" },
    { id: "gray", nameAr: "رمادي", nameEn: "Slate Gray" },
    { id: "emerald", nameAr: "أخضر احترافي", nameEn: "Emerald Pro" },
    { id: "slate", nameAr: "أزرق حجري", nameEn: "Slate Blue" },
    { id: "walnut", nameAr: "جوز داكن", nameEn: "Walnut Dark" },
    { id: "tournament", nameAr: "بطولات", nameEn: "Tournament" },
    { id: "midnight", nameAr: "ليلي", nameEn: "Midnight" },
    { id: "coral", nameAr: "مرجاني", nameEn: "Coral Sand" },
    { id: "ivory", nameAr: "عاجي", nameEn: "Ivory Stone" },
    { id: "obsidian", nameAr: "أوبسيديان", nameEn: "Obsidian" },
    { id: "rosewood", nameAr: "روزوود", nameEn: "Rosewood" },
    { id: "sunset", nameAr: "غروب", nameEn: "Sunset" },
    { id: "arctic", nameAr: "قطبي", nameEn: "Arctic Ice" }
  ];

  const pieceStyles = [
    { id: "cburnett", nameAr: "CBurnett", nameEn: "CBurnett", mode: "set" },
    { id: "merida", nameAr: "Merida", nameEn: "Merida", mode: "set" },
    { id: "alpha", nameAr: "Alpha", nameEn: "Alpha", mode: "set" },
    { id: "fresca", nameAr: "Fresca", nameEn: "Fresca", mode: "set" },
    { id: "pirouetti", nameAr: "Pirouetti", nameEn: "Pirouetti", mode: "set" },
    { id: "cardinal", nameAr: "Cardinal", nameEn: "Cardinal", mode: "set" },
    { id: "chessnut", nameAr: "Chessnut", nameEn: "Chessnut", mode: "set" },
    { id: "maestro", nameAr: "Maestro", nameEn: "Maestro", mode: "set" },
    { id: "wiki", nameAr: "Wikipedia", nameEn: "Wikipedia", mode: "wiki" },
    { id: "glyph", nameAr: "رموز بسيطة", nameEn: "Simple Glyph", mode: "glyph" },
    { id: "neo-glyph", nameAr: "Glyph حديث", nameEn: "Neo Glyph", mode: "glyph" },
    { id: "glass-glyph", nameAr: "Glyph زجاجي", nameEn: "Glass Glyph", mode: "glyph" }
  ];

  const pieceValue = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
  };

  const GRADE_SEVERITY = {
    gradeBrilliant: 0,
    gradeGreat: 1,
    gradeGood: 2,
    gradeInaccuracy: 3,
    gradeMistake: 4,
    gradeBlunder: 5
  };

  const materialUnitValue = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0
  };

  const capturePieceOrder = {
    q: 0,
    r: 1,
    b: 2,
    n: 3,
    p: 4,
    k: 5
  };

  const bots = [
    { id: "rookie-ray", icon: "🐣", name: "Rookie Ray", role: "Beginner", rating: 350, depth: 1, noise: 220, blunder: 0.35, aggression: 0.55, thinkMs: 260 },
    { id: "pawn-pilot", icon: "🧢", name: "Pawn Pilot", role: "Learning", rating: 550, depth: 1, noise: 180, blunder: 0.28, aggression: 0.62, thinkMs: 300 },
    { id: "fork-fox", icon: "🦊", name: "Fork Fox", role: "Tactics", rating: 750, depth: 1, noise: 140, blunder: 0.21, aggression: 0.8, thinkMs: 320 },
    { id: "bishop-blaze", icon: "🔥", name: "Bishop Blaze", role: "Aggressive", rating: 950, depth: 2, noise: 120, blunder: 0.18, aggression: 1.1, thinkMs: 430 },
    { id: "castle-guard", icon: "🛡️", name: "Castle Guard", role: "Solid", rating: 1150, depth: 2, noise: 95, blunder: 0.13, aggression: 0.75, thinkMs: 520 },
    { id: "queen-viper", icon: "🐍", name: "Queen Viper", role: "Sharp", rating: 1350, depth: 2, noise: 75, blunder: 0.1, aggression: 1.2, thinkMs: 620 },
    { id: "storm-knight", icon: "⚡", name: "Storm Knight", role: "Pressure", rating: 1600, depth: 2, noise: 50, blunder: 0.075, aggression: 1.05, thinkMs: 780 },
    { id: "iron-bot", icon: "🤖", name: "Iron Bot", role: "Advanced", rating: 1850, depth: 3, noise: 28, blunder: 0.045, aggression: 1.0, thinkMs: 980 },
    { id: "shadow-gm", icon: "🎯", name: "Shadow GM", role: "Expert", rating: 2050, depth: 3, noise: 16, blunder: 0.025, aggression: 0.95, thinkMs: 1250 },
    { id: "maestro-prime", icon: "👑", name: "Maestro Prime", role: "Elite", rating: 2250, depth: 4, noise: 10, blunder: 0.015, aggression: 1.02, thinkMs: 1500 },
    { id: "grandmaster-muse", icon: "🧠", name: "Grandmaster Muse", role: "Grandmaster", rating: 2450, depth: 4, noise: 8, blunder: 0.012, aggression: 1.08, thinkMs: 1680 },
    { id: "maestro-omega", icon: "⚜️", name: "Maestro Omega", role: "Legend", rating: 2600, depth: 4, noise: 6, blunder: 0.01, aggression: 1.1, thinkMs: 1900 }
  ];

  const COACH_PROFILE = {
    depth: 2,
    aggression: 1,
    noise: 0,
    blunder: 0
  };

  const PUZZLE_LEVELS = [
    { id: "beginner", min: 600, max: 950, labelKey: "puzzleLevelBeginner" },
    { id: "intermediate", min: 951, max: 1300, labelKey: "puzzleLevelIntermediate" },
    { id: "advanced", min: 1301, max: 1800, labelKey: "puzzleLevelAdvanced" },
    { id: "master", min: 1801, max: 2500, labelKey: "puzzleLevelMaster" },
    { id: "custom", min: 600, max: 2500, labelKey: "puzzleLevelCustom" }
  ];

  const STORAGE_KEY = "the_maestro_stats_v1";
  const LANG_KEY = "the_maestro_lang_v1";
  const VISUAL_KEY = "the_maestro_visual_v1";
  const TIME_KEY = "the_maestro_time_v1";
  const UX_KEY = "the_maestro_ux_v1";
  const MUSIC_TRACKS = [
    {
      id: "fur-elise",
      titleAr: "Beethoven - Fur Elise",
      titleEn: "Beethoven - Fur Elise",
      sources: [
        {
          type: "audio/mpeg",
          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8f/Fur_Elise.ogg/Fur_Elise.ogg.mp3"
        },
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Fur_Elise.ogg"
        }
      ]
    },
    {
      id: "beethoven-5",
      titleAr: "Beethoven - Symphony No.5 (I)",
      titleEn: "Beethoven - Symphony No.5 (I)",
      sources: [
        {
          type: "audio/mpeg",
          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5b/Ludwig_van_Beethoven_-_Symphonie_5_c-moll_-_1._Allegro_con_brio.ogg/Ludwig_van_Beethoven_-_Symphonie_5_c-moll_-_1._Allegro_con_brio.ogg.mp3"
        },
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ludwig_van_Beethoven_-_Symphonie_5_c-moll_-_1._Allegro_con_brio.ogg"
        }
      ]
    },
    {
      id: "beethoven-overture",
      titleAr: "Beethoven - Overture Op.62",
      titleEn: "Beethoven - Overture Op.62",
      sources: [
        {
          type: "audio/mpeg",
          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/41/Ludwig_van_Beethoven_-_Overt%C3%BCre_c-moll%2C_op._62.ogg/Ludwig_van_Beethoven_-_Overt%C3%BCre_c-moll%2C_op._62.ogg.mp3"
        },
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://upload.wikimedia.org/wikipedia/commons/4/41/Ludwig_van_Beethoven_-_Overt%C3%BCre_c-moll%2C_op._62.ogg"
        }
      ]
    },
    {
      id: "moonlight",
      titleAr: "Moonlight Sonata",
      titleEn: "Moonlight Sonata",
      sources: [
        {
          type: "audio/mpeg",
          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/34/Moonlight_Sonata_2.ogg/Moonlight_Sonata_2.ogg.mp3"
        },
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Moonlight_Sonata_2.ogg"
        }
      ]
    },
    {
      id: "mozart-nachtmusik",
      titleAr: "Mozart - Eine kleine Nachtmusik",
      titleEn: "Mozart - Eine kleine Nachtmusik",
      sources: [
        {
          type: "audio/mpeg",
          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg.mp3"
        },
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg"
        }
      ]
    },
    {
      id: "moonlight-i",
      titleAr: "Beethoven - Moonlight Sonata (I)",
      titleEn: "Beethoven - Moonlight Sonata (I)",
      sources: [
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://commons.wikimedia.org/wiki/Special:FilePath/Beethoven_Moonlight_1st_movement.ogg"
        }
      ]
    },
    {
      id: "moonlight-iii",
      titleAr: "Beethoven - Moonlight Sonata (III)",
      titleEn: "Beethoven - Moonlight Sonata (III)",
      sources: [
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://commons.wikimedia.org/wiki/Special:FilePath/Beethoven_Moonlight_3rd_movement.ogg"
        }
      ]
    },
    {
      id: "vivaldi-spring",
      titleAr: "Vivaldi - Spring (Allegro)",
      titleEn: "Vivaldi - Spring (Allegro)",
      sources: [
        {
          type: "audio/ogg; codecs=\"vorbis\"",
          url: "https://commons.wikimedia.org/wiki/Special:FilePath/Vivaldis_Spring_from_the_Four_Seasons-Allegro.ogg"
        }
      ]
    }
  ];

  const i18n = {
    ar: {
      brandSub: "خد مستواك من مبتدئ لمحترف بخطة يومية",
      startGame: "ابدأ المباراة",
      newGame: "مباراة جديدة",
      flipBoard: "قلب الرقعة",
      musicOn: "الموسيقى: تشغيل",
      musicOff: "الموسيقى: إيقاف",
      musicVolumeLabel: "صوت الموسيقى",
      musicTrackLabel: "المقطوعة",
      musicModeLabel: "نمط التشغيل",
      musicModeSelected: "المقطوعة المختارة",
      musicModeShuffle: "عشوائي",
      musicTrackApplied: "تم تشغيل: {track}",
      musicModeApplied: "تم ضبط الموسيقى على: {mode}",
      musicNeedTap: "اضغط أي مكان مرة واحدة لتشغيل الموسيقى.",
      musicLoadError: "تعذر تشغيل الموسيقى على المتصفح الحالي.",
      symphonyOnStatus: "تم تشغيل وضع السيمفونية.",
      symphonyOffStatus: "تم إيقاف وضع السيمفونية.",
      chooseBot: "اختار البوت",
      botPower: "قوة {rating}",
      settings: "إعدادات المباراة",
      smartCoach: "المدرب الذكي",
      autoQueen: "ترقية تلقائية لوزير",
      premoveLabel: "الحركة المقدمة",
      arrowsLabel: "الأسهم على الرقعة",
      symphonyLabel: "وضع السيمفونية",
      boardThemeLabel: "ثيم الرقعة",
      pieceStyleLabel: "شكل القطع",
      timeControlLabel: "وقت كل لاعب (دقائق)",
      applyTimeBtn: "تطبيق الوقت",
      clearArrowsBtn: "مسح الأسهم",
      bestMoveBtn: "أفضل نقلة",
      undoBtn: "تراجع",
      puzzleTitle: "وضع الألغاز",
      puzzleLevelLabel: "مستوى الألغاز",
      puzzleLevelBeginner: "مبتدئ (600-950)",
      puzzleLevelIntermediate: "متوسط (951-1300)",
      puzzleLevelAdvanced: "متقدم (1301-1800)",
      puzzleLevelMaster: "ماستر (1801-2500)",
      puzzleLevelCustom: "مخصص",
      puzzleMaxLabel: "أقصى تصنيف اللغز",
      startPuzzleBtn: "ابدأ لغز",
      nextPuzzleBtn: "لغز جديد",
      puzzleHintBtn: "Hint اللغز",
      puzzleIdle: "اختار مستوى وابدأ لغز.",
      puzzleGenerating: "جاري تجهيز لغز...",
      puzzleReady: "لغز جاهز ({rating}). دورك لإيجاد أفضل نقلة.",
      puzzleSolved: "ممتاز. اللغز اتحل.",
      puzzleWrong: "مش هي دي النقلة المطلوبة. جرّب تاني.",
      puzzleHintShown: "التلميح ظاهر على الرقعة.",
      puzzleNoActive: "ابدأ لغز الأول.",
      puzzleModeTiny: "وضع الألغاز",
      puzzleModeTitle: "Puzzle {rating}",
      puzzleGuide: "في وضع الألغاز: دورك تلاقي النقلة الأفضل مرة واحدة.",
      yourStats: "إحصائياتك",
      games: "مباريات",
      wins: "فوز",
      draws: "تعادل",
      losses: "هزيمة",
      accuracy: "دقة النقلات",
      currentMatch: "المباراة الحالية",
      turnWhite: "الدور: الأبيض",
      turnBlack: "الدور: الأسود",
      whiteClockLabel: "الأبيض",
      blackClockLabel: "الأسود",
      whiteCaptureLabel: "مكاسب الأبيض",
      blackCaptureLabel: "مكاسب الأسود",
      coachTitle: "المدرب",
      moveLogTitle: "سجل النقلات",
      moveCount: "{count} نقلة",
      coachReady: "جاهز",
      coachStopped: "متوقف",
      coachWatching: "يراقب",
      coachWinner: "فائز",
      coachAnalysis: "تحليل",
      coachStable: "ثابت",
      coachDefaultMsg: "كل نقلة هنعمل لها تقييم فوري. العب بأعصاب هادئة وفكر في خطة قبل التنفيذ.",
      coachOpeningMsg: "ابدأ بهدوء: سيطر على المركز وفعّل قطعك بسرعة.",
      coachBestNow: "أفضل نقلة حاليًا: {move}",
      coachBestWas: "أفضل نقلة كانت: {move}",
      coachDisabledHint: "فعّل المدرب الأول علشان يظهر أفضل نقلة.",
      coachHintTurnOnly: "أفضل نقلة تظهر فقط في دورك.",
      hintShown: "التلميح ظاهر على الرقعة.",
      premoveQueued: "تم تجهيز الحركة المقدمة.",
      premovePlayed: "تم تنفيذ الحركة المقدمة: {san}.",
      premoveCanceled: "الحركة المقدمة أصبحت غير قانونية واتلغت.",
      premoveCleared: "تم إلغاء الحركة المقدمة.",
      arrowsCleared: "تم مسح الأسهم.",
      waitBot: "دور البوت الآن، استنى ثانية.",
      waitBotFinish: "استنى البوت يخلص تفكير الأول.",
      startPrompt: "اضغط Start عشان تبدأ المباراة.",
      noUndo: "مفيش نقلات للتراجع.",
      undoDone: "تم التراجع عن آخر دور.",
      botThinking: "{bot} بيفكر...",
      yourTurn: "دورك. فكر قبل النقل.",
      illegalMove: "نقلة غير قانونية.",
      playedMove: "لعبت {san}.",
      moveReport: "نقلتك: {san} | تقييم المدرب: {grade} ({acc}%) | CPL: {cpl}",
      selectedBot: "تم اختيار {bot}. جاهز للمواجهة.",
      gameStarted: "مباراة جديدة بدأت.",
      gameWon: "شطرنج مات! فوز مستحق ليك.",
      gameLost: "شطرنج مات عليك. راجع آخر 3 نقلات.",
      gameDraw: "تعادل.",
      gameOver: "انتهت المباراة.",
      timeApplied: "تم ضبط الوقت: {min} دقيقة لكل طرف.",
      timeOutWin: "انتهى وقت الخصم. فزت بالوقت.",
      timeOutLose: "انتهى وقتك. خسرت بالوقت.",
      botPlayed: "البوت لعب {san}. حاول ترد بخطة واضحة.",
      choosePromo: "اختار الترقية: q وزير | r رخ | b فيل | n حصان",
      gradeBrilliant: "Brilliant",
      gradeGreat: "Great",
      gradeGood: "Good",
      gradeInaccuracy: "Inaccuracy",
      gradeMistake: "Mistake",
      gradeBlunder: "Blunder",
      gradeMsgBrilliant: "ممتاز جدًا. النقلة كانت تقريبًا الأفضل في الوضع.",
      gradeMsgGreat: "نقلة قوية. الفكرة صح والتوقيت جيد.",
      gradeMsgGood: "نقلة جيدة، لكن كان فيه اختيار أقوى شوية.",
      gradeMsgInaccuracy: "دقة منخفضة. ركز على النقلات اللي بتحسن وضع قطعك.",
      gradeMsgMistake: "غلطة واضحة. كان ممكن تحافظ على أفضلية أفضل.",
      gradeMsgBlunder: "غلطة كبيرة. حاول دايمًا تبص على تهديدات الخصم قبل النقل.",
      reviewTitle: "مراجعة المباراة",
      reviewIdle: "ابدأ مباراة كاملة لتظهر مراجعة بديهية مع أفضل وأخطر النقلات.",
      reviewActive: "دقة النقلات: {accuracy}%. أخطاء: {mistakes}. زلات: {blunders}.",
      reviewResultWin: "النتيجة: فزت.",
      reviewResultLose: "النتيجة: خسرت. راجع النقلات الأخيرة.",
      reviewResultDraw: "النتيجة: تعادل.",
      reviewBadgeIdle: "جاهز",
      reviewBadgeLive: "جاري اللعب",
      reviewBadgeReady: "مراجعة جاهزة",
      reviewBestLabel: "أفضل نقلة",
      reviewWorstLabel: "أخطر نقلة",
      reviewLastMistakeLabel: "آخر غلطة",
    },
    en: {
      brandSub: "Train daily and climb from beginner to serious player.",
      startGame: "Start Match",
      newGame: "New Game",
      flipBoard: "Flip Board",
      musicOn: "Music: On",
      musicOff: "Music: Off",
      musicVolumeLabel: "Music Volume",
      musicTrackLabel: "Track",
      musicModeLabel: "Playback",
      musicModeSelected: "Selected Track",
      musicModeShuffle: "Shuffle",
      musicTrackApplied: "Now playing: {track}",
      musicModeApplied: "Music mode: {mode}",
      musicNeedTap: "Tap once on the page to start music.",
      musicLoadError: "Music could not be played on this browser.",
      symphonyOnStatus: "Symphony mode enabled.",
      symphonyOffStatus: "Symphony mode disabled.",
      chooseBot: "Choose Bot",
      botPower: "Power {rating}",
      settings: "Match Settings",
      smartCoach: "Smart Coach",
      autoQueen: "Auto promote to Queen",
      premoveLabel: "Premove",
      arrowsLabel: "Board Arrows",
      symphonyLabel: "Symphony Mode",
      boardThemeLabel: "Board Theme",
      pieceStyleLabel: "Piece Style",
      timeControlLabel: "Time Per Side (Minutes)",
      applyTimeBtn: "Apply Time",
      clearArrowsBtn: "Clear Arrows",
      bestMoveBtn: "Best Move",
      undoBtn: "Undo",
      puzzleTitle: "Puzzle Mode",
      puzzleLevelLabel: "Puzzle Level",
      puzzleLevelBeginner: "Beginner (600-950)",
      puzzleLevelIntermediate: "Intermediate (951-1300)",
      puzzleLevelAdvanced: "Advanced (1301-1800)",
      puzzleLevelMaster: "Master (1801-2500)",
      puzzleLevelCustom: "Custom",
      puzzleMaxLabel: "Max Puzzle Rating",
      startPuzzleBtn: "Start Puzzle",
      nextPuzzleBtn: "Next Puzzle",
      puzzleHintBtn: "Puzzle Hint",
      puzzleIdle: "Choose level and start a puzzle.",
      puzzleGenerating: "Generating puzzle...",
      puzzleReady: "Puzzle ready ({rating}). Find the best move.",
      puzzleSolved: "Excellent. Puzzle solved.",
      puzzleWrong: "That is not the required move. Try again.",
      puzzleHintShown: "Puzzle hint is highlighted.",
      puzzleNoActive: "Start a puzzle first.",
      puzzleModeTiny: "Puzzle Mode",
      puzzleModeTitle: "Puzzle {rating}",
      puzzleGuide: "Puzzle mode: find the best move in one shot.",
      yourStats: "Your Stats",
      games: "Games",
      wins: "Wins",
      draws: "Draws",
      losses: "Losses",
      accuracy: "Move Accuracy",
      currentMatch: "Current Match",
      turnWhite: "Turn: White",
      turnBlack: "Turn: Black",
      whiteClockLabel: "White",
      blackClockLabel: "Black",
      whiteCaptureLabel: "White Gains",
      blackCaptureLabel: "Black Gains",
      coachTitle: "Coach",
      moveLogTitle: "Move Log",
      moveCount: "{count} moves",
      coachReady: "Ready",
      coachStopped: "Paused",
      coachWatching: "Watching",
      coachWinner: "Winner",
      coachAnalysis: "Review",
      coachStable: "Stable",
      coachDefaultMsg: "Each move gets instant feedback. Stay calm and play with a plan.",
      coachOpeningMsg: "Start simple: control the center and activate your pieces.",
      coachBestNow: "Best move now: {move}",
      coachBestWas: "Best move was: {move}",
      coachDisabledHint: "Enable coach first to show the best move.",
      coachHintTurnOnly: "Best move appears only on your turn.",
      hintShown: "Hint is highlighted on the board.",
      premoveQueued: "Premove queued.",
      premovePlayed: "Premove played: {san}.",
      premoveCanceled: "Premove became illegal and was canceled.",
      premoveCleared: "Premove canceled.",
      arrowsCleared: "Arrows cleared.",
      waitBot: "Bot is thinking, wait a second.",
      waitBotFinish: "Let the bot finish thinking first.",
      startPrompt: "Press Start to begin the match.",
      noUndo: "No moves to undo.",
      undoDone: "Last full turn has been reverted.",
      botThinking: "{bot} is thinking...",
      yourTurn: "Your turn. Think before you move.",
      illegalMove: "Illegal move.",
      playedMove: "You played {san}.",
      moveReport: "Your move: {san} | Coach: {grade} ({acc}%) | CPL: {cpl}",
      selectedBot: "{bot} selected. Ready to play.",
      gameStarted: "New game started.",
      gameWon: "Checkmate. You won.",
      gameLost: "Checkmate. You lost. Review the last 3 moves.",
      gameDraw: "Draw.",
      gameOver: "Game over.",
      timeApplied: "Time set: {min} min per side.",
      timeOutWin: "Opponent flagged. You won on time.",
      timeOutLose: "Your time is over. You lost on time.",
      botPlayed: "Bot played {san}. Respond with a clear plan.",
      choosePromo: "Choose promotion: q queen | r rook | b bishop | n knight",
      gradeBrilliant: "Brilliant",
      gradeGreat: "Great",
      gradeGood: "Good",
      gradeInaccuracy: "Inaccuracy",
      gradeMistake: "Mistake",
      gradeBlunder: "Blunder",
      gradeMsgBrilliant: "Excellent. This was almost the best move.",
      gradeMsgGreat: "Strong move. The idea and timing were good.",
      gradeMsgGood: "Good move, but there was a stronger option.",
      gradeMsgInaccuracy: "Low precision. Focus on improving piece activity.",
      gradeMsgMistake: "Clear mistake. You gave away part of your advantage.",
      gradeMsgBlunder: "Big blunder. Always scan opponent threats before moving.",
      reviewTitle: "Match Review",
      reviewIdle: "Finish a match to unlock a move-by-move review.",
      reviewActive: "Move accuracy: {accuracy}%. Mistakes: {mistakes}. Blunders: {blunders}.",
      reviewResultWin: "Result: You won.",
      reviewResultLose: "Result: You lost. Study the final moves.",
      reviewResultDraw: "Result: Draw.",
      reviewBadgeIdle: "Ready",
      reviewBadgeLive: "Playing",
      reviewBadgeReady: "Review-ready",
      reviewBestLabel: "Best move",
      reviewWorstLabel: "Worst move",
      reviewLastMistakeLabel: "Last mistake"
    }
  };

  const refs = {
    board: document.getElementById("board"),
    botList: document.getElementById("botList"),
    activeBotRating: document.getElementById("activeBotRating"),
    brandSub: document.getElementById("brandSub"),
    botTitle: document.getElementById("botTitle"),
    settingsTitle: document.getElementById("settingsTitle"),
    coachToggleLabel: document.getElementById("coachToggleLabel"),
    autoQueenLabel: document.getElementById("autoQueenLabel"),
    premoveLabel: document.getElementById("premoveLabel"),
    arrowsLabel: document.getElementById("arrowsLabel"),
    symphonyLabel: document.getElementById("symphonyLabel"),
    boardThemeLabel: document.getElementById("boardThemeLabel"),
    pieceStyleLabel: document.getElementById("pieceStyleLabel"),
    timeControlLabel: document.getElementById("timeControlLabel"),
    boardThemeSelect: document.getElementById("boardThemeSelect"),
    pieceStyleSelect: document.getElementById("pieceStyleSelect"),
    timeControlInput: document.getElementById("timeControlInput"),
    musicTrackLabel: document.getElementById("musicTrackLabel"),
    musicModeLabel: document.getElementById("musicModeLabel"),
    musicVolumeLabel: document.getElementById("musicVolumeLabel"),
    musicTrackSelect: document.getElementById("musicTrackSelect"),
    musicModeSelect: document.getElementById("musicModeSelect"),
    musicVolumeSlider: document.getElementById("musicVolumeSlider"),
    musicVolumeValue: document.getElementById("musicVolumeValue"),
    statsTitle: document.getElementById("statsTitle"),
    gamesLabel: document.getElementById("gamesLabel"),
    winsLabel: document.getElementById("winsLabel"),
    drawsLabel: document.getElementById("drawsLabel"),
    lossesLabel: document.getElementById("lossesLabel"),
    accuracyLabel: document.getElementById("accuracyLabel"),
    matchTiny: document.getElementById("matchTiny"),
    coachTitle: document.getElementById("coachTitle"),
    movesTitle: document.getElementById("movesTitle"),
    turnBadge: document.getElementById("turnBadge"),
    whiteClockBox: document.getElementById("whiteClockBox"),
    blackClockBox: document.getElementById("blackClockBox"),
    whiteClockLabel: document.getElementById("whiteClockLabel"),
    blackClockLabel: document.getElementById("blackClockLabel"),
    whiteCaptureLabel: document.getElementById("whiteCaptureLabel"),
    blackCaptureLabel: document.getElementById("blackCaptureLabel"),
    whiteClock: document.getElementById("whiteClock"),
    blackClock: document.getElementById("blackClock"),
    whiteCapturedPieces: document.getElementById("whiteCapturedPieces"),
    blackCapturedPieces: document.getElementById("blackCapturedPieces"),
    whiteMaterialDiff: document.getElementById("whiteMaterialDiff"),
    blackMaterialDiff: document.getElementById("blackMaterialDiff"),
    statusLine: document.getElementById("statusLine"),
    matchTitle: document.getElementById("matchTitle"),
    moveList: document.getElementById("moveList"),
    moveCount: document.getElementById("moveCount"),
    reviewTitle: document.getElementById("reviewTitle"),
    reviewBadge: document.getElementById("reviewBadge"),
    reviewSummary: document.getElementById("reviewSummary"),
    reviewList: document.getElementById("reviewList"),
    coachMessage: document.getElementById("coachMessage"),
    coachMood: document.getElementById("coachMood"),
    coachBestMove: document.getElementById("coachBestMove"),
    evalFill: document.getElementById("evalFill"),
    startGameBtn: document.getElementById("startGameBtn"),
    newGameBtn: document.getElementById("newGameBtn"),
    flipBoardBtn: document.getElementById("flipBoardBtn"),
    musicBtn: document.getElementById("musicBtn"),
    langBtn: document.getElementById("langBtn"),
    bgMusic: document.getElementById("bgMusic"),
    coachHintBtn: document.getElementById("coachHintBtn"),
    undoBtn: document.getElementById("undoBtn"),
    applyTimeBtn: document.getElementById("applyTimeBtn"),
    clearArrowsBtn: document.getElementById("clearArrowsBtn"),
    coachToggle: document.getElementById("coachToggle"),
    autoQueenToggle: document.getElementById("autoQueenToggle"),
    premoveToggle: document.getElementById("premoveToggle"),
    arrowsToggle: document.getElementById("arrowsToggle"),
    symphonyToggle: document.getElementById("symphonyToggle"),
    arrowLayer: document.getElementById("arrowLayer"),
    puzzleTitle: document.getElementById("puzzleTitle"),
    puzzleLevelLabel: document.getElementById("puzzleLevelLabel"),
    puzzleLevelSelect: document.getElementById("puzzleLevelSelect"),
    puzzleMaxLabel: document.getElementById("puzzleMaxLabel"),
    puzzleMaxInput: document.getElementById("puzzleMaxInput"),
    puzzleRatingChip: document.getElementById("puzzleRatingChip"),
    startPuzzleBtn: document.getElementById("startPuzzleBtn"),
    nextPuzzleBtn: document.getElementById("nextPuzzleBtn"),
    puzzleHintBtn: document.getElementById("puzzleHintBtn"),
    puzzleStatus: document.getElementById("puzzleStatus"),
    gamesStat: document.getElementById("gamesStat"),
    winsStat: document.getElementById("winsStat"),
    drawsStat: document.getElementById("drawsStat"),
    lossesStat: document.getElementById("lossesStat"),
    accuracyStat: document.getElementById("accuracyStat")
  };

  const game = new Chess();
  const piecePreload = new Map();
  const savedVisual = loadVisualSettings();
  const savedTimeControl = loadTimeControl();
  const savedUX = loadUXSettings();

  const state = {
    orientation: "white",
    playerColor: "w",
    mode: "game",
    selectedSquare: null,
    selectionMode: "normal",
    targetSquares: [],
    lastMove: null,
    coachHint: null,
    premove: null,
    premoveEnabled: savedUX.premoveEnabled,
    arrowsEnabled: savedUX.arrowsEnabled,
    boardArrows: [],
    boardMarks: [],
    activePointerId: null,
    isBotThinking: false,
    botTimer: null,
    puzzleTimer: null,
    activeBot: bots[4],
    coachEnabled: true,
    autoQueen: true,
    lastCoachBest: null,
    coachCacheKey: "",
    coachCacheBest: null,
    botRuntimeProfile: null,
    pendingAnimation: null,
    boardRenderKey: "",
    boardTheme: savedVisual.boardTheme,
    pieceStyle: savedVisual.pieceStyle,
    timeControlMinutes: savedTimeControl,
    whiteTimeMs: savedTimeControl * 60 * 1000,
    blackTimeMs: savedTimeControl * 60 * 1000,
    clockLoopActive: false,
    clockRafId: null,
    clockTimeoutId: null,
    clockLastTickAt: 0,
    timeEnded: false,
    matchStarted: false,
    puzzleLevel: savedUX.puzzleLevel,
    puzzleMaxRating: savedUX.puzzleMaxRating,
    puzzle: null,
    puzzleSolved: false,
    musicEnabled: savedUX.musicEnabled,
    musicVolume: savedUX.musicVolume,
    symphonyEnabled: savedUX.symphonyEnabled,
    musicUnlockArmed: false,
    musicTrackId: savedUX.musicTrackId,
    musicMode: savedUX.musicMode,
    musicSourceIndex: 0,
    musicShuffleBag: [],
    symphonyRafId: null,
    symphonyEnergy: 0.12,
    symphonyWaveOpacity: 0.08,
    symphonyHue: 186,
    symphonyPhase: 0,
    musicAudioContext: null,
    musicAnalyser: null,
    musicAnalyserData: null,
    musicSourceNode: null,
    musicAnalyserFailed: false,
    lang: loadLanguage(),
    matchReview: { moves: [] },
    stats: loadStats()
  };

  init();

  function init() {
    preloadPieceImages();
    applyLanguage();
    initMusic();
    applyVisualTheme();
    applySymphonyVisualState();
    renderBotList();
    bindEvents();
    renderStats();
    startNewGame(false, false);
  }

  function bindEvents() {
    refs.startGameBtn.addEventListener("click", () => startNewGame(true, true));
    refs.newGameBtn.addEventListener("click", () => startNewGame(true, true));
    refs.board.addEventListener("pointerdown", onBoardPointerDown);
    refs.board.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("resize", () => {
      if (state.arrowsEnabled) {
        requestAnimationFrame(renderArrowLayer);
      }
    });
    document.addEventListener("visibilitychange", () => {
      const now = performance.now();
      settleActiveClock(now);
      renderClocks();
      if (document.hidden) {
        stopSymphonyLoop(false);
      } else if (state.symphonyEnabled) {
        startSymphonyLoop();
      }
    });

    refs.flipBoardBtn.addEventListener("click", () => {
      state.orientation = state.orientation === "white" ? "black" : "white";
      renderBoard();
    });

    refs.musicBtn.addEventListener("click", () => {
      state.musicEnabled = !state.musicEnabled;
      if (state.musicEnabled) {
        applyMusicMode();
        applyMusicTrack(state.musicTrackId);
        playBackgroundMusic();
      } else {
        stopBackgroundMusic();
      }
      saveUXSettings();
      renderMusicButton();
    });

    refs.musicTrackSelect.addEventListener("change", () => {
      const nextTrack = normalizeMusicTrackId(refs.musicTrackSelect.value);
      state.musicTrackId = nextTrack;
      state.musicShuffleBag = [];
      applyMusicTrack(nextTrack);
      saveUXSettings();
      renderMusicControls();
      if (state.musicEnabled) {
        playBackgroundMusic();
      }
      setStatus(tr("musicTrackApplied", { track: getMusicTrackLabel(getMusicTrackById(nextTrack)) }), "info");
    });

    refs.musicModeSelect.addEventListener("change", () => {
      state.musicMode = normalizeMusicMode(refs.musicModeSelect.value);
      applyMusicMode();
      saveUXSettings();
      renderMusicControls();
      if (state.musicEnabled && refs.bgMusic.paused) {
        playBackgroundMusic();
      }
      const modeLabel = state.musicMode === "shuffle" ? tr("musicModeShuffle") : tr("musicModeSelected");
      setStatus(tr("musicModeApplied", { mode: modeLabel }), "info");
    });

    refs.musicVolumeSlider.addEventListener("input", () => {
      const requested = Number(refs.musicVolumeSlider.value);
      const percent = clamp(Number.isFinite(requested) ? Math.round(requested) : 25, 0, 100);
      state.musicVolume = percent / 100;
      refs.musicVolumeValue.textContent = `${percent}%`;
      if (refs.bgMusic) {
        refs.bgMusic.volume = clamp(state.musicVolume, 0, 1);
      }
    });

    refs.musicVolumeSlider.addEventListener("change", () => {
      saveUXSettings();
    });

    refs.coachToggle.addEventListener("change", (event) => {
      state.coachEnabled = event.target.checked;
      state.coachHint = null;
      if (!state.coachEnabled) {
        refs.coachMood.textContent = tr("coachStopped");
        refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });
      } else {
        refs.coachMood.textContent = tr("coachReady");
        refreshCoachBest();
      }
      renderBoard();
    });

    refs.autoQueenToggle.addEventListener("change", (event) => {
      state.autoQueen = event.target.checked;
    });

    refs.premoveToggle.addEventListener("change", (event) => {
      state.premoveEnabled = event.target.checked;
      if (!state.premoveEnabled) {
        state.premove = null;
        clearSelection();
        renderBoard();
      }
      saveUXSettings();
    });

    refs.arrowsToggle.addEventListener("change", (event) => {
      state.arrowsEnabled = event.target.checked;
      if (!state.arrowsEnabled) {
        clearBoardMarkup(false);
      }
      saveUXSettings();
      renderArrowLayer();
    });

    refs.symphonyToggle.addEventListener("change", (event) => {
      state.symphonyEnabled = event.target.checked;
      saveUXSettings();
      applySymphonyVisualState();
      setStatus(tr(state.symphonyEnabled ? "symphonyOnStatus" : "symphonyOffStatus"), "info");
    });

    refs.timeControlInput.addEventListener("change", () => {
      const minutes = syncTimeControlFromInput();
      saveTimeControl();
      if (state.mode === "game" && !state.matchStarted) {
        resetClocks();
        renderClocks();
      }
      setStatus(tr("timeApplied", { min: minutes }), "info");
    });

    refs.applyTimeBtn.addEventListener("click", () => {
      const minutes = syncTimeControlFromInput();
      saveTimeControl();
      startNewGame(false, state.matchStarted);
      setStatus(tr("timeApplied", { min: minutes }));
    });

    refs.clearArrowsBtn.addEventListener("click", () => {
      clearBoardMarkup();
    });

    refs.boardThemeSelect.addEventListener("change", (event) => {
      const value = event.target.value;
      if (!boardThemes.some((theme) => theme.id === value)) return;
      state.boardTheme = value;
      state.pendingAnimation = null;
      saveVisualSettings();
      applyVisualTheme();
      pulseBoardTheme();
      renderBoard();
    });

    refs.pieceStyleSelect.addEventListener("change", (event) => {
      const value = event.target.value;
      if (!pieceStyles.some((style) => style.id === value)) return;
      state.pieceStyle = value;
      state.pendingAnimation = null;
      preloadPieceImagesForStyle(state.pieceStyle);
      saveVisualSettings();
      applyVisualTheme();
      renderBoard();
    });

    refs.coachHintBtn.addEventListener("click", () => {
      if (state.mode === "puzzle") {
        showPuzzleHint();
        return;
      }

      if (!state.coachEnabled) {
        setStatus(tr("coachDisabledHint"), "warning");
        return;
      }

      if (game.turn() !== state.playerColor || game.game_over()) {
        setStatus(tr("coachHintTurnOnly"), "warning");
        return;
      }

      refreshCoachBest();
      if (state.lastCoachBest) {
        state.coachHint = { from: state.lastCoachBest.move.from, to: state.lastCoachBest.move.to };
        renderBoard();
        setStatus(tr("hintShown"));
      }
    });

    refs.undoBtn.addEventListener("click", () => {
      if (state.timeEnded) {
        return;
      }

      if (state.isBotThinking) {
        setStatus(tr("waitBotFinish"), "warning");
        return;
      }

      if (game.history().length === 0) {
        setStatus(tr("noUndo"), "warning");
        return;
      }

      game.undo();
      if (state.mode === "game" && game.history().length > 0 && game.turn() !== state.playerColor) {
        game.undo();
      }

      state.selectedSquare = null;
      state.selectionMode = "normal";
      state.targetSquares = [];
      state.coachHint = null;
      state.premove = null;
      state.lastMove = historyLastMove();
      state.pendingAnimation = null;
      invalidateCoachCache();
      if (state.mode === "puzzle") {
        state.puzzleSolved = false;
        refs.coachMood.textContent = tr("coachAnalysis");
        refs.coachMessage.textContent = tr("puzzleGuide");
      }
      setStatus(tr("undoDone"));
      syncAll();
      refreshCoachBest();
      renderPuzzlePanel();
    });

    refs.langBtn.addEventListener("click", () => {
      state.lang = state.lang === "ar" ? "en" : "ar";
      saveLanguage();
      applyLanguage();
      updateMatchTitle();
      renderBotList();
      renderTurn();
      renderMoveList();
      renderStats();
      refreshCoachBest();
      if (!state.coachEnabled) {
        refs.coachMood.textContent = tr("coachStopped");
      }
      renderPuzzlePanel();
    });

    refs.startPuzzleBtn.addEventListener("click", () => {
      startPuzzleMode(false);
    });

    refs.nextPuzzleBtn.addEventListener("click", () => {
      startPuzzleMode(true);
    });

    refs.puzzleHintBtn.addEventListener("click", () => {
      showPuzzleHint();
    });

    refs.puzzleLevelSelect.addEventListener("change", () => {
      const selected = refs.puzzleLevelSelect.value;
      state.puzzleLevel = normalizePuzzleLevel(selected);
      saveUXSettings();
      renderPuzzleLevelControls();
      renderPuzzlePanel();
    });

    refs.puzzleMaxInput.addEventListener("change", () => {
      if (state.puzzleLevel !== "custom") {
        renderPuzzleLevelControls();
        return;
      }
      const requested = Number(refs.puzzleMaxInput.value);
      state.puzzleMaxRating = clamp(Number.isFinite(requested) ? Math.round(requested) : state.puzzleMaxRating, 600, 2500);
      refs.puzzleMaxInput.value = String(state.puzzleMaxRating);
      saveUXSettings();
      renderPuzzlePanel();
    });
  }

  function tr(key, vars = {}) {
    const langPack = i18n[state.lang] || i18n.ar;
    let text = langPack[key] || i18n.ar[key] || key;
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
    return text;
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";

    refs.brandSub.textContent = tr("brandSub");
    refs.startGameBtn.textContent = tr("startGame");
    refs.newGameBtn.textContent = tr("newGame");
    refs.flipBoardBtn.textContent = tr("flipBoard");
    refs.langBtn.textContent = state.lang === "ar" ? "EN" : "AR";
    renderMusicButton();

    refs.botTitle.textContent = tr("chooseBot");
    refs.settingsTitle.textContent = tr("settings");
    refs.coachToggleLabel.textContent = tr("smartCoach");
    refs.autoQueenLabel.textContent = tr("autoQueen");
    refs.premoveLabel.textContent = tr("premoveLabel");
    refs.arrowsLabel.textContent = tr("arrowsLabel");
    refs.symphonyLabel.textContent = tr("symphonyLabel");
    refs.boardThemeLabel.textContent = tr("boardThemeLabel");
    refs.pieceStyleLabel.textContent = tr("pieceStyleLabel");
    refs.timeControlLabel.textContent = tr("timeControlLabel");
    refs.musicTrackLabel.textContent = tr("musicTrackLabel");
    refs.musicModeLabel.textContent = tr("musicModeLabel");
    refs.musicVolumeLabel.textContent = tr("musicVolumeLabel");
    refs.coachHintBtn.textContent = tr("bestMoveBtn");
    refs.undoBtn.textContent = tr("undoBtn");
    refs.applyTimeBtn.textContent = tr("applyTimeBtn");
    refs.clearArrowsBtn.textContent = tr("clearArrowsBtn");
    refs.puzzleTitle.textContent = tr("puzzleTitle");
    refs.puzzleLevelLabel.textContent = tr("puzzleLevelLabel");
    refs.puzzleMaxLabel.textContent = tr("puzzleMaxLabel");
    refs.startPuzzleBtn.textContent = tr("startPuzzleBtn");
    refs.nextPuzzleBtn.textContent = tr("nextPuzzleBtn");
    refs.puzzleHintBtn.textContent = tr("puzzleHintBtn");

    refs.statsTitle.textContent = tr("yourStats");
    refs.gamesLabel.textContent = tr("games");
    refs.winsLabel.textContent = tr("wins");
    refs.drawsLabel.textContent = tr("draws");
    refs.lossesLabel.textContent = tr("losses");
    refs.accuracyLabel.textContent = tr("accuracy");

    refs.matchTiny.textContent = tr("currentMatch");
    refs.coachTitle.textContent = tr("coachTitle");
    refs.movesTitle.textContent = tr("moveLogTitle");
    refs.reviewTitle.textContent = tr("reviewTitle");
    refs.whiteClockLabel.textContent = tr("whiteClockLabel");
    refs.blackClockLabel.textContent = tr("blackClockLabel");
    refs.whiteCaptureLabel.textContent = tr("whiteCaptureLabel");
    refs.blackCaptureLabel.textContent = tr("blackCaptureLabel");
    refs.coachMood.textContent = state.mode === "puzzle" ? tr("coachAnalysis") : tr("coachReady");
    refs.coachMessage.textContent = state.mode === "puzzle" ? tr("puzzleGuide") : tr("coachDefaultMsg");
    refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });
    refs.timeControlInput.value = String(state.timeControlMinutes);
    refs.premoveToggle.checked = state.premoveEnabled;
    refs.arrowsToggle.checked = state.arrowsEnabled;
    refs.symphonyToggle.checked = state.symphonyEnabled;
    renderVisualSelectors();
    renderMusicControls();
    applySymphonyVisualState();
    renderPuzzleLevelOptions();
    renderPuzzleLevelControls();
    renderClocks();
    renderMaterialInfo();
    renderPuzzlePanel();
    renderMatchReview();
    if (state.mode === "game" && !state.matchStarted) {
      setStatus(tr("startPrompt"), "info");
    }
  }

  function renderVisualSelectors() {
    refs.boardThemeSelect.innerHTML = "";
    for (const theme of boardThemes) {
      const option = document.createElement("option");
      option.value = theme.id;
      option.textContent = state.lang === "ar" ? theme.nameAr : theme.nameEn;
      refs.boardThemeSelect.appendChild(option);
    }
    refs.boardThemeSelect.value = state.boardTheme;

    refs.pieceStyleSelect.innerHTML = "";
    for (const style of pieceStyles) {
      const option = document.createElement("option");
      option.value = style.id;
      option.textContent = state.lang === "ar" ? style.nameAr : style.nameEn;
      refs.pieceStyleSelect.appendChild(option);
    }
    refs.pieceStyleSelect.value = state.pieceStyle;
  }

  function normalizePuzzleLevel(levelId) {
    if (PUZZLE_LEVELS.some((level) => level.id === levelId)) {
      return levelId;
    }
    return "intermediate";
  }

  function getPuzzleLevelById(levelId) {
    const normalized = normalizePuzzleLevel(levelId);
    return PUZZLE_LEVELS.find((level) => level.id === normalized) || PUZZLE_LEVELS[1];
  }

  function getPuzzleRatingRange() {
    const level = getPuzzleLevelById(state.puzzleLevel);
    if (level.id === "custom") {
      return {
        id: level.id,
        min: 600,
        max: clamp(state.puzzleMaxRating, 600, 2500),
        labelKey: level.labelKey
      };
    }

    return {
      id: level.id,
      min: level.min,
      max: level.max,
      labelKey: level.labelKey
    };
  }

  function renderPuzzleLevelOptions() {
    refs.puzzleLevelSelect.innerHTML = "";
    for (const level of PUZZLE_LEVELS) {
      const option = document.createElement("option");
      option.value = level.id;
      option.textContent = tr(level.labelKey);
      refs.puzzleLevelSelect.appendChild(option);
    }
    state.puzzleLevel = normalizePuzzleLevel(state.puzzleLevel);
    refs.puzzleLevelSelect.value = state.puzzleLevel;
  }

  function renderPuzzleLevelControls() {
    const range = getPuzzleRatingRange();
    const isCustom = range.id === "custom";
    refs.puzzleMaxInput.disabled = !isCustom;
    refs.puzzleMaxInput.value = String(isCustom ? state.puzzleMaxRating : range.max);
    refs.puzzleMaxInput.title = isCustom
      ? ""
      : (state.lang === "ar"
        ? `نطاق المستوى: ${range.min}-${range.max}`
        : `Level range: ${range.min}-${range.max}`);
  }

  function applyVisualTheme() {
    refs.board.dataset.theme = state.boardTheme;
    refs.board.dataset.pieceStyle = state.pieceStyle;
  }

  function normalizeMusicMode(mode) {
    return mode === "shuffle" ? "shuffle" : "selected";
  }

  function normalizeMusicTrackId(trackId) {
    const hasTrack = MUSIC_TRACKS.some((track) => track.id === trackId);
    return hasTrack ? trackId : MUSIC_TRACKS[0].id;
  }

  function getMusicTrackById(trackId) {
    const normalizedId = normalizeMusicTrackId(trackId);
    return MUSIC_TRACKS.find((track) => track.id === normalizedId) || MUSIC_TRACKS[0];
  }

  function getMusicTrackLabel(track) {
    return state.lang === "ar" ? track.titleAr : track.titleEn;
  }

  function renderMusicControls() {
    if (!refs.musicTrackSelect || !refs.musicModeSelect || !refs.musicVolumeSlider || !refs.musicVolumeValue) return;

    const normalizedTrackId = normalizeMusicTrackId(state.musicTrackId);
    const normalizedMode = normalizeMusicMode(state.musicMode);
    state.musicTrackId = normalizedTrackId;
    state.musicMode = normalizedMode;

    refs.musicTrackSelect.innerHTML = "";
    for (const track of MUSIC_TRACKS) {
      const option = document.createElement("option");
      option.value = track.id;
      option.textContent = getMusicTrackLabel(track);
      refs.musicTrackSelect.appendChild(option);
    }
    refs.musicTrackSelect.value = normalizedTrackId;

    refs.musicModeSelect.innerHTML = "";
    const modes = [
      { id: "selected", label: tr("musicModeSelected") },
      { id: "shuffle", label: tr("musicModeShuffle") }
    ];
    for (const mode of modes) {
      const option = document.createElement("option");
      option.value = mode.id;
      option.textContent = mode.label;
      refs.musicModeSelect.appendChild(option);
    }
    refs.musicModeSelect.value = normalizedMode;

    const volumePercent = clamp(Math.round(clamp(state.musicVolume, 0, 1) * 100), 0, 100);
    refs.musicVolumeSlider.value = String(volumePercent);
    refs.musicVolumeValue.textContent = `${volumePercent}%`;
  }

  function applyMusicMode() {
    state.musicMode = normalizeMusicMode(state.musicMode);
    if (!refs.bgMusic) return;
    refs.bgMusic.loop = state.musicMode === "selected";

    if (state.musicMode === "shuffle" && MUSIC_TRACKS.length > 1 && !state.musicShuffleBag.length) {
      refillMusicShuffleBag();
    }
  }

  function refillMusicShuffleBag() {
    const currentId = normalizeMusicTrackId(state.musicTrackId);
    const bag = MUSIC_TRACKS
      .map((track) => track.id)
      .filter((id) => id !== currentId);

    for (let i = bag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = bag[i];
      bag[i] = bag[j];
      bag[j] = temp;
    }
    state.musicShuffleBag = bag;
  }

  function pickNextShuffleTrackId() {
    if (MUSIC_TRACKS.length <= 1) return MUSIC_TRACKS[0].id;
    if (!state.musicShuffleBag.length) {
      refillMusicShuffleBag();
    }
    const nextId = state.musicShuffleBag.shift();
    return nextId || MUSIC_TRACKS[0].id;
  }

  function initMusic() {
    if (!refs.bgMusic) return;

    state.musicTrackId = normalizeMusicTrackId(state.musicTrackId);
    state.musicMode = normalizeMusicMode(state.musicMode);

    refs.bgMusic.volume = clamp(state.musicVolume, 0, 1);
    refs.bgMusic.preload = "metadata";
    refs.bgMusic.crossOrigin = "anonymous";
    refs.bgMusic.addEventListener("pause", renderMusicButton);
    refs.bgMusic.addEventListener("play", renderMusicButton);
    refs.bgMusic.addEventListener("ended", onMusicEnded);
    refs.bgMusic.addEventListener("error", handleMusicPlaybackError);

    renderMusicControls();
    applyMusicMode();
    applyMusicTrack(state.musicTrackId);
    renderMusicButton();

    if (state.musicEnabled) {
      armMusicAutoplayOnFirstInteraction();
    }
  }

  function detectBestMusicSourceIndex(track) {
    if (!refs.bgMusic || typeof refs.bgMusic.canPlayType !== "function") return 0;

    let maybeIndex = -1;
    for (let i = 0; i < track.sources.length; i += 1) {
      const source = track.sources[i];
      const support = refs.bgMusic.canPlayType(source.type);
      if (support === "probably") return i;
      if (support && support !== "no" && maybeIndex < 0) {
        maybeIndex = i;
      }
    }
    return maybeIndex >= 0 ? maybeIndex : 0;
  }

  function setMusicSource(track, sourceIndex) {
    if (!refs.bgMusic) return false;
    if (!track || !track.sources || !track.sources.length) return false;

    const safeIndex = clamp(Math.round(sourceIndex), 0, track.sources.length - 1);
    const source = track.sources[safeIndex];
    if (!source || !source.url) return false;

    const sourceChanged = refs.bgMusic.dataset.trackId !== track.id
      || Number(refs.bgMusic.dataset.sourceIndex) !== safeIndex;
    state.musicTrackId = track.id;
    state.musicSourceIndex = safeIndex;
    if (!sourceChanged) return true;

    refs.bgMusic.src = source.url;
    refs.bgMusic.dataset.trackId = track.id;
    refs.bgMusic.dataset.sourceIndex = String(safeIndex);
    refs.bgMusic.load();
    return true;
  }

  function applyMusicTrack(trackId) {
    const track = getMusicTrackById(trackId);
    const sourceIndex = detectBestMusicSourceIndex(track);
    const applied = setMusicSource(track, sourceIndex);
    if (!applied) return false;
    renderMusicControls();
    return true;
  }

  function armMusicAutoplayOnFirstInteraction() {
    if (state.musicUnlockArmed) return;
    state.musicUnlockArmed = true;

    const unlockHandler = () => {
      window.removeEventListener("pointerdown", unlockHandler);
      window.removeEventListener("keydown", unlockHandler);
      state.musicUnlockArmed = false;
      if (state.musicEnabled) {
        playBackgroundMusic();
      }
    };

    window.addEventListener("pointerdown", unlockHandler, { once: true, passive: true });
    window.addEventListener("keydown", unlockHandler, { once: true });
  }

  function onMusicEnded() {
    if (!state.musicEnabled) return;

    if (state.musicMode === "shuffle") {
      const nextTrackId = pickNextShuffleTrackId();
      applyMusicTrack(nextTrackId);
    }
    playBackgroundMusic();
  }

  async function playBackgroundMusic() {
    if (!refs.bgMusic) return;

    ensureMusicAnalyser();
    if (state.musicAudioContext && state.musicAudioContext.state === "suspended") {
      try {
        await state.musicAudioContext.resume();
      } catch (error) {
        // Keep playback flow alive even if WebAudio resume fails.
      }
    }

    refs.bgMusic.volume = clamp(state.musicVolume, 0, 1);
    try {
      await refs.bgMusic.play();
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }

      if (error && (error.name === "NotAllowedError" || error.name === "SecurityError")) {
        armMusicAutoplayOnFirstInteraction();
        setStatus(tr("musicNeedTap"), "info");
      } else {
        handleMusicPlaybackError();
      }
    }

    renderMusicButton();
    if (state.symphonyEnabled) {
      startSymphonyLoop();
    }
  }

  function handleMusicPlaybackError() {
    if (!refs.bgMusic) return;

    const activeTrack = getMusicTrackById(state.musicTrackId);
    const nextSourceIndex = state.musicSourceIndex + 1;
    if (nextSourceIndex < activeTrack.sources.length) {
      setMusicSource(activeTrack, nextSourceIndex);
      if (state.musicEnabled) {
        playBackgroundMusic();
      }
      return;
    }

    if (state.musicMode === "shuffle" && MUSIC_TRACKS.length > 1) {
      const nextTrackId = pickNextShuffleTrackId();
      applyMusicTrack(nextTrackId);
      if (state.musicEnabled) {
        playBackgroundMusic();
      }
      return;
    }

    if (state.musicEnabled) {
      setStatus(tr("musicLoadError"), "warning");
    }
    state.musicEnabled = false;
    saveUXSettings();
    renderMusicButton();
  }

  function stopBackgroundMusic() {
    if (!refs.bgMusic) return;

    refs.bgMusic.pause();
    renderMusicButton();
    if (state.symphonyEnabled) {
      startSymphonyLoop();
    }
  }

  function renderMusicButton() {
    if (!refs.musicBtn) return;
    refs.musicBtn.textContent = state.musicEnabled ? tr("musicOn") : tr("musicOff");
    const isPlaying = !!(refs.bgMusic && !refs.bgMusic.paused);
    refs.musicBtn.classList.toggle("playing", state.musicEnabled && isPlaying);
  }

  function ensureMusicAnalyser() {
    if (state.musicAnalyser || state.musicAnalyserFailed || !refs.bgMusic) return;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      state.musicAnalyserFailed = true;
      return;
    }

    try {
      state.musicAudioContext = state.musicAudioContext || new AudioContextCtor();
      state.musicAnalyser = state.musicAudioContext.createAnalyser();
      state.musicAnalyser.fftSize = 256;
      state.musicAnalyser.smoothingTimeConstant = 0.84;
      state.musicAnalyserData = new Uint8Array(state.musicAnalyser.frequencyBinCount);
      state.musicSourceNode = state.musicAudioContext.createMediaElementSource(refs.bgMusic);
      state.musicSourceNode.connect(state.musicAnalyser);
      state.musicAnalyser.connect(state.musicAudioContext.destination);
    } catch (error) {
      state.musicAnalyserFailed = true;
      state.musicAnalyser = null;
      state.musicAnalyserData = null;
    }
  }

  function readMusicEnergy() {
    if (!state.musicAnalyser || !state.musicAnalyserData) return null;
    if (!refs.bgMusic || refs.bgMusic.paused) return null;

    try {
      state.musicAnalyser.getByteFrequencyData(state.musicAnalyserData);
    } catch (error) {
      return null;
    }

    const data = state.musicAnalyserData;
    if (!data.length) return null;

    const bassEnd = Math.max(2, Math.floor(data.length * 0.14));
    const midEnd = Math.max(bassEnd + 1, Math.floor(data.length * 0.45));

    let bass = 0;
    let mid = 0;
    for (let i = 0; i < bassEnd; i += 1) bass += data[i];
    for (let i = bassEnd; i < midEnd; i += 1) mid += data[i];

    const bassAvg = bass / bassEnd;
    const midAvg = mid / Math.max(1, midEnd - bassEnd);
    return clamp(((bassAvg * 1.18) + (midAvg * 0.82)) / (255 * 2), 0, 1);
  }

  function syncSymphonyFrame(now = performance.now()) {
    if (!refs.board) return;
    const stage = refs.board.parentElement;

    const audioEnergy = readMusicEnergy();
    const ambient = 0.1 + (Math.sin((now * 0.0016) + (state.symphonyPhase * 6)) * 0.04);
    const targetEnergy = audioEnergy === null ? ambient : clamp((audioEnergy * 0.9) + 0.06, 0.05, 1);

    state.symphonyEnergy = lerp(state.symphonyEnergy, targetEnergy, 0.16);
    state.symphonyPhase = (state.symphonyPhase + (0.0015 + (state.symphonyEnergy * 0.0075))) % 1;
    state.symphonyHue = 176 + (state.symphonyEnergy * 86) + (Math.sin(now * 0.00038) * 12);
    state.symphonyWaveOpacity = clamp(0.07 + (state.symphonyEnergy * 0.44), 0.07, 0.52);
    const auraOpacity = clamp(0.12 + (state.symphonyEnergy * 0.5), 0.16, 0.54);
    const glowPx = 8 + (state.symphonyEnergy * 16);
    const sparkA = 0.12 + (state.symphonyEnergy * 0.28);
    const sparkB = 0.08 + (state.symphonyEnergy * 0.18);

    refs.board.style.setProperty("--symphony-energy", state.symphonyEnergy.toFixed(3));
    refs.board.style.setProperty("--symphony-wave-opacity", state.symphonyWaveOpacity.toFixed(3));
    refs.board.style.setProperty("--symphony-hue", String(Math.round(state.symphonyHue)));
    refs.board.style.setProperty("--symphony-phase", `${state.symphonyPhase.toFixed(4)}turn`);
    refs.board.style.setProperty("--symphony-glow", `${glowPx.toFixed(2)}px`);
    refs.board.style.setProperty("--symphony-spark-a", sparkA.toFixed(3));
    refs.board.style.setProperty("--symphony-spark-b", sparkB.toFixed(3));
    if (stage) {
      stage.style.setProperty("--symphony-energy", state.symphonyEnergy.toFixed(3));
      stage.style.setProperty("--symphony-hue", String(Math.round(state.symphonyHue)));
      stage.style.setProperty("--symphony-phase", `${state.symphonyPhase.toFixed(4)}turn`);
      stage.style.setProperty("--symphony-aura-opacity", auraOpacity.toFixed(3));
    }
  }

  function startSymphonyLoop() {
    if (!state.symphonyEnabled || document.hidden || state.symphonyRafId !== null) return;

    const tick = (now) => {
      state.symphonyRafId = null;
      if (!state.symphonyEnabled || document.hidden) return;
      syncSymphonyFrame(now);
      state.symphonyRafId = requestAnimationFrame(tick);
    };

    state.symphonyRafId = requestAnimationFrame(tick);
  }

  function stopSymphonyLoop(resetVisual = false) {
    if (state.symphonyRafId !== null) {
      cancelAnimationFrame(state.symphonyRafId);
      state.symphonyRafId = null;
    }

    if (resetVisual && refs.board) {
      const stage = refs.board.parentElement;
      refs.board.style.setProperty("--symphony-energy", "0");
      refs.board.style.setProperty("--symphony-wave-opacity", "0");
      refs.board.style.setProperty("--symphony-glow", "8px");
      refs.board.style.setProperty("--symphony-spark-a", "0.12");
      refs.board.style.setProperty("--symphony-spark-b", "0.08");
      if (stage) {
        stage.style.setProperty("--symphony-energy", "0");
        stage.style.setProperty("--symphony-aura-opacity", "0");
      }
    }
  }

  function applySymphonyVisualState() {
    if (!refs.board) return;
    const stage = refs.board.parentElement;

    refs.board.dataset.symphony = state.symphonyEnabled ? "on" : "off";
    if (stage) {
      stage.dataset.symphony = state.symphonyEnabled ? "on" : "off";
    }
    if (state.symphonyEnabled) {
      syncSymphonyFrame(performance.now());
      startSymphonyLoop();
      return;
    }
    stopSymphonyLoop(true);
  }

  function pulseBoardTheme() {
    refs.board.classList.remove("theme-swap");
    void refs.board.offsetWidth;
    refs.board.classList.add("theme-swap");
  }

  function preloadPieceImages() {
    preloadPieceImagesForStyle(state.pieceStyle);
  }

  function getPieceCode(key) {
    return key[0] + key[1].toUpperCase();
  }

  function resolvePieceImageUrl(key, styleId) {
    if (styleId === "wiki") {
      return wikiPieceImageUrls[key];
    }
    const code = getPieceCode(key);
    return `https://lichess1.org/assets/piece/${styleId}/${code}.svg`;
  }

  function preloadPieceImagesForStyle(styleId) {
    const style = pieceStyles.find((item) => item.id === styleId);
    if (!style || style.mode === "glyph") return;

    for (const key of Object.keys(pieceSymbols)) {
      const url = resolvePieceImageUrl(key, styleId);
      if (!url || piecePreload.has(url)) continue;

      const img = new Image();
      img.decoding = "async";
      img.src = url;
      piecePreload.set(url, img);
    }
  }

  function updateMatchTitle() {
    if (state.mode === "puzzle") {
      refs.matchTiny.textContent = tr("puzzleModeTiny");
      const puzzleRange = getPuzzleRatingRange();
      const rating = state.puzzle ? state.puzzle.rating : puzzleRange.max;
      refs.matchTitle.textContent = tr("puzzleModeTitle", { rating });
      return;
    }

    refs.matchTiny.textContent = tr("currentMatch");
    refs.matchTitle.textContent = state.lang === "ar"
      ? `The Maestro ضد ${state.activeBot.name}`
      : `The Maestro vs ${state.activeBot.name}`;
  }

  function renderBotList() {
    refs.botList.innerHTML = "";

    for (const bot of bots) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bot-item" + (bot.id === state.activeBot.id ? " active" : "");

      btn.innerHTML = `
        <span class="bot-avatar">${bot.icon}</span>
        <span>
          <span class="bot-name">${bot.name}</span>
          <span class="bot-meta">${bot.role} • ${bot.rating}</span>
        </span>
      `;

      btn.addEventListener("click", () => {
        if (state.activeBot.id === bot.id) return;
        state.activeBot = bot;
        refs.activeBotRating.textContent = tr("botPower", { rating: bot.rating });
        renderBotList();
        startNewGame(true, state.matchStarted);
        setStatus(tr("selectedBot", { bot: bot.name }));
      });

      refs.botList.appendChild(btn);
    }

    refs.activeBotRating.textContent = tr("botPower", { rating: state.activeBot.rating });
  }

  function startPuzzleMode(forceNext) {
    stopClockLoop();
    clearBotTimer();
    clearPuzzleTimer();
    const previousFen = forceNext && state.puzzle ? state.puzzle.fen : "";

    const requested = Number(refs.puzzleMaxInput.value);
    if (state.puzzleLevel === "custom") {
      state.puzzleMaxRating = clamp(Number.isFinite(requested) ? Math.round(requested) : state.puzzleMaxRating, 600, 2500);
    }
    const puzzleRange = getPuzzleRatingRange();
    refs.puzzleMaxInput.value = String(puzzleRange.id === "custom" ? state.puzzleMaxRating : puzzleRange.max);
    saveUXSettings();

    state.mode = "puzzle";
    state.playerColor = "w";
    state.selectedSquare = null;
    state.selectionMode = "normal";
    state.targetSquares = [];
    state.lastMove = null;
    state.coachHint = null;
    state.premove = null;
    state.pendingAnimation = null;
    state.lastCoachBest = null;
    invalidateCoachCache();
    state.isBotThinking = false;
    state.timeEnded = false;
    state.puzzle = null;
    state.puzzleSolved = false;
    clearBoardMarkup(false);
    updateMatchTitle();
    renderPuzzlePanel();
    setStatus(tr("puzzleGenerating"), "info");
    refs.coachMood.textContent = tr("coachAnalysis");
    refs.coachMessage.textContent = tr("puzzleGuide");
    refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });

    state.puzzleTimer = setTimeout(() => {
      state.puzzleTimer = null;
      const puzzle = generatePuzzle(puzzleRange.min, puzzleRange.max, previousFen);
      if (state.mode !== "puzzle") return;
      if (!puzzle) {
        setStatus(tr("puzzleNoActive"), "warning");
        return;
      }

      game.load(puzzle.fen);
      state.playerColor = puzzle.side;
      state.orientation = state.playerColor === "w" ? "white" : "black";
      state.puzzle = puzzle;
      state.puzzleSolved = false;
      invalidateCoachCache();
      updateMatchTitle();
      syncAll();
      renderPuzzlePanel();
      setStatus(tr("puzzleReady", { rating: puzzle.rating }));
    }, 12);
  }

  function generatePuzzle(minRating, maxRating, excludedFen = "") {
    const safeMin = clamp(Math.round(minRating), 600, 2500);
    const safeMax = clamp(Math.round(maxRating), safeMin, 2500);
    const initialThreshold = safeMax >= 2200 ? 210 : safeMax >= 1700 ? 150 : 105;
    const thresholds = [initialThreshold, Math.round(initialThreshold * 0.75), 50];

    for (const threshold of thresholds) {
      for (let attempt = 0; attempt < 18; attempt++) {
        const targetRating = safeMin + Math.floor(Math.random() * (safeMax - safeMin + 1));
        const depth = targetRating >= 2200 ? 3 : targetRating >= 1500 ? 2 : 1;
        const plies = clamp(8 + Math.floor((targetRating - 600) / 110) + Math.floor(Math.random() * 6), 8, 30);

        const puzzleGame = new Chess();
        let valid = true;
        for (let ply = 0; ply < plies; ply++) {
          const options = puzzleGame.moves({ verbose: true });
          if (!options.length) {
            valid = false;
            break;
          }
          const selected = pickWeightedRandomMove(options);
          puzzleGame.move(selected);
          if (puzzleGame.game_over()) {
            valid = false;
            break;
          }
        }
        if (!valid) continue;

        const side = puzzleGame.turn();
        const profile = {
          depth,
          aggression: 1,
          noise: 0,
          blunder: 0,
          thinkMs: 0
        };
        const scored = scoreMoves(puzzleGame, side, profile.depth, profile);
        if (scored.length < 2) continue;

        const gap = scored[0].score - scored[1].score;
        if (gap < threshold) continue;
        if (excludedFen && puzzleGame.fen() === excludedFen) continue;

        return {
          fen: puzzleGame.fen(),
          rating: targetRating,
          side,
          gap,
          solution: {
            from: scored[0].move.from,
            to: scored[0].move.to,
            promotion: scored[0].move.promotion || null
          },
          solutionSan: scored[0].san
        };
      }
    }

    const fallbackGame = new Chess();
    const fallbackSide = fallbackGame.turn();
    const fallbackProfile = { depth: 1, aggression: 1, noise: 0, blunder: 0, thinkMs: 0 };
    const scoredFallback = scoreMoves(fallbackGame, fallbackSide, 1, fallbackProfile);
    if (!scoredFallback.length) return null;

    return {
      fen: fallbackGame.fen(),
      rating: clamp(safeMax, safeMin, 2500),
      side: fallbackSide,
      gap: scoredFallback.length > 1 ? scoredFallback[0].score - scoredFallback[1].score : 0,
      solution: {
        from: scoredFallback[0].move.from,
        to: scoredFallback[0].move.to,
        promotion: scoredFallback[0].move.promotion || null
      },
      solutionSan: scoredFallback[0].san
    };
  }

  function pickWeightedRandomMove(moves) {
    const weighted = [];
    let weightSum = 0;
    for (const move of moves) {
      const weight = 3 + tacticalMoveScore(move) / 120;
      weighted.push({ move, weight });
      weightSum += weight;
    }

    let ticket = Math.random() * weightSum;
    for (const entry of weighted) {
      ticket -= entry.weight;
      if (ticket <= 0) return entry.move;
    }
    return weighted[0].move;
  }

  function showPuzzleHint() {
    if (!state.puzzle || state.mode !== "puzzle") {
      setStatus(tr("puzzleNoActive"), "warning");
      return;
    }

    state.coachHint = {
      from: state.puzzle.solution.from,
      to: state.puzzle.solution.to
    };
    refs.coachMood.textContent = tr("coachWatching");
    refs.coachMessage.textContent = tr("puzzleGuide");
    refs.coachBestMove.textContent = tr("coachBestNow", {
      move: `${state.puzzle.solution.from}→${state.puzzle.solution.to}`
    });
    renderBoard();
    setStatus(tr("puzzleHintShown"), "info");
  }

  function renderPuzzlePanel() {
    if (!refs.puzzleStatus) return;
    const range = getPuzzleRatingRange();
    renderPuzzleLevelControls();
    const levelTitle = tr(range.labelKey);
    refs.puzzleRatingChip.textContent = state.puzzle
      ? `${state.puzzle.rating} • ${levelTitle}`
      : levelTitle;

    if (state.mode !== "puzzle" || !state.puzzle) {
      refs.puzzleStatus.textContent = tr("puzzleIdle");
      return;
    }

    refs.puzzleStatus.textContent = state.puzzleSolved
      ? tr("puzzleSolved")
      : tr("puzzleReady", { rating: state.puzzle.rating });
  }

  function startNewGame(resetMessage, autoStart = true) {
    stopClockLoop();
    clearBotTimer();
    clearPuzzleTimer();
    syncTimeControlFromInput();
    saveTimeControl();
    game.reset();

    state.mode = "game";
    state.playerColor = "w";
    state.orientation = "white";
    state.selectedSquare = null;
    state.selectionMode = "normal";
    state.targetSquares = [];
    state.lastMove = null;
    state.pendingAnimation = null;
    state.coachHint = null;
    state.premove = null;
    clearBoardMarkup(false);
    state.lastCoachBest = null;
    invalidateCoachCache();
    state.botRuntimeProfile = null;
    state.isBotThinking = false;
    state.timeEnded = false;
    state.matchStarted = autoStart;
    resetMatchReview();
    state.puzzle = null;
    state.puzzleSolved = false;
    resetClocks();

    updateMatchTitle();
    refs.coachMood.textContent = tr("coachReady");
    refs.coachMessage.textContent = tr("coachOpeningMsg");
    refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });

    if (!state.matchStarted) {
      setStatus(tr("startPrompt"), "info");
    } else if (resetMessage) {
      setStatus(tr("gameStarted"));
    }

    syncAll();
    refreshCoachBest();
    renderPuzzlePanel();

    if (state.matchStarted) {
      startClockLoop();
      if (game.turn() !== state.playerColor) {
        scheduleBotMove();
      }
    }
  }

  function syncAll() {
    renderBoard();
    playPendingMoveAnimation();
    renderTurn();
    renderClocks();
    renderMaterialInfo();
    renderMoveList();
    renderEvalBar();
  }

  function resetClocks() {
    const startMs = state.timeControlMinutes * 60 * 1000;
    state.whiteTimeMs = startMs;
    state.blackTimeMs = startMs;
  }

  function startClockLoop() {
    stopClockLoop();
    state.clockLoopActive = true;
    state.clockLastTickAt = performance.now();
    queueClockTick();
  }

  function stopClockLoop() {
    state.clockLoopActive = false;
    if (state.clockRafId !== null) {
      cancelAnimationFrame(state.clockRafId);
      state.clockRafId = null;
    }
    if (state.clockTimeoutId !== null) {
      clearTimeout(state.clockTimeoutId);
      state.clockTimeoutId = null;
    }
  }

  function queueClockTick() {
    if (!state.clockLoopActive) return;

    if (document.hidden) {
      state.clockTimeoutId = setTimeout(() => {
        state.clockTimeoutId = null;
        tickClock(performance.now());
        queueClockTick();
      }, 120);
      return;
    }

    state.clockRafId = requestAnimationFrame((now) => {
      state.clockRafId = null;
      tickClock(now);
      queueClockTick();
    });
  }

  function tickClock(now = performance.now()) {
    if (state.mode !== "game") return;
    if (!state.matchStarted) return;
    if (state.timeEnded || game.game_over()) return;

    if (!settleActiveClock(now)) return;

    renderClocks();
  }

  function renderClocks() {
    refs.whiteClock.textContent = formatClock(state.whiteTimeMs);
    refs.blackClock.textContent = formatClock(state.blackTimeMs);

    const activeTurn = state.mode === "game" && state.matchStarted && !state.timeEnded && !game.game_over() ? game.turn() : "";
    refs.whiteClockBox.classList.toggle("active", activeTurn === "w");
    refs.blackClockBox.classList.toggle("active", activeTurn === "b");

    refs.whiteClockBox.classList.toggle("danger", state.mode === "game" && state.matchStarted && state.whiteTimeMs <= 15000);
    refs.blackClockBox.classList.toggle("danger", state.mode === "game" && state.matchStarted && state.blackTimeMs <= 15000);
  }

  function formatClock(ms) {
    const safeMs = Math.max(0, ms);
    if (safeMs <= 0) return "00:00";

    if (safeMs < 10000) {
      const seconds = Math.floor(safeMs / 1000);
      const tenths = Math.floor((safeMs % 1000) / 100);
      return `${String(seconds).padStart(2, "0")}.${tenths}`;
    }

    const totalSec = Math.floor(safeMs / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function renderCapturedPieceList(container, capturedPieces) {
    container.innerHTML = "";

    if (!capturedPieces.length) {
      const empty = document.createElement("span");
      empty.className = "captured-empty";
      empty.textContent = "—";
      container.appendChild(empty);
      return;
    }

    for (const pieceKey of capturedPieces) {
      const item = document.createElement("span");
      item.className = `captured-piece ${pieceKey[0] === "w" ? "white" : "black"}`;
      item.textContent = pieceSymbols[pieceKey] || "";
      container.appendChild(item);
    }
  }

  function renderMaterialInfo() {
    if (
      !refs.whiteCapturedPieces
      || !refs.blackCapturedPieces
      || !refs.whiteMaterialDiff
      || !refs.blackMaterialDiff
    ) {
      return;
    }

    const whiteCaptured = [];
    const blackCaptured = [];
    let whiteGain = 0;
    let blackGain = 0;

    const history = game.history({ verbose: true });
    for (const move of history) {
      if (!move.captured) continue;

      const captureType = move.captured;
      const capturedColor = move.color === "w" ? "b" : "w";
      const capturedKey = capturedColor + captureType;
      const unit = materialUnitValue[captureType] || 0;

      if (move.color === "w") {
        whiteCaptured.push(capturedKey);
        whiteGain += unit;
      } else {
        blackCaptured.push(capturedKey);
        blackGain += unit;
      }
    }

    const sortCapturedPieces = (a, b) =>
      (capturePieceOrder[a[1]] ?? 9) - (capturePieceOrder[b[1]] ?? 9);

    whiteCaptured.sort(sortCapturedPieces);
    blackCaptured.sort(sortCapturedPieces);

    renderCapturedPieceList(refs.whiteCapturedPieces, whiteCaptured);
    renderCapturedPieceList(refs.blackCapturedPieces, blackCaptured);

    const diff = whiteGain - blackGain;
    refs.whiteMaterialDiff.textContent = diff > 0 ? `+${diff}` : "";
    refs.blackMaterialDiff.textContent = diff < 0 ? `+${Math.abs(diff)}` : "";
    refs.whiteMaterialDiff.classList.toggle("positive", diff > 0);
    refs.blackMaterialDiff.classList.toggle("positive", diff < 0);
  }

  function getBotColor() {
    return state.playerColor === "w" ? "b" : "w";
  }

  function getSideRemainingMs(side) {
    return side === "w" ? state.whiteTimeMs : state.blackTimeMs;
  }

  function consumeSideTime(side, elapsedMs) {
    if (side === "w") {
      state.whiteTimeMs = Math.max(0, state.whiteTimeMs - elapsedMs);
    } else {
      state.blackTimeMs = Math.max(0, state.blackTimeMs - elapsedMs);
    }
  }

  function isSideFlagged(side) {
    return getSideRemainingMs(side) <= 0;
  }

  function settleActiveClock(now = performance.now()) {
    if (state.mode !== "game" || !state.matchStarted || state.timeEnded || game.game_over()) {
      state.clockLastTickAt = now;
      return true;
    }

    if (document.hidden) {
      state.clockLastTickAt = now;
      return true;
    }

    const elapsed = Math.max(0, now - state.clockLastTickAt);
    if (elapsed <= 0) return true;

    const activeSide = game.turn();
    consumeSideTime(activeSide, elapsed);
    state.clockLastTickAt = now;

    if (isSideFlagged(activeSide)) {
      renderClocks();
      handleTimeOut(activeSide);
      return false;
    }

    return true;
  }

  function getTimedBotProfile() {
    const base = state.activeBot;
    const botColor = getBotColor();
    const remainingMs = getSideRemainingMs(botColor);
    const ply = game.history().length;
    const complexity = estimatePositionComplexity(game);
    const timePressure = clamp((30000 - remainingMs) / 30000, 0, 1);
    const errorLoad = 1 + (timePressure * 1.35) + (complexity * 0.5);

    let depth = base.depth;
    if (remainingMs <= 4500) {
      depth = 1;
    } else if (remainingMs <= 12000) {
      depth = Math.max(1, base.depth - 2);
    } else if (remainingMs <= 26000) {
      depth = Math.max(1, base.depth - 1);
    }

    const delayMs = computeAdaptiveThinkDelay(base.thinkMs, remainingMs, complexity, ply);
    const noise = Math.round(base.noise * (0.9 + (timePressure * 1.4) + (complexity * 0.25)));

    const baseInaccuracy = clamp(0.08 + (base.noise / 900), 0.07, 0.32);
    const baseMistake = clamp((base.blunder * 0.9) + (base.noise / 2000), 0.04, 0.26);
    const baseBlunder = clamp((base.blunder * 0.65) + (base.noise / 3500), 0.02, 0.18);

    const humanError = {
      inaccuracy: clamp(baseInaccuracy * errorLoad, 0.06, 0.56),
      mistake: clamp(baseMistake * errorLoad, 0.03, 0.34),
      blunder: clamp(baseBlunder * errorLoad, 0.015, 0.24)
    };

    return {
      ...base,
      depth,
      noise,
      delayMs,
      complexity,
      humanError
    };
  }

  function estimatePositionComplexity(chess) {
    const moves = chess.moves({ verbose: true });
    if (!moves.length) return 0;

    let captures = 0;
    let checks = 0;
    let promotions = 0;

    for (const move of moves) {
      if (move.captured) captures += 1;
      if (move.san.includes("+") || move.san.includes("#")) checks += 1;
      if (move.promotion) promotions += 1;
    }

    const mobility = clamp(moves.length / 38, 0, 1);
    const tactical = clamp(((captures * 1.2) + (checks * 1.5) + (promotions * 2)) / Math.max(1, moves.length), 0, 1);

    return clamp((mobility * 0.45) + (tactical * 0.55), 0, 1);
  }

  function computeAdaptiveThinkDelay(baseThinkMs, remainingMs, complexity, ply) {
    if (remainingMs <= 1800) return 0;

    const reserve = clamp(Math.round(remainingMs * 0.045), 180, 1600);
    const safeBudget = Math.max(0, remainingMs - reserve);
    if (safeBudget <= 0) return 0;

    const phaseMultiplier = ply < 16 ? 0.88 : (ply < 56 ? 1.02 : 0.82);
    const complexityMultiplier = 0.52 + (complexity * 0.78);
    const jitter = 0.72 + (Math.random() * 0.42);

    const raw = baseThinkMs * phaseMultiplier * complexityMultiplier * jitter;

    const maxByClock = remainingMs <= 10000
      ? remainingMs * 0.1
      : remainingMs <= 30000
        ? remainingMs * 0.08
        : remainingMs <= 120000
          ? remainingMs * 0.06
          : remainingMs * 0.045;

    const cap = Math.max(0, Math.min(1200, Math.floor(maxByClock), safeBudget));
    return clamp(Math.round(raw), 0, cap);
  }

  function getBoardRenderKey() {
    const lastMoveKey = state.lastMove ? `${state.lastMove.from}${state.lastMove.to}` : "-";
    const hintKey = state.coachHint ? `${state.coachHint.from}${state.coachHint.to}` : "-";
    const premoveKey = state.premove
      ? `${state.premove.from}${state.premove.to}${state.premove.promotion || ""}`
      : "-";
    return [
      game.fen(),
      state.orientation,
      state.boardTheme,
      state.pieceStyle,
      state.selectedSquare || "-",
      state.selectionMode,
      state.targetSquares.join(","),
      lastMoveKey,
      hintKey,
      premoveKey
    ].join("|");
  }

  function renderBoard() {
    const renderKey = getBoardRenderKey();
    if (state.boardRenderKey === renderKey && refs.board.childElementCount === 64) {
      renderArrowLayer();
      return;
    }

    state.boardRenderKey = renderKey;
    refs.board.innerHTML = "";
    applyVisualTheme();
    const activePieceStyle = pieceStyles.find((item) => item.id === state.pieceStyle) || pieceStyles[0];
    const fragment = document.createDocumentFragment();
    const targetSet = new Set(state.targetSquares);

    const rankOrder = state.orientation === "white"
      ? [7, 6, 5, 4, 3, 2, 1, 0]
      : [0, 1, 2, 3, 4, 5, 6, 7];

    const fileOrder = state.orientation === "white"
      ? [0, 1, 2, 3, 4, 5, 6, 7]
      : [7, 6, 5, 4, 3, 2, 1, 0];

    for (const rankIndex of rankOrder) {
      for (const fileIndex of fileOrder) {
        const squareName = files[fileIndex] + String(rankIndex + 1);
        const square = document.createElement("button");
        square.type = "button";
        square.className = "square " + (((fileIndex + rankIndex) % 2 === 0) ? "light" : "dark");
        square.dataset.square = squareName;

        const wave = document.createElement("span");
        wave.className = "cell-wave";
        const waveSeed = ((rankIndex * 8 + fileIndex) % 16) / 16;
        const waveDelay = ((rankIndex * 3 + fileIndex * 5) % 12) * 0.1;
        wave.style.setProperty("--cell-x", `${(14 + (waveSeed * 72)).toFixed(2)}%`);
        wave.style.setProperty("--cell-y", `${(22 + (waveSeed * 35)).toFixed(2)}%`);
        wave.style.setProperty("--cell-delay", `${waveDelay.toFixed(2)}s`);
        square.appendChild(wave);

        if (state.selectedSquare === squareName) {
          square.classList.add(state.selectionMode === "premove" ? "premove-selected" : "selected");
        }

        if (targetSet.has(squareName)) {
          square.classList.add(state.selectionMode === "premove" ? "premove-target" : "target");
        }

        if (state.lastMove && state.lastMove.from === squareName) {
          square.classList.add("last-from");
        }

        if (state.lastMove && state.lastMove.to === squareName) {
          square.classList.add("last-to");
        }

        if (state.coachHint && (state.coachHint.from === squareName || state.coachHint.to === squareName)) {
          square.classList.add("coach");
        }

        if (state.premove && state.premove.from === squareName) {
          square.classList.add("premove-from", "premove-queued-from");
        }

        if (state.premove && state.premove.to === squareName) {
          square.classList.add("premove-to", "premove-queued-to");
        }

        const piece = game.get(squareName);
        if (piece) {
          const key = piece.color + piece.type;
          if (activePieceStyle.mode === "glyph") {
            const glyph = document.createElement("span");
            glyph.className = `piece-glyph piece-el piece-${piece.color} glyph-style-${activePieceStyle.id}`;
            glyph.textContent = pieceSymbols[key];
            square.appendChild(glyph);
          } else {
            const img = document.createElement("img");
            img.className = `piece-img piece-el piece-${piece.color}`;
            img.src = resolvePieceImageUrl(key, activePieceStyle.id);
            img.alt = key;
            img.loading = "eager";
            img.decoding = "async";
            img.draggable = false;
            img.addEventListener("error", () => {
              if (!img.isConnected) return;
              const fallback = document.createElement("span");
              fallback.className = `piece-glyph piece-el piece-${piece.color} glyph-style-glyph`;
              fallback.textContent = pieceSymbols[key];
              img.replaceWith(fallback);
            }, { once: true });
            square.appendChild(img);
          }
        }

        const coordText = getCoordinateText(rankIndex, fileIndex);
        if (coordText) {
          const coord = document.createElement("span");
          coord.className = "coord";
          coord.textContent = coordText;
          square.appendChild(coord);
        }

        fragment.appendChild(square);
      }
    }
    refs.board.appendChild(fragment);
    renderArrowLayer();
  }

  function playPendingMoveAnimation() {
    const animation = state.pendingAnimation;
    if (!animation) return;
    state.pendingAnimation = null;

    const fromSquare = refs.board.querySelector(`[data-square="${animation.from}"]`);
    const toSquare = refs.board.querySelector(`[data-square="${animation.to}"]`);
    if (!fromSquare || !toSquare) return;

    const pieceAtTarget = toSquare.querySelector(".piece-el");
    if (!pieceAtTarget) return;

    const fromRect = fromSquare.getBoundingClientRect();
    const toRect = toSquare.getBoundingClientRect();
    const pieceRect = pieceAtTarget.getBoundingClientRect();

    const dx = fromRect.left - toRect.left;
    const dy = fromRect.top - toRect.top;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      pieceAtTarget.classList.add("arrive-pop");
      setTimeout(() => pieceAtTarget.classList.remove("arrive-pop"), 220);
      return;
    }

    const ghost = pieceAtTarget.cloneNode(true);
    ghost.classList.add("moving-ghost");
    ghost.style.left = `${pieceRect.left}px`;
    ghost.style.top = `${pieceRect.top}px`;
    ghost.style.width = `${pieceRect.width}px`;
    ghost.style.height = `${pieceRect.height}px`;
    document.body.appendChild(ghost);

    pieceAtTarget.style.visibility = "hidden";
    pieceAtTarget.classList.add("arrive-pop");

    if (typeof ghost.animate !== "function") {
      pieceAtTarget.style.visibility = "";
      pieceAtTarget.classList.remove("arrive-pop");
      ghost.remove();
      return;
    }

    const animationHandle = ghost.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1.02)`, opacity: 0.95 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 }
      ],
      {
        duration: 135,
        easing: "cubic-bezier(0.2, 0.8, 0.25, 1)",
        fill: "forwards"
      }
    );

    animationHandle.onfinish = () => {
      pieceAtTarget.style.visibility = "";
      pieceAtTarget.classList.remove("arrive-pop");
      ghost.remove();
    };
  }

  function handleArrowPointerDown(event, fromSquare) {
    if (!fromSquare) return;
    const canDrawMarkup = state.arrowsEnabled;
    if (!canDrawMarkup && !state.premove && !state.boardArrows.length && !state.boardMarks.length) {
      return;
    }

    const startX = event.clientX;
    const startY = event.clientY;
    const dragThresholdSq = 64;
    let moved = false;

    state.activePointerId = event.pointerId;
    const cleanup = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      state.activePointerId = null;
    };

    const onPointerMove = (moveEvent) => {
      if (state.activePointerId !== null && moveEvent.pointerId !== state.activePointerId) return;
      if (moved) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if ((dx * dx) + (dy * dy) >= dragThresholdSq) {
        moved = true;
      }
    };

    const onPointerUp = (upEvent) => {
      if (state.activePointerId !== null && upEvent.pointerId !== state.activePointerId) return;
      const targetElement = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      let toSquare = fromSquare;
      if (targetElement && typeof targetElement.closest === "function") {
        const toSquareEl = targetElement.closest(".square");
        if (toSquareEl && toSquareEl.dataset && toSquareEl.dataset.square) {
          toSquare = toSquareEl.dataset.square;
        }
      }
      if (!moved && state.premove) {
        state.premove = null;
        clearSelection();
        if (state.boardArrows.length || state.boardMarks.length) {
          clearBoardMarkup(false);
        }
        renderBoard();
        setStatus(tr("premoveCleared"), "info");
      } else if (!moved && (state.boardArrows.length || state.boardMarks.length)) {
        clearBoardMarkup(false);
      } else if (canDrawMarkup && toSquare === fromSquare) {
        toggleBoardMark(fromSquare);
      } else if (canDrawMarkup) {
        toggleBoardArrow(fromSquare, toSquare);
      }
      cleanup();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }

  function toggleBoardArrow(from, to) {
    const existsIndex = state.boardArrows.findIndex((entry) => entry.from === from && entry.to === to);
    if (existsIndex >= 0) {
      state.boardArrows.splice(existsIndex, 1);
    } else {
      state.boardArrows.push({ from, to });
      if (state.boardArrows.length > 8) {
        state.boardArrows.shift();
      }
    }
    renderArrowLayer();
  }

  function toggleBoardMark(square) {
    const existsIndex = state.boardMarks.indexOf(square);
    if (existsIndex >= 0) {
      state.boardMarks.splice(existsIndex, 1);
    } else {
      state.boardMarks.push(square);
      if (state.boardMarks.length > 8) {
        state.boardMarks.shift();
      }
    }
    renderArrowLayer();
  }

  function clearBoardMarkup(showStatus = true) {
    state.boardArrows = [];
    state.boardMarks = [];
    renderArrowLayer();
    if (showStatus) {
      setStatus(tr("arrowsCleared"));
    }
  }

  function renderArrowLayer() {
    if (!refs.arrowLayer) return;
    refs.arrowLayer.innerHTML = "";
    const hasPremove = !!state.premove;
    if (!state.arrowsEnabled && !hasPremove) return;

    const boardRect = refs.board.getBoundingClientRect();
    if (!boardRect.width || !boardRect.height) return;
    refs.arrowLayer.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);

    const centers = new Map();
    const squareToCenter = (squareName) => {
      if (centers.has(squareName)) return centers.get(squareName);
      const squareEl = refs.board.querySelector(`[data-square="${squareName}"]`);
      if (!squareEl) return null;
      const rect = squareEl.getBoundingClientRect();
      const center = {
        x: rect.left - boardRect.left + (rect.width / 2),
        y: rect.top - boardRect.top + (rect.height / 2),
        cell: rect.width
      };
      centers.set(squareName, center);
      return center;
    };

    const drawArrow = (fromSquare, toSquare, options = {}) => {
      const fromCenter = squareToCenter(fromSquare);
      const toCenter = squareToCenter(toSquare);
      if (!fromCenter || !toCenter) return;

      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 4) return;

      const ux = dx / distance;
      const uy = dy / distance;
      const stroke = Math.max(4, Math.round(fromCenter.cell * (options.strokeScale || 0.15)));
      const headLen = Math.max(10, fromCenter.cell * 0.32);
      const endX = toCenter.x - (ux * fromCenter.cell * 0.2);
      const endY = toCenter.y - (uy * fromCenter.cell * 0.2);
      const startX = fromCenter.x + (ux * fromCenter.cell * 0.06);
      const startY = fromCenter.y + (uy * fromCenter.cell * 0.06);
      const shaftEndX = endX - (ux * headLen * 0.72);
      const shaftEndY = endY - (uy * headLen * 0.72);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(startX));
      line.setAttribute("y1", String(startY));
      line.setAttribute("x2", String(shaftEndX));
      line.setAttribute("y2", String(shaftEndY));
      line.setAttribute("stroke", options.lineColor || "rgba(95, 183, 255, 0.78)");
      line.setAttribute("stroke-width", String(stroke));
      line.setAttribute("stroke-linecap", "round");
      if (options.lineClass) {
        line.setAttribute("class", options.lineClass);
      }
      if (options.dashed) {
        const dash = Math.max(6, fromCenter.cell * 0.22);
        const gap = Math.max(4, fromCenter.cell * 0.11);
        line.setAttribute("stroke-dasharray", `${dash} ${gap}`);
      }
      refs.arrowLayer.appendChild(line);

      const leftX = endX - (ux * headLen) + (-uy * headLen * 0.44);
      const leftY = endY - (uy * headLen) + (ux * headLen * 0.44);
      const rightX = endX - (ux * headLen) - (-uy * headLen * 0.44);
      const rightY = endY - (uy * headLen) - (ux * headLen * 0.44);
      const head = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      head.setAttribute("points", `${endX},${endY} ${leftX},${leftY} ${rightX},${rightY}`);
      head.setAttribute("fill", options.headColor || "rgba(95, 183, 255, 0.92)");
      if (options.headClass) {
        head.setAttribute("class", options.headClass);
      }
      refs.arrowLayer.appendChild(head);

      if (options.targetDot) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", String(toCenter.x));
        dot.setAttribute("cy", String(toCenter.y));
        dot.setAttribute("r", String(Math.max(4, toCenter.cell * 0.12)));
        dot.setAttribute("fill", options.dotColor || "rgba(120, 226, 255, 0.95)");
        if (options.dotClass) {
          dot.setAttribute("class", options.dotClass);
        }
        refs.arrowLayer.appendChild(dot);
      }
    };

    if (hasPremove) {
      drawArrow(state.premove.from, state.premove.to, {
        lineColor: "rgba(86, 206, 255, 0.96)",
        headColor: "rgba(86, 206, 255, 0.99)",
        dotColor: "rgba(155, 236, 255, 0.98)",
        lineClass: "premove-arrow-line",
        headClass: "premove-arrow-head",
        dotClass: "premove-arrow-dot",
        targetDot: true,
        dashed: true,
        strokeScale: 0.16
      });
    }

    if (!state.arrowsEnabled) return;

    for (const markSquare of state.boardMarks) {
      const c = squareToCenter(markSquare);
      if (!c) continue;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(c.x));
      circle.setAttribute("cy", String(c.y));
      circle.setAttribute("r", String(c.cell * 0.2));
      circle.setAttribute("fill", "rgba(253, 201, 86, 0.26)");
      circle.setAttribute("stroke", "rgba(255, 214, 120, 0.95)");
      circle.setAttribute("stroke-width", String(Math.max(2, c.cell * 0.06)));
      refs.arrowLayer.appendChild(circle);
    }

    for (const arrow of state.boardArrows) {
      drawArrow(arrow.from, arrow.to, {
        lineColor: "rgba(95, 183, 255, 0.78)",
        headColor: "rgba(95, 183, 255, 0.92)"
      });
    }
  }

  function onBoardPointerDown(event) {
    if (state.timeEnded) return;
    const squareEl = event.target.closest(".square");
    if (!squareEl || !refs.board.contains(squareEl)) return;

    const squareName = squareEl.dataset.square;
    if (!squareName) return;

    if (event.button === 2) {
      event.preventDefault();
      handleArrowPointerDown(event, squareName);
      return;
    }

    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    onSquareClick(squareName);
  }

  function getCoordinateText(rankIndex, fileIndex) {
    const isWhite = state.orientation === "white";

    if (isWhite) {
      if (rankIndex === 0) return files[fileIndex];
      if (fileIndex === 0) return String(rankIndex + 1);
      return "";
    }

    if (rankIndex === 7) return files[fileIndex];
    if (fileIndex === 7) return String(rankIndex + 1);
    return "";
  }

  function syncTimeControlFromInput() {
    if (!refs.timeControlInput) return state.timeControlMinutes;
    const requested = Number(refs.timeControlInput.value);
    const minutes = clamp(Number.isFinite(requested) ? Math.round(requested) : state.timeControlMinutes, 1, 180);
    state.timeControlMinutes = minutes;
    refs.timeControlInput.value = String(minutes);
    return minutes;
  }

  function onSquareClick(squareName) {
    if (state.timeEnded) return;
    if (game.game_over()) return;

    if (state.mode === "puzzle") {
      onPuzzleSquareClick(squareName);
      return;
    }

    if (!state.matchStarted) {
      setStatus(tr("startPrompt"), "info");
      return;
    }

    const isPlayersTurn = !state.isBotThinking && game.turn() === state.playerColor;
    const clickedPiece = game.get(squareName);

    if (!isPlayersTurn) {
      if (state.premoveEnabled) {
        handlePremoveClick(squareName, clickedPiece);
        return;
      }
      setStatus(tr(state.isBotThinking ? "waitBotFinish" : "waitBot"), "warning");
      return;
    }

    if (!state.selectedSquare) {
      if (clickedPiece && clickedPiece.color === state.playerColor) {
        selectSquare(squareName, "normal");
      }
      return;
    }

    if (state.selectedSquare === squareName) {
      clearSelection();
      renderBoard();
      return;
    }

    if (clickedPiece && clickedPiece.color === state.playerColor) {
      selectSquare(squareName, "normal");
      return;
    }

    const move = tryPlayPlayerMove(state.selectedSquare, squareName);
    if (!move) return;
    syncAll();
    if (handleGameOver()) return;
    scheduleBotMove();
  }

  function tryPlayPlayerMove(fromSquare, toSquare) {
    if (state.mode === "game" && !settleActiveClock(performance.now())) {
      return null;
    }

    const previousFen = game.fen();
    const coachBestBeforeMove = state.coachEnabled
      ? getCoachBestForCurrentPosition()
      : null;

    const moveRequest = { from: fromSquare, to: toSquare };
    const promotion = getPromotionIfNeeded(fromSquare, toSquare);
    if (promotion) {
      moveRequest.promotion = promotion;
    }

    if (state.mode === "game" && !settleActiveClock(performance.now())) {
      return null;
    }

    const move = game.move(moveRequest);
    if (!move) {
      setStatus(tr("illegalMove"), "error");
      return null;
    }

    state.lastMove = { from: move.from, to: move.to };
    state.pendingAnimation = { from: move.from, to: move.to };
    state.premove = null;
    clearSelection();
    state.coachHint = null;
    invalidateCoachCache();
    evaluatePlayerMove(previousFen, move, coachBestBeforeMove);
    return move;
  }

  function selectSquare(squareName, mode = "normal") {
    state.selectedSquare = squareName;
    state.selectionMode = mode;
    state.targetSquares = mode === "premove"
      ? getPremoveTargets(squareName)
      : game.moves({ square: squareName, verbose: true }).map((m) => m.to);
    renderBoard();
  }

  function clearSelection() {
    state.selectedSquare = null;
    state.selectionMode = "normal";
    state.targetSquares = [];
  }

  function getPremoveTargets(fromSquare) {
    const forcedFen = game.fen().split(" ");
    forcedFen[1] = state.playerColor;
    const clone = new Chess();
    if (!clone.load(forcedFen.join(" "))) {
      return [];
    }
    return clone.moves({ square: fromSquare, verbose: true }).map((move) => move.to);
  }

  function handlePremoveClick(squareName, clickedPiece) {
    if (!state.selectedSquare) {
      if (clickedPiece && clickedPiece.color === state.playerColor) {
        selectSquare(squareName, "premove");
      } else {
        setStatus(tr(state.isBotThinking ? "waitBotFinish" : "waitBot"), "warning");
      }
      return;
    }

    if (state.selectedSquare === squareName) {
      clearSelection();
      renderBoard();
      return;
    }

    if (clickedPiece && clickedPiece.color === state.playerColor) {
      selectSquare(squareName, "premove");
      return;
    }

    const from = state.selectedSquare;
    const to = squareName;
    if (state.targetSquares.length && !state.targetSquares.includes(to)) {
      setStatus(tr("illegalMove"), "warning");
      return;
    }
    const promotion = getPromotionIfNeeded(from, to);
    state.premove = {
      from,
      to,
      promotion: promotion || undefined
    };
    clearSelection();
    renderBoard();
    setStatus(tr("premoveQueued"), "info");
  }

  function tryExecutePremove() {
    if (!state.premove || state.mode !== "game") {
      return false;
    }

    const queued = state.premove;
    state.premove = null;
    clearSelection();

    const move = tryPlayPlayerMove(queued.from, queued.to);
    if (!move) {
      renderBoard();
      setStatus(tr("premoveCanceled"), "warning");
      refreshCoachBest();
      return true;
    }

    syncAll();
    if (handleGameOver()) {
      return true;
    }

    setStatus(tr("premovePlayed", { san: move.san }));
    scheduleBotMove();
    return true;
  }

  function onPuzzleSquareClick(squareName) {
    if (!state.puzzle || state.puzzleSolved) {
      return;
    }

    if (game.turn() !== state.playerColor) {
      setStatus(tr("waitBot"), "warning");
      return;
    }

    const clickedPiece = game.get(squareName);

    if (!state.selectedSquare) {
      if (clickedPiece && clickedPiece.color === state.playerColor) {
        selectSquare(squareName, "normal");
      }
      return;
    }

    if (state.selectedSquare === squareName) {
      clearSelection();
      renderBoard();
      return;
    }

    if (clickedPiece && clickedPiece.color === state.playerColor) {
      selectSquare(squareName, "normal");
      return;
    }

    const from = state.selectedSquare;
    const to = squareName;
    const expected = state.puzzle.solution;
    const expectedPromotion = expected.promotion || null;
    const attemptedPromotion = getPromotionIfNeeded(from, to);
    const matches =
      expected.from === from &&
      expected.to === to &&
      (expectedPromotion ? expectedPromotion === attemptedPromotion : true);

    if (!matches) {
      setStatus(tr("puzzleWrong"), "warning");
      refs.coachMood.textContent = tr("coachAnalysis");
      refs.coachMessage.textContent = tr("puzzleWrong");
      return;
    }

    const moveRequest = {
      from,
      to,
      promotion: expectedPromotion || attemptedPromotion || undefined
    };
    const move = game.move(moveRequest);
    clearSelection();
    if (!move) {
      setStatus(tr("illegalMove"), "error");
      return;
    }

    state.puzzleSolved = true;
    state.lastMove = { from: move.from, to: move.to };
    state.pendingAnimation = { from: move.from, to: move.to };
    invalidateCoachCache();
    syncAll();
    refs.coachMood.textContent = tr("coachWinner");
    refs.coachMessage.textContent = tr("puzzleSolved");
    refs.coachBestMove.textContent = tr("coachBestWas", {
      move: `${state.puzzle.solutionSan} (${state.puzzle.solution.from}→${state.puzzle.solution.to})`
    });
    setStatus(tr("puzzleSolved"), "success");
    renderPuzzlePanel();
  }

  function getPromotionIfNeeded(fromSquare, toSquare) {
    const piece = game.get(fromSquare);
    if (!piece || piece.type !== "p") return null;

    const isPromotionRank =
      (piece.color === "w" && toSquare.endsWith("8")) ||
      (piece.color === "b" && toSquare.endsWith("1"));

    if (!isPromotionRank) return null;
    if (state.autoQueen) return "q";

    const answerText = window.prompt(tr("choosePromo"), "q");
    const normalized = (answerText || "q").trim().toLowerCase();
    if (["q", "r", "b", "n"].includes(normalized)) {
      return normalized;
    }
    return "q";
  }

  function renderTurn() {
    const isWhiteTurn = game.turn() === "w";
    refs.turnBadge.textContent = isWhiteTurn ? tr("turnWhite") : tr("turnBlack");
  }

  function renderMoveList() {
    const history = game.history({ verbose: true });
    refs.moveList.innerHTML = "";

    for (let i = 0; i < history.length; i += 2) {
      const whiteMove = history[i];
      const blackMove = history[i + 1];
      const index = Math.floor(i / 2) + 1;

      const li = document.createElement("li");
      li.textContent = `${index}. ${whiteMove ? whiteMove.san : ""} ${blackMove ? blackMove.san : ""}`;
      refs.moveList.appendChild(li);
    }

    refs.moveCount.textContent = tr("moveCount", { count: history.length });
  }

  function renderEvalBar() {
    const evalForWhite = evaluatePosition(game, "w", COACH_PROFILE);
    const normalized = 50 + Math.tanh(evalForWhite / 900) * 44;
    const percent = clamp(normalized, 6, 94);
    refs.evalFill.style.height = `${percent}%`;
  }

  function resetMatchReview() {
    state.matchReview.moves = [];
    renderMatchReview();
  }

  function recordMatchReview(moveSan, gap, grade, accuracy) {
    state.matchReview.moves.push({
      san: moveSan,
      gap,
      gradeKey: grade.key,
      gradeTitle: grade.title,
      severity: grade.severity,
      level: grade.level,
      accuracy
    });
    renderMatchReview();
  }

  function renderMatchReview() {
    if (!refs.reviewSummary || !refs.reviewList || !refs.reviewBadge) return;

    const moves = state.matchReview.moves;
    if (!moves.length) {
      refs.reviewSummary.textContent = tr("reviewIdle");
      refs.reviewList.innerHTML = "";
      refs.reviewBadge.textContent = tr("reviewBadgeIdle");
      return;
    }

    const accuracy = moves.length
      ? Math.round(moves.reduce((total, entry) => total + (entry.accuracy || 0), 0) / moves.length)
      : 0;
    const mistakes = moves.filter((entry) => entry.severity >= GRADE_SEVERITY.gradeMistake).length;
    const blunders = moves.filter((entry) => entry.severity >= GRADE_SEVERITY.gradeBlunder).length;
    const baseSummary = tr("reviewActive", {
      accuracy,
      mistakes,
      blunders
    });
    const resultLabel = getMatchResultLabel();
    refs.reviewSummary.textContent = resultLabel ? `${baseSummary} ${resultLabel}` : baseSummary;
    refs.reviewBadge.textContent = (state.timeEnded || game.game_over())
      ? tr("reviewBadgeReady")
      : tr("reviewBadgeLive");

    const bestEntry = moves.reduce((best, entry) => (entry.gap < best.gap ? entry : best), moves[0]);
    const worstEntry = moves.reduce((worst, entry) => (entry.gap > worst.gap ? entry : worst), moves[0]);
    const lastMistake = moves.slice().reverse().find((entry) => entry.severity >= GRADE_SEVERITY.gradeMistake);

    const listItems = [];
    if (bestEntry) {
      listItems.push(formatReviewEntry(tr("reviewBestLabel"), bestEntry));
    }
    if (worstEntry && worstEntry !== bestEntry) {
      listItems.push(formatReviewEntry(tr("reviewWorstLabel"), worstEntry));
    }
    if (lastMistake && lastMistake !== worstEntry && lastMistake !== bestEntry) {
      listItems.push(formatReviewEntry(tr("reviewLastMistakeLabel"), lastMistake));
    }
    if (!listItems.length && bestEntry) {
      listItems.push(formatReviewEntry(tr("reviewBestLabel"), bestEntry));
    }
    refs.reviewList.innerHTML = listItems.join("");
  }

  function formatReviewEntry(label, entry) {
    if (!entry) return "";
    const gapValue = Math.round(Math.max(0, entry.gap));
    return `<li><strong>${label}</strong><span>${entry.san} (${entry.gradeTitle}) · CPL ${gapValue}</span></li>`;
  }

  function getMatchResultLabel() {
    if (!state.matchReview.moves.length) return "";
    if (state.timeEnded && !game.game_over()) {
      const playerFlagged = isSideFlagged(state.playerColor);
      return tr(playerFlagged ? "reviewResultLose" : "reviewResultWin");
    }
    if (game.game_over()) {
      if (game.in_checkmate()) {
        const winner = game.turn() === "w" ? "b" : "w";
        return winner === state.playerColor ? tr("reviewResultWin") : tr("reviewResultLose");
      }
      if (game.in_stalemate() || game.in_draw() || game.in_threefold_repetition()) {
        return tr("reviewResultDraw");
      }
    }
    return "";
  }

  function scheduleBotMove() {
    if (state.mode !== "game" || state.timeEnded) return;
    clearBotTimer();
    state.isBotThinking = true;
    state.botRuntimeProfile = getTimedBotProfile();
    const delayMs = state.botRuntimeProfile.delayMs;
    setStatus(tr("botThinking", { bot: state.activeBot.name }), "warning");

    const startThink = () => {
      state.botTimer = null;
      makeBotMove();
    };

    if (delayMs <= 12) {
      if (document.hidden) {
        state.botTimer = setTimeout(startThink, 0);
      } else {
        requestAnimationFrame(startThink);
      }
      return;
    }

    state.botTimer = setTimeout(startThink, delayMs);
  }

  function makeBotMove() {
    if (state.mode !== "game") return;
    if (state.timeEnded) return;
    if (game.game_over()) {
      state.isBotThinking = false;
      return;
    }

    const settleAtStart = performance.now();
    if (!settleActiveClock(settleAtStart)) return;

    const profile = state.botRuntimeProfile || getTimedBotProfile();
    const calcStartedAt = performance.now();
    const move = pickBotMove(profile);
    const calcElapsedMs = performance.now() - calcStartedAt;
    state.botRuntimeProfile = null;

    const botColor = getBotColor();
    consumeSideTime(botColor, calcElapsedMs);
    state.clockLastTickAt = performance.now();
    if (isSideFlagged(botColor)) {
      renderClocks();
      handleTimeOut(botColor);
      return;
    }

    if (!move) {
      state.isBotThinking = false;
      handleGameOver();
      return;
    }

    if (!settleActiveClock(performance.now())) return;

    const played = game.move({ from: move.from, to: move.to, promotion: move.promotion || "q" });
    state.lastMove = { from: played.from, to: played.to };
    state.pendingAnimation = { from: played.from, to: played.to };
    state.isBotThinking = false;
    invalidateCoachCache();

    refs.coachMood.textContent = tr("coachWatching");
    refs.coachMessage.textContent = tr("botPlayed", { san: played.san });

    syncAll();
    if (handleGameOver()) return;
    if (tryExecutePremove()) return;

    refreshCoachBest();
    setStatus(tr("yourTurn"));
  }

  function pickBotMove(runtimeProfile = null) {
    const profile = runtimeProfile || state.activeBot;
    const scoredMoves = scoreMoves(game, getBotColor(), profile.depth, profile);

    if (scoredMoves.length === 0) return null;

    const complexity = Number.isFinite(profile.complexity)
      ? clamp(profile.complexity, 0, 1)
      : estimatePositionComplexity(game);
    const errors = profile.humanError || {
      inaccuracy: clamp(0.09 + (profile.noise / 1000), 0.06, 0.35),
      mistake: clamp((profile.blunder || 0.08) * 0.9, 0.03, 0.24),
      blunder: clamp((profile.blunder || 0.08) * 0.6, 0.015, 0.16)
    };

    const topWindow = clamp(Math.round(profile.noise / 56) + 2, 2, 8);
    const roll = Math.random();
    let blunderChance = clamp(errors.blunder * (0.85 + (complexity * 0.7)), 0, 0.55);
    let mistakeChance = clamp(errors.mistake * (0.9 + (complexity * 0.45)), 0, 0.65);
    let inaccuracyChance = clamp(errors.inaccuracy * (1.0 + (complexity * 0.35)), 0, 0.8);

    const errorSum = blunderChance + mistakeChance + inaccuracyChance;
    const maxErrorBudget = 0.88;
    if (errorSum > maxErrorBudget) {
      const scale = maxErrorBudget / errorSum;
      blunderChance *= scale;
      mistakeChance *= scale;
      inaccuracyChance *= scale;
    }

    if (roll < blunderChance) {
      const move = pickMoveFromRange(scoredMoves, topWindow + 2, scoredMoves.length - 1);
      if (move) return move;
    }

    if (roll < blunderChance + mistakeChance) {
      const move = pickMoveFromRange(
        scoredMoves,
        Math.max(1, Math.floor(topWindow / 2)),
        Math.min(scoredMoves.length - 1, topWindow + 3)
      );
      if (move) return move;
    }

    if (roll < blunderChance + mistakeChance + inaccuracyChance) {
      const move = pickMoveFromRange(scoredMoves, 1, Math.min(scoredMoves.length - 1, topWindow));
      if (move) return move;
    }

    return pickWeightedTopMove(scoredMoves, topWindow);
  }

  function pickMoveFromRange(scoredMoves, startIndex, endIndex) {
    if (!scoredMoves.length) return null;
    const start = clamp(Math.floor(startIndex), 0, scoredMoves.length - 1);
    const end = clamp(Math.floor(endIndex), start, scoredMoves.length - 1);
    const pickIndex = start + Math.floor(Math.random() * (end - start + 1));
    return scoredMoves[pickIndex]?.move || null;
  }

  function pickWeightedTopMove(scoredMoves, topWindow) {
    if (!scoredMoves.length) return null;
    const candidateCount = clamp(topWindow, 1, scoredMoves.length);
    const candidates = scoredMoves.slice(0, candidateCount);

    let weightSum = 0;
    for (let i = 0; i < candidates.length; i++) {
      weightSum += (candidateCount - i) ** 2;
    }

    let lottery = Math.random() * weightSum;
    for (let i = 0; i < candidates.length; i++) {
      lottery -= (candidateCount - i) ** 2;
      if (lottery <= 0) {
        return candidates[i].move;
      }
    }

    return candidates[0].move;
  }

  function evaluatePlayerMove(prevFen, move, coachBest) {
    if (!state.coachEnabled || !coachBest) {
      setStatus(tr("playedMove", { san: move.san }));
      return;
    }

    const clone = new Chess(prevFen);
    clone.move({ from: move.from, to: move.to, promotion: move.promotion || "q" });

    const playedScore = minimax(clone, 1, -Infinity, Infinity, state.playerColor, COACH_PROFILE, new Map());
    const gap = coachBest.score - playedScore;

    const grade = classifyMove(gap);
    const accuracy = clamp(Math.round(100 - (gap / 4.2)), 12, 100);

    state.stats.accuracyTotal += accuracy;
    state.stats.accuracyCount += 1;
    saveStats();
    renderStats();

    refs.coachMood.textContent = grade.title;
    refs.coachMessage.textContent = grade.message;

    const best = coachBest.move;
    refs.coachBestMove.textContent = tr("coachBestWas", {
      move: `${coachBest.san} (${best.from}→${best.to})`
    });

    const cplValue = Math.max(0, Math.round(gap));
    recordMatchReview(move.san, gap, grade, accuracy);
    setStatus(
      tr("moveReport", {
        san: move.san,
        grade: grade.title,
        acc: accuracy,
        cpl: cplValue
      }),
      grade.level
    );
  }

  function classifyMove(gap) {
    if (gap <= 20) {
      return {
        key: "gradeBrilliant",
        title: tr("gradeBrilliant"),
        message: tr("gradeMsgBrilliant"),
        level: "",
        severity: GRADE_SEVERITY.gradeBrilliant
      };
    }

    if (gap <= 70) {
      return {
        key: "gradeGreat",
        title: tr("gradeGreat"),
        message: tr("gradeMsgGreat"),
        level: "",
        severity: GRADE_SEVERITY.gradeGreat
      };
    }

    if (gap <= 140) {
      return {
        key: "gradeGood",
        title: tr("gradeGood"),
        message: tr("gradeMsgGood"),
        level: "",
        severity: GRADE_SEVERITY.gradeGood
      };
    }

    if (gap <= 260) {
      return {
        key: "gradeInaccuracy",
        title: tr("gradeInaccuracy"),
        message: tr("gradeMsgInaccuracy"),
        level: "warning",
        severity: GRADE_SEVERITY.gradeInaccuracy
      };
    }

    if (gap <= 420) {
      return {
        key: "gradeMistake",
        title: tr("gradeMistake"),
        message: tr("gradeMsgMistake"),
        level: "warning",
        severity: GRADE_SEVERITY.gradeMistake
      };
    }

    return {
      key: "gradeBlunder",
      title: tr("gradeBlunder"),
      message: tr("gradeMsgBlunder"),
      level: "error",
      severity: GRADE_SEVERITY.gradeBlunder
    };
  }

  function refreshCoachBest() {
    if (state.mode !== "game" || state.timeEnded || !state.coachEnabled || game.turn() !== state.playerColor || game.game_over()) {
      state.lastCoachBest = null;
      refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });
      return;
    }

    const best = getCoachBestForCurrentPosition();
    state.lastCoachBest = best;

    if (best) {
      refs.coachBestMove.textContent = tr("coachBestNow", {
        move: `${best.san} (${best.move.from}→${best.move.to})`
      });
    } else {
      refs.coachBestMove.textContent = tr("coachBestNow", { move: "-" });
    }
  }

  function getCoachBestForCurrentPosition() {
    const key = `${game.fen()}|${state.playerColor}|${COACH_PROFILE.depth}`;
    if (state.coachCacheKey === key) {
      return state.coachCacheBest;
    }
    const best = computeBestMove(game, state.playerColor, COACH_PROFILE.depth, COACH_PROFILE);
    state.coachCacheKey = key;
    state.coachCacheBest = best;
    return best;
  }

  function invalidateCoachCache() {
    state.coachCacheKey = "";
    state.coachCacheBest = null;
  }

  function computeBestMove(chess, side, depth, profile) {
    const scored = scoreMoves(chess, side, depth, profile);
    return scored.length ? scored[0] : null;
  }

  function scoreMoves(chess, side, depth, profile) {
    const legalMoves = chess.moves({ verbose: true });
    const orderedMoves = orderMovesByTactics(legalMoves);
    const searchCache = new Map();
    const scored = [];

    for (const move of orderedMoves) {
      chess.move(move);
      const baseScore = minimax(chess, depth - 1, -Infinity, Infinity, side, profile, searchCache);
      const styleScore = styleBonus(move, profile);
      const noise = profile.noise ? (Math.random() * profile.noise - profile.noise / 2) : 0;
      const total = baseScore + styleScore + noise;
      chess.undo();

      scored.push({
        move,
        san: move.san,
        score: total
      });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored;
  }

  function minimax(chess, depth, alpha, beta, perspective, profile, cache = null) {
    const cacheKey = cache ? `${chess.fen()}|${depth}|${perspective}` : "";
    if (cache && cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (depth <= 0 || chess.game_over()) {
      const evalScore = evaluatePosition(chess, perspective, profile);
      if (cache) cache.set(cacheKey, evalScore);
      return evalScore;
    }

    const legalMoves = orderMovesByTactics(chess.moves({ verbose: true }));
    const maximizing = chess.turn() === perspective;

    if (maximizing) {
      let maxEval = -Infinity;
      for (const move of legalMoves) {
        chess.move(move);
        const evaluation = minimax(chess, depth - 1, alpha, beta, perspective, profile, cache);
        chess.undo();
        if (evaluation > maxEval) maxEval = evaluation;
        if (evaluation > alpha) alpha = evaluation;
        if (beta <= alpha) break;
      }
      if (cache) cache.set(cacheKey, maxEval);
      return maxEval;
    }

    let minEval = Infinity;
    for (const move of legalMoves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, perspective, profile, cache);
      chess.undo();
      if (evaluation < minEval) minEval = evaluation;
      if (evaluation < beta) beta = evaluation;
      if (beta <= alpha) break;
    }
    if (cache) cache.set(cacheKey, minEval);
    return minEval;
  }

  function orderMovesByTactics(moves) {
    if (!moves || moves.length < 2) return moves || [];
    return moves.slice().sort((a, b) => tacticalMoveScore(b) - tacticalMoveScore(a));
  }

  function tacticalMoveScore(move) {
    let score = 0;
    if (move.promotion) score += 950;
    if (move.captured) score += 220 + (pieceValue[move.captured] || 0);
    if (move.san.includes("#")) score += 1200;
    if (move.san.includes("+")) score += 140;
    if (move.flags.includes("k") || move.flags.includes("q")) score += 50;
    if (["d4", "e4", "d5", "e5"].includes(move.to)) score += 20;
    return score;
  }

  function evaluatePosition(chess, perspective, profile) {
    if (chess.in_checkmate()) {
      if (chess.turn() === perspective) return -100000;
      return 100000;
    }

    if (chess.in_stalemate() || chess.in_draw() || chess.in_threefold_repetition()) {
      return 0;
    }

    const board = chess.board();
    let score = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue;

        let value = pieceValue[piece.type] || 0;
        value += positionalBonus(piece.type, piece.color, row, col);

        if (piece.color === "w") score += value;
        else score -= value;
      }
    }

    const centerSquares = ["d4", "e4", "d5", "e5"];
    for (const sq of centerSquares) {
      const piece = chess.get(sq);
      if (!piece) continue;
      score += piece.color === "w" ? 16 : -16;
    }

    if (chess.in_check()) {
      score += chess.turn() === "w" ? -40 : 40;
    }

    score += (profile.aggression - 1) * tacticalPressure(chess);

    if (perspective === "b") score *= -1;
    return score;
  }

  function tacticalPressure(chess) {
    const moves = chess.moves({ verbose: true });
    let pressure = 0;
    for (const move of moves) {
      if (move.captured) pressure += 9;
      if (move.san.includes("+")) pressure += 7;
    }
    return pressure;
  }

  function positionalBonus(type, color, row, col) {
    const rank = color === "w" ? 7 - row : row;

    let bonus = 0;

    if (type === "p") {
      bonus += rank * 6;
      if (col >= 2 && col <= 5) bonus += 4;
    }

    if (type === "n") {
      const centerDist = Math.abs(3.5 - col) + Math.abs(3.5 - row);
      bonus += Math.round((4 - centerDist) * 10);
    }

    if (type === "b") {
      bonus += (7 - Math.abs(3.5 - col) - Math.abs(3.5 - row)) * 3;
    }

    if (type === "r") {
      if (rank >= 5) bonus += 12;
    }

    if (type === "q") {
      bonus += Math.round((3 - Math.abs(3.5 - col)) * 2);
    }

    if (type === "k") {
      if (rank <= 1) bonus += 14;
      if (col >= 2 && col <= 5) bonus += 6;
    }

    return bonus;
  }

  function styleBonus(move, profile) {
    let bonus = 0;

    if (move.captured) {
      bonus += (pieceValue[move.captured] || 0) * (0.14 * profile.aggression);
    }

    if (move.promotion) {
      bonus += 350;
    }

    if (move.san.includes("+")) {
      bonus += 35 * profile.aggression;
    }

    if (move.flags.includes("k") || move.flags.includes("q")) {
      bonus += 14;
    }

    if (["d4", "e4", "d5", "e5"].includes(move.to)) {
      bonus += 11;
    }

    return bonus;
  }

  function handleTimeOut(flaggedColor) {
    if (state.mode !== "game") return;
    if (state.timeEnded) return;

    state.timeEnded = true;
    stopClockLoop();
    clearBotTimer();
    state.isBotThinking = false;

    const playerLostOnTime = flaggedColor === state.playerColor;
    state.stats.games += 1;
    if (playerLostOnTime) {
      state.stats.losses += 1;
      refs.coachMood.textContent = tr("coachAnalysis");
      refs.coachMessage.textContent = tr("timeOutLose");
      setStatus(tr("timeOutLose"), "error");
    } else {
      state.stats.wins += 1;
      refs.coachMood.textContent = tr("coachWinner");
      refs.coachMessage.textContent = tr("timeOutWin");
      setStatus(tr("timeOutWin"), "success");
    }

    saveStats();
    renderStats();
    renderClocks();
    refreshCoachBest();
  }

  function handleGameOver() {
    if (state.mode !== "game") return false;
    if (!game.game_over()) {
      return false;
    }

    stopClockLoop();
    state.isBotThinking = false;
    clearBotTimer();

    let resultText = tr("gameOver");

    state.stats.games += 1;

    if (game.in_checkmate()) {
      const winner = game.turn() === "w" ? "b" : "w";
      if (winner === state.playerColor) {
        resultText = tr("gameWon");
        state.stats.wins += 1;
        refs.coachMood.textContent = tr("coachWinner");
        refs.coachMessage.textContent = tr("gradeMsgBrilliant");
      } else {
        resultText = tr("gameLost");
        state.stats.losses += 1;
        refs.coachMood.textContent = tr("coachAnalysis");
        refs.coachMessage.textContent = tr("gradeMsgMistake");
      }
    } else {
      resultText = tr("gameDraw");
      state.stats.draws += 1;
      refs.coachMood.textContent = tr("coachStable");
      refs.coachMessage.textContent = tr("gradeMsgGood");
    }

    saveStats();
    renderStats();
    setStatus(resultText);
    refreshCoachBest();
    return true;
  }

  function renderStats() {
    const accuracy = state.stats.accuracyCount
      ? Math.round(state.stats.accuracyTotal / state.stats.accuracyCount)
      : 0;

    refs.gamesStat.textContent = String(state.stats.games);
    refs.winsStat.textContent = String(state.stats.wins);
    refs.drawsStat.textContent = String(state.stats.draws);
    refs.lossesStat.textContent = String(state.stats.losses);
    refs.accuracyStat.textContent = `${accuracy}%`;
  }

  function setStatus(text, level = "") {
    refs.statusLine.textContent = text;
    refs.statusLine.className = "status-line" + (level ? ` ${level}` : "");
  }

  function loadStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultStats();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.games !== "number") return defaultStats();
      return {
        games: parsed.games,
        wins: parsed.wins,
        draws: parsed.draws,
        losses: parsed.losses,
        accuracyTotal: Number(parsed.accuracyTotal) || 0,
        accuracyCount: Number(parsed.accuracyCount) || 0
      };
    } catch (error) {
      return defaultStats();
    }
  }

  function saveStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stats));
  }

  function loadVisualSettings() {
    const fallback = {
      boardTheme: boardThemes[0].id,
      pieceStyle: pieceStyles[0].id
    };

    try {
      const raw = localStorage.getItem(VISUAL_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      const legacyPieceStyles = {
        svg: "wiki",
        "svg-glass": "merida"
      };
      const normalizedPieceStyle = legacyPieceStyles[parsed.pieceStyle] || parsed.pieceStyle;

      const boardTheme = boardThemes.some((theme) => theme.id === parsed.boardTheme)
        ? parsed.boardTheme
        : fallback.boardTheme;

      const pieceStyle = pieceStyles.some((style) => style.id === normalizedPieceStyle)
        ? normalizedPieceStyle
        : fallback.pieceStyle;

      return { boardTheme, pieceStyle };
    } catch (error) {
      return fallback;
    }
  }

  function saveVisualSettings() {
    localStorage.setItem(VISUAL_KEY, JSON.stringify({
      boardTheme: state.boardTheme,
      pieceStyle: state.pieceStyle
    }));
  }

  function loadTimeControl() {
    const raw = Number(localStorage.getItem(TIME_KEY));
    if (!Number.isFinite(raw)) return 5;
    return clamp(Math.round(raw), 1, 180);
  }

  function saveTimeControl() {
    localStorage.setItem(TIME_KEY, String(state.timeControlMinutes));
  }

  function loadUXSettings() {
    const fallback = {
      premoveEnabled: true,
      arrowsEnabled: true,
      symphonyEnabled: true,
      puzzleLevel: "intermediate",
      puzzleMaxRating: 2500,
      musicEnabled: false,
      musicVolume: 0.25,
      musicTrackId: MUSIC_TRACKS[0].id,
      musicMode: "selected"
    };

    try {
      const raw = localStorage.getItem(UX_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      const parsedMusicVolume = Number(parsed.musicVolume);
      return {
        premoveEnabled: parsed.premoveEnabled !== false,
        arrowsEnabled: parsed.arrowsEnabled !== false,
        symphonyEnabled: parsed.symphonyEnabled !== false,
        puzzleLevel: normalizePuzzleLevel(parsed.puzzleLevel),
        puzzleMaxRating: clamp(Math.round(Number(parsed.puzzleMaxRating) || 2500), 600, 2500),
        musicEnabled: parsed.musicEnabled === true,
        musicVolume: clamp(Number.isFinite(parsedMusicVolume) ? parsedMusicVolume : 0.25, 0, 1),
        musicTrackId: normalizeMusicTrackId(parsed.musicTrackId),
        musicMode: normalizeMusicMode(parsed.musicMode)
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveUXSettings() {
    localStorage.setItem(UX_KEY, JSON.stringify({
      premoveEnabled: state.premoveEnabled,
      arrowsEnabled: state.arrowsEnabled,
      symphonyEnabled: state.symphonyEnabled,
      puzzleLevel: normalizePuzzleLevel(state.puzzleLevel),
      puzzleMaxRating: state.puzzleMaxRating,
      musicEnabled: state.musicEnabled,
      musicVolume: clamp(state.musicVolume, 0, 1),
      musicTrackId: normalizeMusicTrackId(state.musicTrackId),
      musicMode: normalizeMusicMode(state.musicMode)
    }));
  }

  function loadLanguage() {
    const value = localStorage.getItem(LANG_KEY);
    return value === "en" ? "en" : "ar";
  }

  function saveLanguage() {
    localStorage.setItem(LANG_KEY, state.lang);
  }

  function defaultStats() {
    return {
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      accuracyTotal: 0,
      accuracyCount: 0
    };
  }

  function clearBotTimer() {
    if (state.botTimer) {
      clearTimeout(state.botTimer);
      state.botTimer = null;
    }
    state.botRuntimeProfile = null;
  }

  function clearPuzzleTimer() {
    if (state.puzzleTimer) {
      clearTimeout(state.puzzleTimer);
      state.puzzleTimer = null;
    }
  }

  function historyLastMove() {
    const history = game.history({ verbose: true });
    if (!history.length) return null;
    const move = history[history.length - 1];
    return { from: move.from, to: move.to };
  }

  function lerp(from, to, amount) {
    return from + ((to - from) * amount);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
})();
