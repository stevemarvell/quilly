// src/steps/WTWReader.tsx
import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { loadState, saveState } from '../services/stateService';

interface FourPs {
  person: string;
  problem: string;
  promise: string;
  proof: string;
}

export const WTWReader: React.FC = () => {
  const history = useHistory();
  const handleNavigate = (stepId: string) => history.push(`/course/${stepId}`);

  const [fourPs, setFourPs] = useState<FourPs>({ person: '', problem: '', promise: '', proof: '' });

  // Load saved values on mount
  useEffect(() => {
    const state = loadState();
    if (state.readerFourPs) {
      setFourPs(state.readerFourPs);
    }
  }, []);

  // Helper to update and persist
  const updateField = (key: keyof FourPs, value: string) => {
    const next = { ...fourPs, [key]: value };
    setFourPs(next);
    saveState({ readerFourPs: next });
  };

  return (
    <Layout pageTitle="Reader" currentStep="what-to-write/reader" onNavigate={handleNavigate}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Your Ideal Reader</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>Define your ideal reader using the 4Ps. This helps keep your writing focused and relevant.</p>
          </IonText>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Person</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>Who are they? Briefly describe demographics and context.</p>
          </IonText>
          <IonTextarea
            value={fourPs.person}
            onIonInput={e => updateField('person', e.detail.value || '')}
            rows={4}
            className="ion-padding quilly-textarea"
            placeholder="Example: Busy parent in their 30s juggling work and family; little spare time; wants practical guidance"
          />
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Problem</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>What is their main pain or challenge right now?</p>
          </IonText>
          <IonTextarea
            value={fourPs.problem}
            onIonInput={e => updateField('problem', e.detail.value || '')}
            rows={4}
            className="ion-padding quilly-textarea"
            placeholder="Example: Feels overwhelmed by camera settings; photos turn out blurry in low light"
          />
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Promise</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>What outcome will your book help them achieve?</p>
          </IonText>
          <IonTextarea
            value={fourPs.promise}
            onIonInput={e => updateField('promise', e.detail.value || '')}
            rows={4}
            className="ion-padding quilly-textarea"
            placeholder="Example: Confidently shoot sharp, well-composed photos in any situation within 30 days"
          />
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Proof / Path</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>Briefly outline how you’ll get them there (your approach, experience, or steps).</p>
          </IonText>
          <IonTextarea
            value={fourPs.proof}
            onIonInput={e => updateField('proof', e.detail.value || '')}
            rows={4}
            className="ion-padding quilly-textarea"
            placeholder="Example: Step-by-step lessons, real-world examples, and quick exercises I’ve used with 120+ students"
          />
        </IonCardContent>
      </IonCard>
    </Layout>
  );
};
