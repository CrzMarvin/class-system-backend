const Knex = require('knex'); // eslint-disable-line

// const tableNames = require('../../src/constants/tableNames');

// following code is to add auto complete for knex
/**
 *  @param {Knex} knex
 */

exports.seed = async (knex) => {
  // const [tennessee, usa] = await Promise.all([
  //   knex(tableNames.state).where({
  //     code: 'TN',
  //   }).first(),
  //   knex(tableNames.country).where({
  //     code: 'US',
  //   }).first(),
  // ]);
  // const [address_id] = await knex(tableNames.address).insert({
  //   street_address_1: 'jihualu 19 hao',
  //   street_address_2: 'jade community 7-1504',
  //   city: 'Suzhou',
  //   zipcode: '215000',
  //   longitude: 120.6,
  //   latitude: 31.3,
  //   state_id: tennessee.id,
  //   country_id: usa.id,
  // }).returning('id');

  // await knex(tableNames.company).insert({
  //   name: 'Bush Brothers & Company',
  //   logo_url: 'https://dongshanfzy.com/static/media/logo.5d5d9eef.svg',
  //   description: '群依光夫各千平府短？子找亲增目法显顾形。',
  //   website_url: 'https://dongshanfzy.com/',
  //   address_id,
  // });

  // await knex(tableNames.item_type).insert({
  //   name: 'Canned Goods',
  // });

  // await knex(tableNames.inventory_location).insert([
  //   { name: 'kitchen' },
  //   { name: 'study' },
  //   { name: 'bathroom' },
  //   { name: 'balcony' },
  // ]);
};
