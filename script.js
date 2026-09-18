const program = [
  {
    id: "upper-a",
    day: "Pazartesi",
    title: "Upper A — Güç",
    short: "Upper A",
    subtitle: "Heavy compounds, low volume, high quality sets.",
    badge: "UPPER BODY • STRENGTH",
    heroTitle: "Move heavy. Keep every rep clean.",
    heroText: "Ana liftlerde 2 ısınma seti + 2 ağır çalışma seti. Formu koru, tekrarları kaydet ve küçük artışlarla ilerle.",
    exercises: [
      { en: "Weighted Pull-Ups", tr: "Ağırlıklı Barfiks", sets: "2 warm-up + 2 work", reps: "3–5", rest: "3–5 dk", note: "Isınma: BW × 5–6, sonra çalışma ağırlığının %50–70'i × 3–4." },
      { en: "Weighted Dips", tr: "Ağırlıklı Dips", sets: "2 warm-up + 2 work", reps: "3–5", rest: "3–5 dk", note: "Isınma: BW × 6–8, sonra çalışma ağırlığının %50–70'i × 3–5." },
      { en: "Military / Overhead Press", tr: "Askeri Press / Baş Üstü Press", sets: "2 warm-up + 2 work", reps: "5–8", rest: "2.5–4 dk", note: "Belini aşırı arkaya atma; kontrollü press." },
      { en: "Barbell Skull Crushers", tr: "Barla Skull Crusher", sets: "2 work", reps: "8–12", rest: "2 dk", note: "Dirsekleri sabit tut." },
      { en: "Cable Crunch", tr: "Kabloda Karın Crunch", sets: "3 work", reps: "10–15", rest: "60–90 sn", note: "Kalçadan değil, gövdeyi kıvırarak crunch yap." }
    ]
  },
  {
    id: "lower-a",
    day: "Salı",
    title: "Lower A — Bacak",
    short: "Lower A",
    subtitle: "Strength-biased lower body training.",
    badge: "LOWER BODY • STRENGTH",
    heroTitle: "Build the base that carries everything.",
    heroText: "Squat odaklı gün. Quad, hamstring ve unilateral kuvveti birlikte geliştir.",
    exercises: [
      { en: "Barbell Squat", tr: "Halterle Squat", sets: "2 warm-up + 2 work", reps: "5–8", rest: "3–4 dk", note: "Derinlik ve formu ağırlıktan önce tut." },
      { en: "Bulgarian Split Squat", tr: "Bulgar Split Squat", sets: "3 work", reps: "8–10 / leg", rest: "2–3 dk", note: "Her bacak eşit tekrar." },
      { en: "Hamstring Curl / Leg Curl", tr: "Arka Bacak Curl", sets: "3 work", reps: "8–12", rest: "90–120 sn", note: "Eksantrik fazı kontrol et." },
      { en: "Leg Extension", tr: "Ön Bacak Extension", sets: "3 work", reps: "10–15", rest: "75–90 sn", note: "Üstte kısa sıkıştırma." },
      { en: "Weighted Decline Crunch", tr: "Ağırlıklı Aşağı Eğimli Mekik", sets: "3 work", reps: "10–15", rest: "60–90 sn", note: "30–45° decline bench." }
    ]
  },
  {
    id: "cardio-1",
    day: "Çarşamba",
    title: "Cardio — Aktif Dinlenme",
    short: "Cardio",
    subtitle: "Conditioning without killing recovery.",
    badge: "CONDITIONING • ZONE 2",
    heroTitle: "Improve capacity. Preserve recovery.",
    heroText: "Düşük–orta şiddette cardio. Amaç kondisyonu, kan dolaşımını ve çalışma kapasitesini desteklemek.",
    exercises: [
      { en: "Incline Treadmill / Bike / Elliptical", tr: "Eğimli Yürüyüş / Bisiklet / Eliptik", sets: "1 session", reps: "30–40 min", rest: "—", note: "Konuşabilecek kadar rahat, ama belirgin eforlu tempo." }
    ]
  },
  {
    id: "upper-b",
    day: "Perşembe",
    title: "Upper B — Hipertrofi",
    short: "Upper B",
    subtitle: "More volume, controlled reps, muscle-building focus.",
    badge: "UPPER BODY • HYPERTROPHY",
    heroTitle: "More volume. Same standards.",
    heroText: "Güç gününe göre daha hafif ağırlık, daha yüksek tekrar ve daha fazla toplam hacim.",
    exercises: [
      { en: "Weighted Dips", tr: "Ağırlıklı Dips", sets: "3 work", reps: "6–10", rest: "2.5–3.5 dk", note: "Güç gününe göre daha hafif." },
      { en: "Weighted Pull-Ups", tr: "Ağırlıklı Barfiks", sets: "3 work", reps: "6–10", rest: "2.5–3.5 dk", note: "Tam ROM ve kontrollü negatif." },
      { en: "Military / Overhead Press", tr: "Askeri Press / Baş Üstü Press", sets: "3 work", reps: "8–10", rest: "2–3 dk", note: "Omuz ve triceps hacmi." },
      { en: "Pec Deck Fly", tr: "Pec Deck Göğüs Fly", sets: "3 work", reps: "10–15", rest: "90–120 sn", note: "Göğsü direkt izole et. Kontrollü açıl, önde güçlü şekilde sıkıştır." },
      { en: "Seated Cable Row / Chest-Supported Row", tr: "Oturarak Kablo Row / Göğüs Destekli Row", sets: "3 work", reps: "8–12", rest: "2 dk", note: "Yatay çekiş için programa eklenen denge hareketi." },
      { en: "Weighted Bench Dips", tr: "Ağırlıklı Sehpa Dips", sets: "3 work", reps: "10–15", rest: "90–120 sn", note: "Ağırlığı üst uyluk bölgesine güvenli şekilde yerleştir." },
      { en: "Barbell Skull Crushers", tr: "Barla Skull Crusher", sets: "2 work", reps: "10–15", rest: "90–120 sn", note: "Triceps izolasyonu." },
      { en: "Cable Crunch", tr: "Kabloda Karın Crunch", sets: "3 work", reps: "12–20", rest: "60–90 sn", note: "Kontrollü ve tam sıkışma." }
    ]
  },
  {
    id: "lower-b",
    day: "Cuma",
    title: "Lower B — Bacak",
    short: "Lower B",
    subtitle: "Higher-rep lower body hypertrophy work.",
    badge: "LOWER BODY • HYPERTROPHY",
    heroTitle: "Volume for legs. Control every rep.",
    heroText: "Leg press odaklı gün. Quad ve hamstring hacmini artırırken unilateral çalışmayı koru.",
    exercises: [
      { en: "Leg Press", tr: "Bacak Presi", sets: "2 warm-up + 3 work", reps: "8–12", rest: "2.5–4 dk", note: "Diz ve kalça kontrolünü koru." },
      { en: "Bulgarian Split Squat", tr: "Bulgar Split Squat", sets: "3 work", reps: "10–12 / leg", rest: "2–3 dk", note: "Dengeli ve kontrollü." },
      { en: "Hamstring Curl", tr: "Arka Bacak Curl", sets: "3 work", reps: "10–15", rest: "90 sn", note: "Tam kasılma." },
      { en: "Leg Extension", tr: "Ön Bacak Extension", sets: "3 work", reps: "12–15", rest: "75–90 sn", note: "Son sette 0–1 RIR olabilir." },
      { en: "Weighted Decline Crunch", tr: "Ağırlıklı Eğimli Karın", sets: "3 work", reps: "10–15", rest: "60–90 sn", note: "30–45° decline." }
    ]
  },
  {
    id: "cardio-2",
    day: "Cumartesi",
    title: "Cardio — Conditioning",
    short: "Cardio",
    subtitle: "Low-to-moderate intensity conditioning.",
    badge: "CONDITIONING • RECOVERY",
    heroTitle: "Finish the week with capacity work.",
    heroText: "Bacaklarının durumuna göre 25–40 dakika. Gereksiz yorgunluk yaratmadan kondisyonu geliştir.",
    exercises: [
      { en: "Incline Treadmill / Bike / Elliptical", tr: "Eğimli Yürüyüş / Bisiklet / Eliptik", sets: "1 session", reps: "25–40 min", rest: "—", note: "Bacaklar çok yorgunsa süreyi 25 dakikaya indir." }
    ]
  },
  {
    id: "rest",
    day: "Pazar",
    title: "Rest Day — Dinlenme",
    short: "Rest",
    subtitle: "Recover, walk lightly, come back stronger.",
    badge: "RECOVERY DAY",
    heroTitle: "Recovery is part of progression.",
    heroText: "Tam dinlenme veya hafif yürüyüş. Uyku, protein ve hidrasyona odaklan.",
    exercises: [
      { en: "Rest / Light Walk", tr: "Dinlenme / Hafif Yürüyüş", sets: "Optional", reps: "20–30 min", rest: "—", note: "Zorunlu değil. Amaç toparlanmak." }
    ]
  }
];

let activeDay = localStorage.getItem("activeWorkoutDay") || "upper-a";
let completed = JSON.parse(localStorage.getItem("workoutCompleted") || "{}");

const dayNav = document.getElementById("dayNav");
const exerciseList = document.getElementById("exerciseList");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const heroBadge = document.getElementById("heroBadge");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const exerciseCount = document.getElementById("exerciseCount");
const progressText = document.getElementById("progressText");
const ringPercent = document.getElementById("ringPercent");
const progressRing = document.getElementById("progressRing");
const resetBtn = document.getElementById("resetBtn");

function save() {
  localStorage.setItem("activeWorkoutDay", activeDay);
  localStorage.setItem("workoutCompleted", JSON.stringify(completed));
}

function renderNav() {
  dayNav.innerHTML = "";
  program.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "day-btn" + (day.id === activeDay ? " active" : "");
    btn.innerHTML = `<span>${day.day}</span><small>${day.short}</small>`;
    btn.addEventListener("click", () => {
      activeDay = day.id;
      save();
      render();
    });
    dayNav.appendChild(btn);
  });
}

function renderExercises(day) {
  exerciseList.innerHTML = "";
  const dayCompleted = completed[day.id] || [];

  day.exercises.forEach((exercise, index) => {
    const isDone = dayCompleted.includes(index);
    const card = document.createElement("article");
    card.className = "exercise-card" + (isDone ? " done" : "");
    card.innerHTML = `
      <div class="exercise-index">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <div class="exercise-name">${exercise.en}</div>
        <div class="exercise-tr">${exercise.tr}</div>
        <div class="exercise-notes">${exercise.note}</div>
      </div>
      <div class="metric">
        <span>Sets • Reps</span>
        <strong>${exercise.sets}<br>${exercise.reps}</strong>
      </div>
      <button class="check-btn" aria-label="Complete exercise">${isDone ? "✓" : "○"}</button>
    `;

    card.querySelector(".check-btn").addEventListener("click", () => {
      const list = completed[day.id] || [];
      if (list.includes(index)) {
        completed[day.id] = list.filter(i => i !== index);
      } else {
        completed[day.id] = [...list, index];
      }
      save();
      render();
    });

    exerciseList.appendChild(card);
  });
}

function updateProgress(day) {
  const done = (completed[day.id] || []).length;
  const total = day.exercises.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  progressText.textContent = `${done} / ${total}`;
  ringPercent.textContent = `${percent}%`;
  progressRing.style.setProperty("--progress", `${percent * 3.6}deg`);
}

function render() {
  const day = program.find(d => d.id === activeDay) || program[0];

  renderNav();
  pageTitle.textContent = day.title;
  pageSubtitle.textContent = day.subtitle;
  heroBadge.textContent = day.badge;
  heroTitle.textContent = day.heroTitle;
  heroText.textContent = day.heroText;
  exerciseCount.textContent = `${day.exercises.length} exercise${day.exercises.length > 1 ? "s" : ""}`;

  renderExercises(day);
  updateProgress(day);
}

resetBtn.addEventListener("click", () => {
  completed[activeDay] = [];
  save();
  render();
});

render();
