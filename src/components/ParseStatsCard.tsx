// src/components/ParseStatsCard.tsx

import React from 'react';
import {
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

interface ParseStats {
  total: number;
  unique: number;
  duplicatesRemoved: number;
  emptyRemoved: number;
}

interface ParseStatsCardProps {
  stats: ParseStats;
}

export const ParseStatsCard: React.FC<ParseStatsCardProps> = ({ stats }) => {
  return (
    
      <IonList>
        <IonItem>
          <IonLabel>
            <strong>Total terms processed:</strong> {stats.total}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <strong>Unique terms:</strong> {stats.unique}
          </IonLabel>
        </IonItem>
        {stats.duplicatesRemoved > 0 && (
          <IonItem>
            <IonLabel color="warning">
              <strong>Duplicates removed:</strong> {stats.duplicatesRemoved}
            </IonLabel>
          </IonItem>
        )}
        {stats.emptyRemoved > 0 && (
          <IonItem>
            <IonLabel color="medium">
              <strong>Empty entries removed:</strong> {stats.emptyRemoved}
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    
  );
};