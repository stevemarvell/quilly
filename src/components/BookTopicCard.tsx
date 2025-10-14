// src/components/BookTopicCard.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/react';

interface BookTopicCardProps {
  bookTopic: string;
  title?: string;
  subtitle?: string;
}

export const BookTopicCard: React.FC<BookTopicCardProps> = ({
                                                              bookTopic,
                                                              title = "Your Book Topic",
                                                              subtitle
                                                            }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        {subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">
          <IonLabel className="ion-text-wrap">
            <strong>Topic:</strong>ts
            <IonText className="ion-margin-top">
              <IonChip color="primary">{bookTopic}</IonChip>
            </IonText>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};