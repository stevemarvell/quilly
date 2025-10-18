// src/steps/WTWNiche.tsx
import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';

export const WTWNiche: React.FC = () => {
  const history = useHistory();
  const handleNavigate = (stepId: string) => history.push(`/course/${stepId}`);

  return (
    <Layout pageTitle="Niche" currentStep="what-to-write/niche" onNavigate={handleNavigate}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Your Niche Focus</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>Define the specific niche you will target to make your book more focused and discoverable.</p>
          </IonText>
        </IonCardContent>
      </IonCard>
    </Layout>
  );
};
