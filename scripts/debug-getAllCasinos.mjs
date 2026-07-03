import { getAllCasinos } from "../src/lib/evo/load.js";
const casinos = getAllCasinos();
console.log("getAllCasinos count:", casinos.length);
console.log("slugs:", casinos.map(c => c.slug).sort().join(", "));
