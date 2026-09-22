import { extendedCoaching } from "./extendedCatalog";
import type { Localized } from "../domain/schema";
export const L = (
  en: string,
  es: string,
  ru: string,
  tr: string,
): Localized => ({ en, es, ru, tr });
export interface ExerciseCoaching {
  setup: Localized;
  movement: Localized;
  avoid: Localized;
  warmup: "bodyweight" | "compound" | "accessory";
}
const c = (
  setup: Localized,
  movement: Localized,
  avoid: Localized,
  warmup: ExerciseCoaching["warmup"] = "accessory",
): ExerciseCoaching => ({ setup, movement, avoid, warmup });
export const coaching: Record<string, ExerciseCoaching> = {
  pullup: c(
    L(
      "Secure the belt. Take a comfortable overhand grip and establish an active hang.",
      "Asegura el cinturón. Usa un agarre prono cómodo y cuélgate con control.",
      "Закрепите пояс. Возьмитесь удобным прямым хватом и контролируйте вис.",
      "Kemeri sabitle. Rahat bir üstten tutuş al ve kontrollü, aktif asılış oluştur.",
    ),
    L(
      "Drive elbows down, bring your chin above the bar without reaching your neck, then lower fully under control.",
      "Lleva los codos abajo, supera la barra sin estirar el cuello y baja con control.",
      "Ведите локти вниз, поднимите подбородок над перекладиной без вытягивания шеи и опуститесь подконтрольно.",
      "Dirsekleri aşağı çek, boynunu uzatmadan çeneyi barın üstüne getir ve kontrollü tam iniş yap.",
    ),
    L(
      "Avoid kicking and shortening the bottom range as fatigue builds. Log added weight, not bodyweight plus load.",
      "Evita balanceos y acortar el recorrido al fatigarte. Registra el lastre, no el peso corporal total.",
      "Не раскачивайтесь и не сокращайте нижнюю амплитуду при усталости. Записывайте дополнительный вес.",
      "Yorgunlukta tekme atma ve alt hareket mesafesini kısaltma. Toplam ağırlığı değil, ek yükü kaydet.",
    ),
    "bodyweight",
  ),
  dips: c(
    L(
      "Secure the load and support yourself on parallel bars. Keep wrists stacked and shoulders controlled.",
      "Asegura el lastre y apóyate en las paralelas. Mantén muñecas y hombros estables.",
      "Закрепите вес и примите упор на брусьях. Стабилизируйте запястья и плечи.",
      "Ek yükü sabitle ve paralel barlarda destek al. Bilekleri hizalı, omuzları kontrollü tut.",
    ),
    L(
      "Lower with a small forward lean to a comfortable depth; press back up without bouncing.",
      "Baja con ligera inclinación hasta una profundidad cómoda; sube sin rebotes.",
      "Опускайтесь с небольшим наклоном до комфортной глубины; выжмите себя вверх без отскока.",
      "Hafif öne eğilerek rahat derinliğe in; sektirmeden yukarı it.",
    ),
    L(
      "Do not force deep shoulder extension. Stop the set when stable positioning is lost.",
      "No fuerces la extensión profunda del hombro. Termina cuando pierdas estabilidad.",
      "Не форсируйте глубокое разгибание плеча. Закончите подход при потере устойчивости.",
      "Omzu zorlayarak aşırı derine inme. Sabit pozisyon kaybolduğunda seti bitir.",
    ),
    "bodyweight",
  ),
  ohp: c(
    L(
      "Set the bar near upper-chest height, grip just outside shoulder width and brace your trunk.",
      "Coloca la barra junto al pecho alto, agarra algo más ancho que hombros y estabiliza el tronco.",
      "Гриф у верхней части груди, хват чуть шире плеч, корпус напряжён.",
      "Barı üst göğüs hizasına al, omuzdan biraz geniş tut ve gövdeni sık.",
    ),
    L(
      "Press close to your face, move your head through as the bar clears, then lower to the same start.",
      "Empuja cerca de la cara, pasa la cabeza al superar la barra y vuelve al mismo inicio.",
      "Жмите близко к лицу, после прохождения грифа подайте голову вперёд и вернитесь в исходное положение.",
      "Barı yüze yakın it, bar geçince başını hizaya getir ve aynı başlangıca indir.",
    ),
    L(
      "Avoid turning this into an incline press by arching your lower back. Use the rack for a controlled finish.",
      "No arquees la espalda para convertirlo en press inclinado. Termina controlando la barra en el rack.",
      "Не превращайте движение в наклонный жим прогибом поясницы. Контролируемо верните гриф на стойки.",
      "Belden aşırı yaylanarak hareketi incline press’e çevirme. Barı kontrollü şekilde rafa bırak.",
    ),
    "compound",
  ),
  inclineShoulder: c(
    L(
      "Set the bench to 65–75°. Plant your feet and set dumbbells or the Smith bar at a comfortable shoulder level.",
      "Ajusta el banco a 65–75°. Apoya los pies y coloca mancuernas o barra Smith a una altura cómoda.",
      "Установите 65–75°. Упритесь стопами и расположите гантели или гриф Смита на комфортной высоте плеч.",
      "Bench’i 65–75° ayarla. Ayakları yere bas; dambılları veya Smith barını rahat omuz hizasına getir.",
    ),
    L(
      "Keep forearms under the load. Press upward smoothly and return to a repeatable, comfortable depth.",
      "Mantén antebrazos bajo la carga. Empuja suave y vuelve a una profundidad cómoda y constante.",
      "Предплечья под весом. Плавно жмите вверх и возвращайтесь на одинаковую комфортную глубину.",
      "Ön kollar yükün altında kalsın. Düzgünce yukarı it, aynı rahat derinliğe dön.",
    ),
    L(
      "Use Smith safeties. Dumbbell numbers are per hand; Smith loads have a separate history.",
      "Usa topes en Smith. Registra cada mancuerna; las cargas Smith tienen historial separado.",
      "Настройте ограничители Смита. Вес гантели указывается на одну руку; история Смита отдельная.",
      "Smith güvenlik stoplarını ayarla. Dambıl ağırlığı tek el içindir; Smith geçmişi ayrıdır.",
    ),
    "compound",
  ),
  skull: c(
    L(
      "Lie securely on the bench with a comfortable grip; position upper arms slightly behind vertical.",
      "Túmbate firme con agarre cómodo; coloca los brazos un poco detrás de la vertical.",
      "Устойчиво лягте, возьмитесь удобно; плечи чуть за вертикалью.",
      "Bench’e sağlam uzan, rahat tutuş al; üst kolları dikeyin biraz gerisine yerleştir.",
    ),
    L(
      "Bend the elbows to lower the bar toward or behind the forehead, then extend without moving the torso.",
      "Flexiona codos hacia o detrás de la frente y extiende sin mover el torso.",
      "Сгибайте локти, опуская гриф ко лбу или за него; разгибайте без движения корпуса.",
      "Dirsekleri bükerek barı alın hizasına veya biraz gerisine indir; gövdeyi oynatmadan aç.",
    ),
    L(
      "Keep the descent controlled; do not bounce or force elbow discomfort. Choose a load you can stop safely.",
      "Controla la bajada; no rebotes ni fuerces molestias de codo. Elige una carga controlable.",
      "Контролируйте опускание, избегайте отскока и боли в локте. Вес должен быть управляемым.",
      "İnişi kontrol et; sektirme ve dirsek rahatsızlığını zorlama. Güvenle durdurabileceğin yük seç.",
    ),
  ),
  squat: c(
    L(
      "Set rack safeties, place the bar securely on your upper back and establish a stable foot position.",
      "Ajusta los topes, apoya la barra en la espalda alta y fija una postura estable.",
      "Настройте ограничители, устойчиво расположите гриф на верхней части спины и поставьте стопы.",
      "Güvenlik kollarını ayarla, barı üst sırta sağlam yerleştir ve dengeli ayak pozisyonu al.",
    ),
    L(
      "Brace before descending. Let knees follow toes, keep the whole foot planted and stand from a consistent comfortable depth.",
      "Estabiliza antes de bajar. Rodillas siguen los pies, planta completa apoyada y profundidad cómoda constante.",
      "Напрягите корпус перед спуском. Колени по направлению носков, стопы прижаты, глубина комфортная и постоянная.",
      "İnmeden gövdeyi sık. Dizler ayak yönünü izlesin, tüm taban yerde kalsın ve tutarlı rahat derinlikten kalk.",
    ),
    L(
      "Avoid bouncing into a depth you cannot control or adding load while the range shrinks.",
      "Evita rebotar en una profundidad incontrolable o subir peso acortando el recorrido.",
      "Не проваливайтесь с отскоком и не добавляйте вес за счёт сокращения амплитуды.",
      "Kontrol edemediğin derinliğe sekme; mesafeyi kısaltarak ağırlık artırma.",
    ),
    "compound",
  ),
  bulgarian: c(
    L(
      "Rest your rear foot on a stable bench. Place the front foot far enough forward for a balanced descent.",
      "Apoya el pie trasero en un banco estable y adelanta el otro para bajar con equilibrio.",
      "Положите заднюю стопу на устойчивую скамью. Переднюю поставьте для устойчивого спуска.",
      "Arka ayağı sabit bench’e koy. Ön ayağı dengeli inişe izin veren mesafede öne yerleştir.",
    ),
    L(
      "Lower through the front leg, keep its foot planted, then push the floor away. Repeat the same reps on both sides.",
      "Baja sobre la pierna delantera, mantén el apoyo y empuja el suelo. Iguala reps en ambos lados.",
      "Опускайтесь на передней ноге, сохраняя опору, затем оттолкнитесь. Повторы одинаковы на обе стороны.",
      "Ön bacak üzerinden in, tabanı yerde tut ve zemini it. İki tarafta aynı tekrarı yap.",
    ),
    L(
      "Start with your less capable side. Avoid pushing excessively with the rear leg or losing balance.",
      "Empieza por el lado menos fuerte. Evita empujar demasiado con la pierna trasera o perder equilibrio.",
      "Начинайте со слабой стороны. Не отталкивайтесь чрезмерно задней ногой и не теряйте равновесие.",
      "Daha zayıf tarafla başla. Arka bacakla aşırı itme ve dengeyi kaybetme.",
    ),
  ),
  ham: c(
    L(
      "Align the machine pivot with your knee and secure the pads without compressing the joint.",
      "Alinea el eje con la rodilla y ajusta almohadillas sin comprimir la articulación.",
      "Совместите ось тренажёра с коленом и настройте валики без давления на сустав.",
      "Makine eksenini dizinle hizala; pedleri eklemi sıkıştırmadan sabitle.",
    ),
    L(
      "Curl through the knee while hips stay supported; return slowly without letting the stack crash.",
      "Flexiona rodillas con caderas apoyadas; vuelve con control sin golpear las placas.",
      "Сгибайте колени, удерживая таз на опоре; возвращайтесь без удара грузов.",
      "Kalça destekte kalırken dizden bük; ağırlıkları çarpmadan kontrollü aç.",
    ),
    L(
      "Do not lift your hips or shorten the return to move a heavier stack.",
      "No levantes caderas ni acortes la vuelta por usar más peso.",
      "Не поднимайте таз и не сокращайте возврат ради большего веса.",
      "Daha ağır yük için kalçayı kaldırma veya dönüş mesafesini kısaltma.",
    ),
  ),
  extension: c(
    L(
      "Align the machine pivot with your knee; place the shin pad above the ankle and secure your hips.",
      "Alinea el eje con la rodilla, coloca el rodillo sobre el tobillo y fija caderas.",
      "Ось на уровне колена, валик выше голеностопа, таз зафиксирован.",
      "Ekseni dizle hizala; pedi ayak bileğinin üstüne koy ve kalçayı sabitle.",
    ),
    L(
      "Extend the knees smoothly, briefly control the top, then bend back through a comfortable range.",
      "Extiende suave, controla arriba y vuelve por un recorrido cómodo.",
      "Плавно разгибайте колени, контролируйте верх и возвращайтесь в комфортной амплитуде.",
      "Dizleri düzgünce aç, üstte kısa kontrol sağla ve rahat mesafede geri bük.",
    ),
    L(
      "Avoid kicking the weight, lifting off the seat or snapping into lockout.",
      "Evita lanzar el peso, levantarte del asiento o bloquear bruscamente.",
      "Не подбрасывайте вес, не отрывайтесь от сиденья и не разгибайте колени рывком.",
      "Ağırlığı tekmeleme, koltuktan kalkma veya dizi sertçe kilitleme.",
    ),
  ),
  decline: c(
    L(
      "Secure your legs on a decline bench and hold the weight close to your chest.",
      "Fija las piernas en el banco declinado y sujeta el peso cerca del pecho.",
      "Зафиксируйте ноги на наклонной скамье, держите вес у груди.",
      "Decline bench’te bacakları sabitle ve ağırlığı göğse yakın tut.",
    ),
    L(
      "Bring ribs toward pelvis by curling the trunk; lower with control without turning it into a full sit-up.",
      "Acerca costillas a pelvis flexionando el tronco; baja sin convertirlo en una incorporación completa.",
      "Сближайте рёбра и таз скручиванием корпуса; опускайтесь, не превращая движение в полный подъём туловища.",
      "Gövdeyi kıvırarak kaburgaları leğen kemiğine yaklaştır; tam oturuşa dönüştürmeden kontrollü in.",
    ),
    L(
      "Do not pull on your neck or swing the plate. Keep the same bench angle across sessions.",
      "No tires del cuello ni balancees el disco. Mantén el mismo ángulo entre sesiones.",
      "Не тяните шею и не раскачивайте диск. Сохраняйте одинаковый угол скамьи.",
      "Boynu çekme ve plakayı savurma. Seanslar boyunca aynı bench açısını koru.",
    ),
  ),
  pec: c(
    L(
      "Set the seat so handles sit around chest height and choose a comfortable starting stretch.",
      "Ajusta asiento para tener agarres al pecho y un estiramiento inicial cómodo.",
      "Рукояти примерно на уровне груди, начальное растяжение комфортное.",
      "Koltuk yüksekliğini tutacaklar göğüs hizasında olacak şekilde ayarla; rahat açıklık seç.",
    ),
    L(
      "Bring your arms together with a soft elbow bend; open slowly while your torso stays supported.",
      "Junta brazos con codos ligeramente flexionados; abre lento con el torso apoyado.",
      "Сводите руки с небольшим сгибанием локтей; медленно разводите, сохраняя опору корпуса.",
      "Dirsekler hafif bükülüyken kolları birleştir; gövde destekteyken yavaşça aç.",
    ),
    L(
      "Avoid bouncing out of the stretched position or shrugging shoulders toward your ears.",
      "Evita rebotar desde el estiramiento o encoger hombros hacia las orejas.",
      "Не отскакивайте из растянутого положения и не поднимайте плечи к ушам.",
      "Açık pozisyondan sektirme ve omuzları kulaklara çekme.",
    ),
  ),
  row: c(
    L(
      "Brace at the cable station or set your chest firmly against the support pad.",
      "Estabiliza el tronco en polea o apoya el pecho firmemente en el pad.",
      "Стабилизируйте корпус у блока или плотно упритесь грудью в подушку.",
      "Kablo istasyonunda gövdeyi sık veya göğsünü destek pedine sabitle.",
    ),
    L(
      "Pull elbows back and let shoulder blades move naturally. Return to a controlled reach without rounding the lower back.",
      "Lleva codos atrás y deja mover escápulas. Extiende con control sin redondear la zona lumbar.",
      "Ведите локти назад, лопатки двигаются естественно. Вернитесь в растяжение без округления поясницы.",
      "Dirsekleri geriye çek; kürek kemikleri doğal hareket etsin. Beli yuvarlamadan kontrollü uzan.",
    ),
    L(
      "Avoid throwing the torso backward. Keep your handle, seat setting and variant consistent.",
      "No lances el torso atrás. Mantén agarre, asiento y variante constantes.",
      "Не отклоняйте корпус рывком. Сохраняйте рукоять, настройки и вариант упражнения.",
      "Gövdeyi geriye savurma. Tutacak, koltuk ayarı ve varyasyon aynı kalsın.",
    ),
  ),
  lateral: c(
    L(
      "Stand balanced with soft elbows and dumbbells by your sides.",
      "Ponte estable, codos suaves y mancuernas a los lados.",
      "Встаньте устойчиво, локти чуть согнуты, гантели по бокам.",
      "Dengeli dur, dirsekleri hafif bük; dambıllar yanlarda olsun.",
    ),
    L(
      "Raise arms slightly forward of your sides to about shoulder height; lower smoothly.",
      "Eleva brazos algo por delante de los lados hasta el hombro y baja suave.",
      "Поднимайте руки немного впереди линии корпуса примерно до плеч и плавно опускайте.",
      "Kolları yan çizginin biraz önünden omuz hizasına kadar kaldır; düzgünce indir.",
    ),
    L(
      "Avoid swinging your hips or shrugging to finish reps. Use a smaller load increment here.",
      "No balancees caderas ni encojas hombros para acabar. Usa incrementos pequeños.",
      "Не раскачивайте таз и не пожимайте плечами. Здесь уместен меньший шаг веса.",
      "Tekrarı bitirmek için kalçayı savurma veya omuz silkme. Burada daha küçük ağırlık artışı kullan.",
    ),
  ),
  rear: c(
    L(
      "Use chest support and set handles or dumbbells so you can open your arms without arching.",
      "Apoya el pecho y ajusta agarres o mancuernas para abrir sin arquearte.",
      "Используйте опору грудью и настройте рукояти или гантели для разведения без прогиба.",
      "Göğüs desteği kullan; tutacakları veya dambılları belden yaylanmadan açabilecek şekilde ayarla.",
    ),
    L(
      "Sweep arms outward with soft elbows; return slowly while keeping your chest in contact with the pad.",
      "Abre brazos con codos suaves; vuelve lento manteniendo pecho apoyado.",
      "Разводите руки со слегка согнутыми локтями; медленно вернитесь, не отрывая грудь.",
      "Dirsekler hafif bükülü kolları dışa aç; göğsü pedden ayırmadan yavaş dön.",
    ),
    L(
      "Avoid converting the fly into a heavy row or shrug. Keep range and equipment repeatable.",
      "No conviertas la apertura en remo pesado o encogimiento. Mantén recorrido y equipo.",
      "Не превращайте разведение в тяжёлую тягу или шраги. Сохраняйте амплитуду и оборудование.",
      "Fly’ı ağır row’a veya shrug’a dönüştürme. Mesafe ve ekipman tutarlı olsun.",
    ),
  ),
  curl: c(
    L(
      "Grip the bar comfortably and stand with elbows near your sides and ribs stacked over pelvis.",
      "Agarra cómodo, codos cerca del cuerpo y costillas alineadas sobre pelvis.",
      "Удобный хват, локти у тела, рёбра над тазом.",
      "Barı rahat tut; dirsekler gövde yanında, kaburgalar pelvis üzerinde hizalı olsun.",
    ),
    L(
      "Curl by bending the elbows, then lower to a consistent extension with the torso still.",
      "Flexiona codos para subir y baja a una extensión constante sin mover el torso.",
      "Сгибайте локти и опускайте до одинакового разгибания при неподвижном корпусе.",
      "Dirsekten bükerek kaldır; gövde sabitken tutarlı açıklığa indir.",
    ),
    L(
      "Do not swing the bar with your hips or lean back to complete a rep.",
      "No impulses con caderas ni te inclines atrás para acabar.",
      "Не раскачивайте гриф тазом и не отклоняйтесь назад ради повтора.",
      "Tekrarı tamamlamak için kalçayla savurma veya arkaya yaslanma.",
    ),
  ),
  backExtension: c(
    L(
      "Set the pad below your hip crease so you can hinge freely; secure your feet.",
      "Coloca el pad bajo el pliegue de cadera para bisagrar libremente; fija pies.",
      "Подушка ниже складки таза для свободного наклона; стопы зафиксированы.",
      "Ped kalça kıvrımının altında kalsın; kalçadan rahat bükülebil ve ayakları sabitle.",
    ),
    L(
      "Hinge down at the hips, then use glutes and hamstrings to return until your body is aligned.",
      "Baja desde caderas y vuelve con glúteos e isquios hasta alinear el cuerpo.",
      "Наклоняйтесь в тазу и возвращайтесь ягодицами и задней поверхностью бедра до прямой линии тела.",
      "Kalçadan aşağı bükül; kalça ve arka bacakla gövde hizalanana kadar dön.",
    ),
    L(
      "Stop at a straight body line; do not crank the lower back into hyperextension.",
      "Para al alinear el cuerpo; no fuerces hiperextensión lumbar.",
      "Остановитесь на прямой линии тела; не переразгибайте поясницу.",
      "Gövde düz çizgiye gelince dur; beli aşırı geriye bükme.",
    ),
  ),
  wristCurl: c(
    L(
      "Support your forearms with wrists just past the bench or knees; hold the bar securely.",
      "Apoya antebrazos con muñecas fuera del banco o rodillas; sujeta firme la barra.",
      "Предплечья на опоре, запястья за краем; надёжно удерживайте гриф.",
      "Ön kolları destekle; bilekler bench veya diz kenarını geçsin. Barı sağlam tut.",
    ),
    L(
      "Move only through a comfortable wrist range; curl up and lower under control.",
      "Mueve solo muñecas por un rango cómodo; flexiona y baja controlado.",
      "Двигайтесь только в комфортной амплитуде запястья; сгибайте и плавно опускайте.",
      "Yalnızca rahat bilek mesafesinde hareket et; bük ve kontrollü indir.",
    ),
    L(
      "Avoid bouncing at the bottom or letting the bar roll out of your grip.",
      "No rebotes abajo ni dejes escapar la barra del agarre.",
      "Не пружиньте внизу и не выпускайте гриф из хвата.",
      "Altta sektirme veya barın tutuştan çıkmasına izin verme.",
    ),
  ),
  legpress: c(
    L(
      "Set the backrest and safeties. Place both feet securely on the platform.",
      "Ajusta respaldo y topes. Apoya ambos pies firmes en la plataforma.",
      "Настройте спинку и ограничители. Устойчиво поставьте стопы на платформу.",
      "Sırtlığı ve güvenlikleri ayarla. İki ayağı platforma sağlam yerleştir.",
    ),
    L(
      "Lower until a comfortable depth while your pelvis stays supported; push evenly through both feet.",
      "Baja a profundidad cómoda con pelvis apoyada; empuja por ambos pies.",
      "Опускайтесь на комфортную глубину, таз на опоре; равномерно жмите обеими стопами.",
      "Pelvis destekte kalırken rahat derinliğe in; iki ayakla eşit it.",
    ),
    L(
      "Avoid rolling your pelvis off the pad or snapping knees straight. Record the same machine each time.",
      "No levantes pelvis del respaldo ni bloquees rodillas bruscamente. Registra siempre la misma máquina.",
      "Не отрывайте таз и не выпрямляйте колени рывком. Записывайте один и тот же тренажёр.",
      "Pelvisi pedden yuvarlayarak kaldırma ve dizleri sert kilitleme. Her seferinde aynı makineyi kaydet.",
    ),
    "compound",
  ),
  benchDips: c(
    L(
      "Use a stable bench, hands by your hips and feet placed for a controllable load.",
      "Usa banco estable, manos junto a caderas y pies para una carga controlable.",
      "Устойчивая скамья, ладони у таза, положение ног обеспечивает управляемую нагрузку.",
      "Sabit bench kullan; eller kalça yanında, ayaklar kontrol edebileceğin yükte olsun.",
    ),
    L(
      "Keep your back near the bench and bend elbows only through a comfortable shoulder range; press up.",
      "Mantén espalda cerca del banco y flexiona en un rango cómodo para hombros; sube.",
      "Держите спину у скамьи и сгибайте локти в комфортной для плеч амплитуде; выжмите себя.",
      "Sırt bench’e yakın kalsın; omuzun rahat mesafesinde dirsekten bük ve yukarı it.",
    ),
    L(
      "Avoid chasing depth behind the body. If shoulders feel pinched, use the skull-crusher option instead.",
      "No busques profundidad extrema detrás del cuerpo. Si molesta el hombro, elige extensión tumbada.",
      "Не гонитесь за глубиной за корпусом. При защемлении в плече выберите французский жим.",
      "Gövdenin gerisinde aşırı derinlik arama. Omuzda sıkışma hissedersen skull crusher seçeneğini kullan.",
    ),
  ),
};
coaching.tricepsChoice = coaching.skull;

Object.assign(coaching, extendedCoaching);
