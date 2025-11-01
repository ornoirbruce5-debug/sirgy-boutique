/* jokes.js
   Urutonde rw'urwenya mu Kirundi.
   Iyi file ikoreshwa na main.js kugira ngo itange "Daily Joke Spinner".
   - JOKES: array y'imigani/urwenya mu Kirundi
   - Ibisobanuro byose mu Kinyarwanda/Kirundi
*/

/* Urutonde rw'urwenya (Kirundi) */
const JOKES = [
  "Umwana arabaza: 'Papa, internet ivuga iki?' Papa ati: 'Ni ahantu abantu bakina bakavuga byinshi, ariko bakibagirwa gusoma inyandiko.'",
  "Umugabo yavuze ati: 'Naguze televiziyo ifite smart.' Mugore ati: 'Yiga iki?' Umugabo ati: 'Yiga tureke turebe.'",
  "Umukecuru ati ku mwana: 'Mbega umusatsi wawe wose!' Umwana ati: 'Ni internet yanjye, iyo nyinjije ibika amakuru menshi.'",
  "Mundwi mu isoko: Umucuruzi ati: 'Iyi karoti irashimisha amaso.' Umuguzi ati: 'Naho ukwiriye kuyitwara mu gikoni.'",
  "Umusore yabajije: 'Ese wamenya guseka kuri wifi?' Inshuti ati: 'Oya, ariko nshobora guhita nsoma memes.'",
  "Umwana ati: 'Papa, ushobora kunyungurura amazi?' Papa ati: 'Oya, ariko nshobora kuyashyira mu gikoresho cya Google.'",
  "Umuhinzi ati: 'Ibi birungo birakura neza.' Mugenzi we ati: 'Ni kubera ko ubona meme y'ubuhinzi buri gitondo.'",
  "Umugore ati: 'Nahaye telefoni incuti yanjye.' Umugabo ati: 'Ese yarigize iyo incuti?' Umugore ati: 'Yohereje emoji gusa.'",
  "Abana baravuga: 'Tugura drone ngo turebe inka.' Umubyeyi ati: 'Ntimuzibagirwe kuzikiza igorofa.'",
  "Umukecuru ati: 'Mubyeyi, internet ni nziza, ariko icyiza ni umuryango.' Umwana ati: 'Ndabyumva, ariko meme zirashimisha.'"
];

// Tuma array iboneka ku window kugira ngo main.js ibone JOKES
if (typeof window !== 'undefined') {
  window.JOKES = JOKES;
}
