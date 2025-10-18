// src/steps/WTWAuthor.tsx
import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonCardSubtitle, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { loadState, saveState } from '../services/stateService';

interface TopicData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

const questions = [
  {
    emoji: '💼',
    title: 'What do you get paid for?',
    subtitle: 'Your area of expertise',
    placeholder: 'Example: Professional photographer specializing in portraits and events',
  },
  {
    emoji: '❤️',
    title: 'What are you passionate about?',
    subtitle: 'Topics you could talk about for hours',
    placeholder: "Example: Helping families capture memories they'll treasure forever",
  },
  {
    emoji: '💡',
    title: 'What do people ask your advice about?',
    subtitle: 'Wisdom from your experience',
    placeholder: 'Example: Friends ask how to take better photos with their cameras',
  },
  {
    emoji: '🔁',
    title: 'What conversations do you repeat?',
    subtitle: 'Questions you answer over and over',
    placeholder: 'Example: How to avoid blurry photos and use manual mode',
  },
];

export const WTWAuthor: React.FC = () => {
  const history = useHistory();
  const handleNavigate = (stepId: string) => history.push(`/course/${stepId}`);

  const [answers, setAnswers] = useState(['', '', '', '']);

  useEffect(() => {
    const savedState = loadState();
    if (savedState.topicData) {
      setAnswers([
        savedState.topicData.paidFor,
        savedState.topicData.passionate,
        savedState.topicData.adviceGiven,
        savedState.topicData.brokenRecord,
      ]);
    }
  }, []);

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // Persist immediately to topicData to keep consistency with existing storage
    const existing = loadState().topicData || ({
      paidFor: '',
      passionate: '',
      adviceGiven: '',
      brokenRecord: '',
      chosenTopic: '',
    } as TopicData);

    const updated: TopicData = {
      ...existing,
      paidFor: newAnswers[0],
      passionate: newAnswers[1],
      adviceGiven: newAnswers[2],
      brokenRecord: newAnswers[3],
    };

    saveState({ topicData: updated });
  };

  return (
    <Layout pageTitle="Author" currentStep="what-to-write/author" onNavigate={handleNavigate}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>The Idea Finder</IonCardTitle>
          <IonCardSubtitle>
            Answer these 4 questions to clarify your angle and authority
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>Take 10-15 minutes. Let ideas flow without judging.</p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {questions.map((q, index) => (
        <IonCard key={index}>
          <IonCardHeader>
            <IonCardTitle>
              {q.emoji} {q.title}
            </IonCardTitle>
            <IonCardSubtitle>{q.subtitle}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonTextarea
              value={answers[index]}
              onIonInput={(e) => updateAnswer(index, e.detail.value || '')}
              placeholder={q.placeholder}
              rows={4}
              className="ion-padding quilly-textarea"
            />
          </IonCardContent>
        </IonCard>
      ))}
    </Layout>
  );
};
