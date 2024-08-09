// src/stores/transactionStore.js
import { writable } from 'svelte/store';

export const transactionStore = writable({
  authorizationUrl: '',
  referencedSubscriptionID: '',
  reference: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  lastPolledDate: '',
  hidden : false,
});

export function updateTransaction(data) {
  transactionStore.set(data);
}
