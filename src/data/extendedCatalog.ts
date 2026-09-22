import entries from "./extended-exercises.json";
import profiles from "./extended-profiles.json";
import type { Localized } from "../domain/schema";
import type { Exercise, Muscle } from "./program";
import type { ExerciseCoaching } from "./coaching";
import type { Region } from "./anatomy";

const localized = (values: readonly string[]): Localized => ({en:values[0],es:values[1],ru:values[2],tr:values[3]});
const setup = localized(["Set up the equipment securely and rehearse the movement with a light load. Use the grip and support described below.","Asegura el equipo y practica con poca carga. Usa el agarre y apoyo descritos abajo.","Надёжно настройте оборудование и повторите движение с лёгким весом. Используйте хват и опору, описанные ниже.","Ekipmanı güvenle kur ve hareketi hafif yükle prova et. Aşağıdaki tutuş ve destek tarifini kullan."]);
const avoid = localized(["Keep the range comfortable and repeatable. Avoid momentum and stop when you can no longer control the movement. For unilateral exercises, log reps per side consistently.","Mantén amplitud cómoda y repetible. Evita impulso y termina al perder control. En ejercicios unilaterales registra repeticiones por lado.","Сохраняйте комфортную повторяемую амплитуду. Избегайте инерции и остановитесь при потере контроля. В односторонних движениях записывайте повторы на сторону.","Rahat ve tekrarlanabilir mesafe kullan. Momentumdan kaçın, hareket kontrolü kaybolunca dur. Tek taraflı hareketlerde tekrarları taraf başına tutarlı kaydet."]);
const chinup = ["Take a comfortable underhand grip. Pull elbows down to bring the chin over the bar, then lower under control without kicking.","Usa un agarre supino cómodo. Baja codos y supera la barra con el mentón, luego baja sin impulso.","Возьмитесь удобным обратным хватом. Ведите локти вниз, поднимите подбородок над перекладиной и опуститесь без рывков.","Rahat alttan tutuş al. Dirsekleri aşağı çekerek çeneyi barın üstüne getir, tekme atmadan kontrollü in.","An underhand vertical pull trains lats and elbow flexors together. Added weight offers a clear progression once bodyweight reps are controlled.","Un tirón supino trabaja dorsales y flexores del codo. El lastre permite progresar tras dominar el peso corporal.","Вертикальная тяга обратным хватом тренирует широчайшие и сгибатели локтя. Дополнительный вес даёт прогрессию после освоения техники.","Alttan dikey çekiş kanat ve dirsek fleksörlerini birlikte çalıştırır. Vücut ağırlığı tekrarları kontrollü olunca ek yükle ilerlenir."];
const profileMap: Record<string,string[]> = {...profiles,pullup:chinup};
const regionMuscle: Record<Region,Muscle> = {chest:"chest",lats:"back",upperBack:"back",lowerBack:"back",frontDelts:"shoulders",sideDelts:"shoulders",rearDelts:"shoulders",biceps:"biceps",triceps:"triceps",forearms:"forearms",abs:"abs",glutes:"glutes",quads:"quads",hamstrings:"hamstrings",adductors:"adductors",calves:"calves"};
const compoundProfiles = new Set(["press","pushup","pullup","pulldown","row","shoulder","hinge","deadlift","squat","lunge","stepup","bridge"]);
export const extendedIds = entries.map(e=>e.id);
export const extendedAnatomy: Record<string,{primary:Region[];secondary:Region[]}> = {};
export const extendedCoaching: Record<string,ExerciseCoaching> = {};
export const extendedBenefits: Record<string,Localized> = {};
export const extendedExercises: Record<string,Exercise> = {};
export const extendedCompoundIds = new Set<string>();
for(const e of entries) {
 const profile=profileMap[e.profile];
 if(!profile || profile.length!==8) throw new Error(`Missing exercise profile: ${e.id}`);
 const primary=e.primary as Region[],secondary=e.secondary as Region[];
 const primaryMuscles=[...new Set(primary.map(m=>regionMuscle[m]))];
 extendedAnatomy[e.id]={primary,secondary};
 extendedBenefits[e.id]=localized(profile.slice(4));
 extendedCoaching[e.id]={setup,movement:localized(profile.slice(0,4)),avoid,warmup:e.equipment==='standard'?'bodyweight':compoundProfiles.has(e.profile)?'compound':'accessory'};
 extendedExercises[e.id]={name:e.name,note:localized(profile.slice(0,4)),primary:primaryMuscles,secondary:[...new Set(secondary.map(m=>regionMuscle[m]))].filter(m=>!primaryMuscles.includes(m)),variants:[e.equipment],addedWeight:e.equipment==='standard'};
 if(compoundProfiles.has(e.profile))extendedCompoundIds.add(e.id);
}
