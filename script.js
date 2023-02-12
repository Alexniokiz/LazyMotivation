const puppeteer = require('puppeteer');
const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())
const port = 3001


const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var baseUrl = "https://www.linkedin.com/jobs/view/";

async function scrapeJobOffer(url) {
  // Démarrer une nouvelle instance de navigateur avec Puppeteer
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 800 })
  // Aller à la page de l'offre d'emploi
  await page.goto(baseUrl + url);

  // Extraire les informations de l'offre d'emploi
  await page.waitForSelector('.show-more-less-html__markup');
  const description = await page.$eval('.show-more-less-html__markup', el => el.innerText);

  // Fermer la fenêtre du navigateur
  await browser.close();

  // Retourner les informations de l'offre d'emploi
  return description;
}

async function getMotivationLetter(offer)
{
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "A partir de l'offre d'emploi suivante fait moi la meilleure lettre de motivation en Francais pour ce job: " + offer.substring(0, 1800) + "",
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    
    return response.data.choices[0].text;
}
  
// getMotivationLetter("Bonjour, je suis un test");
// scrapeJobOffer(url).then(offer => {
//     const res = getMotivationLetter(offer);
//     return res;
// });


app.get('/:url', cors(), async (req, res) => {  
  const url = req.params['url'];
  // console.log(url);
  try {
      const resp = await scrapeJobOffer(url).then(offer => {
        const resp2 = getMotivationLetter(offer);
        return resp2;
      });
      res.send(resp.slice(resp.indexOf('Madame')));
  }
  catch (e) {
    res.send("Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
