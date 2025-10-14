// src/screens/WhatToWriteAbout.tsx

import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonTextarea,
  IonText,
  IonIcon,
  IonChip,
  IonSpinner,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
} from '@ionic/react';
import { checkmarkCircle, bulbOutline } from 'ionicons/icons';
import { Layout } from '../components/Layout';
import { callClaude } from '../services/claudeService';

interface TopicData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

interface WhatToWriteAboutProps {
  onComplete: (data: TopicData) => void;
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
    placeholder: 'Example: Helping families capture memories they\'ll treasure forever',
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

export const WhatToWriteAbout: React.FC<WhatToWriteAboutProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [chosenTopic, setChosenTopic] = useState('');
  const [showSelection, setShowSelection] = useState(false);
  const [generatingSuggestions, setGeneratingSuggestions] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const allQuestionsAnswered = answers.every(a => a.trim().length > 0);

  const handleContinueToSelection = async () => {
    setShowSelection(true);
    setGeneratingSuggestions(true);

    try {
      const prompt = `Based on these answers to the "Idea Finder" questions, suggest 5-7 specific book topics. Each topic should be clear, focused, and actionable.

Question 1 - What they get paid for:
${answers[0]}

Question 2 - What they're passionate about:
${answers[1]}

Question 3 - What people ask their advice about:
${answers[2]}

Question 4 - Conversations they repeat:
${answers[3]}

Provide ONLY a numbered list of book topics, one per line. Each topic should be a complete sentence describing what the book would teach. Format:
1. [Topic description]
2. [Topic description]
etc.`;

      const response = await callClaude([
        { role: 'user', content: prompt }
      ]);

      // Parse the response to extract topics
      const topicMatches = response.match(/^\d+\.\s+(.+)$/gm);
      if (topicMatches) {
        const topics = topicMatches.map(line =>
          line.replace(/^\d+\.\s+/, '').trim()
        );
        setSuggestedTopics(topics);
      }
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
      // Continue anyway - they can write their own
    } finally {
      setGeneratingSuggestions(false);
    }
  };

  const handleComplete = () => {
    const finalTopic = selectedSuggestion || chosenTopic;
    onComplete({
      paidFor: answers[0],
      passionate: answers[1],
      adviceGiven: answers[2],
      brokenRecord: answers[3],
      chosenTopic: finalTopic,
    });
  };

  return (
    <Layout pageTitle="What to Write About" currentStep="topic">
      {!showSelection ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>The Idea Finder</IonCardTitle>
              <IonCardSubtitle>
                Answer these 4 questions to discover your book topic
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
                  onIonInput={(e) => updateAnswer(index, e.detail.value!)}
                  placeholder={q.placeholder}
                  rows={4}
                  className="ion-padding"
                  style={{ border: '1px solid #ddd', borderRadius: '8px' }}
                />
                {answers[index].trim().length > 0 && (
                  <IonChip color="success" className="ion-margin-top">
                    <IonIcon icon={checkmarkCircle} />
                    <IonText>Answered</IonText>
                  </IonChip>
                )}
              </IonCardContent>
            </IonCard>
          ))}

          <IonButton
            expand="block"
            onClick={handleContinueToSelection}
            disabled={!allQuestionsAnswered}
            style={{ '--background': '#6FAEA0' }}
            className="ion-margin-top"
          >
            Continue to Topic Selection →
          </IonButton>
        </>
      ) : (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>✅ Choose Your Book Topic</IonCardTitle>
              <IonCardSubtitle>Pick the book you can write fastest</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p className="ion-margin-bottom">
                  <strong>Which book should you write first?</strong>
                </p>
                <ul className="ion-padding-start">
                  <li>Which can you write the fastest?</li>
                  <li>Which are you most likely to finish?</li>
                  <li>Which makes you happiest?</li>
                </ul>
              </IonText>
            </IonCardContent>
          </IonCard>

          {generatingSuggestions ? (
            <IonCard>
              <IonCardContent className="ion-text-center ion-padding">
                <IonSpinner name="crescent" style={{ transform: 'scale(1.5)' }} />
                <IonText className="ion-margin-top">
                  <p>Analyzing your answers to suggest book topics...</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          ) : suggestedTopics.length > 0 ? (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={bulbOutline} className="ion-margin-end" />
                  AI-Suggested Topics
                </IonCardTitle>
                <IonCardSubtitle>Based on your answers</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonRadioGroup
                  value={selectedSuggestion}
                  onIonChange={e => {
                    setSelectedSuggestion(e.detail.value);
                    setChosenTopic(''); // Clear custom if selecting suggestion
                  }}
                >
                  {suggestedTopics.map((topic, index) => (
                    <IonItem key={index}>
                      <IonRadio slot="start" value={topic} />
                      <IonLabel className="ion-text-wrap">
                        {topic}
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonRadioGroup>
              </IonCardContent>
            </IonCard>
          ) : null}

          <IonCard style={{ background: '#f5f5f5' }}>
            <IonCardContent>
              <IonText color="medium">
                <p>
                  <strong>💡 Remember:</strong> Your first book won't be your best book.
                  Choose something you can complete quickly to build momentum.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Or Write Your Own</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonTextarea
                value={chosenTopic}
                onIonInput={(e) => {
                  setChosenTopic(e.detail.value!);
                  setSelectedSuggestion(null); // Clear selection if typing custom
                }}
                placeholder="Example: Teaching amateur photographers how to master manual mode and take professional-quality photos"
                rows={4}
                className="ion-padding"
                style={{ border: '2px solid #6FAEA0', borderRadius: '8px' }}
              />
            </IonCardContent>
          </IonCard>

          <IonButton
            expand="block"
            fill="outline"
            onClick={() => {
              setShowSelection(false);
              setSuggestedTopics([]);
              setSelectedSuggestion(null);
            }}
            className="ion-margin-bottom"
          >
            ← Back to Questions
          </IonButton>

          <IonButton
            expand="block"
            onClick={handleComplete}
            disabled={!selectedSuggestion && !chosenTopic.trim()}
            style={{ '--background': '#6FAEA0' }}
          >
            Continue to 4 P's Framework →
          </IonButton>
        </>
      )}
    </Layout>
  );
};