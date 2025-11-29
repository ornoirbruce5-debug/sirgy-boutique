/* jokes.js
   Urutonde rw'urwenya mu Kirundi.
   Iyi file ikoreshwa na main.js kugira ngo itange "Daily Joke Spinner".
   - JOKES: array y'imigani/urwenya mu Kirundi
   - Buri joke ifite id, text, na image (placeholder)
*/

const JOKES = [
  {
    id: "j-001",
    text: "Umwana arabaza: 'Papa, internet ivuga iki?' Papa ati: 'Ni ahantu abantu bakina bakavuga byinshi, ariko bakibagirwa gusoma inyandiko.'",
    image: "jokes/internet.png"
  },
  {
    id: "j-002",
    text: "Umugabo yavuze ati: 'Naguze televiziyo ifite smart.' Mugore ati: 'Yiga iki?' Umugabo ati: 'Yiga tureke turebe.'",
    image: "jokes/smart-tv.png"
  },
  {
    id: "j-003",
    text: "Umukecuru ati ku mwana: 'Mbega umusatsi wawe wose!' Umwana ati: 'Ni internet yanjye, iyo nyinjije ibika amakuru menshi.'",
    image: "jokes/hair-data.png"
  },
  {
    id: "j-004",
    text: "Mundwi mu isoko: Umucuruzi ati: 'Iyi karoti irashimisha amaso.' Umuguzi ati: 'Naho ukwiriye kuyitwara mu gikoni.'",
    image: "jokes/carrot.png"
  },
  {
    id: "j-005",
    text: "Umusore yabajije: 'Ese wamenya guseka kuri wifi?' Inshuti ati: 'Oya, ariko nshobora guhita nsoma memes.'",
    image: "jokes/wifi-laugh.png"
  },
  {
    id: "j-006",
    text: "Umwana ati: 'Papa, ushobora kunyungurura amazi?' Papa ati: 'Oya, ariko nshobora kuyashyira mu gikoresho cya Google.'",
    image: "jokes/google-water.png"
  },
  {
    id: "j-007",
    text: "Umuhinzi ati: 'Ibi birungo birakura neza.' Mugenzi we ati: 'Ni kubera ko ubona meme y'ubuhinzi buri gitondo.'",
    image: "jokes/farmer-meme.png"
  },
  {
    id: "j-008",
    text: "Umugore ati: 'Nahaye telefoni incuti yanjye.' Umugabo ati: 'Ese yarigize iyo incuti?' Umugore ati: 'Yohereje emoji gusa.'",
    image: "jokes/emoji-phone.png"
  },
  {
    id: "j-009",
    text: "Abana baravuga: 'Tugura drone ngo turebe inka.' Umubyeyi ati: 'Ntimuzibagirwe kuzikiza igorofa.'",
    image: "jokes/drone-cow.png"
  },
  {
    id: "j-010",
    text: "Umukecuru ati: 'Mubyeyi, internet ni nziza, ariko icyiza ni umuryango.' Umwana ati: 'Ndabyumva, ariko meme zirashimisha.'",
    image: "jokes/family-meme.png"
  }
];

// Tuma array iboneka ku window kugira ngo main.js ibone JOKES
if (typeof window !== 'undefined') {
  window.JOKES = JOKES;
}
