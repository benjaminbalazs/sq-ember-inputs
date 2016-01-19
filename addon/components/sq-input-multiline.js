import TextInput from './sq-input-text';
import TextArea from './../mixins/sq-textarea';
import Ember from 'ember';
import MaxDisplay from '../mixins/maxdisplay';

export default TextInput.extend(MaxDisplay,{

	classNames: ['sq-input-multiline'],
	linebreak: false,

	initiated: false,

	maxlength: 512,

	// ON RESIZE

	onresize(height) {

		if ( !this.get('initiated') ) {
			this.$().removeClass('sq-input-animation');
		}

		let newheight = height + parseFloat( this.$().css('border-bottom-width') );
		this.$().css('height', newheight);

		//
		if ( this.get('maxdisplay') ) {
			this.$('p').css('top', newheight);
		}

		// INITIATE
		if ( !this.get('initiated') ) {
			var self = this;
			Ember.run.later(function() {
				self.$().addClass('sq-input-animation');
				self.set('initiated', true);
			});
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
