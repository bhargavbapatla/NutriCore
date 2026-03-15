import AppRoutes from './AppRoutes';
import { Suspense } from 'react';
import Loader from './components/loader/Loader';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';

function App() {
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
