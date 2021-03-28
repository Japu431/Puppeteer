const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.instagram.com/fundacaofito/')
  const result = await page.evaluate(() => {
    const books = [];

    document.querySelectorAll('article div')
      .forEach((book) => books.push(book.getAttribute('alt')))
    return books
  })

  fs.writeFile("web.json", JSON.stringify(result, null, 2), (err) => {
    if (err) throw new Error("Erro");

    console.log("Sucesso!!");
  });

  browser.close()
  return result
}
scrape().then((value) => {
  console.log(value)
})




