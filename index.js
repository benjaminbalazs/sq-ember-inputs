/* jshint node: true */
'use strict';

module.exports = {
  name: 'sq-ember-inputs',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/assets/sq-dropdown-arrow.svg');
    app.import(app.bowerDirectory + '/dragula.js/dist/dragula.min.js');
	app.import(app.bowerDirectory + '/dragula.js/dist/dragula.min.css');
    app.import(app.bowerDirectory + '/formatter.js/dist/jquery.formatter.min.js');
  },
  isDevelopingAddon: function() {
    return true;
  }
};
