<template>
	<div class="popup">
		<h1>MCID Exchanger</h1>
		<div class="content">
			<input type="text" class="username" placeholder="Username" v-model="username" @input="waitStop($event, 500, onUsernameChange)">
			<div class="icon">
				<g-icon icon="swap_vert" />
			</div>
			<input type="text" class="uuid" placeholder="UUID" v-model="uuid" @input="waitStop($event, 500, onUUIDChange)">
		</div>
	</div>
</template>

<script>
import { inject, ref } from 'vue';
import GIcon from './GIcon.vue';

export default {
	name: 'App',
	components: {
		GIcon
	},
	setup() {
		const api = inject('api');
		const queue = new Map();
		const uuid = ref('');
		const username = ref('');

		const onUsernameChange = () => {
			if (username.value === '') {
				uuid.value = '';
			} else {
				api.get(`https://api.mojang.com/users/profiles/minecraft/${username.value}`).then(res => {
					if (res.data == null) return;
					uuid.value = res.data.id;
				});
			}
		}

		const onUUIDChange = () => {
			if (uuid.value === '') {
				username.value = '';
			} else {
				api.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid.value}`).then(res => {
					if (res.data == null) return;
					username.value = res.data.name;
				});
			}
		}
	
		const waitStop = (e, ms, func) => {
			if (queue.get(e.target) === undefined) {
				queue.set(e.target, setTimeout(() => {
					queue.delete(e.target);
					func();
				}, ms));
			} else {
				clearInterval(queue.get(e.target));
				queue.delete(e.target);
				waitStop(e, ms, func);
			}
		}

		return {
			api,
			waitStop,
			onUUIDChange,
			onUsernameChange,
			uuid,
			username
		}
	}
}
</script>

<style scoped lang="scss">
.popup {
	margin: 10px;
}

.content {
	padding: 10px;
}

input {
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
}

.icon {
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;

	:deep() .icon {
		font-size: 40px;
		color: #37474F;
	}
}
</style>

<style src="./globalStyle.css"></style>
