// src/components/TermPreview.tsx

import React from 'react';
import {
  IonChip,
  IonLabel,
  IonText
} from '@ionic/react';

interface TermPreviewProps {
  terms: string[];
  maxDisplay?: number;
}

export const TermPreview: React.FC<TermPreviewProps> = ({
                                                          terms,
                                                          maxDisplay = 20
                                                        }) => {
  return (
    <IonText className="ion-margin-bottom">
      <strong>Preview of terms:</strong>
      <IonText className="ion-margin-top">
        {terms.slice(0, maxDisplay).map((term, idx) => (
          <IonChip key={idx} color="primary">
            <IonLabel>{term}</IonLabel>
          </IonChip>
        ))}
        {terms.length > maxDisplay && (
          <IonChip color="medium">
            <IonLabel>+{terms.length - maxDisplay} more...</IonLabel>
          </IonChip>
        )}
      </IonText>
    </IonText>
  );
};