/* eslint no-mixed-operators: 0 */  // --> OFF
const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({

  prompting() {
    this.option('docker', {type: Boolean, required: true});

    const prompts = [{
      type: 'boolean',
      name: 'docker',
      message: 'Would you like to use Docker?'
    }];

    return this.prompt(prompts).then(props => {
      Object.assign(this.props, props);
    });
  },

  configuring() {
    this.type = this.options.server === 'none' ? 'client' : 'server';
  },

  writing() {
    if (this.props.docker) {
      this.copyTemplate(`Dockerfile-${this.type}`, 'Dockerfile', this.props);
    }
  }

});
