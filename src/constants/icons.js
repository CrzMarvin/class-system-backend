const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs
  .readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'db',
      'sources',
      'icons.csv',
    ),
    'utf8',
  );

const icons = Papa.parse(csvData, {
  header: true,
});

module.exports = icons
  .data
  .map((icon) => ({
    ...icon,
  }));
