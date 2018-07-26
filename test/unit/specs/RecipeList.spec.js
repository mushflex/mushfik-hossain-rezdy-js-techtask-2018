import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import RecipeList from '@/components/RecipeList'

describe('RecipeList.vue', () => {
	it('has the expected html structure', () => {
		const Constructor = Vue.extend(RecipeList);
		const vm = new Constructor().$mount();
		expect(vm.$el).toMatchSnapshot();
	})

	it('should render header correctly', () => {
		const Constructor = Vue.extend(RecipeList);
		const vm = new Constructor().$mount();
		const header = 'Recipe List';
		expect(vm.$el.querySelector('h1').textContent).toEqual(header);
	})

	it('should render loading when loading is true', () => {
		const Constructor = Vue.extend(RecipeList);
		const vm = new Constructor().$mount();
		expect(vm.loading).toEqual(true);
	})

	it('should render empty content when not loading', () => {
		const cmp = shallow(RecipeList, { // Create a shallow instance of the component
			data: {
				loading: false,
				recipes: null,
				ingredients: null
			}
		})
		expect(cmp.vm.loading).toEqual(false);
		expect(cmp.vm.$el.querySelector('.content').textContent).toEqual('');
	})

	it('should render empty content when not loading', () => {
		const cmp = shallow(RecipeList, { // Create a shallow instance of the component
			data: {
				loading: false,
				recipes: {
					topRecipeList: [ { title: 'tiramisu' } ],
					bottomRecipeList: [ { title: 'green salad' } ]
				},
				ingredients: null
			}
		})
		expect(cmp.vm.$el.querySelector('.recipe-list__list').textContent).toEqual('tiramisu green salad');
	})
})
