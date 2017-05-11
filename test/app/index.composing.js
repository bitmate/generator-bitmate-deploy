'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  context.composeWith = () => {
  };
  require('../../generators/app/index');
});

test(`Call this.composeWith once when docker is 'true'`, () => {
  const spy = chai.spy.on(context, 'composeWith');
  context.props = {docker: true};
  TestUtils.call(context, 'composing', {server: 'express', client: 'angular1'});
  expect(spy).to.have.been.called.once();
  expect(spy).to.have.been.called.with('bitmate-readme');
});

test(`Don't call this.composeWith when docker is 'false'`, () => {
  const spy = chai.spy.on(context, 'composeWith');
  context.props = {docker: false};
  TestUtils.call(context, 'composing', {server: 'express', client: 'angular1'});
  expect(spy).not.to.have.been.called.once();
});
