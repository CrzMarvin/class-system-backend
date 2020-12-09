function addDefaultColumns(table) {
  // table.datetime('created_at').notNullable().default(Knex.fn.now(6));
  // table.datetime('updated_at').notNullable().default(Knex.fn.now(6));
  table.timestamps(false, true);
  table.datetime('deleted_at');
}
function createNameTable(knex, table_name) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
}

function references(table, tableName, notNullable = true, columnName = '') {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
  if (notNullable) {
    definition.notNullable();
  }
  return definition;
}

function url(table, columnName) {
  table.string(columnName, 2000);
}

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  references,
};
