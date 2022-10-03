'use strict';

const validator = (req, res, next) => {
    req.query.name ? next() : next('Item name required');
};

module.exports = validator;