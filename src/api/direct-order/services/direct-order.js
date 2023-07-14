'use strict';

/**
 * direct-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::direct-order.direct-order');
