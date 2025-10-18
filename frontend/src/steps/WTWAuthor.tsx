// src/steps/WTWAuthor.tsx
import React, { useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonCardSubtitle, IonTextarea, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { loadState, saveState } from '../services/stateService';
import { useForm, Controller } from 'react-hook-form';
import { briefcase, heart, chatbubbles, repeat } from 'ionicons/icons';
import {CoachCard} from "../components/CoachCard.tsx";

interface TopicData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

// Config for the four questions using required fields
const authorQuestions: Array<{
  id: 'paidFor' | 'passionate' | 'adviceGiven' | 'brokenRecord';
  icon: any; // Ionicon
  label: string;
  instruction: string;
  placeholder: string;
}> = [
  {
    id: 'paidFor',
    icon: briefcase,
    label: 'What do you get paid for?',
    instruction: 'Your area of expertise',
    placeholder: 'Example: Professional photographer specializing in portraits and events',
  },
  {
    id: 'passionate',
    icon: heart,
    label: 'What are you passionate about?',
    instruction: 'Topics you could talk about for hours',
    placeholder: "Example: Helping families capture memories they'll treasure forever",
  },
  {
    id: 'adviceGiven',
    icon: chatbubbles,
    label: 'What do people ask your advice about?',
    instruction: 'Wisdom from your experience',
    placeholder: 'Example: Friends ask how to take better photos with their cameras',
  },
  {
    id: 'brokenRecord',
    icon: repeat,
    label: 'What conversations do you repeat?',
    instruction: 'Questions you answer over and over',
    placeholder: 'Example: How to avoid blurry photos and use manual mode',
  },
];

// Form value type aligned with TopicData keys we persist
type AuthorFormValues = Pick<TopicData, 'paidFor' | 'passionate' | 'adviceGiven' | 'brokenRecord'>;

export const WTWAuthor: React.FC = () => {
  const history = useHistory();
  const handleNavigate = (stepId: string) => history.push(`/course/${stepId}`);

  // Load defaults from saved state
  const saved = loadState();
  const defaults: AuthorFormValues = {
    paidFor: saved.topicData?.paidFor || '',
    passionate: saved.topicData?.passionate || '',
    adviceGiven: saved.topicData?.adviceGiven || '',
    brokenRecord: saved.topicData?.brokenRecord || '',
  };

  const { control, watch, reset } = useForm<AuthorFormValues>({
    defaultValues: defaults,
    mode: 'onChange',
  });

  // If localStorage changes externally, we could reset form, but for now load once
  useEffect(() => {
    reset(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on any change
  const watched = watch();
  useEffect(() => {
    const existing: TopicData = {
      paidFor: watched.paidFor || '',
      passionate: watched.passionate || '',
      adviceGiven: watched.adviceGiven || '',
      brokenRecord: watched.brokenRecord || '',
      chosenTopic: saved.topicData?.chosenTopic || '',
    };
    saveState({ topicData: existing });
  }, [watched.paidFor, watched.passionate, watched.adviceGiven, watched.brokenRecord]);

  return (
    <Layout pageTitle="Author" currentStep="what-to-write/author" onNavigate={handleNavigate}>

      <CoachCard
        subtitle="This is about you as the author. Clarify your angle and authority."
      >
        <IonText color="medium">
          <p>Answer these questions honestly and simply.</p>
          <p>Take 10-15 minutes. Let ideas flow without judging.</p>
        </IonText>
      </CoachCard>

      {authorQuestions.map((q) => (
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
