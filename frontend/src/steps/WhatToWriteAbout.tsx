// src/steps/WhatToWriteAbout.tsx

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonTextarea,
  IonText,
  IonChip,
  IonIcon,
  IonSpinner,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
} from '@ionic/react';
import { checkmarkCircle, bulbOutline } from 'ionicons/icons';
import { Layout } from '../layout/Layout';
import { callClaude } from '../services/claudeService';
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

export const WhatToWriteAbout: React.FC = () => {
  const history = useHistory();
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [chosenTopic, setChosenTopic] = useState('');
  const [showSelection, setShowSelection] = useState(false);
  const [generatingSuggestions, setGeneratingSuggestions] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  useEffect(() => {
    const savedState = loadState();
    if (savedState.topicData) {
      setAnswers([
        savedState.topicData.paidFor,
        savedState.topicData.passionate,
        savedState.topicData.adviceGiven,
        savedState.topicData.brokenRecord
      ]);
      setChosenTopic(savedState.topicData.chosenTopic);
      if (savedState.topicData.chosenTopic) {
        setShowSelection(true);
      }
    }
  }, []);

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const allQuestionsAnswered = answers.every(a => a.trim().length > 0);

  const handleContinueToSelection = async () => {
    setShowSelection(true);
  };

  const handleGenerateSuggestions = async () => {
    setGeneratingSuggestions(true);

    try {
      const prompt = `Based on these answers to the "Idea Finder" questions, suggest 5-7 specific book TOPICS (not titles). Each topic should describe the subject matter or knowledge area the book would cover - what the person would teach or share.

Question 1 - What they get paid for:
${answers[0]}

Question 2 - What they're passionate about:
${answers[1]}

Question 3 - What people ask their advice about:
${answers[2]}

Question 4 - Conversations they repeat:
${answers[3]}

Important: Suggest TOPICS (subject areas), not book titles. Think "what would this book be about?" not "what would this book be called?"

Examples of good topics:
- Teaching beginner photographers how to use manual mode effectively
- Helping parents manage picky eaters and create healthy meal habits
- Guiding career changers through their first year in tech
- Showing small business owners how to automate their bookkeeping

Provide ONLY a numbered list, one topic per line:
1. [Topic description]
2. [Topic description]
etc.`;

      const response = await callClaude([
        { role: 'user', content: prompt }
      ]);

      const topicMatches = response.match(/^\d+\.\s+(.+)$/gm);
      if (topicMatches) {
        const topics = topicMatches.map(line =>
          line.replace(/^\d+\.\s+/, '').trim()
        );
        setSuggestedTopics(topics);
      }
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setGeneratingSuggestions(false);
    }
  };

  const handleComplete = () => {
    const finalTopic = selectedSuggestion || chosenTopic;
    const topicData: TopicData = {
      paidFor: answers[0],
      passionate: answers[1],
      adviceGiven: answers[2],
      brokenRecord: answers[3],
      chosenTopic: finalTopic,
    };

    saveState({ topicData });
    history.push('/course/what-to-write/reader');
  };

  const handleNavigate = (stepId: string) => {
    history.push(`/course/${stepId}`);
  };

  const handleBackToQuestions = () => {
    setShowSelection(false);
    setSuggestedTopics([]);
    setSelectedSuggestion(null);
  };

  return (
    <Layout
      pageTitle="What to Write About"
      currentStep="what-to-write/topic"
      onNavigate={handleNavigate}
      customBackButton={showSelection ? {
        label: 'Back to Questions',
        onClick: handleBackToQuestions
      } : undefined}
      customNextButton={showSelection ? {
        label: 'Continue to Reader',
        onClick: handleComplete,
        disabled: !selectedSuggestion && !chosenTopic.trim()
      } : undefined}
    >
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
                  className="ion-padding quilly-textarea"
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
            color="secondary"
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
                <IonSpinner name="crescent" className="quilly-spinner" />
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
                    setChosenTopic('');
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
          ) : (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Get AI Help?</IonCardTitle>
                <IonCardSubtitle>Let AI suggest topics based on your answers</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton
                  expand="block"
                  onClick={handleGenerateSuggestions}
                  color="ai"
                  fill="outline"
                >
                  <IonIcon icon={bulbOutline} slot="start" />
                  Generate AI Topic Suggestions
                </IonButton>
                <IonText color="medium" className="ion-margin-top">
                  <p className="quilly-skip-text">
                    Or skip and write your own topic below
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}

          <IonCard color="light" className="ion-margin-bottom">
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
                  setSelectedSuggestion(null);
                }}
                placeholder="Example: Teaching amateur photographers how to master manual mode and take professional-quality photos"
                rows={4}
                className="ion-padding quilly-textarea-focused"
              />
            </IonCardContent>
          </IonCard>
        </>
      )}
    </Layout>
  );
};