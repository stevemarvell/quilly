// src/layout/Sidebar.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { CourseStepper } from './CourseStepper';

interface SidebarProps {
  currentStep?: string;
  onNavigate?: (stepId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, onNavigate }) => {
  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Become a Bestseller 3.0.ai</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CourseStepper currentStep={currentStep} onNavigate={onNavigate} />
      </IonContent>
    </IonMenu>
  );
};