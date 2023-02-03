const csv = require('csv-parser');
const axios = require('axios');
const stream = require('stream');
const request = require('request');
const NSERequestService = require('./request-service/nse-request-service');
const parseCSVFromURL = async (url) => {
  const parsedData = [];
  return new Promise(async (resolve, reject) => {
    try {
      const nseRequestServiceInstance = new NSERequestService();
      await nseRequestServiceInstance.init();
      const response = await nseRequestServiceInstance.get(url);
      const csvStream = new stream.Readable();
      csvStream.push(response);
      csvStream.push(null);
      csvStream
        .pipe(csv())
        .on('data', (data) => parsedData.push(data))
        .on('end', () => {
          resolve(parsedData);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = parseCSVFromURL;
