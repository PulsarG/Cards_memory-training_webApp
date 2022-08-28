import { createApp } from 'vue'
import router from '@/router/router'
import App from './App.vue'
import store from "@/store/store"



import 'firebase/database';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAUr_dW68pYWDGWzGENIcB7aSpYVOtXVag",
    authDomain: "cards-dd16d.firebaseapp.com",
    projectId: "cards-dd16d",
    storageBucket: "cards-dd16d.appspot.com",
    messagingSenderId: "455117183078",
    appId: "1:455117183078:web:06a859585ef13fdadb75a7"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



createApp(App).use(router).use(store).mount('#app')
