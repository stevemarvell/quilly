// src/screens/ProcessingScreen.tsx

import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSpinner,
  IonProgressBar
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
    <div style={{ maxWidth: '600px', margin: '60px auto 0' }}>
      <IonCard>
        <IonCardHeader style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {error ? '❌' : '🤖'}
          </div>
          <IonCardTitle>
            {error ? 'Processing Failed' : 'Processing Your Terms'}
          </IonCardTitle>
          <IonCardSubtitle>
            {error ? 'An error occurred' : currentMessage || 'Our AI agents are hard at work...'}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {!error && (
            <IonProgressBar type="indeterminate" style={{ marginBottom: '24px' }} />
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
                style={{ marginTop: '16px' }}
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
                    <div slot="start" style={{ width: '24px' }} />
                  )}
                  <IonLabel>
                    <p style={{
                      fontWeight: index === processingStep ? 'bold' : 'normal',
                      color: index <= processingStep ? 'inherit' : '#999'
                    }}>
                      {step}
                    </p>
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