import { writable } from 'svelte/store';
import { languageData } from '$lib/utils/languageData.js';

export const txt = writable(languageData);
