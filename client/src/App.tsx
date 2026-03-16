import AppRoutes from './AppRoutes';
import { Suspense, useEffect } from 'react';
import Loader from './components/loader/Loader';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';
import useAuthStore from './store/authStore';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <Toaster position="top-right" expand={false} richColors />
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
