import { writable } from 'svelte/store';
import { languageData } from '$lib/languageData.js';

// export const language = writable('en');
export const txt = writable(languageData['en']);
