import puppeteer from 'puppeteer';
import readline from 'readline';
import twilio from 'twilio';

const { Twilio } = twilio;
const twilioClient = new Twilio('TOKEN_TWILIO1', 'TOKEN_TWILIO2');
const twilioNumber = 'NUMBER_TWILIO';
const destinationNumber = 'NUMBER_PERSO';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const userAgentString = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36";
  await page.setUserAgent(userAgentString);

  await page.goto('https://www.yelp.com/', { waitUntil: 'networkidle2' });

  rl.question('Quel type de nourriture recherchez-vous ? ', async (food) => {
    await page.type('#search_description', food);

    rl.question('Où souhaitez-vous chercher ? ', async (location) => {
      await page.type('#search_location', location);
      await page.keyboard.press('Enter');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      //recup
      const restaurants = await page.$$eval('.list__09f24__ynIEd .yelp-emotion-1he6azc', nodes => nodes.slice(0, 10).map(n => {
        const nameElement = n.querySelector('.yelp-emotion-idvn5q');
        const reviewElement = n.querySelector('.yelp-emotion-x4y0dd');
        const href = nameElement ? nameElement.href : 'URL indisponible';
        const name = nameElement ? nameElement.innerText : 'Nom indisponible';
        const review = reviewElement ? reviewElement.innerText : 'Avis indisponible';
        return { name, review, href };
      }));

      for (let restaurant of restaurants) {
        console.log(`Nom du restaurant : ${restaurant.name}, Avis : ${restaurant.review}, URL : ${restaurant.href}`);
        // Envoie du message  Twilio
        try {
          const message = await twilioClient.messages.create({
            body: 'test',
            body: `Nom du restaurant : ${restaurant.name?restaurant.name:""}, Avis : ${restaurant.review}, URL : ${restaurant.href}`,
            from: twilioNumber,
            to: destinationNumber
          });
          console.log(`Message envoyé: ${message.sid}`);
        } catch (error) {
          console.error(`Erreur message: ${error.message}`);
        }
      }

      console.log('Informations affichées sur la console.');
      await browser.close();
      rl.close();
    });
  });
})();
