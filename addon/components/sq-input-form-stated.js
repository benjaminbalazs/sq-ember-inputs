import SqForm from './sq-input-form';
import Ember from 'ember';

export default SqForm.extend({

	//
	dirty: false,
	saving: false,
	saved: false,
	errored: false,

	//

	actions : {

		submit() {

			var self = this;

			this.validate();

			if ( this.isValid() ) {

				if ( typeof(this.get('submit')) === 'function' ) {

					this.set('saving', true);

					// UPDATE MODEL VALUES
					var list = this.get('params').split(',');
					for ( var i=0; i < list.length; i++) {
						var value = this.get('internal.'+list[i] );
						self.set('model.'+list[i], value);
					}

					//---

					var save = this.get('submit');

					save().then(function() {

						self.set('saving', false);
						self.set('dirty', false);
						self.set('saved', true);

						setTimeout(function() {
							if ( self.get('isDestroyed') === false && self.get('isDestroying') === false ) {
								self.set('saved', false);
							}
						}, 800);

					}).catch(function() {
						if ( self.get('isDestroyed') === false && self.get('isDestroying') === false ) {
							self.set('errored', true);
							self.set('saving', false);
						}
					});

				} else {
					this.sendAction('submit');
					this.set('dirty', false);
				}

			}

		}

	},

	//

	changed() {
		var list = this.get('params').split(',');
		var isDifferent = false;
		for ( var i=0; i < list.length; i++) {
			if ( String(this.get('model.'+list[i])) !== String(this.get('internal.'+list[i])) ) {
				isDifferent = true;
			}
		}
		this.set('dirty', isDifferent);
		this.sendAction('change', this.get('internal'));
	},

	// LISTENERS

	init() {

		this._super();

		this.set('internal', Ember.Object.create({}));

		var list = this.get('params').split(',');

		for ( var i=0; i < list.length; i++) {

			// DEFAULTS
			this.set('internal.'+list[i], this.get('model.'+list[i]));

			// LISTENER
			this.get('internal').addObserver(list[i], this, this.changed);

			// APPLY OUTSIDE CHANGE
			this.get('model').addObserver(list[i], this, this.outside);

		}

		var self = this;
		Ember.run.later(function() {
			self.sendAction('change', self.get('internal'));
		});

	},

	willDestroy() {

		var list = this.get('params').split(',');

		for ( var i=0; i < list.length; i++) {

			this.get('internal').removeObserver(list[i], this, this.changed);

			this.get('model').removeObserver(list[i], this, this.outside);

		}

	},

	outside(sender, key) {
		if ( this.get('saving') === false ) {
			this.set('internal.'+key, this.get('model.'+key));
		}
	}

});
