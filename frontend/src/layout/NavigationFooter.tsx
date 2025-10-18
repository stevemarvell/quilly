// src/layout/NavigationFooter.tsx

import React from 'react';
import {
  IonFooter,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';

interface NavigationStep {
  id: string;
  label: string;
}

interface NavigationFooterProps {
  previous?: NavigationStep;
  next?: NavigationStep;
  onNavigate: (stepId: string) => void;
  customBackButton?: {
    label: string;
    onClick: () => void;
  };
  customNextButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
                                                                    previous,
                                                                    next,
                                                                    onNavigate,
                                                                    customBackButton,
                                                                    customNextButton,
                                                                  }) => {
  return (
    <IonFooter>
      <IonToolbar>
        {customBackButton ? (
          <IonButton
            slot="start"
            fill="clear"
            onClick={customBackButton.onClick}
          >
            <IonIcon slot="start" icon={arrowBack} />
            {customBackButton.label}
          </IonButton>
        ) : (
          <IonButton
            slot="start"
            fill="clear"
            disabled={!previous}
            onClick={() => previous && onNavigate(previous.id)}
          >
            <IonIcon slot="start" icon={arrowBack} />
            {previous && `Back to: ${previous.label}`}
          </IonButton>
        )}

        {customNextButton ? (
          <IonButton
            slot="end"
            fill="clear"
            disabled={customNextButton.disabled}
            onClick={customNextButton.onClick}
          >
            {customNextButton.label}
            <IonIcon slot="end" icon={arrowForward} />
          </IonButton>
        ) : (
          <IonButton
            slot="end"
            fill="clear"
            disabled={!next}
            onClick={() => next && onNavigate(next.id)}
          >
            {next && `Continue to: ${next.label}`}
            <IonIcon slot="end" icon={arrowForward} />
          </IonButton>
        )}
      </IonToolbar>
    </IonFooter>
  );
};