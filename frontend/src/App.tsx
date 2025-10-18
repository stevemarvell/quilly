// src/App.tsx

import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Navigate } from 'react-router-dom';
import { WhatToWriteAbout } from './steps/WhatToWriteAbout';
import { MindMap } from './steps/MindMap';
import { FrameworkSelection } from './steps/FrameworkSelection';

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

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/course/what-to-write" element={<WhatToWriteAbout />} />
          <Route path="/course/mind-map" element={<MindMap />} />
          <Route path="/course/framework" element={<FrameworkSelection />} />
          <Route path="/" element={<Navigate to="/course/what-to-write" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}