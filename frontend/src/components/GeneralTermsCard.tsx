// src/components/GeneralTermsCard.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonLabel,
} from '@ionic/react';

interface GeneralTermsCardProps {
  terms: string[];
}

export const GeneralTermsCard: React.FC<GeneralTermsCardProps> = ({ terms }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>🏊 General Terms Pool</IonCardTitle>
        <IonCardSubtitle>Domain-agnostic connective terms</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {terms.map((term, idx) => (
          <IonChip key={idx} color="medium">
            <IonLabel>{term}</IonLabel>
          </IonChip>
        ))}
      </IonCardContent>
    </IonCard>
  );
};