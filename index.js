/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var FastbootTransform = require('fastboot-transform');

module.exports = {

    name: 'sq-ember-inputs',

    included: function(app) {

        this._super.included.apply(this, arguments);

        app.import(this.treePaths.vendor + '/dragula/dist/dragula.min.js');
        app.import(this.treePaths.vendor + '/dragula/dist/dragula.min.css');

        app.import(this.treePaths.vendor + '/jquery.browser/jquery.browser.min.js');

        app.import(this.treePaths.vendor + '/formatter.js/jquery.formatter.min.js');

        app.import('vendor/assets/sq-dropdown-arrow.svg', { destDir: 'assets/images' });

    },

    treeForVendor: function(vendorTree) {

        var trees = [];
        if ( vendorTree !== undefined ) { trees.push(vendorTree); }

        //

        var dragulaTree = FastbootTransform(new Funnel(path.join(path.dirname(require.resolve('dragula'))), {
            destDir: 'dragula',
            include: ['dist/dragula.min.js', 'dist/dragula.min.css']
        }));

        trees.push(dragulaTree);

        //

        var jqueryBrowser = FastbootTransform(new Funnel(path.join(path.dirname(require.resolve('jquery.browser'))), {
            destDir: 'jquery.browser',
            files: ['jquery.browser.min.js']
        }));

        trees.push(jqueryBrowser);

        //

        var formatterBrowser = FastbootTransform(new Funnel(path.join(path.dirname(require.resolve('formatter.js')), '..'), {
            destDir: 'formatter.js',
            files: ['jquery.formatter.min.js']
        }));

        trees.push(formatterBrowser);

        //

        return new MergeTrees(trees);

    },

    isDevelopingAddon: function() {
        return true;
    }

};
