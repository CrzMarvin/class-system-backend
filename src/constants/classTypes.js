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
      'class_types.csv',
    ),
    'utf8',
  );

const classTypes = Papa.parse(csvData, {
  header: true,
});

module.exports = classTypes
  .data;
