import React from 'react';
import MaterialLayout from './components/Layout/Layout';
import Reservation from './components/Reservation/index';
import { NotificationContainer } from 'react-notifications';
function App() {
  return (
    <div>
      <MaterialLayout>
        <Reservation />
        <NotificationContainer />
      </MaterialLayout>
    </div>
  );
}
export default App;
