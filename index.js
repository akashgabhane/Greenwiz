//using puppeteer npm liabrary, which is used to communicate with DevTools of Chrome browser like a API Bridge.
const puppeteer = require('puppeteer');

const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let count = 0;
  page.on('response', async (response) => {
      //inside matches array we will get  multiple response data at index 1 it will be image url
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
    console.log(matches);
    if (matches && (matches.length === 2)) {
      //extravting img url
      const imgUrl = matches[1];
      const buffer = await response.buffer();
       //storing images into image folder with name as image<image count sequence>
      fs.writeFileSync(`images/image-${count}.${imgUrl}`, buffer, 'base64');
      count += 1;
    }
  });

  await page.goto('https://www.growpital.com/');

  await browser.close();
})();