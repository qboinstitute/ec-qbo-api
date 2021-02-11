const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static");

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 5000;
const range = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

router.get("/", (ctx) => {
  ctx.body = "EC QBO";
});

router.get("/banners", (ctx) => {
  ctx.body = require("./data/banners.json");
});

router.get("/categories", (ctx) => {
  ctx.body = require("./data/categories.json");
});

router.get("/oferts", (ctx) => {
  ctx.body = require("./data/oferts.json");
});

router.get("/populars", (ctx) => {
  ctx.body = require("./data/populars.json");
});

router.get("/products", (ctx) => {
  const data = [];
  const categories = [];

  let c = range(1, 9);

  while (categories.length < 9) {
    while (categories.indexOf(c) < 0) {
      categories.push(c);

      const products = [];
      let p = range(1, 15);

      while (products.length < 15) {
        while (products.indexOf(p) < 0) {
          products.push(p);

          data.push({
            id: p * c,
            category_id: c,
            group: `Grupo ${c}`,
            name: `Product ${p * c}`,
            price_old: range(50, 100),
            price: range(10, 49),
            image: `${p}.png`,
          });
        }
        p = range(1, 15);
      }
    }
    c = range(1, 9);
  }

  ctx.body = data;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(Static(__dirname + "/images"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening in port ${PORT}`);
});
