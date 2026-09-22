import { extendedBenefits } from "./extendedCatalog";
import { L } from "./coaching";
import type { Localized } from "../domain/schema";

// Practical exercise-selection rationale, not a ranking or a promise of growth.
const benefits: Record<string, Localized> = {
  pullup: L(
    "A powerful vertical pull for the lats and elbow flexors, with a clear path from bodyweight reps to added load. It complements rows by training a different pulling pattern and makes relative upper-body strength easy to track.",
    "Un tirón vertical para dorsales y flexores del codo, con una progresión clara desde el peso corporal al lastre. Complementa los remos con otro patrón de tracción y permite seguir tu fuerza relativa.",
    "Вертикальная тяга для широчайших и сгибателей локтя с понятной прогрессией от собственного веса к отягощению. Дополняет горизонтальные тяги и помогает отслеживать относительную силу верха тела.",
    "Kanat kasları ve dirsek fleksörleri için güçlü bir dikey çekiştir; vücut ağırlığından ek yüke geçişi nettir. Row hareketlerini farklı bir çekiş yönüyle tamamlar ve göreli üst vücut gücünü takip etmeyi kolaylaştırır.",
  ),
  dips: L(
    "Dips can be an excellent chest-and-triceps builder: a compound press that lets you progressively load a substantial part of your bodyweight. The nickname ‘upper-body squat’ describes that big, multi-joint role—not proof that dips beat every other chest exercise. Gymnasts can be inspiring examples of upper-body development, but their physiques cannot show what dips alone caused: years of varied training, individual traits and nutrition also matter. Use a depth your shoulders tolerate and progress controlled reps before adding load.",
    "Los fondos pueden desarrollar muy bien pecho y tríceps: son un press compuesto al que puedes añadir lastre progresivamente. El apodo «sentadilla del tren superior» describe su papel multiarticular, no demuestra que superen a todos los ejercicios de pecho. Los gimnastas inspiran, pero su físico no revela lo que causaron solo los fondos: también cuentan años de entrenamiento variado, características individuales y nutrición. Usa una profundidad cómoda y progresa con control.",
    "Отжимания на брусьях могут отлично развивать грудь и трицепсы: это многосуставной жим с удобным добавлением веса. Прозвище «приседание для верха тела» описывает масштаб движения, а не доказывает его превосходство. Телосложение гимнастов вдохновляет, но не показывает эффект одних брусьев: важны годы разнообразных тренировок, индивидуальные особенности и питание. Выбирайте комфортную для плеч глубину и сначала улучшайте контроль повторов.",
    "Dips, göğüs ve triceps gelişimi için çok iyi bir seçim olabilir: vücut ağırlığının önemli bir bölümünü kullanan, ek yükle ilerletilebilen çok eklemli bir itiştir. «Üst vücudun squat’ı» benzetmesi bu kapsamı anlatır; her göğüs hareketinden üstün olduğunu kanıtlamaz. Jimnastikçilerin fiziği ilham vericidir ama yalnızca dips’in sonucunu göstermez; yıllarca farklı hareketlerle çalışma, bireysel özellikler ve beslenme de rol oynar. Omuzlarının rahat ettiği derinlikte kontrollü tekrarları geliştir, sonra yük ekle.",
  ),
  ohp: L(
    "Overhead pressing develops shoulder and triceps strength while requiring you to brace your trunk. Small, measurable load increases make it a useful strength lift alongside dips; lateral raises add more focused side-delt work.",
    "El press sobre la cabeza desarrolla hombros y tríceps mientras exige estabilizar el tronco. Permite pequeños aumentos de carga y complementa los fondos; las elevaciones laterales aportan trabajo más específico del deltoides lateral.",
    "Жим над головой развивает силу плеч и трицепсов и требует стабилизации корпуса. Небольшие прибавки веса удобно отслеживать; махи в стороны дополняют его работой средней дельты.",
    "Baş üstü press, gövdeyi sabit tutarken omuz ve triceps gücünü geliştirir. Küçük yük artışlarıyla takip edilebilir; dips’i tamamlar, yana açışlar ise yan omuza daha odaklı çalışma ekler.",
  ),
  inclineShoulder: L(
    "The steep bench gives a supported press for the front delts and triceps, with some upper-chest contribution. Dumbbells allow independent arm paths; a Smith machine reduces balance demands. That makes either a practical hypertrophy option—keep the same 65–75° setup when comparing progress.",
    "El banco inclinado ofrece apoyo para trabajar deltoides anterior y tríceps, con participación del pecho superior. Las mancuernas permiten trayectorias independientes; la Smith reduce la demanda de equilibrio. Mantén los mismos 65–75° al comparar el progreso.",
    "Высокий наклон даёт опору при работе передних дельт и трицепсов с участием верха груди. Гантели позволяют независимую траекторию рук, Смит снижает требования к балансу. Сравнивайте прогресс при одинаковом угле 65–75°.",
    "Dik eğimli sehpa, ön omuz ve triceps çalışırken destek sağlar; üst göğüs de katkıda bulunur. Dambıllar bağımsız kol yolu sunar, Smith denge ihtiyacını azaltır. İlerlemeyi karşılaştırırken 65–75° açını sabit tut.",
  ),
  skull: L(
    "Direct elbow extension gives the triceps focused work after compound presses, without chest strength being the main limiting factor. A repeatable upper-arm position makes reps and load easy to compare. Choose a comfortable bar and elbow path.",
    "La extensión de codo añade trabajo directo al tríceps después de los presses, sin que la fuerza del pecho sea el principal límite. Una posición estable del brazo facilita comparar repeticiones y carga. Elige una trayectoria cómoda.",
    "Разгибание локтей нагружает трицепсы после жимов, не делая силу груди главным ограничением. Стабильное положение плеча помогает сравнивать повторы и вес. Выберите удобный гриф и траекторию.",
    "Dirsek ekstansiyonu, göğüs gücünün ana sınırlayıcı olmadığı doğrudan triceps çalışması sağlar. Üst kol pozisyonunu tekrarlanabilir tutmak yük ve tekrar karşılaştırmasını kolaylaştırır. Rahat bir bar ve dirsek yolu seç.",
  ),
  squat: L(
    "A versatile compound lift that trains knee and hip extension together, with substantial quad and glute work plus trunk bracing. Its repeatable setup supports long-term strength progression. It anchors the lower-body plan, while curls and extensions add more targeted work.",
    "Combina extensión de rodilla y cadera: trabaja cuádriceps y glúteos y exige estabilizar el tronco. Su preparación repetible ayuda a progresar en fuerza. Es la base del día inferior; curls y extensiones añaden trabajo específico.",
    "Объединяет разгибание коленей и таза: нагружает квадрицепсы и ягодицы, требует жёсткости корпуса. Повторяемая техника помогает долгосрочному росту силы. Сгибания и разгибания ног дополняют присед более прицельной нагрузкой.",
    "Diz ve kalça ekstansiyonunu birleştirir; quadriceps ve kalçayı çalıştırırken gövde stabilizasyonu ister. Tekrarlanabilir kurulumu uzun vadeli güç ilerlemesini destekler. Alt vücut gününün temelidir; curl ve extension daha odaklı çalışma ekler.",
  ),
  bulgarian: L(
    "Training one leg at a time makes side-to-side differences easier to notice and gives quads and glutes substantial work with less total external weight. It complements bilateral squats or leg presses. Use support if balance prevents the working leg from being challenged.",
    "Trabajar una pierna cada vez permite observar diferencias entre lados y cargar cuádriceps y glúteos con menos peso externo total. Complementa sentadillas y prensa. Usa apoyo si el equilibrio limita el esfuerzo de la pierna.",
    "Работа по одной ноге помогает замечать различия сторон и нагружать квадрицепсы и ягодицы меньшим внешним весом. Дополняет присед и жим ногами. Используйте опору, если баланс ограничивает работу ноги.",
    "Tek bacakla çalışma, taraf farklarını fark etmeyi kolaylaştırır ve daha az toplam dış yükle quadriceps ile kalçayı zorlar. Squat ve leg press’i tamamlar. Denge hedef kası çalıştırmanı sınırlıyorsa destek kullan.",
  ),
  ham: L(
    "Leg curls train the hamstrings through knee flexion, a role that squats and leg presses do not directly cover. The supported setup lets you focus on controlled hamstring work without balance being a major limit. Keep the same machine and pad setup when tracking progress.",
    "El curl trabaja los isquios mediante flexión de rodilla, función que sentadilla y prensa no cubren directamente. El apoyo facilita concentrarte en el músculo. Mantén máquina y ajustes iguales para comparar el progreso.",
    "Сгибание ног тренирует функцию сгибания колена у задней поверхности бедра, которую присед и жим ногами напрямую не покрывают. Опора снижает требования к балансу. Для сравнения прогресса сохраняйте настройки тренажёра.",
    "Leg curl, hamstringleri diz fleksiyonuyla çalıştırır; squat ve leg press bu işlevi doğrudan karşılamaz. Destekli yapı dengeye takılmadan kası kontrollü çalıştırır. İlerlemeyi aynı makine ve ped ayarıyla karşılaştır.",
  ),
  extension: L(
    "A simple way to add direct quadriceps work without the balance and trunk demands of another squat. It complements compound leg lifts with isolated knee extension and makes small rep increases straightforward to track.",
    "Añade trabajo directo de cuádriceps sin las exigencias de equilibrio y tronco de otra sentadilla. Complementa los ejercicios compuestos con extensión de rodilla aislada y facilita seguir pequeños aumentos de repeticiones.",
    "Добавляет прямую нагрузку квадрицепсам без требований приседа к балансу и корпусу. Изолированное разгибание коленей дополняет базовые движения; небольшие прибавки повторов легко отслеживать.",
    "Yeni bir squat’ın denge ve gövde gereksinimleri olmadan doğrudan quadriceps çalışması ekler. İzole diz ekstansiyonuyla çok eklemli bacak hareketlerini tamamlar; küçük tekrar artışları kolay izlenir.",
  ),
  decline: L(
    "A loadable trunk-flexion exercise for direct abdominal training, beyond the bracing used in compound lifts. Holding a weight consistently makes progression measurable. Curl through the trunk rather than turning every rep into a full hip-driven sit-up.",
    "Una flexión de tronco con carga para entrenar abdominales directamente, además de la estabilización de los ejercicios compuestos. Sostener el peso de forma constante permite medir el progreso. Evita convertirlo en un sit-up dominado por la cadera.",
    "Сгибание корпуса с отягощением даёт прямую работу прессу в дополнение к стабилизации в базовых упражнениях. Одинаковое положение веса облегчает контроль прогресса. Не превращайте движение в подъём за счёт тазобедренных суставов.",
    "Bileşik hareketlerdeki sabitlemeye ek olarak karın kaslarını doğrudan çalıştıran, yük eklenebilir bir gövde fleksiyonudur. Ağırlığı aynı konumda tutmak ilerlemeyi ölçülebilir kılar. Hareketi kalçadan tam mekik yerine gövdeden kıvrılarak yap.",
  ),
  pec: L(
    "Pec deck isolates the chest's arm-across-body action with a stable machine path. It adds chest work when triceps fatigue might limit another pressing exercise. It is a useful accessory, rather than an essential requirement for chest growth.",
    "El pec deck trabaja la acción de acercar los brazos frente al cuerpo con una trayectoria estable. Añade pecho cuando el cansancio del tríceps limita otro press. Es un accesorio útil, no un requisito para crecer.",
    "«Бабочка» нагружает сведение рук перед телом по стабильной траектории. Добавляет работу груди, когда усталые трицепсы ограничивают жим. Полезный аксессуар, но не обязательное условие роста груди.",
    "Pec deck, kolları gövdenin önünde birleştirme işlevini sabit makine yoluyla çalıştırır. Triceps yorgunluğu yeni bir press’i sınırladığında göğse çalışma ekler. Yararlı bir aksesuardır; göğüs gelişiminin zorunlu şartı değildir.",
  ),
  row: L(
    "Horizontal pulling gives the lats and upper back work that complements vertical pull-ups. Cable rows offer a repeatable pulling path; chest support reduces the need to hold a bent-over position. Choose the version that lets the back, rather than balance or lower-back fatigue, limit the set.",
    "La tracción horizontal complementa las dominadas con trabajo de dorsales y espalda alta. La polea ofrece una trayectoria repetible; el apoyo del pecho reduce la necesidad de sostener el torso inclinado. Elige la versión que permita limitar la serie por la espalda objetivo.",
    "Горизонтальная тяга дополняет подтягивания работой широчайших и верха спины. Блок даёт повторяемую траекторию, опора грудью снижает требования к удержанию наклона. Выберите вариант, где подход ограничивают целевые мышцы.",
    "Yatay çekiş, barfiksi kanat ve üst sırt çalışmasıyla tamamlar. Kablo tekrarlanabilir bir çekiş yolu sunar; göğüs desteği eğik duruşu tutma ihtiyacını azaltır. Seti denge ya da bel yorgunluğu yerine hedef sırt kaslarının sınırladığı varyasyonu seç.",
  ),
  lateral: L(
    "Direct side-delt work complements presses, which emphasize the front delts more. It is a practical accessory for shoulder width with modest external loads. Clean reps matter more than using momentum to move a heavier dumbbell.",
    "El trabajo directo del deltoides lateral complementa los presses, más centrados en el anterior. Es útil para desarrollar anchura de hombros con cargas moderadas. Prioriza repeticiones limpias sobre el impulso.",
    "Прямая работа средней дельты дополняет жимы с акцентом на переднюю часть плеча. Практичный вариант для ширины плеч с небольшим весом. Контроль важнее размахивания тяжёлой гантелью.",
    "Presslerin daha çok odaklandığı ön omuzu, doğrudan yan omuz çalışmasıyla tamamlar. Mütevazı yüklerle omuz genişliği için pratik bir aksesuardır. Ağır dambılı savurmak yerine temiz tekrarları önemse.",
  ),
  rear: L(
    "A focused rear-delt movement rounds out a program with plenty of pressing. It adds shoulder work without requiring another heavy row; the machine provides support while dumbbells allow a freer path. It does not automatically correct posture, but it trains a useful, often overlooked muscle group.",
    "El trabajo de deltoides posterior completa un programa con muchos presses sin añadir otro remo pesado. La máquina da apoyo y las mancuernas más libertad. No corrige automáticamente la postura, pero entrena un grupo a menudo olvidado.",
    "Прицельная работа задней дельты дополняет программу с большим количеством жимов без ещё одной тяжёлой тяги. Тренажёр даёт опору, гантели — свободу траектории. Это не автоматическое исправление осанки, а тренировка полезной мышечной группы.",
    "Arka omuza odaklanan bu hareket, bol itişli programı yeni bir ağır row gerektirmeden tamamlar. Makine destek, dambıl daha serbest yol sunar. Duruşu otomatik düzeltmez; sık ihmal edilen yararlı bir kas grubunu çalıştırır.",
  ),
  curl: L(
    "Curls give the elbow flexors direct work beyond their supporting role in pull-ups and rows. A repeatable barbell setup makes gradual load and rep increases easy to log. Keep the torso still so the progression reflects arm work.",
    "El curl trabaja directamente los flexores del codo además de su ayuda en dominadas y remos. La barra permite registrar progresos graduales. Mantén el torso quieto para que el avance refleje trabajo de brazos.",
    "Сгибания дают прямую нагрузку сгибателям локтя сверх их участия в подтягиваниях и тягах. Со штангой удобно отслеживать вес и повторы. Не раскачивайте корпус, чтобы прогресс отражал работу рук.",
    "Curl, barfiks ve row’daki yardımcı rollerine ek olarak dirsek fleksörlerini doğrudan çalıştırır. Barla tekrarlanabilir kurulum, küçük yük ve tekrar artışlarını kaydetmeyi kolaylaştırır. İlerleme kol çalışmasını yansıtsın diye gövdeyi sabit tut.",
  ),
  benchDips: L(
    "Bench dips offer a simple bodyweight triceps option with little equipment, and foot position can change the challenge. They are optional: the shoulder-extension position is not comfortable for everyone. Skull crushers are the plan's alternative if those fit your shoulders and loading goals better.",
    "Los fondos en banco ofrecen una opción de tríceps con poco equipo; la posición de los pies cambia la dificultad. Son opcionales: la extensión del hombro no resulta cómoda para todos. Las extensiones tumbado son la alternativa del plan.",
    "Отжимания от скамьи — простой вариант для трицепсов с минимумом оборудования; положение ног меняет сложность. Они необязательны: разгибание плеча комфортно не всем. Французский жим — альтернатива в плане.",
    "Bench dips az ekipmanla triceps çalıştırır; ayak konumuyla zorluk değişir. İsteğe bağlıdır: omuz ekstansiyonu herkese rahat gelmez. Omuzlarına ve yükleme hedeflerine daha uygunsa plandaki skull crusher alternatifini seç.",
  ),
  backExtension: L(
    "A compact hip-extension accessory for glutes and hamstrings, with spinal erectors helping control the trunk. It gives this plan some posterior-chain work with relatively little setup. It is useful in its own right, but not an identical substitute for every loaded hip-hinge movement.",
    "Un accesorio de extensión de cadera para glúteos e isquios, con los erectores controlando el tronco. Añade trabajo de cadena posterior con poca preparación. Es útil, pero no sustituye de forma idéntica a todas las bisagras de cadera con carga.",
    "Компактное упражнение на разгибание таза для ягодиц и задней поверхности бедра; разгибатели спины контролируют корпус. Добавляет работу задней цепи с простой подготовкой. Полезно, но не идентично всем вариантам наклонов с весом.",
    "Kalça ve hamstringler için pratik bir kalça ekstansiyonu aksesuarıdır; sırt ekstansörleri gövde kontrolüne katkıda bulunur. Az kurulumla arka zincir çalışması ekler. Yararlıdır ama her yüklü hip-hinge hareketinin birebir karşılığı değildir.",
  ),
  wristCurl: L(
    "Wrist curls directly train wrist flexors, adding forearm work beyond holding bars during pulls. Small loads and controlled movement make them easy to fit at the end of a session. Grip strength also depends on other actions, so wrist curls cover only part of that picture.",
    "El curl de muñeca trabaja sus flexores directamente, más allá de sujetar barras. Cargas pequeñas y control facilitan añadirlo al final. El agarre también depende de otras acciones, así que este ejercicio cubre solo una parte.",
    "Сгибание кистей напрямую тренирует их сгибатели сверх удержания грифа в тягах. Небольшой вес и контроль удобно добавить в конце занятия. Сила хвата зависит и от других действий: это лишь часть её тренировки.",
    "Wrist curl, çekişlerde bar tutmanın ötesinde bilek fleksörlerini doğrudan çalıştırır. Küçük yük ve kontrollü hareketle seans sonuna kolay eklenir. Kavrama gücü başka işlevlere de bağlıdır; bu hareket resmin yalnızca bir bölümünü kapsar.",
  ),
  legpress: L(
    "A supported compound leg exercise that lets quads and glutes work hard with less balance demand than a free-weight squat. It is a practical second lower-day anchor. Use the same machine and depth to compare progress; numbers across different machines are not equivalent.",
    "Un ejercicio compuesto con apoyo que permite trabajar cuádriceps y glúteos con menos demanda de equilibrio que la sentadilla libre. Es una base práctica para el segundo día inferior. Compara progresos en la misma máquina y profundidad.",
    "Базовое упражнение с опорой для квадрицепсов и ягодиц с меньшими требованиями к балансу, чем присед со свободным весом. Подходит как основа второго дня ног. Сравнивайте вес на одном тренажёре и с одинаковой глубиной.",
    "Serbest squat’a göre daha az denge gerektirerek quadriceps ve kalçayı zorlayan destekli bir bileşik harekettir. İkinci alt vücut günü için pratik bir temeldir. Aynı makine ve derinlikte ilerlemeyi izle; farklı makinelerin rakamları eşdeğer değildir.",
  ),
};
export function exerciseBenefit(id: string, variant: string): Localized {
  return extendedBenefits[id] ?? benefits[id === "tricepsChoice" ? variant : id];
}
export const benefitSources = {
  training: "https://acsm.org/resistance-training-guidelines-update-2026/",
  dips: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9603242/",
};
