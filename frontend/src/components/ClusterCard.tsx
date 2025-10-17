// src/components/ClusterCard.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonChip,
  IonLabel,
} from '@ionic/react';

interface TermCluster {
  id: string;
  name: string;
  terms: string[];
}

interface ClusterCardProps {
  cluster: TermCluster;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ cluster }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{cluster.name}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {cluster.terms.map((term, idx) => (
          <IonChip key={idx} color="primary">
            <IonLabel>{term}</IonLabel>
          </IonChip>
        ))}
      </IonCardContent>
    </IonCard>
  );
};