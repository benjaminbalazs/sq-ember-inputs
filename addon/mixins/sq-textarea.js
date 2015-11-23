import Ember from "ember";

export default Ember.TextArea.reopen({

	//

	savedheight: null,

	dimensionsDidChange() {

		this._super();

		let height = this.get('dimensions.height') + parseFloat(this.$().css('margin-top')) + parseFloat(this.$().css('margin-bottom'));

		if ( height !== this.get('savedheight') ) {
			this.sendAction('onresize', height);
			this.set('savedheight', height);
		}

	},

	//

	_elementValueDidChange() {

		// LINE BREAK REMOVER
		if ( !this.get('linebreak') ) {
			var msg = this.$().val().replace("\n", "");
			this.$().val(msg);
		}

    	this._super();

	},

	//

	keyDown(event) {
		this._super(event);
		if ( !this.get('linebreak') ) {
		 	if ( event.which === 13 && event.shiftKey ) {
				event.preventDefault();
			}
		}
		if ( event.which === 13 ) {
			this.sendAction('enterPressed');
		}
    },

});
