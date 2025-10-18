// src/steps/WTWReader.tsx
import React, { useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonTextarea, IonCardSubtitle, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { loadState, saveState } from '../services/stateService';
import { useForm, Controller } from 'react-hook-form';
import { person, alertCircle, ribbon, footsteps } from 'ionicons/icons';
import {CoachCard} from "../components/CoachCard.tsx";

// Reader 4P's data stored in stateService.readerFourPs
interface ReaderFourPs {
  person: string;
  problem: string;
  promise: string;
  proof: string;
}

// Config for the Reader questions
const readerQuestions: Array<{
  id: keyof ReaderFourPs;
  icon: any; // Ionicon
  label: string;
  instruction: string;
  placeholder: string;
}> = [
  {
    id: 'person',
    icon: person,
    label: 'Person',
    instruction: 'Who are they? Briefly describe demographics and context.',
    placeholder: 'Example: Busy parent in their 30s juggling work and family; little spare time; wants practical guidance',
  },
  {
    id: 'problem',
    icon: alertCircle,
    label: 'Problem',
    instruction: 'What is their main pain or challenge right now?',
    placeholder: 'Example: Feels overwhelmed by camera settings; photos turn out blurry in low light',
  },
  {
    id: 'promise',
    icon: ribbon,
    label: 'Promise',
    instruction: 'What outcome will your book help them achieve?',
    placeholder: 'Example: Confidently shoot sharp, well-composed photos in any situation within 30 days',
  },
  {
    id: 'proof',
    icon: footsteps,
    label: 'Proof / Path',
    instruction: 'Briefly outline how you’ll get them there (your approach, experience, or steps).',
    placeholder: 'Example: Step-by-step lessons, real-world examples, and quick exercises I’ve used with 120+ students',
  },
];

export const WTWReader: React.FC = () => {
  const history = useHistory();
  const handleNavigate = (stepId: string) => history.push(`/course/${stepId}`);

  // Load defaults from saved state
  const saved = loadState();
  const defaults: ReaderFourPs = {
    person: saved.readerFourPs?.person || '',
    problem: saved.readerFourPs?.problem || '',
    promise: saved.readerFourPs?.promise || '',
    proof: saved.readerFourPs?.proof || '',
  };

  const { control, watch, reset } = useForm<ReaderFourPs>({
    defaultValues: defaults,
    mode: 'onChange',
  });

  // Initialize form once
  useEffect(() => {
    reset(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on any change
  const watched = watch();
  useEffect(() => {
    const next: ReaderFourPs = {
      person: watched.person || '',
      problem: watched.problem || '',
      promise: watched.promise || '',
      proof: watched.proof || '',
    };
    saveState({ readerFourPs: next });
  }, [watched.person, watched.problem, watched.promise, watched.proof]);

  return (
    <Layout pageTitle="Reader" currentStep="what-to-write/reader" onNavigate={handleNavigate}>

      <CoachCard
        subtitle="This is about the reader. Clarify their needs and expectations."
      >
        <IonText color="medium">
          <p>Define your ideal reader using the 4 P's to keep your writing focused and relevant.</p>
          <p>These answers will inform your niche, examples, and marketing language</p>
        </IonText>
      </CoachCard>

      {readerQuestions.map(q => (
        <IonCard key={q.id}>
          <IonCardHeader>
            <IonCardTitle className="quilly-title-with-icon">
              <IonIcon icon={q.icon} color="secondary" />
              <span>{q.label}</span>
            </IonCardTitle>
            <IonCardSubtitle>{q.instruction}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <Controller
              control={control}
              name={q.id}
              render={({ field: { value, onChange } }) => (
                <IonTextarea
                  value={value}
                  onIonChange={(e) => onChange(e.detail.value || '')}
                  placeholder={q.placeholder}
                  rows={4}
                  className="ion-padding quilly-textarea"
                />
              )}
            />
          </IonCardContent>
        </IonCard>
      ))}
    </Layout>
  );
};
