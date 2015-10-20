$(function(){
	//Auto menu
	var toc = $(".menu, #documentation-menu div").tocify({
		context: ".documentation",
		selectors: "h1,h2",
		extendPage: false,
		scrollTo: 50
	});
	$("#documentation-menu").find('.tocify-subheader').removeClass("tocify-subheader");

	//Chiudiamo il menu al click sul menu mobile
	var navMain = $("#documentation-menu");
	navMain.on("click", "a", null, function(){
		navMain.collapse('hide');
	});
 });