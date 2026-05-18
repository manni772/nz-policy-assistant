import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Library from './pages/Library';
import Compare from './pages/Compare';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/library" element={<Library />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
