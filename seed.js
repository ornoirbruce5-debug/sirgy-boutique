// seed.js — ibicuruzwa bishya byinjizwa ukoresheje ProductsAPI
// Iyi file igomba kuza munsi ya products.js muri index.html

// 1. Banza usubize ku base defaults kugira ngo wirinde duplicates
ProductsAPI.resetToBase();

// 2. Hanyuma winjize ibicuruzwa bishya icyarimwe ukoresheje importMany
ProductsAPI.importMany([
  {
    name: "Ikabutura",
    price: 20000,
    description: "Ikabutura nziza yo kwambara mu biruhuko.",
    category: ProductsAPI.CATEGORIES.IMPUZU,
    stock: 12,
    image: "placeholder-product-7.jpg"
  },
  {
    name: "Sandale Soft",
    price: 18000,
    description: "Sandale yorohereye 👡.",
    category: ProductsAPI.CATEGORIES.IBIRATO,
    stock: 20,
    image: "sandale.jpg"
  },
  {
    name: "T-shirt Pastel",
    price: 12000,
    description: "T-shirt pastel nziza yo mu biruhuko.",
    category: ProductsAPI.CATEGORIES.IMPUZU,
    stock: 35,
    image: "tshirt.jpg"
  }
]);
