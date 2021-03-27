const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/");

  const imgList = await page.evaluate(() => {
    const NodeList = document.querySelectorAll("img");

    console.log(NodeList);

    const imgArray = [...NodeList];

    console.log(imgArray);

    const imgList = imgArray.map(({ src }) => {
      console.log(src);
      ({
        src,
      });
    });

    console.log(imgList);
    return imgList;
  });

  fs.writeFile("web.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error("something went wrong");

    console.log("Well done!");
  });
  await browser.close();
})();
