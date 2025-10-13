// src/screens/TreeScreen.tsx

import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonChip,
  IonBadge,
  IonIcon
} from '@ionic/react';
import { folder } from 'ionicons/icons';
import { OrganizedTerms } from '../services/termOrganizerService';

interface TreeScreenProps {
  organizedData: OrganizedTerms;
}

export const TreeScreen: React.FC<TreeScreenProps> = ({ organizedData }) => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Organized Term Hierarchy</IonCardTitle>
          <IonCardSubtitle>
            {organizedData.domains.length} domains • {' '}
            {organizedData.domains.reduce((acc, d) => acc + d.clusters.length, 0)} clusters
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>

      <IonAccordionGroup>
        {organizedData.domains.map((domain) => (
          <IonAccordion key={domain.id} value={domain.id}>
            <IonItem slot="header">
              <IonIcon icon={folder} slot="start" />
              <IonLabel>
                <h2>{domain.name}</h2>
                <p>{domain.clusters.length} clusters</p>
              </IonLabel>
              <IonBadge color="primary" slot="end">
                {domain.clusters.reduce((acc, c) => acc + c.terms.length, 0)}
              </IonBadge>
            </IonItem>

            <div slot="content" className="ion-padding">
              {domain.clusters.map((cluster) => (
                <IonCard key={cluster.id}>
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
              ))}
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>🏊 General Terms Pool</IonCardTitle>
          <IonCardSubtitle>Domain-agnostic connective terms</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {organizedData.generalTerms.map((term, idx) => (
            <IonChip key={idx} color="medium">
              <IonLabel>{term}</IonLabel>
            </IonChip>
          ))}
        </IonCardContent>
      </IonCard>
    </>
  );
};