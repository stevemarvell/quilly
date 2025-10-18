// src/components/CoachCard.tsx

import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';

import './CoachCard.css';

interface CoachCardProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CoachCard: React.FC<CoachCardProps> = ({
                                                      title = 'Coach',
                                                      subtitle,
                                                      emoji = '👩‍',
                                                      children,
                                                      className = '',
                                                    }) => {
  return (
    <IonCard className={`quilly-coach-card ${className}`.trim()}>
      <IonCardHeader>
        <IonCardTitle>
          {emoji} {title}
        </IonCardTitle>
        {subtitle && (
          <IonCardSubtitle>{subtitle}</IonCardSubtitle>
        )}
      </IonCardHeader>
      {children && (
        <IonCardContent>
          {children}
        </IonCardContent>
      )}
    </IonCard>
  );
};