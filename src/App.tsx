import { useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { WhiteLabelProvider, useWhiteLabel } from './context/WhiteLabelContext';
// ...existing imports...

// Componente para carregar as fontes dinamicamente
function FontLoader() {
  const { loadHeaderFont } = useWhiteLabel();

  useEffect(() => {
    loadHeaderFont();
  }, [loadHeaderFont]);

  return null;
}

function App() {
  return (
    <WhiteLabelProvider>
      <Router>
        <FontLoader /> {/* Agora o FontLoader é renderizado */}
        {/* ...existing components and routes... */}
        <Routes>{/* ...existing routes... */}</Routes>
      </Router>
    </WhiteLabelProvider>
  );
}

export default App;
