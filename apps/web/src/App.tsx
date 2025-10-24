import './App.css';
import './themes.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Loader } from './shared/components/Loader';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { SettingsPage } from './pages/SettingsPage';
import { ThemesProvider } from './features/theme';

function App() {
  return (
    <div className="min-h-screen bg-bgMain text-textMain">
      <RecoilRoot>
        <Suspense fallback={<Loader />}>
          <ThemesProvider>
            <AuthApp />
          </ThemesProvider>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

function AuthApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/game/:gameId" element={<MainLayout><GamePage /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
