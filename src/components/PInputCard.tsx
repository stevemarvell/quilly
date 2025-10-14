// src/components/PInputCard.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea
} from '@ionic/react';

interface PInputCardProps {
  number: string;
  pName: string;
  title: string;
  subtitle: string;
  guidanceTitle: string;
  guidancePoints: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export const PInputCard: React.FC<PInputCardProps> = ({
                                                        number,
                                                        pName,
                                                        title,
                                                        subtitle,
                                                        guidanceTitle,
                                                        guidancePoints,
                                                        placeholder,
                                                        value,
                                                        onChange,
                                                        rows = 5
                                                      }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{number} {pName} - {title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none" className="ion-margin-bottom">
          <IonLabel className="ion-text-wrap">
            <strong>{guidanceTitle}</strong>
            <IonList className="ion-margin-top ion-padding">
              {guidancePoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </IonList>
          </IonLabel>
        </IonItem>
        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value!)}
          placeholder={placeholder}
          rows={rows}
          className="ion-padding"
        />
      </IonCardContent>
    </IonCard>
  );
};