var context = function(options) {

};

context.prototype = {

	hide : function() {},
	show : function() {},

	open : function() {},
	close : function() {},

	getContext : function() {},
	setContext : function() {},
	applyContext : function() {},

	getFilter : function() {},
	setFilter : function() {},

};

//	contextDto = {
//		projects: [
// 					{ id: 1, name: 'P1' },
// 					{ id: 2, name: 'P2' },
// 					{ id: 3, name: 'P3' },
// 				],
//		teams: [
// 					{ id: 4, name: 'T1' },
// 					{ id: 5, name: 'T2' },
// 				]
//	}

/** @param {context} context */
function case1_GetContext (context) {
	var cnt = context.getContext(); // contextDto

}

/** @param {context} context */
function case2_contextChanged (context) {
	context.on('change', function(e) {
//		e.context = contextDto;
	})
}

/** @param {context} context */
function case3_savedContext (context) {

	function loadContext(name) {
		return
		{
			projects: [],
			teams: []
		}
	}

	function saveContext(name, context) {

	}

	function getName () {
		return 'Name ' + Math.floor(Math.random() * 100 + 1);
	}

	function on_save() {
		var name = getName();
		saveContext(name, context.getContext());
	}

	function on_load(name) {
		context.setContext(loadContext(name));
		context.applyContext();
		context.close();
	}

	function render_links() {
		var list = getAllContexts();
		var content = $('<div></div>');
		$.each(list,
			function(index, value) {
				var link = $('<div>' + value.name + '</div>');
				link.on('click', function() { on_load(value.name); } )
				link.appendTo(content);
			}
		);
		return content;
	}

	var save_link = $('<div id="save_selected_context">');
	save_link.on('click', on_save);
	context.append(save_link);

	var saved_links = render_links();
	context.append(saved_links);
}

/** @param {context} context */
function case4_customContextMenu (context) {

	var list;
	function renderCustomContext() {

		// HTML stuff
		if (list){
			list.remove();
		}

		var contextDto = context.getContext();
		var filter = context.getFilter();
		list = renderCustomContext(contextDto, filter);
		context.getControls('filter').append(list);
	}

	context.getControls('list').hide();

	renderCustomContext(context.getContext());

	context.on('context-change', renderCustomContext)
	context.on('filter-change', renderCustomContext)
}