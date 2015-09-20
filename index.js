/* jshint node: true */
'use strict';

module.exports = {
  name: 'sq-ember-inputs',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/assets/sq-dropdown-arrow.svg');
    app.import(app.bowerDirectory + '/dragula.js/dist/dragula.min.js');
	  app.import(app.bowerDirectory + '/dragula.js/dist/dragula.min.css');
  },
  isDevelopingAddon: function() {
    return true;
  }
};