'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var SVGPlaygroundGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Some log sugar
    this.log(this.yeoman);

    this.log(chalk.magenta('Welcome to your new nodejs-embedded playground!'));

    var prompts = [{
      type: 'confirm',
      name: 'basicRun',
      message: 'Would you run the generator?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.basicRun = props.basicRun;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('static');

    this.copy('_package.json', 'package.json');
    this.copy('_server.js', 'server.js');
    // this.copy('_index.js', 'app/index.js');
    this.copy('_index.html', 'static/index.html');
  },

  projectfiles: function () {
    /*
    this.copy('Makefile', 'Makefile');
    this.copy('hello.svg', './drawings/hello.svg');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('symlink.sh', 'symlink.sh');
    this.copy('links.js', 'links.js');
    */
  }
});

module.exports = SVGPlaygroundGenerator;
