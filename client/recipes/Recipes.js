// Meteor.subscribe('recipes');
// template level subscriptions
Template.Recipes.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.Recipes.helpers({
	recipes: ()=> {
		return Recipes.find({});
	}
});
//console.log(Meteor.settings.public.ga.account)