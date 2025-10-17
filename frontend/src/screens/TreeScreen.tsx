// src/screens/TreeScreen.tsx

import React from 'react';
import {
  IonAccordionGroup,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { OrganizedTerms } from '../services/termOrganizerService';
import { DomainAccordion } from '../components/DomainAccordion';
import { GeneralTermsCard } from '../components/GeneralTermsCard';

interface TreeScreenProps {
  organizedData: OrganizedTerms;
}

export const TreeScreen: React.FC<TreeScreenProps> = ({ organizedData }) => {
  const clusterCount = organizedData.domains.reduce((acc, d) => acc + d.clusters.length, 0);

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Organized Term Hierarchy</IonCardTitle>
          <IonCardSubtitle>
            {organizedData.domains.length} domains • {clusterCount} clusters
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>

      <IonAccordionGroup>
        {organizedData.domains.map((domain) => (
          <DomainAccordion key={domain.id} domain={domain} />
        ))}
      </IonAccordionGroup>

      <GeneralTermsCard terms={organizedData.generalTerms} />
    </>
  );
};