// import { useEffect } from 'react';
import './App.css';
import AppRouter from './router/AppRouter';
// import useAuthStore from './stores/authStore';

function App() {
  // const { isLoggedIn } = useAuthStore();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     localStorage.removeItem('auth-storage');
  //   }
  // }, []);

  return <AppRouter />;
}

export default App;
