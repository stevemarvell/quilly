// src/components/NicheRefineStep.tsx

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
  IonText,
  IonTextarea
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';

interface InputScreenProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({
                                                                              value,
                                                                              onChange,
                                                                              onNext
                                                                            }) => {
  const lineCount = value.split('\n').filter(l => l.trim().length > 10).length;
  const canProceed = lineCount >= 3;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Step 1: Brainstorm Reader Personas</IonCardTitle>
        <IonCardSubtitle>
          List 3-5 possible reader types (one per line)
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCard color="light" className="ion-margin-bottom">
          <IonCardContent>
            <IonText color="primary">
              <strong>💡 Example for "Photography":</strong>
            </IonText>
            <IonList lines="none" className="ion-margin-top">
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>• Parents wanting to capture better photos of their kids at sports events</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>• Hobbyists who just bought their first DSLR and feel overwhelmed</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>• Smartphone photographers wanting to go semi-professional</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>• Wedding guests tired of blurry ceremony photos</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>• Travel bloggers needing better landscape shots</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value!)}
          placeholder="Enter one reader type per line. Be SPECIFIC - not 'photographers' but 'moms photographing kids at soccer games'"
          rows={8}
          className="ion-padding"
        />

        <IonCard color="warning" className="ion-margin-top">
          <IonCardContent>
            <IonIcon icon={alertCircle} color="warning" className="ion-margin-end" />
            <IonText color="warning">
              <strong>Remember:</strong>
            </IonText>
            <IonText>
              <p className="ion-margin-top">
                "Amateur photographers" is too broad.
                "Moms with new DSLRs struggling to photograph fast-moving kids" is laser-focused.
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonText color={canProceed ? 'success' : 'medium'}>
          <p className="ion-margin-top">
            {lineCount}/3 reader personas (minimum 3 required)
          </p>
        </IonText>

        <IonButton
          expand="block"
          onClick={onNext}
          disabled={!canProceed}
          className="ion-margin-top"
        >
          Continue to Selection →
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};