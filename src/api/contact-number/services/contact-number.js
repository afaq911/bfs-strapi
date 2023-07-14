'use strict';

/**
 * contact-number service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contact-number.contact-number');
