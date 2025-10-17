// src/screens/FourPsScreen.tsx

import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/react';
import { PInputCard } from '../components/PInputCard';
import { NavigationButtons } from '../components/NavigationButtons';

export interface FourPsData {
  person: string;
  pain: string;
  promise: string;
  perceivedValue: string;
  bookTopic: string;
}

interface FourPsScreenProps {
  bookTopic: string;
  onComplete: (data: FourPsData) => void;
  onBack: () => void;
}

const fourPsConfig = [
  {
    number: "1️⃣",
    pName: "Person",
    title: "Who is your ideal reader?",
    subtitle: "Be specific about who you're writing for",
    guidanceTitle: "Think about:",
    guidancePoints: [
      "Their experience level (beginner, intermediate, advanced?)",
      "Their current situation or role",
      "What they've tried before",
      "Why they're looking for this information NOW"
    ],
    placeholder: "Example: Amateur photographers who just bought their first DSLR and feel overwhelmed by manual mode. They've been shooting in auto mode for 6 months but their photos still look amateur.",
    rows: 5
  },
  {
    number: "2️⃣",
    pName: "Pain",
    title: "What problem are they facing?",
    subtitle: "The specific frustrations keeping them up at night",
    guidanceTitle: "Dig deep into:",
    guidancePoints: [
      "What's not working for them right now?",
      "What have they tried that failed?",
      "What are they afraid of?",
      "What keeps them from succeeding?"
    ],
    placeholder: "Example: Their photos come out blurry, too dark, or washed out. They're intimidated by all the buttons and settings. They can't capture what they see with their eyes. They're embarrassed to show their photos to friends. They feel like they wasted $1000 on a camera they don't know how to use.",
    rows: 6
  },
  {
    number: "3️⃣",
    pName: "Promise",
    title: "What transformation will you deliver?",
    subtitle: "The specific outcome they'll achieve",
    guidanceTitle: "Make it specific and measurable:",
    guidancePoints: [
      "What will they be able to DO after reading?",
      "How will their situation be different?",
      "What timeline or benchmark?",
      "What's the end result they're after?"
    ],
    placeholder: "Example: Confidently shoot in manual mode in any lighting situation and get professional-looking photos in 30 days. You'll understand exactly which settings to use for portraits, landscapes, and action shots without guessing.",
    rows: 5
  },
  {
    number: "4️⃣",
    pName: "Perceived Value",
    title: "What's this worth to them?",
    subtitle: "The value vs. the price",
    guidanceTitle: "Consider:",
    guidancePoints: [
      "What would they pay for this solution otherwise?",
      "What's the cost of NOT solving this problem?",
      "What similar solutions cost (courses, coaching, workshops)",
      "What's your book's actual price point?"
    ],
    placeholder: "Example: Photography workshops cost $500+. Private lessons are $150/hour. This book delivers the same knowledge for $19.99. Plus, they'll finally use that $1000 camera sitting in their closet. ROI is massive - better photos of family memories are priceless.",
    rows: 5
  }
];

export const FourPsScreen: React.FC<FourPsScreenProps> = ({
                                                            bookTopic,
                                                            onComplete,
                                                            onBack
                                                          }) => {
  const [person, setPerson] = useState('');
  const [pain, setPain] = useState('');
  const [promise, setPromise] = useState('');
  const [perceivedValue, setPerceivedValue] = useState('');

  const values = [person, pain, promise, perceivedValue];
  const setters = [setPerson, setPain, setPromise, setPerceivedValue];

  const handleContinue = () => {
    onComplete({
      person,
      pain,
      promise,
      perceivedValue,
      bookTopic
    });
  };

  const isComplete = person.trim() && pain.trim() && promise.trim() && perceivedValue.trim();

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>🎯 The 4 P's Framework</IonCardTitle>
          <IonCardSubtitle>
            Define your reader and book purpose
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="none" className="ion-margin-bottom">
            <IonLabel className="ion-text-wrap">
              <strong>Your Book Topic:</strong>
              <IonText className="ion-margin-top">
                <IonChip color="primary">{bookTopic}</IonChip>
              </IonText>
            </IonLabel>
          </IonItem>
          <p >
            These four elements will guide your entire book structure, content, and marketing.
          </p>
        </IonCardContent>
      </IonCard>

      {fourPsConfig.map((config, index) => (
        <PInputCard
          key={index}
          number={config.number}
          pName={config.pName}
          title={config.title}
          subtitle={config.subtitle}
          guidanceTitle={config.guidanceTitle}
          guidancePoints={config.guidancePoints}
          placeholder={config.placeholder}
          value={values[index]}
          onChange={setters[index]}
          rows={config.rows}
        />
      ))}

      <NavigationButtons
        onBack={onBack}
        onNext={handleContinue}
        nextDisabled={!isComplete}
        nextLabel="Continue to Niche Selection →"
      />
    </>
  );
};