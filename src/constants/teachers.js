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
      'teachers.csv',
    ),
    'utf8',
  );

const teachers = Papa.parse(csvData, {
  header: true,
});

module.exports = teachers
  .data
  .map((teacher) => ({
    ...teacher,
  }));
