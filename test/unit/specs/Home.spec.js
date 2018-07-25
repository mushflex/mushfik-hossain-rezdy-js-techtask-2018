import Vue from 'vue'
import Home from '@/components/Home'

describe('Home.vue', () => {
	it('should render button', () => {
		const Constructor = Vue.extend(Home)
		const btnLabel = 'Whats for lunch'
		const vm = new Constructor().$mount()
		console.log(vm.$el.querySelector('.main-button').textContent)
		expect(vm.$el.querySelector('.main-button').textContent)
			.toEqual(btnLabel)
	})
})
