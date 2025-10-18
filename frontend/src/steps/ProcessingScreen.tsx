// src/steps/ProcessingScreen.tsx

import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonSpinner,
  IonText
} from '@ionic/react';
import { checkmarkCircle, alertCircle } from 'ionicons/icons';

interface ProcessingScreenProps {
  processingStep: number;
  processingSteps: string[];
  currentMessage: string;
  error: string | null;
  onBack: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
                                                                    processingStep,
                                                                    processingSteps,
                                                                    currentMessage,
                                                                    error,
                                                                    onBack
                                                                  }) => {
  return (
    <div >
      <IonCard>
        <IonCardHeader className="ion-text-center">
          <IonText className="ion-margin-bottom">
            {error ? '❌' : '🤖'}
          </IonText>
          <IonCardTitle>
            {error ? 'Processing Failed' : 'Processing Your Terms'}
          </IonCardTitle>
          <IonCardSubtitle>
            {error ? 'An error occurred' : currentMessage || 'Our AI agents are hard at work...'}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {!error && (
            <IonProgressBar type="indeterminate" className="ion-margin-bottom" />
          )}

          {error ? (
            <>
              <IonItem color="danger" lines="none">
                <IonIcon icon={alertCircle} slot="start" />
                <IonLabel className="ion-text-wrap">
                  <p>{error}</p>
                </IonLabel>
              </IonItem>
              <IonButton
                expand="block"
                onClick={onBack}
                className="ion-margin-top"
              >
                ← Back to Review
              </IonButton>
            </>
          ) : (
            <IonList>
              {processingSteps.map((step, index) => (
                <IonItem key={index}>
                  {index < processingStep ? (
                    <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                  ) : index === processingStep ? (
                    <IonSpinner slot="start" />
                  ) : (
                    <div slot="start"  />
                  )}
                  <IonLabel>
                      {step}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};