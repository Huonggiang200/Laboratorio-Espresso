/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';

// Page Imports
import { Home } from './pages/Home';
import { Coffee } from './pages/Coffee';
import { CoffeeDetail } from './pages/CoffeeDetail';
import { Roasters } from './pages/Roasters';
import { Space } from './pages/Space';
import { MenuPage } from './pages/Menu';
import { Visit } from './pages/Visit';
import { Journal } from './pages/Journal';
import { JournalDetail } from './pages/JournalDetail';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="coffee" element={<Coffee />} />
            <Route path="coffee/:slug" element={<CoffeeDetail />} />
            <Route path="roasters" element={<Roasters />} />
            <Route path="space" element={<Space />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:slug" element={<JournalDetail />} />
            <Route path="visit" element={<Visit />} />
            <Route path="contact" element={<Visit />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
