import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventario } from './pages/Inventario';
import { Movimenti } from './pages/Movimenti';
import { Ordini } from './pages/Ordini';
import { Fornitori } from './pages/Fornitori';
import { Spedizioni } from './pages/Spedizioni';
import { Report } from './pages/Report';
import { Impostazioni } from './pages/Impostazioni';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="movimenti" element={<Movimenti />} />
            <Route path="ordini" element={<Ordini />} />
            <Route path="fornitori" element={<Fornitori />} />
            <Route path="spedizioni" element={<Spedizioni />} />
            <Route path="report" element={<Report />} />
            <Route path="impostazioni" element={<Impostazioni />} />
          </Route>
        </Routes>
      </HashRouter>
    </SearchProvider>
  );
}

export default App;
