const path = require('path');
const test = require('ava');
const Utils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = Utils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test(`Set prompt for 'docker' to 'true'`, async t => {
  context.option = () => {
  };
  context.prompt = () => new Promise(resolve => resolve({docker: true}));
  Utils.call(context, 'prompting').then(() => {
    t.is(context.props.docker, true);
  });
});

test(`Set the type to 'client' when there is no server`, t => {
  context.options = {server: 'none'};
  Utils.call(context, 'configuring');
  t.is(context.type, 'client');
});

test(`Set the type to 'server' when the server value is not none`, t => {
  context.options = {server: 'express'};
  Utils.call(context, 'configuring');
  t.is(context.type, 'server');
});

// test(`Write 'Dockerfile'`, t => {
//   context.props = {
//     docker: true
//   };
//   context.type = 'client';
//   Utils.call(context, 'writing');
//   t.true(context.copyTemplate['Dockerfile-client'].length > 0);
// });
