// src/steps/WhatToWriteAboutLanding.tsx
import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';

export const WhatToWriteAboutLanding: React.FC = () => {
  const history = useHistory();

  const handleNavigate = (stepId: string) => {
    history.push(`/course/${stepId}`);
  };

  return (
    <Layout pageTitle="What To Write About" onNavigate={handleNavigate}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Start Here</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>
              This section helps you define the core of your book before you begin writing. Work through these quick steps:
            </p>
            <ul className="ion-padding-start">
              <li>Author — clarify your angle and authority</li>
              <li>Topic — choose the subject you can write fastest</li>
              <li>Reader — define who you’re writing for</li>
              <li>Niche — narrow your focus for traction</li>
            </ul>
          </IonText>
          <IonButton className="ion-margin-top" color="secondary" onClick={() => history.push('/course/what-to-write/author')}>
            Begin with Author →
          </IonButton>
        </IonCardContent>
      </IonCard>
    </Layout>
  );
};
