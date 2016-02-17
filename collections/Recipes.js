Recipes = new Mongo.Collection('recipes');
Recipes.allow({ //because we deleted the insecure packages.
	insert: function(userId, doc){
		return !!userId; //who is allowed to insert, if you are signed in.
	},
	update: function(userId, doc){
		return !!userId;
	}
});

Ingredient = new SimpleSchema({
	name:{
		type: String
	},
	amount: {
		type: String
	}
});

RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label:"Name"
	},

	desc: {
		type: String,
		label: "Description"
	},

	ingredients: {
		type: [Ingredient] //this allows us to have multiple ingredients
	},

	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform:{
			type: "hidden"
		}
	},

	author: {
		type: String,
		label:"Author",
		autoValue: function(){
			return this.userId
		},
		autoform:{ //autoform specific object
			type: "hidden"
		}
	},
	createdAt:{
		type: Date,
		label:"Created At",
		autoValue: function(){
			return new Date()
		},
		autoform:{
			type: "hidden"
		}
	}
});

Meteor.methods({
	toggleMenuItem: function(id, currentState) {
		Recipes.update(id, {
			$set:{
				inMenu: !currentState
			}
		});
	},
	deleteRecipe: function(id){
		Recipes.remove(id);
	}
});
Recipes.attachSchema(RecipeSchema);