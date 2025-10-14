// src/components/DomainAccordion.tsx

import React from 'react';
import {
  IonAccordion,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { folder } from 'ionicons/icons';
import { ClusterCard } from './ClusterCard';

interface TermCluster {
  id: string;
  name: string;
  terms: string[];
}

interface TermDomain {
  id: string;
  name: string;
  clusters: TermCluster[];
}

interface DomainAccordionProps {
  domain: TermDomain;
}

export const DomainAccordion: React.FC<DomainAccordionProps> = ({ domain }) => {
  const termCount = domain.clusters.reduce((acc, c) => acc + c.terms.length, 0);

  return (
    <IonAccordion value={domain.id}>
      <IonItem slot="header">
        <IonIcon icon={folder} slot="start" />
        <IonLabel>
          <h2>{domain.name}</h2>
          <p>{domain.clusters.length} clusters</p>
        </IonLabel>
        <IonBadge color="primary" slot="end">
          {termCount}
        </IonBadge>
      </IonItem>

      <div slot="content" className="ion-padding">
        {domain.clusters.map((cluster) => (
          <ClusterCard key={cluster.id} cluster={cluster} />
        ))}
      </div>
    </IonAccordion>
  );
};