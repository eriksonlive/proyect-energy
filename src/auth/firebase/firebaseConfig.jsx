import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHVlC9yv-VU9t_LWcRn6I8qmvwedt2KsM',
  authDomain: 'react-fc7e1.firebaseapp.com',
  projectId: 'react-fc7e1',
  storageBucket: 'react-fc7e1.firebasestorage.app',
  messagingSenderId: '319425634336',
  appId: '1:319425634336:web:bc2562eefaf0253fa25c45',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación y el proveedor de Google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
