import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import router from './routes';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
