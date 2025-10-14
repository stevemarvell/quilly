// src/components/ValidationErrors.tsx

import React from 'react';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';

interface ValidationErrorsProps {
  errors: string[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="ion-margin-bottom">
      {errors.map((error, idx) => (
        <IonItem key={idx} color="warning">
          <IonIcon icon={alertCircle} slot="start" />
          <IonLabel className="ion-text-wrap">
            <IonNote>{error}</IonNote>
          </IonLabel>
        </IonItem>
      ))}
    </div>
  );
};