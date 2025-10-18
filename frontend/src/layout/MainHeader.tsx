// src/layout/MainHeader.tsx

import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonLabel,
} from '@ionic/react';

interface MainHeaderProps {
  pageTitle: string;
  currentIndex?: number;
  totalSteps?: number;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
                                                        pageTitle,
                                                        currentIndex,
                                                        totalSteps,
                                                      }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonMenuButton slot="start" />
        <IonTitle>{pageTitle}</IonTitle>
        {currentIndex !== undefined && totalSteps !== undefined && (
          <IonLabel slot="end" className="ion-padding-end">
            Step {currentIndex + 1} of {totalSteps}
          </IonLabel>
        )}
      </IonToolbar>
    </IonHeader>
  );
};