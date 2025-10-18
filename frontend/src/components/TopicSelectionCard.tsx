// src/components/TopicSelectionCard.tsx

import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea
} from '@ionic/react';

interface TopicSelectionCardProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
}

export const TopicSelectionCard: React.FC<TopicSelectionCardProps> = ({
                                                                        value,
                                                                        onChange,
                                                                        onComplete
                                                                      }) => {
  const isComplete = value.trim().length > 0;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>✅ Your Chosen Topic</IonCardTitle>
        <IonCardSubtitle>
          Based on your answers, what will you write about?
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap" >
              <strong>Choose the book you can write:</strong>
              <IonList className="ion-margin-top ion-padding">
                <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Fastest (most material readily available)</p>
            </IonLabel>
          </IonItem>
                <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Most likely to finish (passionate and committed)</p>
            </IonLabel>
          </IonItem>
                <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Makes you happiest</p>
            </IonLabel>
          </IonItem>
              </IonList>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value!)}
          placeholder="Example: Teaching amateur photographers how to master manual mode and take professional-quality photos"
          rows={3}
          className="ion-margin-top ion-padding"
        />

        <IonButton
          expand="block"
          onClick={onComplete}
          disabled={!isComplete}
          className="ion-margin-top"
          color="secondary"
        >
          Continue to 4 P's Framework →
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};