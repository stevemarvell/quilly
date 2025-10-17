// src/screens/TitleGeneratorScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSpinner,
  IonText
} from '@ionic/react';
import { FourPsData } from './FourPsScreen';
import { OrganizedTerms } from '../services/termOrganizerService';

interface TitleGeneratorScreenProps {
  fourPsData: FourPsData;
  organizedData: OrganizedTerms;
  onComplete: (selectedTitle: string, selectedSubtitle: string) => void;
  onBack: () => void;
}

export const TitleGeneratorScreen: React.FC<TitleGeneratorScreenProps> = ({
                                                                            fourPsData,
                                                                            organizedData,
                                                                            onComplete,
                                                                            onBack
                                                                          }) => {
  const [generating, setGenerating] = useState(false);
  const [titles, setTitles] = useState<Array<{title: string, subtitle: string}>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    generateTitles();
  }, []);

  const generateTitles = async () => {
    setGenerating(true);

    // Simulate API call - in real app, call Claude API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock titles based on 4 P's (in production, Claude would generate these)
    const mockTitles = [
      {
        title: "Shoot Manual Mode with Confidence",
        subtitle: "Master Your DSLR Settings in 30 Days"
      },
      {
        title: "Beyond Auto Mode",
        subtitle: "The Complete Guide to Manual Photography for Beginners"
      },
      {
        title: "Finally Understand Your Camera",
        subtitle: "A Beginner's Journey from Blurry to Beautiful Photos"
      },
      {
        title: "The Manual Mode Playbook",
        subtitle: "Simple Strategies for Professional-Looking Photos"
      },
      {
        title: "Stop Guessing, Start Shooting",
        subtitle: "Demystifying Manual Mode for Amateur Photographers"
      }
    ];

    setTitles(mockTitles);
    setGenerating(false);
  };

  const handleContinue = () => {
    if (titles[selectedIndex]) {
      onComplete(titles[selectedIndex].title, titles[selectedIndex].subtitle);
    }
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>📝 Your Book Title Options</IonCardTitle>
          <IonCardSubtitle>
            AI-generated titles based on your 4 P's framework
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonCard color="light" className="ion-margin-bottom">
          <IonCardContent>
            <strong >Based on your framework:</strong>
            <IonText className="ion-margin-top">
              <strong>Person:</strong> {fourPsData.person.substring(0, 80)}...
            </IonText>
            </IonCardContent>
        </IonCard>
            <IonText className="ion-margin-top"><strong>Pain:</strong> {fourPsData.pain.substring(0, 80)}...</IonText>
            <IonText className="ion-margin-top"><strong>Promise:</strong> {fourPsData.promise.substring(0, 80)}...</IonText>
        </IonCardContent>
      </IonCard>

      {generating ? (
        <IonCard>
          <IonCardContent className="ion-padding ion-text-center">
            <IonSpinner name="crescent"  />
            <p className="ion-margin-top">
              Generating title options using AI...
            </p>
          </IonCardContent>
        </IonCard>
      ) : (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Select Your Favorite</IonCardTitle>
              <IonCardSubtitle>
                Choose the title that best captures your book
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRadioGroup value={selectedIndex} onIonChange={e => setSelectedIndex(e.detail.value)}>
                <IonList>
                  {titles.map((option, index) => (
                    <IonItem key={index} className="ion-margin-bottom">
                      <IonRadio slot="start" value={index} />
                      <IonLabel className="ion-text-wrap">
                        <h2 className="ion-margin-bottom">
                          {option.title}
                        </h2>
                        <p >
                          {option.subtitle}
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonRadioGroup>

              <IonCard color="warning" className="ion-margin-bottom">
          <IonCardContent>
                💡 <strong>Tip:</strong> You can always refine your title later. These options follow
                the "Clear beats clever" principle - they tell readers exactly what they'll get.
              </IonCardContent>
        </IonCard>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Why This Title Works</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {titles[selectedIndex] && (
                <>
                  <IonText className="ion-margin-bottom">
                    <IonChip color="success">✓ Clear & Direct</IonChip>
                    <IonChip color="success">✓ Addresses Pain</IonChip>
                    <IonChip color="success">✓ Shows Promise</IonChip>
                  </IonText>
                  <IonList>
                    <IonItem lines="none">
                      <IonLabel className="ion-text-wrap" >
                        <strong>Title Analysis:</strong>
                        <p className="ion-margin-top">
                          "{titles[selectedIndex].title}" immediately tells your reader what they'll
                          achieve. It's specific, benefit-focused, and speaks directly to their goal.
                        </p>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel className="ion-text-wrap" >
                        <strong>Subtitle Power:</strong>
                        <p className="ion-margin-top">
                          The subtitle adds credibility with specific details (timeframe, target audience,
                          or methodology) that increase perceived value.
                        </p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </>
              )}
            </IonCardContent>
          </IonCard>

          <IonButtons className="ion-padding">
          <IonButton
              expand="block"
              fill="outline"
              onClick={onBack}
              className="ion-flex-1"
            >
              ← Back
            </IonButton>
            <IonButton
              expand="block"
              onClick={handleContinue}
              className="ion-flex-1"
            >
              Continue to Export →
            </IonButton>
        </IonButtons>
        </>
      )}
    </>
  );
};