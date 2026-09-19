const LANGS = ["en", "es", "ru", "tr"];

const I18N = {
  en: { brandSub:"Strength • Hypertrophy • Conditioning", language:"Language", weeklyTarget:"Weekly target", liftingDays:"Lifting days", cardioDays:"Cardio days", mainFocus:"Main focus", mainFocusText:"Progress weighted dips and weighted pull-ups while keeping the whole body balanced.", program:"Program", today:"Today", resetDay:"Reset day", sessionProgress:"Session progress", todaysSession:"Today's session", exercises:"Exercises", progression:"Progression", doubleProgression:"Double progression", progressionText:"Reach the top of the rep range first. Then increase the load by a small step.", example:"Example", effort:"Effort", rirGuide:"RIR guide", mainCompounds:"Main compounds", isolationWork:"Isolation work", warmupSets:"Warm-up sets", easy:"Easy", cardioGoal:"Cardio goal", cardioTitle:"Build capacity, don't destroy recovery.", cardioText:"Low–moderate intensity. Incline walk, bike or elliptical.", sets:"Sets", reps:"Reps", rest:"Rest", complete:"Complete exercise", exercise:"exercise", exercisesN:"exercises", set:{w2w2:"2 warm-up + 2 work", w2w3:"2 warm-up + 3 work", w1:"1 work", w2:"2 work", w3:"3 work", s1:"1 session", optional:"Optional"} },
  es: { brandSub:"Fuerza • Hipertrofia • Acondicionamiento", language:"Idioma", weeklyTarget:"Objetivo semanal", liftingDays:"Días de pesas", cardioDays:"Días de cardio", mainFocus:"Enfoque principal", mainFocusText:"Progresar en fondos y dominadas lastradas manteniendo todo el cuerpo equilibrado.", program:"Programa", today:"Hoy", resetDay:"Reiniciar día", sessionProgress:"Progreso de la sesión", todaysSession:"Sesión de hoy", exercises:"Ejercicios", progression:"Progresión", doubleProgression:"Doble progresión", progressionText:"Primero alcanza el límite superior del rango de repeticiones. Después aumenta un poco el peso.", example:"Ejemplo", effort:"Esfuerzo", rirGuide:"Guía de RIR", mainCompounds:"Compuestos principales", isolationWork:"Aislamientos", warmupSets:"Series de calentamiento", easy:"Suave", cardioGoal:"Objetivo de cardio", cardioTitle:"Mejora tu capacidad sin perjudicar la recuperación.", cardioText:"Intensidad baja–moderada. Caminata inclinada, bici o elíptica.", sets:"Series", reps:"Reps", rest:"Descanso", complete:"Completar ejercicio", exercise:"ejercicio", exercisesN:"ejercicios", set:{w2w2:"2 calentamiento + 2 efectivas", w2w3:"2 calentamiento + 3 efectivas", w1:"1 efectiva", w2:"2 efectivas", w3:"3 efectivas", s1:"1 sesión", optional:"Opcional"} },
  ru: { brandSub:"Сила • Гипертрофия • Кондиция", language:"Язык", weeklyTarget:"Цель на неделю", liftingDays:"Силовые дни", cardioDays:"Кардио-дни", mainFocus:"Главный фокус", mainFocusText:"Прогрессировать в отжиманиях на брусьях и подтягиваниях с весом, сохраняя баланс всего тела.", program:"Программа", today:"Сегодня", resetDay:"Сбросить день", sessionProgress:"Прогресс тренировки", todaysSession:"Сегодняшняя тренировка", exercises:"Упражнения", progression:"Прогрессия", doubleProgression:"Двойная прогрессия", progressionText:"Сначала дойди до верхней границы повторений, затем немного увеличь вес.", example:"Пример", effort:"Усилие", rirGuide:"Ориентир RIR", mainCompounds:"Базовые упражнения", isolationWork:"Изоляция", warmupSets:"Разминочные подходы", easy:"Легко", cardioGoal:"Цель кардио", cardioTitle:"Развивай выносливость, не мешая восстановлению.", cardioText:"Низкая–умеренная интенсивность: дорожка с наклоном, велосипед или эллипс.", sets:"Подходы", reps:"Повторы", rest:"Отдых", complete:"Отметить упражнение", exercise:"упражнение", exercisesN:"упражнений", set:{w2w2:"2 разминки + 2 рабочих", w2w3:"2 разминки + 3 рабочих", w1:"1 рабочий", w2:"2 рабочих", w3:"3 рабочих", s1:"1 сессия", optional:"По желанию"} },
  tr: { brandSub:"Güç • Hipertrofi • Kondisyon", language:"Dil", weeklyTarget:"Haftalık hedef", liftingDays:"Ağırlık günleri", cardioDays:"Kardiyo günleri", mainFocus:"Ana odak", mainFocusText:"Tüm vücudu dengeli tutarken ağırlıklı dips ve ağırlıklı barfikste ilerle.", program:"Program", today:"Bugün", resetDay:"Günü sıfırla", sessionProgress:"Antrenman ilerlemesi", todaysSession:"Bugünkü antrenman", exercises:"Hareketler", progression:"Progresyon", doubleProgression:"Double progression", progressionText:"Önce tekrar aralığının üst sınırına ulaş. Sonra ağırlığı küçük bir adımla artır.", example:"Örnek", effort:"Efor", rirGuide:"RIR rehberi", mainCompounds:"Ana compound hareketler", isolationWork:"İzolasyon hareketleri", warmupSets:"Isınma setleri", easy:"Kolay", cardioGoal:"Kardiyo hedefi", cardioTitle:"Kapasiteyi artır, toparlanmayı bozma.", cardioText:"Düşük–orta şiddet. Eğimli yürüyüş, bisiklet veya eliptik.", sets:"Set", reps:"Tekrar", rest:"Dinlenme", complete:"Hareketi tamamla", exercise:"hareket", exercisesN:"hareket", set:{w2w2:"2 ısınma + 2 çalışma", w2w3:"2 ısınma + 3 çalışma", w1:"1 çalışma", w2:"2 çalışma", w3:"3 çalışma", s1:"1 seans", optional:"İsteğe bağlı"} }
};

const DAY_TEXT = {
  "upper-a": {
    day:{en:"Monday",es:"Lunes",ru:"Понедельник",tr:"Pazartesi"}, short:{en:"Upper A",es:"Superior A",ru:"Верх A",tr:"Upper A"},
    title:{en:"Upper A — Strength",es:"Superior A — Fuerza",ru:"Верх A — Сила",tr:"Upper A — Güç"},
    subtitle:{en:"Heavy compounds, low volume, high-quality sets.",es:"Compuestos pesados, poco volumen y series de alta calidad.",ru:"Тяжёлая база, небольшой объём и качественные подходы.",tr:"Ağır compound hareketler, düşük hacim, yüksek kaliteli setler."},
    badge:{en:"UPPER BODY • STRENGTH",es:"TREN SUPERIOR • FUERZA",ru:"ВЕРХ ТЕЛА • СИЛА",tr:"ÜST VÜCUT • GÜÇ"},
    heroTitle:{en:"Move heavy. Keep every rep clean.",es:"Mueve pesado. Mantén cada repetición limpia.",ru:"Работай тяжело. Каждый повтор — чисто.",tr:"Ağır çalış. Her tekrarı temiz tut."},
    heroText:{en:"Two warm-up sets and two hard working sets on the main lifts. Keep technique strict and track progression.",es:"Dos series de calentamiento y dos series efectivas duras en los ejercicios principales. Mantén la técnica y registra la progresión.",ru:"В основных упражнениях — два разминочных и два тяжёлых рабочих подхода. Сохраняй технику и отслеживай прогресс.",tr:"Ana hareketlerde 2 ısınma + 2 ağır çalışma seti. Formu koru ve progresyonu takip et."}
  },
  "lower-a": {
    day:{en:"Tuesday",es:"Martes",ru:"Вторник",tr:"Salı"}, short:{en:"Lower A",es:"Inferior A",ru:"Низ A",tr:"Lower A"},
    title:{en:"Lower A — Strength",es:"Inferior A — Fuerza",ru:"Низ A — Сила",tr:"Lower A — Güç"},
    subtitle:{en:"Strength-biased lower-body training.",es:"Trabajo de tren inferior con énfasis en fuerza.",ru:"Тренировка низа тела с акцентом на силу.",tr:"Güç odaklı alt vücut antrenmanı."},
    badge:{en:"LOWER BODY • STRENGTH",es:"TREN INFERIOR • FUERZA",ru:"НИЗ ТЕЛА • СИЛА",tr:"ALT VÜCUT • GÜÇ"},
    heroTitle:{en:"Build the base that carries everything.",es:"Construye la base que sostiene todo.",ru:"Построй фундамент для всего остального.",tr:"Her şeyi taşıyan temeli inşa et."},
    heroText:{en:"A squat-focused day combining quads, hamstrings and unilateral strength.",es:"Día centrado en sentadilla para trabajar cuádriceps, isquios y fuerza unilateral.",ru:"День с акцентом на присед: квадрицепсы, бицепс бедра и односторонняя сила.",tr:"Squat odaklı gün; quadriceps, hamstring ve tek taraflı kuvveti birlikte geliştir."}
  },
  "cardio-1": {
    day:{en:"Wednesday",es:"Miércoles",ru:"Среда",tr:"Çarşamba"}, short:{en:"Cardio",es:"Cardio",ru:"Кардио",tr:"Kardiyo"},
    title:{en:"Cardio — Active Recovery",es:"Cardio — Recuperación activa",ru:"Кардио — Активное восстановление",tr:"Kardiyo — Aktif Dinlenme"},
    subtitle:{en:"Conditioning without killing recovery.",es:"Acondicionamiento sin perjudicar la recuperación.",ru:"Кондиция без ущерба восстановлению.",tr:"Toparlanmayı bozmadan kondisyon."},
    badge:{en:"CONDITIONING • ZONE 2",es:"ACONDICIONAMIENTO • ZONA 2",ru:"КОНДИЦИЯ • ЗОНА 2",tr:"KONDİSYON • ZONE 2"},
    heroTitle:{en:"Improve capacity. Preserve recovery.",es:"Mejora tu capacidad. Conserva la recuperación.",ru:"Улучшай выносливость. Сохраняй восстановление.",tr:"Kapasiteyi artır. Toparlanmayı koru."},
    heroText:{en:"Use low–moderate intensity cardio to support conditioning, circulation and work capacity.",es:"Usa cardio de intensidad baja–moderada para mejorar condición, circulación y capacidad de trabajo.",ru:"Кардио низкой–умеренной интенсивности поддерживает выносливость, кровообращение и работоспособность.",tr:"Düşük–orta şiddette kardiyo ile kondisyonu, dolaşımı ve çalışma kapasitesini destekle."}
  },
  "upper-b": {
    day:{en:"Thursday",es:"Jueves",ru:"Четверг",tr:"Perşembe"}, short:{en:"Upper B",es:"Superior B",ru:"Верх B",tr:"Upper B"},
    title:{en:"Upper B — Hypertrophy",es:"Superior B — Hipertrofia",ru:"Верх B — Гипертрофия",tr:"Upper B — Hipertrofi"},
    subtitle:{en:"More volume, controlled reps, muscle-building focus.",es:"Más volumen, repeticiones controladas y enfoque en masa muscular.",ru:"Больше объёма, контролируемые повторы и акцент на рост мышц.",tr:"Daha fazla hacim, kontrollü tekrarlar ve kas gelişimi odağı."},
    badge:{en:"UPPER BODY • HYPERTROPHY",es:"TREN SUPERIOR • HIPERTROFIA",ru:"ВЕРХ ТЕЛА • ГИПЕРТРОФИЯ",tr:"ÜST VÜCUT • HİPERTROFİ"},
    heroTitle:{en:"More volume. Same standards.",es:"Más volumen. El mismo nivel de ejecución.",ru:"Больше объёма. Те же стандарты техники.",tr:"Daha fazla hacim. Aynı kalite."},
    heroText:{en:"Higher reps and more total volume, with direct work for chest, biceps, side delts and rear delts.",es:"Más repeticiones y volumen total, con trabajo directo para pecho, bíceps, deltoides laterales y posteriores.",ru:"Больше повторов и общего объёма, плюс прямая работа на грудь, бицепс, средние и задние дельты.",tr:"Daha yüksek tekrar ve hacim; göğüs, biceps, yan omuz ve arka omuza doğrudan çalışma."}
  },
  "lower-b": {
    day:{en:"Friday",es:"Viernes",ru:"Пятница",tr:"Cuma"}, short:{en:"Lower B",es:"Inferior B",ru:"Низ B",tr:"Lower B"},
    title:{en:"Lower B — Hypertrophy",es:"Inferior B — Hipertrofia",ru:"Низ B — Гипертрофия",tr:"Lower B — Hipertrofi"},
    subtitle:{en:"Higher-rep lower-body hypertrophy work.",es:"Trabajo de hipertrofia de tren inferior con repeticiones más altas.",ru:"Гипертрофия низа тела в более высоком диапазоне повторений.",tr:"Daha yüksek tekrarlı alt vücut hipertrofi çalışması."},
    badge:{en:"LOWER BODY • HYPERTROPHY",es:"TREN INFERIOR • HIPERTROFIA",ru:"НИЗ ТЕЛА • ГИПЕРТРОФИЯ",tr:"ALT VÜCUT • HİPERTROFİ"},
    heroTitle:{en:"Volume for legs. Control every rep.",es:"Volumen para piernas. Controla cada repetición.",ru:"Объём для ног. Контролируй каждый повтор.",tr:"Bacaklara hacim. Her tekrarı kontrol et."},
    heroText:{en:"Leg-press focused volume for quads and hamstrings while keeping unilateral work.",es:"Volumen centrado en prensa para cuádriceps e isquios, manteniendo trabajo unilateral.",ru:"Объём с акцентом на жим ногами для квадрицепсов и бицепса бедра с сохранением односторонней работы.",tr:"Leg press odaklı hacim; quad ve hamstring çalışırken tek taraflı hareketi koru."}
  },
  "cardio-2": {
    day:{en:"Saturday",es:"Sábado",ru:"Суббота",tr:"Cumartesi"}, short:{en:"Cardio",es:"Cardio",ru:"Кардио",tr:"Kardiyo"},
    title:{en:"Cardio — Conditioning",es:"Cardio — Acondicionamiento",ru:"Кардио — Кондиция",tr:"Kardiyo — Kondisyon"},
    subtitle:{en:"Low-to-moderate intensity conditioning.",es:"Acondicionamiento de intensidad baja a moderada.",ru:"Кардио низкой–умеренной интенсивности.",tr:"Düşük–orta şiddetli kondisyon çalışması."},
    badge:{en:"CONDITIONING • RECOVERY",es:"ACONDICIONAMIENTO • RECUPERACIÓN",ru:"КОНДИЦИЯ • ВОССТАНОВЛЕНИЕ",tr:"KONDİSYON • TOPARLANMA"},
    heroTitle:{en:"Finish the week with capacity work.",es:"Termina la semana trabajando la capacidad.",ru:"Заверши неделю работой на выносливость.",tr:"Haftayı kapasite çalışmasıyla bitir."},
    heroText:{en:"Do 25–40 minutes based on leg fatigue, without creating unnecessary fatigue.",es:"Haz 25–40 minutos según la fatiga de las piernas, sin crear cansancio innecesario.",ru:"25–40 минут в зависимости от усталости ног, без лишнего утомления.",tr:"Bacak yorgunluğuna göre 25–40 dakika; gereksiz yorgunluk yaratma."}
  },
  rest: {
    day:{en:"Sunday",es:"Domingo",ru:"Воскресенье",tr:"Pazar"}, short:{en:"Rest",es:"Descanso",ru:"Отдых",tr:"Dinlenme"},
    title:{en:"Rest Day",es:"Día de descanso",ru:"День отдыха",tr:"Dinlenme Günü"},
    subtitle:{en:"Recover, walk lightly, come back stronger.",es:"Recupérate, camina suave y vuelve más fuerte.",ru:"Восстановись, немного прогуляйся и вернись сильнее.",tr:"Toparlan, hafif yürü ve daha güçlü dön."},
    badge:{en:"RECOVERY DAY",es:"DÍA DE RECUPERACIÓN",ru:"ДЕНЬ ВОССТАНОВЛЕНИЯ",tr:"TOPARLANMA GÜNÜ"},
    heroTitle:{en:"Recovery is part of progression.",es:"La recuperación forma parte del progreso.",ru:"Восстановление — часть прогресса.",tr:"Toparlanma progresyonun bir parçasıdır."},
    heroText:{en:"Full rest or a light walk. Prioritize sleep, protein and hydration.",es:"Descanso completo o una caminata suave. Prioriza sueño, proteína e hidratación.",ru:"Полный отдых или лёгкая прогулка. Приоритет — сон, белок и вода.",tr:"Tam dinlenme veya hafif yürüyüş. Uyku, protein ve hidrasyona öncelik ver."}
  }
};

const E = {
  pullup:{name:{en:"Weighted Pull-Ups",es:"Dominadas lastradas",ru:"Подтягивания с весом",tr:"Ağırlıklı Barfiks"},note:{en:"Warm up with bodyweight, then ramp toward the working load.",es:"Calienta con peso corporal y sube gradualmente hacia la carga de trabajo.",ru:"Разомнись с собственным весом и постепенно подойди к рабочему весу.",tr:"Vücut ağırlığıyla ısın, ardından çalışma ağırlığına kademeli çık."}},
  dips:{name:{en:"Weighted Dips",es:"Fondos lastrados",ru:"Отжимания на брусьях с весом",tr:"Ağırlıklı Dips"},note:{en:"Use controlled depth and keep the shoulders stable.",es:"Usa una profundidad controlada y mantén los hombros estables.",ru:"Контролируй глубину и положение плеч.",tr:"Derinliği kontrollü tut ve omuzları sabit koru."}},
  ohp:{name:{en:"Military / Overhead Press",es:"Press militar / sobre la cabeza",ru:"Армейский жим / жим над головой",tr:"Military / Overhead Press"},note:{en:"Brace hard and avoid excessive lower-back extension.",es:"Mantén el core firme y evita arquear demasiado la zona lumbar.",ru:"Жёстко стабилизируй корпус и не переразгибай поясницу.",tr:"Core'u sıkı tut ve beli aşırı arkaya atma."}},
  skull:{name:{en:"Barbell Skull Crushers",es:"Extensión de tríceps tumbado con barra",ru:"Французский жим лёжа со штангой",tr:"Barla Skull Crusher"},note:{en:"Keep the elbows controlled and load the triceps.",es:"Controla los codos y carga el tríceps.",ru:"Контролируй локти и нагружай трицепс.",tr:"Dirsekleri kontrollü tut ve triceps'i yükle."}},
  crunch:{name:{en:"Cable Crunch",es:"Crunch en polea",ru:"Скручивания на блоке",tr:"Kabloda Karın Crunch"},note:{en:"Curl the torso instead of simply hinging at the hips.",es:"Flexiona el torso en vez de doblarte solo desde la cadera.",ru:"Скручивай корпус, а не просто сгибайся в тазу.",tr:"Sadece kalçadan eğilmek yerine gövdeyi kıvır."}},
  squat:{name:{en:"Barbell Squat",es:"Sentadilla con barra",ru:"Приседания со штангой",tr:"Barbell Squat / Halterle Squat"},note:{en:"Prioritize consistent depth and technique over load.",es:"Prioriza profundidad y técnica antes que el peso.",ru:"Ставь глубину и технику выше веса.",tr:"Ağırlıktan önce tutarlı derinlik ve forma öncelik ver."}},
  bulgarian:{name:{en:"Bulgarian Split Squat",es:"Sentadilla búlgara",ru:"Болгарские сплит-приседания",tr:"Bulgarian Split Squat"},note:{en:"Use equal reps on both legs and control the descent.",es:"Haz las mismas repeticiones en ambas piernas y controla la bajada.",ru:"Одинаковые повторы на обе ноги, опускание под контролем.",tr:"İki bacakta eşit tekrar yap ve inişi kontrol et."}},
  ham:{name:{en:"Hamstring Curl / Leg Curl",es:"Curl femoral",ru:"Сгибание ног",tr:"Hamstring Curl / Arka Bacak Curl"},note:{en:"Control the eccentric and squeeze the hamstrings.",es:"Controla la fase excéntrica y aprieta los isquios.",ru:"Контролируй негатив и сокращай бицепс бедра.",tr:"Negatif fazı kontrol et ve hamstringleri sık."}},
  extension:{name:{en:"Leg Extension",es:"Extensión de piernas",ru:"Разгибание ног",tr:"Leg Extension / Ön Bacak"},note:{en:"Control the lockout and squeeze at the top.",es:"Controla la extensión y aprieta arriba.",ru:"Контролируй разгибание и сокращение вверху.",tr:"Üstte kontrollü kilitle ve kası sık."}},
  decline:{name:{en:"Weighted Decline Crunch",es:"Crunch declinado con peso",ru:"Скручивания на наклонной с весом",tr:"Ağırlıklı Decline Crunch"},note:{en:"Use a 30–45° decline and keep the movement abdominal.",es:"Usa una inclinación de 30–45° y mueve desde el abdomen.",ru:"Наклон 30–45°, движение за счёт пресса.",tr:"30–45° eğim kullan ve hareketi karından yap."}},
  cardio:{name:{en:"Incline Treadmill / Bike / Elliptical",es:"Cinta inclinada / Bici / Elíptica",ru:"Дорожка с наклоном / Велосипед / Эллипс",tr:"Eğimli Yürüyüş / Bisiklet / Eliptik"},note:{en:"Clearly active pace, but still able to speak in short sentences.",es:"Ritmo activo, pero todavía puedes hablar en frases cortas.",ru:"Рабочий темп, но можно говорить короткими фразами.",tr:"Belirgin eforlu ama kısa konuşmaya izin veren tempo."}},
  pec:{name:{en:"Pec Deck Fly",es:"Aperturas en pec deck",ru:"Сведение рук в pec deck",tr:"Pec Deck Göğüs Fly"},note:{en:"Open under control and squeeze the pecs hard in front.",es:"Abre con control y aprieta fuerte el pecho al cerrar.",ru:"Контролируй растяжение и сильно сокращай грудь.",tr:"Kontrollü açıl ve önde göğsü güçlü sık."}},
  row:{name:{en:"Seated Cable Row / Chest-Supported Row",es:"Remo sentado / Remo con pecho apoyado",ru:"Горизонтальная тяга / Тяга с упором грудью",tr:"Seated Cable Row / Göğüs Destekli Row"},note:{en:"Horizontal pulling balances the heavy vertical pulling.",es:"El tirón horizontal equilibra las dominadas pesadas.",ru:"Горизонтальная тяга балансирует тяжёлую вертикальную тягу.",tr:"Yatay çekiş ağır dikey çekişi dengeler."}},
  lateral:{name:{en:"Dumbbell Lateral Raise",es:"Elevación lateral con mancuernas",ru:"Разведения гантелей в стороны",tr:"Dambıl Yana Omuz Açışı"},note:{en:"Lead with the elbows, minimize momentum and target the side delts.",es:"Guía con los codos, usa poco impulso y enfoca el deltoide lateral.",ru:"Веди локтями, без раскачки, акцент на средней дельте.",tr:"Dirseklerle yönlendir, savurmayı azalt ve yan omuza odaklan."}},
  rear:{name:{en:"Reverse Pec Deck Fly / Rear Delt Fly",es:"Pec deck inverso / Apertura posterior",ru:"Обратная бабочка / Разведение на заднюю дельту",tr:"Reverse Pec Deck Fly / Arka Omuz Açışı"},note:{en:"Keep the chest supported and drive with the rear delts, not the traps.",es:"Mantén el pecho apoyado y trabaja con el deltoide posterior, no con el trapecio.",ru:"Грудь у опоры; работай задними дельтами, не трапециями.",tr:"Göğsü desteğe sabit tut; trapezle değil arka omuzla aç."}},
  curl:{name:{en:"Barbell Curl",es:"Curl de bíceps con barra",ru:"Сгибание рук со штангой",tr:"Barbell Curl / Barla Biceps Curl"},note:{en:"Keep the torso still, control the eccentric and avoid hip swing.",es:"Mantén el torso quieto, controla la bajada y evita el impulso de cadera.",ru:"Корпус неподвижен, негатив под контролем, без раскачки тазом.",tr:"Gövdeyi sabit tut, negatifi kontrol et ve kalçadan savurma yapma."}},
  benchDips:{name:{en:"Weighted Bench Dips",es:"Fondos en banco con peso",ru:"Отжимания от скамьи с весом",tr:"Ağırlıklı Bench Dips / Sehpa Dips"},note:{en:"If bodyweight is easy, place the load securely across the upper thighs.",es:"Si el peso corporal es fácil, coloca la carga de forma segura sobre los muslos.",ru:"Если собственного веса мало, безопасно размести вес на верхней части бёдер.",tr:"Vücut ağırlığı hafifse ağırlığı güvenli biçimde üst uyluğa yerleştir."}},
  tricepsChoice:{name:{en:"Triceps Choice — Bench Dips OR Skull Crushers",es:"Opción de tríceps — Fondos en banco O extensión tumbada",ru:"Трицепс на выбор — отжимания от скамьи ИЛИ французский жим",tr:"Triceps Seçimi — Bench Dips VEYA Skull Crusher"},note:{en:"Choose ONE exercise per session. Use 2 hard sets of 8–15 reps; there is no need to do both after weighted dips and overhead press.",es:"Elige SOLO un ejercicio por sesión. Haz 2 series duras de 8–15 repeticiones; no hace falta hacer ambos después de fondos lastrados y press militar.",ru:"Выбирай ОДНО упражнение за тренировку. Выполни 2 тяжёлых подхода по 8–15 повторений; после брусьев с весом и жима над головой оба упражнения не нужны.",tr:"Her antrenmanda SADECE birini seç. 2 ağır set × 8–15 yap; weighted dips ve overhead press sonrası ikisini birden yapmana gerek yok."}},
  backExtension:{name:{en:"45° Back Extension / Hyperextension",es:"Extensión lumbar a 45° / Hiperextensión",ru:"Гиперэкстензия 45°",tr:"45° Back Extension / Hyperextension"},note:{en:"One controlled set for posterior-chain and lower-back capacity. Hinge at the hips, keep the spine controlled and do not aggressively hyperextend at the top.",es:"Una serie controlada para la cadena posterior y la capacidad lumbar. Flexiona desde la cadera, controla la columna y no hiperextiendas agresivamente arriba.",ru:"Один контролируемый подход для задней цепи и выносливости поясницы. Сгибайся в тазобедренных, контролируй позвоночник и не переразгибайся наверху.",tr:"Posterior chain ve alt sırt kapasitesi için 1 kontrollü set. Kalçadan hinge yap, omurgayı kontrollü tut ve üstte beli aşırı hiperekstansiyona götürme."}},
  wristCurl:{name:{en:"Barbell Wrist Curl",es:"Curl de muñeca con barra",ru:"Сгибание запястий со штангой",tr:"Barbell Wrist Curl / Barla Bilek Curl"},note:{en:"One high-rep forearm set. Move through the wrist under control and squeeze the bar firmly; useful as a small wrist/forearm and grip accessory.",es:"Una serie de antebrazo con repeticiones altas. Mueve la muñeca con control y aprieta la barra con fuerza; sirve como accesorio para muñeca, antebrazo y agarre.",ru:"Один многоповторный подход на предплечья. Контролируй движение в запястье и крепко сжимай гриф; это небольшой аксессуар для кистей, предплечий и хвата.",tr:"Yüksek tekrarlı 1 ön kol seti. Bileği kontrollü hareket ettir ve barı sıkı kavra; bilek/ön kol ve grip için küçük bir aksesuar olarak kullan."}},
  legpress:{name:{en:"Leg Press",es:"Prensa de piernas",ru:"Жим ногами",tr:"Leg Press / Bacak Presi"},note:{en:"Keep the knees tracking cleanly and control the bottom position.",es:"Mantén una trayectoria estable de las rodillas y controla la parte baja.",ru:"Следи за коленями и контролируй нижнюю точку.",tr:"Diz çizgisini koru ve alt pozisyonu kontrollü tut."}},
  rest:{name:{en:"Rest / Light Walk",es:"Descanso / Caminata suave",ru:"Отдых / Лёгкая прогулка",tr:"Dinlenme / Hafif Yürüyüş"},note:{en:"Optional. The goal is recovery, not another workout.",es:"Opcional. El objetivo es recuperarte, no hacer otra sesión.",ru:"По желанию. Цель — восстановление, а не ещё одна тренировка.",tr:"İsteğe bağlı. Amaç yeni antrenman değil, toparlanma."}}
};

const PROGRAM = {
  "upper-a":[["pullup","w2w2","3–5","3–5 min"],["dips","w2w2","3–5","3–5 min"],["ohp","w2w2","5–8","2.5–4 min"],["skull","w2","8–15","90–120 sec"],["backExtension","w1","12–20","60–90 sec"],["wristCurl","w1","15–25","60 sec"],["crunch","w2","10–20","60–90 sec"]],
  "lower-a":[["squat","w2w2","5–8","3–4 min"],["bulgarian","w2","8–15 / leg","2–3 min"],["ham","w2","10–15","90–120 sec"],["extension","w2","10–15","75–90 sec"],["decline","w2","10–20","60–90 sec"]],
  "cardio-1":[["cardio","s1","30–40 min","—"]],
  "upper-b":[["dips","w2","6–10","2.5–3.5 min"],["pullup","w2","6–10","2.5–3.5 min"],["ohp","w2","8–12","2–3 min"],["pec","w2","8–15","90–120 sec"],["row","w2","8–15","2 min"],["lateral","w2","12–20","60–90 sec"],["rear","w2","12–20","60–90 sec"],["curl","w2","8–15","90–120 sec"],["tricepsChoice","w2","8–15","90–120 sec"],["crunch","w2","10–20","60–90 sec"]],
  "lower-b":[["legpress","w2w2","8–15","2.5–4 min"],["bulgarian","w2","8–15 / leg","2–3 min"],["ham","w2","10–15","90 sec"],["extension","w2","10–15","75–90 sec"],["decline","w2","10–20","60–90 sec"]],
  "cardio-2":[["cardio","s1","25–40 min","—"]],
  rest:[["rest","optional","20–30 min","—"]]
};

const $ = id => document.getElementById(id);
function detectedLanguage(){
  const saved = localStorage.getItem("workoutLanguage");
  if (LANGS.includes(saved)) return saved;
  const list = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  for (const item of list){ const code = String(item).toLowerCase().split("-")[0]; if (LANGS.includes(code)) return code; }
  return "en";
}
let lang = detectedLanguage();
let activeDay = localStorage.getItem("activeWorkoutDay") || "upper-a";
let completed = JSON.parse(localStorage.getItem("workoutCompletedV3") || "{}");
const tr = key => I18N[lang][key];
const loc = obj => obj[lang] || obj.en;

function save(){
  localStorage.setItem("workoutLanguage", lang);
  localStorage.setItem("activeWorkoutDay", activeDay);
  localStorage.setItem("workoutCompletedV3", JSON.stringify(completed));
}
function restText(v){
  if(v === "—" || lang === "en") return v;
  if(lang === "es") return v.replaceAll("sec","s");
  if(lang === "ru") return v.replaceAll("min","мин").replaceAll("sec","с");
  return v.replaceAll("min","dk").replaceAll("sec","sn");
}
function repsText(v){
  if(lang === "es") return v.replace("/ leg","/ pierna");
  if(lang === "ru") return v.replace("/ leg","/ ногу");
  if(lang === "tr") return v.replace("/ leg","/ bacak");
  return v;
}
function staticText(){
  document.documentElement.lang = lang;
  document.title = `IRON SYSTEM — ${tr("brandSub")}`;
  const map = {brandSub:"brandSub",languageLabel:"language",weeklyTarget:"weeklyTarget",liftingDays:"liftingDays",cardioDays:"cardioDays",mainFocus:"mainFocus",mainFocusText:"mainFocusText",programLabel:"program",todayLabel:"today",resetBtn:"resetDay",sessionProgress:"sessionProgress",todaysSession:"todaysSession",exercisesLabel:"exercises",progressionLabel:"progression",doubleProgression:"doubleProgression",progressionText:"progressionText",exampleLabel:"example",effortLabel:"effort",rirGuide:"rirGuide",mainCompounds:"mainCompounds",isolationWork:"isolationWork",warmupSets:"warmupSets",easyLabel:"easy",cardioGoal:"cardioGoal",cardioTitle:"cardioTitle",cardioText:"cardioText"};
  for(const [id,key] of Object.entries(map)) $(id).textContent = tr(key);
  $("languageSelect").value = lang;
}
function renderNav(){
  const nav = $("dayNav"); nav.innerHTML = "";
  for(const id of Object.keys(PROGRAM)){
    const d = DAY_TEXT[id]; const b = document.createElement("button");
    b.type="button"; b.className="day-btn" + (id===activeDay ? " active" : "");
    b.innerHTML = `<span>${loc(d.day)}</span><small>${loc(d.short)}</small>`;
    b.onclick = () => { activeDay=id; save(); render(); };
    nav.appendChild(b);
  }
}
function renderExercises(){
  const list = $("exerciseList"); list.innerHTML = "";
  const done = completed[activeDay] || [];
  PROGRAM[activeDay].forEach(([key,setKey,reps,rest],i) => {
    const ex = E[key], isDone = done.includes(key), card = document.createElement("article");
    card.className = "exercise-card" + (isDone ? " done" : "");
    const secondary = lang === "en" ? "" : ex.name.en;
    card.innerHTML = `<div class="exercise-index">${String(i+1).padStart(2,"0")}</div>
      <div><div class="exercise-name">${loc(ex.name)}</div><div class="exercise-secondary">${secondary}</div><div class="exercise-notes">${loc(ex.note)}</div></div>
      <div class="metrics"><div class="metric"><span>${tr("sets")}</span><strong>${I18N[lang].set[setKey]}</strong></div><div class="metric"><span>${tr("reps")}</span><strong>${repsText(reps)}</strong></div><div class="metric"><span>${tr("rest")}</span><strong>${restText(rest)}</strong></div></div>
      <button class="check-btn" type="button" aria-label="${tr("complete")}">${isDone ? "✓" : "○"}</button>`;
    card.querySelector(".check-btn").onclick = () => {
      const cur = completed[activeDay] || [];
      completed[activeDay] = cur.includes(key) ? cur.filter(x => x !== key) : [...cur,key];
      save(); render();
    };
    list.appendChild(card);
  });
}
function progress(){
  const keys = PROGRAM[activeDay].map(x => x[0]);
  const done = (completed[activeDay] || []).filter(x => keys.includes(x)).length;
  const total = keys.length, pct = total ? Math.round(done/total*100) : 0;
  $("progressText").textContent = `${done} / ${total}`;
  $("ringPercent").textContent = `${pct}%`;
  $("progressRing").style.setProperty("--progress", `${pct*3.6}deg`);
}
function render(){
  staticText(); renderNav();
  const d = DAY_TEXT[activeDay];
  $("pageTitle").textContent=loc(d.title); $("pageSubtitle").textContent=loc(d.subtitle); $("heroBadge").textContent=loc(d.badge); $("heroTitle").textContent=loc(d.heroTitle); $("heroText").textContent=loc(d.heroText);
  const n = PROGRAM[activeDay].length; $("exerciseCount").textContent = `${n} ${n===1 ? tr("exercise") : tr("exercisesN")}`;
  renderExercises(); progress();
}
$("languageSelect").onchange = e => { if(LANGS.includes(e.target.value)){ lang=e.target.value; save(); render(); } };
$("resetBtn").onclick = () => { completed[activeDay]=[]; save(); render(); };
render();
