// src/screens/InputScreen.tsx

import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { ApiSettings } from '../components/ApiSettings';

interface InputScreenProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onOrganize: () => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({
                                                          inputText,
                                                          onInputChange,
                                                          onOrganize
                                                        }) => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Enter Your Topic Terms</IonCardTitle>
          <IonCardSubtitle>
            Paste your terms separated by commas, or one per line
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonTextarea
            value={inputText}
            onIonInput={(e) => onInputChange(e.detail.value!)}
            placeholder="CAC, churn, MRR, funnel, retention, however, LTV, conversion rate, dashboard, important, strategy, cohort analysis..."
            rows={10}
            style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '8px' }}
          />
          <IonButton
            expand="block"
            onClick={onOrganize}
            disabled={!inputText.trim()}
            style={{ marginTop: '16px' }}
          >
            🚀 Organize Terms
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>💡 How it works</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                CrewAI agents analyze semantic relationships
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                Claude organizes terms into 3-level hierarchies
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                Embeddings identify tightly coupled concepts
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                General terms are filtered into a separate pool
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>

      <ApiSettings />
    </>
  );
};