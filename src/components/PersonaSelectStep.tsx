// src/components/PersonaSelectStep.tsx

import React from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,

} from '@ionic/react';

interface PersonaSelectStepProps {
  personas: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export const PersonaSelectStep: React.FC<PersonaSelectStepProps> = ({
                                                                      personas,
                                                                      selectedIndex,
                                                                      onSelect,
                                                                      onBack,
                                                                      onNext
                                                                    }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Step 2: Choose ONE Reader Persona</IonCardTitle>
        <IonCardSubtitle>
          Pick the audience you can serve best
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCard color="light" className="ion-margin-bottom">
          <IonCardContent>
          <strong >Which one to choose?</strong>
          <IonList className="ion-margin-top ion-padding">
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Which audience do you understand deeply?</p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Which has the most urgent pain?</p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Which would pay the most for a solution?</p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Which can you reach most easily?</p>
            </IonLabel>
          </IonItem>
          </IonList>
        </IonCardContent>
        </IonCard>

        <IonRadioGroup value={selectedIndex} onIonChange={e => onSelect(e.detail.value)}>
          <IonList>
            {personas.map((persona, index) => (
              <IonItem key={index}>
                <IonRadio slot="start" value={index} />
                <IonLabel className="ion-text-wrap">
                  <p >{persona}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonRadioGroup>

        <IonButtons className="ion-padding">
          <IonButton
            expand="block"
            fill="outline"
            onClick={onBack}
            className="ion-flex-1"
          >
            ← Back
          </IonButton>
          <IonButton
            expand="block"
            onClick={onNext}
            className="ion-flex-1"
          >
            Lock It In →
          </IonButton>
        </IonButtons>
      </IonCardContent>
    </IonCard>
  );
};