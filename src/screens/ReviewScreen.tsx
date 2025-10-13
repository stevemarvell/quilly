// src/screens/ReviewScreen.tsx

import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonNote
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';

interface ParseStats {
  total: number;
  unique: number;
  duplicatesRemoved: number;
  emptyRemoved: number;
}

interface ReviewScreenProps {
  parsedTerms: string[];
  parseStats: ParseStats | null;
  validationErrors: string[];
  onBack: () => void;
  onContinue: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
                                                            parsedTerms,
                                                            parseStats,
                                                            validationErrors,
                                                            onBack,
                                                            onContinue
                                                          }) => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Parsed Terms Review</IonCardTitle>
          <IonCardSubtitle>
            {parseStats?.unique} unique terms ready for organization
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {parseStats && (
            <div style={{ marginBottom: '16px' }}>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <strong>Total terms processed:</strong> {parseStats.total}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <strong>Unique terms:</strong> {parseStats.unique}
                  </IonLabel>
                </IonItem>
                {parseStats.duplicatesRemoved > 0 && (
                  <IonItem>
                    <IonLabel color="warning">
                      <strong>Duplicates removed:</strong> {parseStats.duplicatesRemoved}
                    </IonLabel>
                  </IonItem>
                )}
                {parseStats.emptyRemoved > 0 && (
                  <IonItem>
                    <IonLabel color="medium">
                      <strong>Empty entries removed:</strong> {parseStats.emptyRemoved}
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
            </div>
          )}

          {validationErrors.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              {validationErrors.map((error, idx) => (
                <IonItem key={idx} color="warning">
                  <IonIcon icon={alertCircle} slot="start" />
                  <IonLabel className="ion-text-wrap">
                    <IonNote>{error}</IonNote>
                  </IonLabel>
                </IonItem>
              ))}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <strong>Preview of terms:</strong>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {parsedTerms.slice(0, 20).map((term, idx) => (
                <IonChip key={idx} color="primary">
                  <IonLabel>{term}</IonLabel>
                </IonChip>
              ))}
              {parsedTerms.length > 20 && (
                <IonChip color="medium">
                  <IonLabel>+{parsedTerms.length - 20} more...</IonLabel>
                </IonChip>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <IonButton
              expand="block"
              fill="outline"
              onClick={onBack}
              style={{ flex: 1 }}
            >
              ← Edit Input
            </IonButton>
            <IonButton
              expand="block"
              onClick={onContinue}
              style={{ flex: 1 }}
              disabled={parsedTerms.length < 5}
            >
              Continue →
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};