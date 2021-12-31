import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2XQMs_gpudpExH208_sozocFiTYwZShc',
  authDomain: 'todolistapp-d492f.firebaseapp.com',
  projectId: 'todolistapp-d492f',
  storageBucket: 'todolistapp-d492f.appspot.com',
  messagingSenderId: '1031154932214',
  appId: '1:1031154932214:web:7a73836f2dd9aa39d00fd7',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
