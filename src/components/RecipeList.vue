<template>
	<div class="recipe-list">
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ error }}
		</div>

		<div v-if="recipeData" class="content">
			<h4>recipe list:</h4>
			<ul>
				<li>{{ recipeData.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	name: 'RecipeList',
	props: [ 'buttonLabel' ],
	data () {
		return {
			loading: false,
			recipes: null,
			ingredients: null,
			error: null
		}
	},
	async created () {
		// fetch the data when the view is created and the data is
		// already being observed
		const allRecipes = [];
		const allIngredients = [];
			
		await fetch('static/ingredients.json')
      .then(ingredients => ingredients.json())
      .then(json => {
				this.ingredients = this.filterIngredients(json.ingredients);
			});
		console.log(this.ingredients);

		await fetch('static/recipes.json')
      .then(r => r.json())
      .then(json => {
				this.recipes = this.filterRecipes(json.recipes);
			});

			console.log(this.recipes)
	},
	methods: {
		filterIngredients: function (ingredients) {
			console.log(ingredients)
			const today = new Date();
			const oldIngredients = _.map(ingredients, (ingredient) => {
				const useBy = new Date(ingredient['use-by']);
				const bestBefore = new Date(ingredient['best-before']);
				// ingredient is before the useBy date
				if ((today < useBy) && (today > bestBefore)) {
					return ingredient;
				} 
			});
			
			// console.log(oldIngredients)

			const freshIngredients = _.map(ingredients, (ingredient) => {
				const bestBefore = new Date(ingredient['best-before']);
				// ingredient is before the best before date
				if (today < bestBefore) {
					return ingredient;
				}
			});
			

			// console.log(freshIngredients)
			
			return {
				oldIngredients: _.pickBy(oldIngredients, _.identity),
				freshIngredients: _.pickBy(freshIngredients, _.identity)
			};
		},

		filterRecipes: function (recipes) {
			const recomendedRecipes = recipes.map(recipe => {
				return recipe;
			});

			return {
				topRecipeList: [],
				bottomRecipeList: []
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
</style>
