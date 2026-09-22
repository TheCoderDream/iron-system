import { exercises, exerciseIds, type Muscle } from "../data/program";
const normalize = (value: string) => value.toLocaleLowerCase("tr").replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
export function searchExercises(query:string,muscle:Muscle|"all"="all"):string[]{
 const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
 return exerciseIds.filter(id=>{
  const e=exercises[id];
  const text=normalize([id,...Object.values(e.name)].join(" "));
  return (muscle==="all"||e.primary.includes(muscle))&&terms.every(term=>text.includes(term));
 });
}
