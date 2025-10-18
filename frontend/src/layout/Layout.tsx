// src/layout/Layout.tsx

import React from 'react';
import {
  IonContent,
  IonPage,
  IonSplitPane,
} from '@ionic/react';
import { getAdjacentSteps } from '../config/courseConfig.ts';
import { Sidebar } from './Sidebar';
import { MainHeader } from './MainHeader';
import { NavigationFooter } from './NavigationFooter';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  currentStep?: string;
  onNavigate?: (stepId: string) => void;
  customBackButton?: {
    label: string;
    onClick: () => void;
  };
  customNextButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const Layout: React.FC<LayoutProps> = ({
                                                children,
                                                pageTitle,
                                                currentStep,
                                                onNavigate,
                                                customBackButton,
                                                customNextButton,
                                              }) => {
  const adjacentSteps = currentStep ? getAdjacentSteps(currentStep) : null;

  const handleNavigation = (stepId: string) => {
    if (onNavigate) {
      onNavigate(stepId);
    }
  };

  return (
    <IonSplitPane contentId="main-content" when="md">
      <Sidebar currentStep={currentStep} onNavigate={handleNavigation} />

      <IonPage id="main-content">
        <MainHeader
          pageTitle={pageTitle}
          currentIndex={adjacentSteps?.currentIndex}
          totalSteps={adjacentSteps?.totalSteps}
        />

        <IonContent className="ion-padding">
          {children}
        </IonContent>

        {adjacentSteps && (
          <NavigationFooter
            previous={adjacentSteps.previous}
            next={adjacentSteps.next}
            onNavigate={handleNavigation}
            customBackButton={customBackButton}
            customNextButton={customNextButton}
          />
        )}
      </IonPage>
    </IonSplitPane>
  );
};