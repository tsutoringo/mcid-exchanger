<template>
	<span class="icon material-icons-round">
		{{icon}}
	</span>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>
.material-icons-round {
	user-select: none;
	vertical-align: middle;
}
</style>