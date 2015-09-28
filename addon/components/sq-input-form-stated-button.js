import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'button',

	//

	classNameBindings: ['saving', 'unchanged', 'saved', 'errored', 'inactive'],

	unchanged: Ember.computed('dirty', function() {
		return !this.get('dirty');
	}),

	inactive: Ember.computed('saving','saved', 'errored', 'dirty', function() {
		return ( !this.get('dirty') || this.get('saving') || this.get('saved') || this.get('errored') );
	}),

    //

	label: Ember.computed('saving', 'dirty', 'saved', 'errored', function() {
		if ( this.get('saving') ) {
			return this.get('Saving');
		} else if ( this.get('saved') ) {
			return this.get('Saved');
		} else if ( this.get('errored') ) {
			return this.get('Errored');
		} else {
			return this.get('Save changes');
		}
	}),

	//

	click() {
		this.get('submit')();
	}

});
