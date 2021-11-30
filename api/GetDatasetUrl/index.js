// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const datasetService = require('./datasetService.js');

module.exports = async function (context, req) {
  try {
    const result = await datasetService.getDatasetUrl();
    context.res = { status: 200, body: result };
  } catch (err) {
    context.res = { status: 500, body: err };
  } finally {
    context.done();
  }
};
