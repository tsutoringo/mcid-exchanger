import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

createApp(App)
	.provide('api', axios.create({
		responseType: 'json'
	}))
	.mount('#app');
