// src/components/IdeaFinderQuestion.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonTextarea
} from '@ionic/react';

interface IdeaFinderQuestionProps {
  number: number;
  title: string;
  subtitle: string;
  guidance: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const IdeaFinderQuestion: React.FC<IdeaFinderQuestionProps> = ({
                                                                        number,
                                                                        title,
                                                                        subtitle,
                                                                        guidance,
                                                                        placeholder,
                                                                        value,
                                                                        onChange
                                                                      }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{number}. {title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p className="ion-margin-bottom">
          {guidance}
        </p>
        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value!)}
          placeholder={placeholder}
          rows={4}
          className="ion-padding"
        />
      </IonCardContent>
    </IonCard>
  );
};