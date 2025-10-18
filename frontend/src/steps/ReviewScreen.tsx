// src/steps/ReviewScreen.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { ParseStatsCard } from '../components/ParseStatsCard';
import { ValidationErrors } from '../components/ValidationErrors';
import { TermPreview } from '../components/TermPreview';
import { NavigationButtons } from '../components/NavigationButtons';

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
          {parseStats && <ParseStatsCard stats={parseStats} />}

          <ValidationErrors errors={validationErrors} />

          <TermPreview terms={parsedTerms} />

          <NavigationButtons
            onBack={onBack}
            onNext={onContinue}
            nextDisabled={parsedTerms.length < 5}
            backLabel="← Edit Input"
            nextLabel="Continue →"
          />
        </IonCardContent>
      </IonCard>
    </>
  );
};