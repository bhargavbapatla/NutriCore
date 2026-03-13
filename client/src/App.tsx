import AppRoutes from './AppRoutes';
import { Suspense } from 'react';
import Loader from './components/loader/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
