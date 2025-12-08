/* jokes.js
   Urutonde rw'urwenya mu Kirundi.
   Iyi file ikoreshwa na main.js kugira ngo itange "Daily Joke Spinner".
*/

const JOKES = [
  {
    id: "j-001",
    text: `Umugabo yakubise umugore wiwe ahakwa kumwica maze baramufunga.
Haheze imisi bamujana muri sentare kugira ahanirwe icaha co kugerageza kwica👇👇

Umucamanza: wa mugabo we, wagirizwa icaha co gushaka kwica, uravyemera?
Umugabo: ndavyemera😎

Umucamanza: none kubera iki wamuhondesheje intebe?🤔
Umugabo: kuko vyananiye guterura imeza 😭🤣🤣🤣🤣

AGAKURU KA BONUS

Umwigisha yariko arabwira abanyeshure kwigana umwete, arababwira ati: ni mwigane umwete mumare amashure muje kurondera amafaranga.
Mumenye ko amafaranga atamera ku biti.
Akana kamwe karahaguruka kati: nimba amafaranga atamera ku biti, kubera iki amabanki agira amashami🤔😭🤣🤣🤣 `,
    image: "jokes/joke-1.jpg"
  },
  {
    id: "j-002",
    text: `Inkuru.`,
    image: "jokes/joke-2.jpg"
  }
];

// Tuma array iboneka ku window kugira ngo main.js ibone JOKES
if (typeof window !== 'undefined') {
  window.JOKES = JOKES;
}
