import Vue from 'vue'
import RecipeList from '@/components/RecipeList'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(RecipeList)
    // const listData = [];
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.home').textContent).toEqual()
  })
})
