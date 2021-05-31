Macro.add('console', {
	tags: null,
	handler: function() {
		var html = "";
		html += "param[0] "+this.args[0]+"<br>";
		html += "param[1] "+this.args[1]+"<br>";
		html += "param[2] "+this.args[2]+"<br>";
		html += "content: "+this.payload[0].contents+"<br>";
		$(this.output).wiki(html);
	}
});