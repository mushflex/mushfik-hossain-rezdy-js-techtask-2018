<template>
	<div class="recipe-list">
		<h1>Recipe List</h1>
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="!loading" class="content">
			<ul v-if="recipes != null" class="recipe-list__list">
				<li v-for="freshRecipe in recipes.topRecipeList" :key="freshRecipe.id">
					<a href="#" @click="goBack">{{ freshRecipe.title }}</a>
				</li>

				<li v-for="oldRecipe in recipes.bottomRecipeList" :key="oldRecipe.id">
					<a href="#" @click="goBack">{{ oldRecipe.title }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	name: 'RecipeList',
	data () {
		return {
			loading: true,
			recipes: null,
			ingredients: null
		}
	},
	async created () {
		// fetch the data when the view is created and the data is
		// already being observed
		await fetch('static/ingredients.json')
			.then(ingredients => ingredients.json())
			.then(json => {
				this.ingredients = this.filterIngredients(json.ingredients);
			});

		await fetch('static/recipes.json')
			.then(r => r.json())
			.then(json => {
				this.recipes = this.filterRecipes(json.recipes);
			});
		this.loading = false;
	},
	methods: {
		filterIngredients: function (ingredients) {
			const today = new Date();
			const oldIngredients = _.map(ingredients, (ingredient) => {
				const useBy = new Date(ingredient['use-by']);
				const bestBefore = new Date(ingredient['best-before']);
				// ingredient is before the useBy date
				if ((today < useBy) && (today > bestBefore)) {
					return ingredient;
				}
			});

			const freshIngredients = _.map(ingredients, (ingredient) => {
				const bestBefore = new Date(ingredient['best-before']);
				// ingredient is before the best before date
				if (today < bestBefore) {
					return ingredient;
				}
			});

			return {
				oldIngredients: _.compact(oldIngredients),
				freshIngredients: _.compact(freshIngredients)
			};
		},

		filterRecipes: function (recipes) {
			const oldIngredientNames = _.mapValues(this.ingredients.oldIngredients, (ingredient) => {
				return ingredient.title;
			});
			const freshIngredientNames = _.mapValues(this.ingredients.freshIngredients, (ingredient) => {
				return ingredient.title;
			});

			let freshRecipes = [];
			let oldRecipes = [];

			_.each(recipes, (recipe) => {
				const recipeIngredients = recipe.ingredients;
				// check each of the ingredients
				let hideRecipe = false;
				let freshRecipe = true;
				_.each(recipeIngredients, (recipeIngredientName) => {
					const existsInOld = _.includes(oldIngredientNames, recipeIngredientName);
					const existsInFresh = _.includes(freshIngredientNames, recipeIngredientName);
					if (!hideRecipe) {
						hideRecipe = (!existsInOld && !existsInFresh);
						if (freshRecipe) {
							freshRecipe = !existsInOld;
						}
					}
				});
				if (!hideRecipe) {
					freshRecipe ? freshRecipes.push(recipe) : oldRecipes.push(recipe);
				};
			});

			return {
				topRecipeList: freshRecipes,
				bottomRecipeList: oldRecipes
			}
		},
		goBack: function () {
			this.$router.push('/');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
	width: 200px;
}

.recipe-list {
	margin: auto;
}

h2 {
	font: 400 40px/1.5 Helvetica, Verdana, sans-serif;
	margin: 0;
	padding: 0;
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

li {
	font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
	border-bottom: 1px solid #ccc;
}

li:last-child {
	border: none;
}

li a {
	text-decoration: none;
	color: #000;
	display: block;
	width: 200px;

	-webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
	-moz-transition: font-size 0.3s ease, background-color 0.3s ease;
	-o-transition: font-size 0.3s ease, background-color 0.3s ease;
	-ms-transition: font-size 0.3s ease, background-color 0.3s ease;
	transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
	font-size: 30px;
	background: #f6f6f6;
}
</style>
