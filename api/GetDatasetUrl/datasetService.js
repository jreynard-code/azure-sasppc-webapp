// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

// The expected return format is an object with 2 properties:
//  - type (string): 'url' for direct HTTP links or 'azureStorage' for files
//    stored in Azure Storage
//  - url (string): HTTP URL (e.g. 'http://localhost:3000/doc.pdf') or relative
//    file path in Azure Storage, starting from the workspace directory
//    (e.g. 'datasets/D-XXXXXXXXXXX/file.xlsx')
async function getDatasetUrl () {
  return {
    url: 'datasets/D-QjEE2Q5Lmg9/Dataset.xlsx',
    type: 'azureStorage'
  };
}

module.exports = {
  getDatasetUrl: getDatasetUrl
};
