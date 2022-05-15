const router = require("express").Router();
const puppeteer = require("puppeteer");

//good practice is to assign the url to a const named url//

router.route("/:repoName").get((req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://github.com/kbario/${req.params.repoName}`);
    const meta = await page.$eval(
      "meta[property='og:image']",
      (el) => el.content
    );
    console.log("LEZGO \n\n\n\n", meta);

    await browser.close();
    res.json(meta);
  })();
});

module.exports = router;
