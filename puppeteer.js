const puppeteer = require('puppeteer');
const fs = require('fs');
const crypto = require("crypto");

const id = crypto.randomBytes(16).toString("hex");

let scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/');

  page.click('h3 > a');

  await page.waitForNavigation()
  await page.screenshot({ path: `./src/img/${id}.jpg` })

  const title = await page.$eval(
    'div.product_main h1', divs => divs.innerText
  )

  const price = await page.$eval(
    'div.product_main .price_color', divs => divs.innerText
  )

  const book = { title, price }

  fs.writeFile("web.json", JSON.stringify(book, null, 2), (err) => {
    if (err) throw new Error("Erro!!");

    console.log("Sucesso!!");
  });
  await browser.close();

  return book;
};

scrape().then((value) => {
    console.log(value)
})

