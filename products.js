/* products.js
   Array y'ibicuruzwa mu Kinyarwanda.
   Shyira aya mafoto (placeholder-product-*.jpg) muri repository yawe kuri GitHub Pages.
   Iyi file nta backend ikenera; main.js izayisoma nka window.PRODUCTS.
*/

const PRODUCTS = [
  {
    id: "p-001",
    name: "Air Jordan class",
    price: 300000,
    description: "Iyi air Jordan ni 🔥 kuma style yose.",
    category: "Ibirato",
    stock: 24,
    image: "placeholder-product-1.jpg"
  },
  {
    id: "p-002",
    name: "shoes 1",
    price: 380000,
    description: "Iyi shoes irarenze 👌🏽.",
    category: "Ibirato",
    stock: 48,
    image: "placeholder-product-2.jpg"
  },
  {
    id: "p-003",
    name: "Triko",
    price: 65000,
    description: "Trickot👕 kugiciro gito.",
    category: "Impuzu",
    stock: 8,
    image: "placeholder-product-3.jpg"
  },
  {
    id: "p-004",
    name: "Tricot Jordan ⛹️‍♂️zikomeye",
    price: 65000,
    description: "Tricot zirahari kugiciro gito zikomeye kandi zitandukanye.",
    category: "Impuzu",
    stock: 31,
    image: "placeholder-product-4.jpg"
  },
  {
    id: "p-005",
    name: "Jeans zidacuya zikomeye cane",
    price: 80000,
    description: "Impuzu nziza cane, styles zitandukanye zabakobwa.",
    category: "Impuzu",
    stock: 15,
    image: "placeholder-product-5.jpg"
  },
  {
    id: "p-006",
    name: "ibirato vyiza",
    price: 180000,
    description: "Hari ibirato bitandukanye karibu cane.",
    category: "Ibirato",
    stock: 60,
    image: "placeholder-product-6.jpg"
  },
  {
    id: "p-007",
    name: "Pantalon",
    price: 85000,
    description: "Pantalon nziza yo kwambara ku kazi no mu biruhuko.",
    category: "Impuzu",
    stock: 20,
    image: "placeholder-product-7.jpg"
  },
   {
      id: "p-008",
      name: "Sandals",
      price: 22000,
      description: "Sandals zikomeye cane pass par tous.",
      category: "Ibirato",
      stock: 10,
      image: "sandale.jpg"
     },
   {
      id: "p-009",
      name: "JEANS 👖 y'amateka ya jobs za everyday",
      price: 70000,
      description: "jeans idasanzwe👌🏽👖 vrt.",
      stock: 3,
      image: "placeholder-product-8.jpg"
   },
   {
      id: "p-010",
      name: "ibirato vyimanza",
      price: 350000,
      description: "ikirato cimara rubanza gikomeye vrt.",
      stock: 3,
      image: "placeholder-product-9.jpg"
   },
   {
      id: "p-011",
      name: "ibirato vyimanza",
      price: 350000,
      description: "ikirato cimara rubanza gikomeye vrt.",
      stock: 3,
      image: "placeholder-product-10.jpg"
   },
   {
      id: "p-0012",
      name: "ibirato vyimanza",
      price: 370000,
      description: "ikirato cimara rubanza gikomeye vrt.",
      stock: 3,
      image: "placeholder-product-11.jpg"
   },
   {
      id: "p-0013",
      name: "Air fox 1",
      price: 140000,
      description: "first quality( qualité yambere.",
      stock: 3,
      image: "product12.jpg"
   }
];

// Export for environments that support modules (optional, safe for browser globals)
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
}
