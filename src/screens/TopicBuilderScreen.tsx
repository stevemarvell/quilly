// src/screens/TopicBuilderScreen.tsx

import React, { useState } from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { IdeaFinderQuestion } from '../components/IdeaFinderQuestion';
import { TopicSelectionCard } from '../components/TopicSelectionCard';

interface TopicBuilderData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

interface TopicBuilderScreenProps {
  onComplete: (data: TopicBuilderData) => void;
}

const questions = [
  {
    number: 1,
    title: "What do you get paid for?",
    subtitle: "Your area of expertise or job knowledge",
    guidance: "Think about \"the gap\" between what a beginner knows and what you know after years of experience. That gap is a great book.",
    placeholder: "Example: I'm a professional photographer specializing in portraits and events..."
  },
  {
    number: 2,
    title: "What are you passionate about?",
    subtitle: "Topics you could talk about for hours",
    guidance: "Often these passions come from personal experience or a cause you care about. The best books come from genuine passion.",
    placeholder: "Example: I'm passionate about helping people capture family memories they'll treasure forever..."
  },
  {
    number: 3,
    title: "What do people ask you for advice about?",
    subtitle: "Wisdom from your trials and experiences",
    guidance: "What have you learned through challenges that others regularly seek out? This advice could be the foundation for an impactful book.",
    placeholder: "Example: Friends always ask me how to take better photos with their phones or new cameras..."
  },
  {
    number: 4,
    title: "What are your \"broken record\" conversations?",
    subtitle: "Topics you repeat constantly",
    guidance: "Are you answering the same questions over and over? The best way to stop repeating yourself is to write a great book and refer people to it.",
    placeholder: "Example: I constantly explain why photos come out blurry and how to use manual mode..."
  }
];

export const TopicBuilderScreen: React.FC<TopicBuilderScreenProps> = ({ onComplete }) => {
  const [paidFor, setPaidFor] = useState('');
  const [passionate, setPassionate] = useState('');
  const [adviceGiven, setAdviceGiven] = useState('');
  const [brokenRecord, setBrokenRecord] = useState('');
  const [chosenTopic, setChosenTopic] = useState('');

  const answers = [paidFor, passionate, adviceGiven, brokenRecord];
  const setters = [setPaidFor, setPassionate, setAdviceGiven, setBrokenRecord];

  const handleContinue = () => {
    onComplete({
      paidFor,
      passionate,
      adviceGiven,
      brokenRecord,
      chosenTopic
    });
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>📖 Choose Your Book Topic</IonCardTitle>
          <IonCardSubtitle>
            Answer these questions to discover what you should write about
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>

      <IonAccordionGroup>
        <IonAccordion value="questions">
          <IonItem slot="header">
            <IonLabel>
              <h2>💡 The Idea Finder Questions</h2>
              <p>Click to expand and answer each question</p>
            </IonLabel>
          </IonItem>
          <div slot="content" className="ion-padding">
            {questions.map((q, index) => (
              <IdeaFinderQuestion
                key={index}
                number={q.number}
                title={q.title}
                subtitle={q.subtitle}
                guidance={q.guidance}
                placeholder={q.placeholder}
                value={answers[index]}
                onChange={setters[index]}
              />
            ))}
          </div>
        </IonAccordion>
      </IonAccordionGroup>

      <TopicSelectionCard
        value={chosenTopic}
        onChange={setChosenTopic}
        onComplete={handleContinue}
      />
    </>
  );
};