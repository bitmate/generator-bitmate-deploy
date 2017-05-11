'use strict';

const path = require('path');
const test = require('ava');
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.copyTemplate.Dockerfile = null;
});

test(`Write 'Dockerfile'`, t => {
  context.props = {
    docker: true
  };
  context.type = 'client';
  TestUtils.call(context, 'writing', {});
  t.true(context.copyTemplate.Dockerfile.length > 0);
});

test(`Don't write 'Dockerfile'`, t => {
  context.props = {
    docker: false
  };
  context.type = 'client';
  TestUtils.call(context, 'writing', {});
  t.is(context.copyTemplate.Dockerfile, null);
});
