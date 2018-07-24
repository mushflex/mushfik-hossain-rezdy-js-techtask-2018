<template>
	<div class="home">
		<button class="btn btn-upload grey" @click="goToList">
			<label>{{buttonLabel}}</label>
		</button>
	</div>
</template>

<script>

export default {
	name: 'Home',
	props: [ 'buttonLabel' ],
	mounted: function () {
		// Instantiate
		this.buttonLabel = 'Whats for lunch';
	},
	methods: {
		goToList: function () {
			this.$router.push('/recipes');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
	padding: 0.5rem;
	background: #7344c0;
}
h1 {
	color: white;
}
.sub {
	color: white;
}
</style>
