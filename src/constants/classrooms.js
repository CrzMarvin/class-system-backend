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
      'classrooms.csv',
    ),
    'utf8',
  );

const classrooms = Papa.parse(csvData, {
  header: true,
});

module.exports = classrooms
  .data;
