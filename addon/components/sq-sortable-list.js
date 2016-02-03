import Ember from 'ember';
import Sortable from './../mixins/sortable';

export default Ember.Component.extend(Sortable,{

	classNames: ['sq-sortable-list'],
	tagName: 'ul',
	model: null,
	autosave: true,

	// INIT --------------------------------------------------------------------

	didInsertElement() {

		var self = this;

		let myself = document.getElementById(this.get('elementId'));

		let drag = dragula([myself], {
			copy: false,
			mirrorContainer: document.body
		});

		drag.on('drag', function(el) {
			this.currentIndex = Ember.$(el).index();
		});

		drag.on('drop', function(el) {

			let newIndex = Ember.$(el).index();

			if ( newIndex !== this.currentIndex ) {

				self.update(newIndex);

			}

		});

	},

	// UPDATE ------------------------------------------------------------------

	currentIndex: null,

	update(newIndex) {

		this.sendAction('change', this.currentIndex, newIndex);

		// NEW POSITIONS -------------------------------------------------------

		var self = this;

		var positions = [];
		this.$().children().each(function(index) {
    		positions[Ember.$(this).attr('reference')] = index;
		});

		var childs = this.get('childViews');
		for ( var i=0; i < childs.length; i++) {
			let view = childs[i];
			let newposition = positions[view.get('model.id')];
			view.set('model.position', newposition);
		}

		// AUTOSAVE ------------------------------------------------------------

		if ( this.get('autosave') ) {
			var list = [];
			for ( var n=0; n < childs.length; n++) {
				let view = childs[n];
				let model = view.get('model');
				if ( model.get('hasDirtyAttributes') ) {
					let promise = model.save();
					list.push(promise);
				}
			}
			Ember.RSVP.Promise.all(list).then(function() {
				self.sendAction('complete');
			});
		}

	},

});
