// src/components/NavigationButtons.tsx

import React from 'react';
import {
  IonButton,
  IonButtons,
} from '@ionic/react';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
                                                                      onBack,
                                                                      onNext,
                                                                      nextDisabled = false,
                                                                      nextLabel = "Continue →",
                                                                      backLabel = "← Back"
                                                                    }) => {
  return (
    <IonButtons className="ion-padding">
          <IonButton
        expand="block"
        fill="outline"
        onClick={onBack}
        className="ion-flex-1"
      >
        {backLabel}
      </IonButton>
      <IonButton
        expand="block"
        onClick={onNext}
        disabled={nextDisabled}
        className="ion-flex-1"
      >
        {nextLabel}
      </IonButton>
        </IonButtons>
  );
};