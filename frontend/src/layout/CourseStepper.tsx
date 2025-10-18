// src/layout/CourseStepper.tsx

import React from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonListHeader,
} from '@ionic/react';
import { checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { courseSections } from '../config/courseConfig.ts';

interface CourseStepperProps {
  currentStep?: string;
  onNavigate?: (stepId: string) => void;
}

export const CourseStepper: React.FC<CourseStepperProps> = ({
                                                              currentStep,
                                                              onNavigate,
                                                            }) => {
  const handleNavigation = (stepId: string) => {
    if (onNavigate) {
      onNavigate(stepId);
    }
  };

  return (
    <>
      {courseSections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <IonListHeader>
            <IonLabel>{section.title}</IonLabel>
          </IonListHeader>
          <IonList>
            {section.items.map((item) => (
              <IonMenuToggle key={item.id} autoHide={false}>
                <IonItem
                  button={!item.disabled}
                  detail={false}
                  color={currentStep === item.id ? 'primary' : undefined}
                  disabled={item.disabled}
                  onClick={() => !item.disabled && handleNavigation(item.id)}
                >
                  <IonIcon
                    icon={item.completed ? checkmarkCircle : ellipseOutline}
                    slot="start"
                    color={item.disabled ? 'medium' : item.completed ? 'success' : 'medium'}
                  />
                  <IonLabel className="ion-text-wrap" color={item.disabled ? 'medium' : undefined}>
                    {item.label}
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>
      ))}
    </>
  );
};