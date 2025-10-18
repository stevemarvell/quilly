// src/App.tsx

import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, useHistory } from 'react-router-dom';
import { WhatToWriteAbout } from './steps/WhatToWriteAbout';
import { MindMap } from './steps/MindMap';
import { FrameworkSelection } from './steps/FrameworkSelection';
import { Dashboard } from './steps/Dashboard';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/global.css';

setupIonicReact();

function DashboardPage() {
  const history = useHistory();
  return (
    <Dashboard onStartJourney={() => history.push('/course/what-to-write')} />
  );
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <DashboardPage />} />
          <Route exact path="/course/what-to-write" component={WhatToWriteAbout} />
          <Route exact path="/course/mind-map" component={MindMap} />
          <Route exact path="/course/framework" component={FrameworkSelection} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}