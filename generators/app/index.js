/* eslint no-mixed-operators: 0 */  // --> OFF
const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({

  prompting() {
    this.props = {};
    this.option('docker', {type: Boolean, required: true});

    const prompts = [{
      type: 'confirm',
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

  composing() {
    if (this.props.docker) {
      this.composeWith('bitmate-readme', {
        options: {
          server: this.options.server,
          client: this.options.client,
          docker: this.props.docker
        }
      }, {
        local: require.resolve('@oligibson/generator-bitmate-readme/generators/deploy')
      });
    }
  },

  writing() {
    if (this.props.docker) {
      this.copyTemplate(`Dockerfile-${this.type}.txt`, 'Dockerfile', this.props);
    }
  }

});
