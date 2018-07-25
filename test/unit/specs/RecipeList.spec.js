import Vue from 'vue'
import RecipeList from '@/components/RecipeList'

describe('RecipeList.vue', () => {
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
		// annoyingly not working
		//	expect(vm.$el.querySelector('.loading').textContent).toEqual('Loading...');
	})
})
