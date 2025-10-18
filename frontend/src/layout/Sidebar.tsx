// src/layout/Sidebar.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonMenuToggle,
} from '@ionic/react';
import { CourseStepper } from './CourseStepper';
import { homeOutline } from 'ionicons/icons';

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
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem button detail={false} routerLink="/">
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <CourseStepper currentStep={currentStep} onNavigate={onNavigate} />
      </IonContent>
    </IonMenu>
  );
};