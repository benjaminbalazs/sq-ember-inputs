import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import TextInput from './sq-input-text';
import TextArea from './../mixins/sq-textarea';
import MaxDisplay from '../mixins/maxdisplay';
import Lang from '../mixins/lang';

export default TextInput.extend(MaxDisplay,Lang,{

	classNameBindings: ['defaultClass:sq-input-multiline'],
	linebreak: false,
	defaultClass: true,
	ignoreLang: false,

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
			later(function() {
				self.$().addClass('sq-input-animation');
				self.set('initiated', true);
			});
		}

	},

	//

	wrap: computed('linebreak', function() {
		if ( this.get('linebreak') ) {
			return 'hard';
		} else {
			return 'soft';
		}
	})

});
