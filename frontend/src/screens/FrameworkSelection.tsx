// src/screens/FrameworkSelection.tsx

import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { Layout } from '../components/Layout';
import { saveState, loadState } from '../services/stateService';

interface FrameworkSelectionProps {
  bookTopic: string;
  onComplete: (framework: string) => void;
  onBack: () => void;
}

type Answer = 'yes' | 'no' | 'maybe' | null;

const frameworks = {
  modular: {
    name: 'Modular',
    description: 'Works best when you have a lot of info that can be grouped into similar topics or clusters. Readers can jump between chapters.',
  },
  numerical: {
    name: 'Numerical',
    description: 'Works best when you have a specific number of keys or rules and they don\'t need to be in order.',
  },
  sequential: {
    name: 'Sequential',
    description: 'Works best when you need to arrange info according to a step-by-step sequence.',
  },
  problemSolution: {
    name: 'Problem and Solution',
    description: 'Clearly identify a problem & clearly communicate a solution. Use at the book level and chapter level.',
  },
  chronological: {
    name: 'Chronological',
    description: 'When you need to organize info according to a progression of time. History, etc.',
  },
  reference: {
    name: 'Reference',
    description: 'When you just want to organize info in a way that\'s easy to reference or navigate. Alphabetical topics, etc.',
  },
  compare: {
    name: 'Compare and Contrast',
    description: 'Works best when you want to show readers how two or more things are similar or different from each other.',
  },
  threeAct: {
    name: 'Three-Act Structure',
    description: 'Act 1: The Set-Up. Act 2: Rising Conflict & Confrontation. Act 3: Climax & Resolution.',
  },
};

const questions: Record<number, { text: string; options: Array<{ value: Answer; label: string }> }> = {
  1: {
    text: 'Do you have a lot of info or ideas that can be grouped into similar topics?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' },
    ],
  },
  2: {
    text: 'Do your ideas need to be presented in a specific order?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  3: {
    text: 'Does your info need to be organized by a specific number key or rule to support your points?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  4: {
    text: 'Will your book be used as a reference that makes it easy for readers to quickly and easily find what they need?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  5: {
    text: 'Are you telling your story similar to how a joke is set up, with a Set Up, Rising Action, and Resolution?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  6: {
    text: 'Do readers need to be able to clearly identify a problem and understand the solution?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  7: {
    text: 'Does each main section of your book represent a time, to show the reader a progression of time?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  8: {
    text: 'Does your book read like a \'how to\' with specific set of steps?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  9: {
    text: 'Does your book need to show readers how two or more things are similar to or different from one another?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
};

export const FrameworkSelection: React.FC<FrameworkSelectionProps> = ({
                                                                        bookTopic,
                                                                        onComplete,
                                                                        onBack,
                                                                      }) => {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [questionPath, setQuestionPath] = useState<number[]>([1]);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved answers on mount
  useEffect(() => {
    const savedState = loadState();
    if (savedState.frameworkAnswers && Object.keys(savedState.frameworkAnswers).length > 0) {
      setAnswers(savedState.frameworkAnswers);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Don't run until initialized
    if (!isInitialized) return;

    // Recalculate path whenever answers change
    const newPath = calculatePath(answers);
    setQuestionPath(newPath);

    // Check if we've reached a framework
    const framework = determineFramework(newPath, answers);
    setSelectedFramework(framework);

    // Save answers to state (filter out null values)
    const nonNullAnswers: Record<number, 'yes' | 'no' | 'maybe'> = {};
    Object.entries(answers).forEach(([key, value]) => {
      if (value !== null) {
        nonNullAnswers[parseInt(key)] = value;
      }
    });

    saveState({
      frameworkAnswers: nonNullAnswers
    });
  }, [answers, isInitialized]);

  const calculatePath = (currentAnswers: Record<number, Answer>): number[] => {
    const path: number[] = [1];
    let nextQ = 1;

    while (currentAnswers[nextQ]) {
      const answer = currentAnswers[nextQ];
      const next = getNextQuestion(nextQ, answer);

      if (typeof next === 'number') {
        path.push(next);
        nextQ = next;
      } else {
        // We've reached a result
        break;
      }
    }

    return path;
  };

  const getNextQuestion = (question: number, answer: Answer): number | string => {
    switch (question) {
      case 1:
        if (answer === 'yes' || answer === 'no') return 2;
        if (answer === 'maybe') return 4;
        break;
      case 2:
        if (answer === 'no') return 3;
        if (answer === 'yes') return 8;
        break;
      case 3:
        if (answer === 'no') return 'modular';
        if (answer === 'yes') return 6;
        break;
      case 4:
        if (answer === 'no') return 5;
        if (answer === 'yes') return 'reference';
        break;
      case 5:
        if (answer === 'no') return 2;
        if (answer === 'yes') return 'threeAct';
        break;
      case 6:
        if (answer === 'no') return 7;
        if (answer === 'yes') return 'problemSolution';
        break;
      case 7:
        if (answer === 'no') return 'numerical';
        if (answer === 'yes') return 'chronological';
        break;
      case 8:
        if (answer === 'no') return 9;
        if (answer === 'yes') return 'sequential';
        break;
      case 9:
        if (answer === 'no') return 'restart';
        if (answer === 'yes') return 'compare';
        break;
    }
    return question;
  };

  const determineFramework = (path: number[], currentAnswers: Record<number, Answer>): string | null => {
    const lastQ = path[path.length - 1];
    const answer = currentAnswers[lastQ];

    if (!answer) return null;

    const result = getNextQuestion(lastQ, answer);

    if (result === 'restart') return 'restart';
    if (typeof result === 'string') return result;

    return null;
  };

  const handleAnswer = (questionNum: number, answer: Answer) => {
    // If answering an earlier question, clear all answers after it
    const newAnswers: Record<number, Answer> = {};

    for (const q of questionPath) {
      if (q < questionNum) {
        newAnswers[q] = answers[q];
      } else if (q === questionNum) {
        newAnswers[q] = answer;
        break;
      }
    }

    setAnswers(newAnswers);
  };

  const handleRestart = () => {
    setAnswers({});
    setQuestionPath([1]);
    setSelectedFramework(null);
    saveState({
      frameworkAnswers: {}
    });
  };

  return (
    <Layout pageTitle="Framework Selection" currentStep="outline">
      {/* Book Topic Reminder */}
      <IonCard color="primary">
        <IonCardContent>
          <div className="quilly-topic-reminder">
            <div>
              <IonText className="quilly-topic-label">Your Book Topic</IonText>
              <IonText className="quilly-topic-text">{bookTopic}</IonText>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Choose Your Framework</IonCardTitle>
          <IonCardSubtitle>
            Answer questions to find the best structure for your book
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            <p>
              The framework determines how you'll organize your content.
              You can change any answer to explore different paths.
            </p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* Display all questions in the current path */}
      {questionPath.map((qNum) => (
        <IonCard key={qNum}>
          <IonCardHeader>
            <IonCardTitle>{questions[qNum].text}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRadioGroup
              value={answers[qNum] || null}
              onIonChange={(e) => handleAnswer(qNum, e.detail.value)}
            >
              {questions[qNum].options.map((option) => (
                <IonItem key={option.value}>
                  <IonRadio slot="start" value={option.value} />
                  <IonLabel>{option.label}</IonLabel>
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonCardContent>
        </IonCard>
      ))}

      {/* Show result if framework determined */}
      {selectedFramework === 'restart' ? (
        <>
          <IonCard color="warning">
            <IonCardHeader>
              <IonCardTitle>↻ Need to Restart</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>
                  Based on your answers, we couldn't identify a single framework that fits perfectly.
                  This might mean your book uses a hybrid approach, or we need to explore different options.
                </p>
                <p className="ion-margin-top">
                  Try restarting and answering differently, or consider that your book might benefit
                  from combining multiple frameworks.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <div className="ion-padding">
            <IonButton
              expand="block"
              onClick={handleRestart}
              color="primary"
            >
              ↻ Start Over
            </IonButton>
          </div>
        </>
      ) : selectedFramework ? (
        <>
          <IonCard color="success">
            <IonCardHeader>
              <IonCardTitle>
                ✓ Your Framework: {frameworks[selectedFramework as keyof typeof frameworks].name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>{frameworks[selectedFramework as keyof typeof frameworks].description}</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonText color="medium">
                <p>
                  This framework will guide how you structure your chapters and organize your content
                  in the outline phase.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <div className="ion-padding">
            <IonButton
              expand="block"
              fill="outline"
              onClick={handleRestart}
              className="ion-margin-bottom"
            >
              ↻ Start Over
            </IonButton>

            <IonButton
              expand="block"
              onClick={() => onComplete(selectedFramework)}
              color="primary"
            >
              Continue to Outline →
            </IonButton>
          </div>
        </>
      ) : null}

      {/* Always show restart and back buttons at bottom */}
      {!selectedFramework && (
        <div className="ion-padding">
          <IonButton
            expand="block"
            fill="outline"
            onClick={handleRestart}
            className="ion-margin-bottom"
          >
            ↻ Start Over
          </IonButton>

          <IonButton expand="block" fill="outline" onClick={onBack}>
            ← Back to Mind Map
          </IonButton>
        </div>
      )}
    </Layout>
  );
};