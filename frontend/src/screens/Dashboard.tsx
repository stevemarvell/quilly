// src/screens/Dashboard.tsx

import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
} from '@ionic/react';
import { Layout } from '../components/Layout';

interface DashboardProps {
  onStartJourney: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartJourney }) => {
  return (
    <Layout pageTitle="Quilly - AI Book Builder" currentStep="dashboard">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Welcome to Your Book Building Journey! 📚</IonCardTitle>
          <IonCardSubtitle>
            Transform your knowledge into a bestselling book
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            <p className="ion-margin-bottom">
              Based on the proven <strong>Become a Bestseller 2.0</strong> program
              from selfpublishing.com, this AI-powered platform will guide you through
              every step of creating your book.
            </p>
            <p className="ion-margin-bottom">
              <strong>Your journey includes:</strong>
            </p>
            <ul className="ion-padding-start">
              <li>Discovering your perfect book topic</li>
              <li>Defining your ideal reader with the 4 P's Framework</li>
              <li>Narrowing your niche for maximum impact</li>
              <li>Brainstorming and organizing your content</li>
              <li>Generating professional book titles</li>
              <li>Creating your complete book outline</li>
            </ul>
          </IonText>

          <IonButton
            expand="block"
            onClick={onStartJourney}
            className="ion-margin-top"
            style={{ '--background': '#6FAEA0' }}
          >
            Start Building Your Book →
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>How It Works</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            <p>
              We'll guide you through a step-by-step process, saving your progress
              along the way. You can return anytime to pick up where you left off.
            </p>
            <p className="ion-margin-top">
              By the end, you'll have a complete book outline, title, and structure
              ready to begin writing your bestseller!
            </p>
          </IonText>
        </IonCardContent>
      </IonCard>
    </Layout>
  );
};