import { L } from "./coaching";
import type { Localized } from "../domain/schema";
export const sources = {
  acsm: {
    title: "ACSM · Resistance training position stand (2026)",
    url: "https://acsm.org/resistance-training-guidelines-update-2026/",
  },
  failure: {
    title: "Robinson et al. · Proximity to failure meta-regressions (2024)",
    url: "https://pubmed.ncbi.nlm.nih.gov/38970765/",
  },
  rir: {
    title: "Refalo et al. · Failure vs 1–2 RIR trial (2024)",
    url: "https://pubmed.ncbi.nlm.nih.gov/38393985/",
  },
  rest: {
    title: "Singer et al. · Inter-set rest and hypertrophy (2024)",
    url: "https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1429789/full",
  },
  load: {
    title:
      "Currier et al. · Strength and hypertrophy network meta-analysis (2023)",
    url: "https://pubmed.ncbi.nlm.nih.gov/37414459/",
  },
  deload: {
    title: "Bell et al. · Deloading: expert consensus (2023)",
    url: "https://link.springer.com/article/10.1186/s40798-023-00633-0",
  },
  warmup: {
    title: "Fradkin et al. · Warm-up and performance review (2010)",
    url: "https://pubmed.ncbi.nlm.nih.gov/19996770/",
  },
  sleep: {
    title: "AASM · Adult sleep duration advisory",
    url: "https://aasm.org/advocacy/position-statements/adult-sleep-duration-health-advisory/",
  },
  technique: {
    title: "ACE · Exercise library",
    url: "https://www.acefitness.org/resources/everyone/exercise-library/",
  },
  progression: {
    title: "ACSM · Progression models (2009; historical guidance)",
    url: "https://pubmed.ncbi.nlm.nih.gov/19204579/",
  },
} as const;
export interface Lesson {
  id: string;
  title: Localized;
  summary: Localized;
  practice: Localized;
  sourceIds: (keyof typeof sources)[];
}
export const lessons: Lesson[] = [
  {
    id: "overload",
    title: L(
      "Progressive overload",
      "Sobrecarga progresiva",
      "Прогрессивная перегрузка",
      "Progresif yüklenme",
    ),
    summary: L(
      "As you adapt, increase the challenge gradually. More controlled reps at the same load can be progress; heavier weight is not required every workout. Compare the same exercise, equipment, range and effort.",
      "Aumenta el reto gradualmente al adaptarte. Más repeticiones controladas con igual peso también son progreso. No necesitas más peso cada sesión. Compara ejercicio, equipo, recorrido y esfuerzo iguales.",
      "По мере адаптации постепенно повышайте требования. Больше контролируемых повторов с тем же весом — тоже прогресс. Вес не обязан расти каждую тренировку. Сравнивайте одинаковые упражнения, оборудование, амплитуду и усилие.",
      "Uyum sağladıkça zorluğu kademeli artır. Aynı ağırlıkla daha fazla kontrollü tekrar da gelişimdir; her antrenmanda ağırlık artırmak gerekmez. Aynı hareket, ekipman, mesafe ve eforu karşılaştır.",
    ),
    practice: L(
      "IRON SYSTEM uses double progression. For 2 × 8–12: 30 kg × 10,9 → 12,11 → 12,12. Then try your configured increment, such as 32.5 kg, and rebuild reps. Suggestions never change completed logs; the increment and set loads remain editable.",
      "IRON SYSTEM usa doble progresión. En 2 × 8–12: 30 kg × 10,9 → 12,11 → 12,12. Después prueba el incremento configurado, como 32,5 kg, y reconstruye reps. Las sugerencias no cambian registros; puedes editar incremento y carga.",
      "IRON SYSTEM использует двойную прогрессию. Для 2 × 8–12: 30 кг × 10,9 → 12,11 → 12,12. Затем попробуйте выбранный шаг, например 32,5 кг, и снова наращивайте повторы. Подсказки не меняют историю; шаг и вес редактируются.",
      "IRON SYSTEM çift ilerleme kullanır. 2 × 8–12 için: 30 kg × 10,9 → 12,11 → 12,12. Sonra ayarladığın artışı, örneğin 32,5 kg’ı dene ve tekrarları yeniden yükselt. Öneriler geçmişi değiştirmez; artış ve set ağırlıkları düzenlenebilir.",
    ),
    sourceIds: ["progression", "acsm"],
  },
  {
    id: "warmups",
    title: L(
      "Warm up for the work ahead",
      "Calienta para el trabajo",
      "Разминка перед работой",
      "Çalışma setlerine hazırlan",
    ),
    summary: L(
      "Warm-ups prepare the movement and raise readiness without becoming hard work. A few minutes of easy activity can come first, followed by specific practice sets. The right amount depends on the load, exercise and how you feel; two listed warm-ups are not a universal ceiling.",
      "Calentar prepara el movimiento sin convertirse en trabajo duro. Puedes empezar con actividad suave y seguir con series específicas. La cantidad depende de carga, ejercicio y sensaciones; dos series no son un límite universal.",
      "Разминка готовит движение без лишнего утомления. Начните с лёгкой активности, затем сделайте специальные подходы. Их число зависит от веса, упражнения и самочувствия; два указанных подхода — не универсальный предел.",
      "Isınma, zor çalışmaya dönüşmeden hareketi hazırlar. Önce birkaç dakika hafif aktivite, ardından harekete özel hazırlık setleri yapılabilir. Miktar yüke, harekete ve nasıl hissettiğine bağlıdır; yazılı iki ısınma seti evrensel üst sınır değildir.",
    ),
    practice: L(
      "For a familiar 60 kg barbell working load, an example is 30 kg × 8, then 45 kg × 4; add a brief heavier ramp if needed. For weighted pull-ups/dips, start with easy bodyweight or assistance, then a small added load. Keep several reps in reserve; rest before work sets.",
      "Con 60 kg de trabajo en barra: por ejemplo 30 kg × 8 y 45 kg × 4; añade una aproximación más pesada si hace falta. En dominadas/fondos, empieza fácil con peso corporal o ayuda y luego un lastre pequeño. Deja varias reps en reserva y descansa.",
      "Для рабочего веса 60 кг пример: 30 кг × 8, затем 45 кг × 4; при необходимости добавьте короткий более тяжёлый подход. В подтягиваниях/брусьях начните легко без веса или с помощью, затем небольшой груз. Оставляйте запас и отдыхайте перед работой.",
      "Alışık olduğun 60 kg çalışma ağırlığında örnek: 30 kg × 8, ardından 45 kg × 4; gerekirse kısa, daha ağır hazırlık ekle. Ağırlıklı barfiks/dips’te kolay vücut ağırlığı veya destekle başla, sonra küçük ek yük kullan. Birkaç tekrarı yedekte bırak; çalışma setinden önce dinlen.",
    ),
    sourceIds: ["warmup"],
  },
  {
    id: "sets",
    title: L(
      "Make every rep comparable",
      "Haz comparables las repeticiones",
      "Сделайте повторы сравнимыми",
      "Her tekrarı karşılaştırılabilir yap",
    ),
    summary: L(
      "Use a stable setup, repeatable comfortable range, controlled lowering and a deliberate lift. There is no mandatory magic tempo. The last reps may slow down; technique should not transform into a different exercise.",
      "Usa una posición estable, recorrido cómodo repetible, bajada controlada y subida intencional. No existe un tempo mágico obligatorio. Las últimas reps pueden ralentizarse; la técnica no debe convertirse en otro ejercicio.",
      "Устойчивое положение, одинаковая комфортная амплитуда, контролируемое опускание и осознанный подъём. Обязательного волшебного темпа нет. Последние повторы могут замедляться, но не должны превращаться в другое упражнение.",
      "Sabit kurulum, tekrarlanabilir rahat mesafe, kontrollü iniş ve bilinçli kaldırış kullan. Zorunlu sihirli bir tempo yoktur. Son tekrarlar yavaşlayabilir; teknik farklı bir harekete dönüşmemeli.",
    ),
    practice: L(
      "Reset your position before each set. Finish when another clean rep is unavailable or your chosen RIR is reached. Record actual reps, not the target. A shorter range or a different machine is not a directly comparable load PR. Sharp or unusual pain is a reason to stop and reassess.",
      "Recolócate antes de cada serie. Termina al llegar al RIR elegido o cuando no salga otra rep limpia. Registra reps reales. Menos recorrido u otra máquina no equivalen al mismo récord. Dolor agudo o inusual exige parar y revisar.",
      "Восстанавливайте позицию перед подходом. Остановитесь на выбранном RIR или когда чистый повтор невозможен. Записывайте фактические повторы. Меньшая амплитуда или другой тренажёр не дают сопоставимый рекорд. При острой или необычной боли остановитесь и оцените ситуацию.",
      "Her setten önce pozisyonu yeniden kur. Hedef RIR’a ulaştığında veya temiz tekrar kalmadığında bitir. Hedefi değil yaptığın tekrarı kaydet. Kısalan mesafe veya farklı makine, doğrudan karşılaştırılabilir rekor değildir. Keskin ya da alışılmadık ağrıda dur ve durumu değerlendir.",
    ),
    sourceIds: ["technique", "acsm"],
  },
  {
    id: "failure",
    title: L(
      "Failure, effort and hypertrophy",
      "Fallo, esfuerzo e hipertrofia",
      "Отказ, усилие и гипертрофия",
      "Tükeniş, efor ve hipertrofi",
    ),
    summary: L(
      "0 RIR means no additional clean repetition is available. Hard sets near failure can stimulate growth without reaching failure every time. Research does not establish that failing every set is necessary; extra fatigue may reduce subsequent performance.",
      "0 RIR significa que no queda otra repetición limpia. Las series duras cerca del fallo pueden estimular crecimiento sin llegar siempre al fallo. No es necesario fallar en cada serie; la fatiga extra puede reducir rendimiento posterior.",
      "0 RIR — ещё один чистый повтор невозможен. Тяжёлые подходы близко к отказу могут стимулировать рост без отказа каждый раз. Не доказана необходимость отказа во всех подходах; дополнительное утомление может снизить последующую работу.",
      "0 RIR, bir temiz tekrar daha yapamamak demektir. Tükenişe yakın zor setler, her seferinde tükenmeden de büyümeyi destekleyebilir. Her seti tükenişte bitirmek şart değildir; ek yorgunluk sonraki performansı azaltabilir.",
    ),
    practice: L(
      "Practical starting guide: keep about 1–3 RIR on demanding compounds and 0–2 on stable isolation work. An occasional final isolation set to technical failure can help calibrate effort. Avoid forced reps or solo failed squats/presses. These are adjustable coaching ranges, not a replacement of your set prescription.",
      "Guía inicial: deja 1–3 RIR en compuestos exigentes y 0–2 en aislamientos estables. Una última serie ocasional al fallo técnico ayuda a calibrar esfuerzo. Evita reps forzadas o fallar sentadillas/press solo. Son rangos ajustables, no cambios en las series.",
      "Практический ориентир: 1–3 RIR в сложной базе и 0–2 в устойчивой изоляции. Иногда последний изолирующий подход до технического отказа помогает оценить усилие. Избегайте форсированных повторов и отказа в приседе/жиме без страховки. Это регулируемые ориентиры.",
      "Pratik başlangıç rehberi: zor compound hareketlerde 1–3 RIR, dengeli izolasyonlarda 0–2 RIR bırak. Ara sıra son izolasyon setini teknik tükenişe götürmek eforu anlamaya yardım edebilir. Zorla tekrar veya tek başına başarısız squat/press denemelerinden kaçın. Bunlar ayarlanabilir rehber aralıklardır, set planının yerine geçmez.",
    ),
    sourceIds: ["failure", "rir"],
  },
  {
    id: "rest",
    title: L(
      "Rest between sets",
      "Descanso entre series",
      "Отдых между подходами",
      "Setler arasında dinlenme",
    ),
    summary: L(
      "Rest supports repetition quality and the amount of useful work you can repeat. Short rests are not inherently better for growth. The research suggests an advantage to avoiding very short rests, while the best interval depends on the task.",
      "Descansar permite repetir trabajo de calidad. Descansos cortos no son mejores por definición. La investigación favorece evitar pausas muy cortas; el intervalo adecuado depende de la tarea.",
      "Отдых помогает повторять качественную работу. Короткие паузы не обязательно лучше для роста. Данные поддерживают отказ от слишком коротких пауз; подходящая длительность зависит от задачи.",
      "Dinlenme tekrar kalitesini ve tekrarlayabildiğin yararlı işi destekler. Kısa dinlenme büyüme için otomatik olarak daha iyi değildir. Araştırmalar çok kısa aralıklardan kaçınmayı destekler; uygun süre yapılan işe bağlıdır.",
    ),
    practice: L(
      "Your plan starts at 2–3 minutes. If breathing, bracing or performance has not recovered, extend the timer; heavy strength work can need longer. Do not shorten rests merely to chase a burn. Log a similar rest pattern when judging whether you improved.",
      "Tu plan empieza en 2–3 minutos. Si no recuperas respiración, estabilidad o rendimiento, amplía el temporizador; fuerza pesada puede necesitar más. No acortes solo por sentir ardor. Compara descansos similares al evaluar progreso.",
      "В плане 2–3 минуты. Если дыхание, стабилизация или работоспособность не восстановились, продлите таймер; тяжёлая силовая работа может требовать больше. Не сокращайте отдых ради жжения. Сравнивайте прогресс при похожих паузах.",
      "Planın başlangıcı 2–3 dakika. Nefes, gövde kontrolü veya performans toparlanmadıysa sayacı uzat; ağır güç çalışması daha uzun isteyebilir. Sırf yanma hissi için dinlenmeyi kısaltma. Gelişimi benzer dinlenme koşullarında değerlendir.",
    ),
    sourceIds: ["rest"],
  },
  {
    id: "recovery",
    title: L(
      "Recovery makes training repeatable",
      "Recupera para volver a entrenar",
      "Восстановление для следующей тренировки",
      "Tekrar çalışabilmek için toparlan",
    ),
    summary: L(
      "Sleep, food and manageable training demands support recovery. Adults generally need at least seven hours of sleep regularly. Soreness is an imperfect signal: neither a requirement for growth nor a complete measure of readiness.",
      "Sueño, comida y una carga manejable apoyan recuperación. Adultos necesitan generalmente al menos siete horas habituales. Las agujetas son una señal imperfecta: no son requisito de crecimiento ni medida completa de preparación.",
      "Сон, питание и посильная нагрузка поддерживают восстановление. Взрослым обычно нужно регулярно спать не менее семи часов. Болезненность — неточный сигнал: она не обязательна для роста и не отражает всю готовность.",
      "Uyku, beslenme ve yönetilebilir antrenman yükü toparlanmayı destekler. Yetişkinler düzenli olarak genelde en az yedi saat uykuya ihtiyaç duyar. Kas ağrısı kusurlu bir göstergedir: ne büyümenin şartı ne de hazırlığın tam ölçüsüdür.",
    ),
    practice: L(
      "Keep rest days and easy cardio genuinely manageable. Use the energy, soreness and session-note fields to spot patterns beside performance. Repeated poor sessions deserve a review of sleep, food, life stress and training demand before adding more exercises.",
      "Mantén días de descanso y cardio fácil manejables. Usa energía, molestias y notas junto al rendimiento. Varias sesiones malas merecen revisar sueño, comida, estrés y carga antes de añadir ejercicios.",
      "Сохраняйте посильными отдых и лёгкое кардио. Смотрите энергию, болезненность и заметки вместе с результатами. При повторяющемся спаде проверьте сон, питание, стресс и нагрузку до добавления упражнений.",
      "Dinlenme günlerini ve hafif kardiyoyu gerçekten yönetilebilir tut. Enerji, ağrı ve not alanlarını performansla birlikte değerlendir. Üst üste kötü seanslarda egzersiz eklemeden önce uyku, beslenme, yaşam stresi ve yükü gözden geçir.",
    ),
    sourceIds: ["sleep", "deload"],
  },
  {
    id: "strength",
    title: L(
      "Strength and long-term muscle gain",
      "Fuerza y músculo a largo plazo",
      "Сила и долгосрочный рост мышц",
      "Güç ve uzun vadeli kas gelişimi",
    ),
    summary: L(
      "Heavier loads are particularly useful for improving maximal strength. Muscle growth can occur across a wider load range. Strength includes skill and neural adaptation, so a bigger lift is not a direct measurement of bigger muscles.",
      "Cargas altas ayudan especialmente a fuerza máxima. El músculo puede crecer con un rango más amplio de cargas. Fuerza incluye habilidad y adaptación neural; levantar más no mide directamente más músculo.",
      "Большие веса особенно полезны для максимальной силы. Рост мышц возможен в более широком диапазоне нагрузок. Сила включает навык и нервную адаптацию, поэтому больший вес не измеряет размер мышц напрямую.",
      "Ağır yükler maksimal gücü geliştirmede özellikle yararlıdır. Kas büyümesi daha geniş ağırlık aralıklarında gerçekleşebilir. Güç, beceri ve sinirsel uyumu da içerir; daha ağır kaldırmak doğrudan daha büyük kas ölçümü değildir.",
    ),
    practice: L(
      "Upper A develops your heavy-lift practice; Upper B gives you higher-rep work. Over time, improved strength can help you handle more load for controlled reps, but retain sufficient quality work and recovery. Track both days separately rather than turning every session into a max test.",
      "Upper A practica cargas altas; Upper B aporta más repeticiones. Ganar fuerza puede permitir más carga con control, pero mantén trabajo de calidad y recuperación. Registra los días por separado sin convertir cada sesión en un test máximo.",
      "Upper A развивает тяжёлые подъёмы, Upper B — работу с большим числом повторов. Сила может позволить больше веса при контролируемых повторах, но сохраняйте качество и восстановление. Отслеживайте дни отдельно, не тестируйте максимум каждый раз.",
      "Upper A ağır kaldırış pratiğini, Upper B yüksek tekrar çalışmasını geliştirir. Artan güç zamanla kontrollü tekrarlarda daha fazla yük kullanmana yardım edebilir; yeterli kaliteli işi ve toparlanmayı koru. Her seansı maksimum testine çevirmeden iki günü ayrı takip et.",
    ),
    sourceIds: ["load"],
  },
  {
    id: "deload",
    title: L(
      "When and how to deload",
      "Cuándo y cómo descargar",
      "Когда и как делать разгрузку",
      "Ne zaman, nasıl deload yapılır",
    ),
    summary: L(
      "A deload temporarily lowers training stress. Coaches commonly adjust sets, load and effort when fatigue accumulates. This area relies substantially on expert consensus; there is no universal schedule or proven single best formula.",
      "Una descarga reduce temporalmente el estrés. Entrenadores ajustan series, carga y esfuerzo al acumular fatiga. La evidencia depende bastante del consenso experto; no hay calendario universal ni fórmula única probada.",
      "Разгрузка временно снижает тренировочный стресс. При накоплении усталости тренеры меняют подходы, вес и усилие. Здесь важна роль экспертного консенсуса; универсального расписания или лучшей формулы нет.",
      "Deload antrenman stresini geçici azaltır. Yorgunluk biriktiğinde set, ağırlık ve efor azaltılabilir. Bu alandaki bilgi önemli ölçüde uzman görüşüne dayanır; evrensel takvim veya kanıtlanmış tek en iyi formül yoktur.",
    ),
    practice: L(
      "One optional example for this low-volume plan is 5–7 easier days: use one work set instead of two, a lighter load if needed, and leave 3–4 clean reps. Do not count a deliberately easy week as a plateau. The app explains this option; it never silently removes your sets.",
      "Un ejemplo opcional: 5–7 días fáciles con una serie en vez de dos, menos peso si hace falta y 3–4 reps en reserva. No cuentes una semana fácil como estancamiento. La app explica la opción, nunca elimina series en silencio.",
      "Возможный пример: 5–7 облегчённых дней, один рабочий подход вместо двух, при необходимости меньше веса и 3–4 повтора в запасе. Не считайте намеренно лёгкую неделю плато. Приложение объясняет вариант, но не удаляет подходы автоматически.",
      "Bu düşük hacimli plan için isteğe bağlı örnek: 5–7 hafif gün; iki yerine bir çalışma seti, gerekirse daha hafif yük ve 3–4 temiz tekrar yedek. Bilerek hafif çalıştığın haftayı plato sayma. Uygulama bu seçeneği açıklar; setlerini sessizce silmez.",
    ),
    sourceIds: ["deload"],
  },
  {
    id: "plateaus",
    title: L(
      "Work through a plateau",
      "Supera un estancamiento",
      "Как пройти плато",
      "Platoyu aşmak",
    ),
    summary: L(
      "A single flat session is normal variation, not a plateau. Review several comparable exposures. A falling trend with fatigue and a stable trend while feeling recovered call for different responses.",
      "Una sesión sin mejorar es variación normal, no un estancamiento. Revisa varias sesiones comparables. Una caída con fatiga y una estabilidad con buena recuperación requieren respuestas distintas.",
      "Одна тренировка без улучшения — обычное колебание, а не плато. Смотрите несколько сопоставимых тренировок. Спад с усталостью и стабильность при хорошем восстановлении требуют разных действий.",
      "Tek bir sabit seans normal dalgalanmadır, plato değildir. Birkaç karşılaştırılabilir seansı incele. Yorgunlukla düşüş ve iyi toparlanmaya rağmen sabitlik farklı yaklaşım ister.",
    ),
    practice: L(
      "First check range, equipment, RIR, rest and logging consistency. Try smaller load increments or add one clean rep while keeping the load. If fatigue is persistent, review recovery or an easier week. If recovered but stalled, change one training variable and observe several sessions before changing another.",
      "Primero revisa recorrido, equipo, RIR, descanso y registros. Prueba incrementos menores o una rep limpia extra. Con fatiga persistente, revisa recuperación o descarga. Si estás recuperado pero estancado, cambia una variable y observa varias sesiones.",
      "Сначала проверьте амплитуду, оборудование, RIR, отдых и записи. Попробуйте меньший шаг веса или один чистый повтор. При стойкой усталости оцените восстановление или лёгкую неделю. При плато без усталости меняйте одну переменную и наблюдайте несколько тренировок.",
      "Önce mesafe, ekipman, RIR, dinlenme ve kayıt tutarlılığını kontrol et. Daha küçük ağırlık artışı veya aynı yükte bir temiz tekrar dene. Yorgunluk sürüyorsa toparlanmayı ya da hafif haftayı değerlendir. Toparlanmışken takıldıysan tek değişkeni değiştir ve birkaç seans izle.",
    ),
    sourceIds: ["progression", "deload"],
  },
];
