import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
<<<<<<< HEAD
import { AuthProvider, useAuth } from './context/AuthContext';
=======
>>>>>>> ecaa6e1ac238950283825c4b4ec1c17376ab6bed
import { Notification } from './components/Shared';
import { TABLES } from './data';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import POSScreen from './screens/POSScreen';
import KDSScreen from './screens/KDSScreen';
import QROrderingScreen from './screens/QROrderingScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OfflineScreen from './screens/OfflineScreen';
<<<<<<< HEAD
import AuthScreen from './screens/AuthScreen';
import './index.css';

function isPublicQrRoute() {
  const params = new URLSearchParams(window.location.search);
  return params.get('screen') === 'qr';
}

function Router() {
  const { currentScreen, setCurrentScreen, setSelectedTable, setOrderType } = useApp();
  const { isAuthenticated, loading } = useAuth();
=======
import './index.css';

function Router() {
  const { currentScreen, setCurrentScreen, setSelectedTable, setOrderType } = useApp();
>>>>>>> ecaa6e1ac238950283825c4b4ec1c17376ab6bed

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');
    const table = params.get('table');

    if (screen === 'qr') {
      setCurrentScreen('qr');
      setOrderType('Dine In');

      if (table) {
        const normalizedTable = String(Number.parseInt(table, 10)).padStart(2, '0');
        const matchedTable = TABLES.find(t => t.number.endsWith(normalizedTable));
        setSelectedTable(matchedTable || { id: Number.parseInt(table, 10) || 12, number: `Table ${normalizedTable}` });
      }
    }
  }, [setCurrentScreen, setOrderType, setSelectedTable]);

  const screens = {
    home: <HomeScreen />,
    dashboard: <DashboardScreen />,
    pos: <POSScreen />,
    kds: <KDSScreen />,
    qr: <QROrderingScreen />,
    history: <OrderHistoryScreen />,
    offline: <OfflineScreen />,
  };

<<<<<<< HEAD
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--cream)',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-muted)',
      }}>
        Loading...
      </div>
    );
  }

  const showAuth = !isAuthenticated && !isPublicQrRoute() && currentScreen !== 'qr';

  return (
    <>
      <Notification />
      {showAuth ? <AuthScreen /> : (screens[currentScreen] || <HomeScreen />)}
=======
  return (
    <>
      <Notification />
      {screens[currentScreen] || <HomeScreen />}
>>>>>>> ecaa6e1ac238950283825c4b4ec1c17376ab6bed
    </>
  );
}

export default function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <AppProvider>
        <Router />
      </AppProvider>
    </AuthProvider>
=======
    <AppProvider>
      <Router />
    </AppProvider>
>>>>>>> ecaa6e1ac238950283825c4b4ec1c17376ab6bed
  );
}
