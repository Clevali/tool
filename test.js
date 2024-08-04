const request = require('request');
const cheerio = require('cheerio');

request('https://www2.scut.edu.cn/mdrtc/jyjc/list.htm', (error, response, body) => {
    console.log('body',body)
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(body);
//     const items = [];
//     $('.HotItem-content').each((i, el) => {
//       const title = $(el).find('.HotItem-title').text();
//       const link = $(el).find('.HotItem-link').attr('href');
//       items.push({ title, link });
//     });
//     console.log(items);
//   }
});