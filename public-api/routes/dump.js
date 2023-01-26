const axios = require('axios');
// const config = {
//     "headers": {
//       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       "accept-language": "en-US,en;q=0.9,hi;q=0.8",
//       "cache-control": "max-age=0",
//       "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
//       "sec-ch-ua-mobile": "?1",
//       "sec-ch-ua-platform": "\"Android\"",
//       "sec-fetch-dest": "document",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "none",
//       "sec-fetch-user": "?1",
//       "upgrade-insecure-requests": "1",
//       "cookie": "defaultLang=en; _gid=GA1.2.363733646.1674570940; nsit=uOGwn5kunLLN-oFyjqPYRQGG; AKA_A2=A; ak_bmsc=80AEEB60E02845BAEC0E7C1A335EE54B~000000000000000000000000000000~YAAQUUo5F/nuetOFAQAA3kbh5xI5OHToIh8izx0pylDVfK9znx6m6aZDUAGlL+zkUs4ejJZCY+qJFBL0pZZl2KHgPE/VRwdZApt4SmRphPgfIsObJPK2oQVhvUUWzN/RUkFs0R523bfpuIB7yKA0zKMPH7SOrmIj1TZNsmBl664I3kjDVz40z4Rr1sUKM3pl/UV3H+UEIp2PuG0LV/3sCIOCCjb7wk7P3RhhpsVkFDr4Z7cxdxfE+uH7kb/qLXL/uEMhdDwfloJDurvBCi0u5+dvNr6ax1rR7PYpLFRkHhmLO4ipQ/h97+EekIK9coG9MkbdHB2869k27yPDskjU7roszLbLJSMSK1buYcrCS0KOF/uOGe9RzGmUrQTVLVaMzivG1+xfIdhsvc5IZyp+1orusp3Kp+o3veFCZETMX/5ublN+GKXbnJk1OCfGBbgbORJWwcNkYP9IXPo442ja4SfCv1tLkoDAfOndqZayCA8e6devgxXNQbX0rupy; _ga=GA1.1.1126573041.1674194226; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY3NDYzMjc5MCwiZXhwIjoxNjc0NjM2MzkwfQ.4RjENcujeXdOAA5YAZiFJ-3Y1cF_3K5MEACmFCW-_fM; _ga_PJSKY6CFJH=GS1.1.1674632577.5.1.1674632790.60.0.0; nseQuoteSymbols=[{\"symbol\":\"TATAMOTORS\",\"identifier\":null,\"type\":\"equity\"},{\"symbol\":\"MARUTI\",\"identifier\":null,\"type\":\"equity\"}]; RT=\"z=1&dm=nseindia.com&si=a2dfcb9c-7c20-4dcc-9e3f-0b66b7201406&ss=ldbd03ee&sl=0&tt=0&bcn=%2F%2F684d0d4a.akstat.io%2F\"; bm_sv=D04E644F282472016DB3EFAD2C7B2295~YAAQaiEPF56KzNKFAQAAolQI6BKlnnE97/6f7CB7nKnyMZouyTg4MjM/fsfYCMke6NeTRlqOUw+o7KEkL6zWoz2IrJm3gWnmFkiwJoww4bveFbPqCy0ISAJ0ajSlqxMRtefW9atsEGl7VJSM/4ndBd1BewygzrJyA8T07laDLub+HHrqcwryJ3KiSqEbSoD7UNXlQMICYU2CzO59BQW+fzYZNDZ3a/Xov4Oz2pknb2b6fOmcDLagGtM8+IPLrbDz2iku+g==~1",
//     },
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET"
//   };
// (async function populateStockDetails() {
//     const allNIFTY50StockDetails =  axios.get("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050");
//     // allNIFTY50StockDetails.then((response)=>{
//     //     console.log('response');
//     // })
//     // const symbols = allNIFTY50StockDetails.data.data.map((stockDetail)=>stockDetail.symbol);
//     // console.log(symbols);
//     // const stockDescriptions = [];
//     // for(const symbol of symbols){
//     //     let currentStockDescription;
//     //     try {
//     //         currentStockDescription = await axios({url:`https://www.nseindia.com/api/equity-meta-info?symbol=${symbol}`,...config})
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     //     stockDescriptions.push(currentStockDescription.data)
//     // }
//     // console.log(stockDescriptions);
//     //console.log((await Promise.all([symbols[0],symbols[1],symbols[2]].map((stockSymbol)=>axios({url:`https://www.nseindia.com/api/equity-meta-info?symbol=${stockSymbol}`,...config})))).map((response)=>response.data));

// })();



