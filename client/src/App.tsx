import AppRoutes from './AppRoutes';
import { Suspense } from 'react';
import Loader from './components/loader/Loader';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
