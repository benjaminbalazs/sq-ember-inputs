import TextInput from './sq-input-text';
import TextArea from './../mixins/sq-textarea';

export default TextInput.extend( {

	classNames: ['sq-input-multiline'],
	linebreak: false,

	initiated: false,

	//

	actions: {

		onresize(height) {

			if ( !this.get('initiated') ) {
				this.$().removeClass('sq-input-animation');
			}

			let newheight = height + parseFloat( this.$().css('border-bottom-width') );
			this.$().css('height', newheight);

			if ( !this.get('initiated') ) {
				var self = this;
				Ember.run.later(function() {
					self.$().addClass('sq-input-animation');
					self.set('initiated', true);
				});
			}

		}

	},

	//

	wrap: Ember.computed('linebreak', function() {
		if ( this.get('linebreak') ) {
			return 'hard';
		} else {
			return 'soft';
		}
	})

});