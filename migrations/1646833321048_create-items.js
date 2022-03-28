/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('items', {
    id: 'id',
    manufactureId: { type: 'integer', references: 'manufactures'},
    name: { type: 'varchar(1000)', notNull: true },
    serialNumber: { type: 'varchar(1000)', notNull: true },
    status: { type: 'varchar(1000)', notNull: true },
    scanResult: { type: 'varchar(1000)', notNull: true },
    lastScannedAt: { type: 'timestamp' },
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
