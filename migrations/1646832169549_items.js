/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('manufactures', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
    phone: { type: 'varchar(1000)', notNull: true },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  
};

exports.down = pgm => {};
