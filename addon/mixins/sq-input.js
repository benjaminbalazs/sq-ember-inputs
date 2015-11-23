import Ember from "ember";

export default Ember.TextField.reopen({

	//

	didInsertElement() {

		this._super();

		if ( this.get('format') ) {

			var format = this.get('format').split('(').join('{{');
			format = format.split(')').join('}}');

			this.$().formatter({
			  'pattern': format
			});

		}

	},

	//

	width() {

		var value = this.$().val();
		if ( value === '' ) {
			return 0;
		} else {
			var calc = '<div style="clear:both;display:block;visibility:hidden;"><span style="width;inherit;margin:0;font-family:'  + this.$().css('font-family') + ';font-size:'  + this.$().css('font-size') + ';font-weight:' + this.$().css('font-weight') + '">' + value + '</span></div>';
			Ember.$('body').append(calc);
			var width = Ember.$('body').find('span:last').width();
			Ember.$('body').find('span:last').parent().remove();
			return width;
		}

	},

	//

	_elementValueDidChange() {

		if ( this.get('lastvalue') !== this.$().val() ) {

			if ( this.get('number') || this.get('dasherize') || this.get('domain') || this.get('subdomain') || this.get('email') ) {

				var selection = this.getInputSelection();

				var msg = this.$().val();

				if ( this.get('dasherize') || this.get('email') ) {
					msg = msg.toLowerCase();
					msg = String(msg).dasherize();
					msg = msg.replace(/--+/g,"-");
					msg = msg.replace(/^[^a-zA-Z]+/,"");
				}

				if ( this.get('subdomain') ) {
					msg = msg.replace(/[^a-z0-9-]+/ig, "");
				}

				if ( this.get('domain') ) {
					msg = msg.replace(/[^a-z0-9.-]+/ig, "");
				}

				if ( this.get('email') ) {
					msg = msg.replace(/[^a-z0-9.@-]+/ig, "");
				}

				if ( this.get('number') ) {
					msg = msg.replace(/[^0-9]+/ig, "");
				}

				if ( this.$().val() !== msg ) {
					this.$().val(msg);
				}

				this.setInputSelection(selection.start, selection.end);

			}

			if ( this.get('lastvalue') !== this.$().val() ) {
				this.set('lastvalue', this.$().val());
			}

		}

		this._super();

	},

	keyDown(event) {

		this._super(event);

		if ( event.which === 13 ) {
			this.sendAction('enterPressed');
		}

		if ( event.keyCode !== 13 && event.keyCode !== 39 && event.keyCode !== 37 && event.keyCode !== 35 && event.keyCode !== 8 && event.keyCode !== 16 && event.keyCode !== 17 && event.keyCode !== 18 && event.keyCode !== 32 && event.keyCode !== 35 ) {

			//if ( this.get('subdomain') ) {

				//var msg = String.fromCharCode(event.keyCode);
				//console.log(msg)
				//if ( msg.length !== 0 ) {
				//console.log(msg.replace(/[^a-z0-9,-]+/ig, ""));
				//if ( msg.replace(/[^a-z0-9,-]+/ig, "").length === 0 ) {
				//	event.preventDefault();
				//}

			//}

		}


	},


	getInputSelection() {
		var el = this.get('element');
    	var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;
	    if (typeof(el.selectionStart) === "number" && typeof(el.selectionEnd) === "number") {
	        start = el.selectionStart;
	        end = el.selectionEnd;
	    } else {
	        range = document.selection.createRange();
	        if ( range && range.parentElement() === el ) {
	            len = el.value.length;
	            normalizedValue = el.value.replace(/\r\n/g, "\n");
	            textInputRange = el.createTextRange();
	            textInputRange.moveToBookmark(range.getBookmark());
	            endRange = el.createTextRange();
	            endRange.collapse(false);
	            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
	                start = end = len;
	            } else {
	                start = -textInputRange.moveStart("character", -len);
	                start += normalizedValue.slice(0, start).split("\n").length - 1;
	                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
	                    end = len;
	                } else {
	                    end = -textInputRange.moveEnd("character", -len);
	                    end += normalizedValue.slice(0, end).split("\n").length - 1;
	                }
	            }
	        }
	    }
	    return {
	        start: start,
	        end: end
	    };
	},

	offsetToRangeCharacterMove(offset) {
		var el = this.get('element');
	    return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
	},

	setInputSelection(startOffset, endOffset) {
		var el = this.get('element');
	    if ( typeof(el.selectionStart) === "number" && typeof(el.selectionEnd) === "number") {
	        el.selectionStart = startOffset;
	        el.selectionEnd = endOffset;
	    } else {
	        var range = el.createTextRange();
	        var startCharMove = this.offsetToRangeCharacterMove(startOffset);
	        range.collapse(true);
	        if (startOffset === endOffset) {
	            range.move("character", startCharMove);
	        } else {
	            range.moveEnd("character", this.offsetToRangeCharacterMove(endOffset));
	            range.moveStart("character", startCharMove);
	        }
	        range.select();
	    }
	},


});
