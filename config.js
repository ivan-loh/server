'use strict';

const pack     = require('./package.json');
const path     = require('path');
const rootPath = path.normalize(__dirname + '/..');

module.exports = {
      root: rootPath,
       app: {name: pack.name},
    secret: process.env.SECRET   || 'ZBaAjOlA4VbV0g9ufbRMG0Ro44fb/Y53trBrBhuK2f9rFz95bxZ4KMfdxfpNUf06v36VGPHPRGFBweWv4ga+Q2RfSZcJOji0A7rCaP1YaYO2Srb3ZqziDsmMEzP9L3oUoXMIegHxB66ztiRbadcQv9F32AantKWj4W6wib0GooU=',
      port: process.env.PORT     || 3000,
        db: process.env.DATABASE || `mongodb://127.0.0.1:27017/${pack.name}`,
};
