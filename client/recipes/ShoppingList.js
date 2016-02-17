Template.ShoppingList.onCreated(function(){ //refers to the Menu template
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.ShoppingList.helpers({
	recipes: ()=> {
		return Recipes.find({inMenu: true});
	}
});