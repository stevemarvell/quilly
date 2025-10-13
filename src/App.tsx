// src/App.tsx

import React, { useState } from 'react';
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  setupIonicReact
} from '@ionic/react';
import { downloadOutline, arrowBack } from 'ionicons/icons';
import { parseTerms, validateTerms } from './utils/termParser';
import { organizeTerms, OrganizedTerms } from './services/termOrganizerService';
import { InputScreen } from './screens/InputScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { TreeScreen } from './screens/TreeScreen';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

type Page = 'input' | 'review' | 'processing' | 'tree';

export default function TermOrganizerApp() {
  const [currentPage, setCurrentPage] = useState<Page>('input');
  const [inputText, setInputText] = useState('');
  const [parsedTerms, setParsedTerms] = useState<string[]>([]);
  const [parseStats, setParseStats] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [processingStep, setProcessingStep] = useState(0);
  const [currentProcessingMessage, setCurrentProcessingMessage] = useState('');
  const [organizedData, setOrganizedData] = useState<OrganizedTerms | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);

  const processingSteps = [
    "Generating embeddings",
    "Domain Architect analyzing",
    "Cluster Builder grouping terms",
    "Quality Controller reviewing",
    "General Term Filter processing"
  ];

  const handleOrganize = () => {
    const parsed = parseTerms(inputText);
    setParsedTerms(parsed.terms);
    setParseStats(parsed.stats);

    const validation = validateTerms(parsed.terms);
    setValidationErrors(validation.errors);

    setCurrentPage('review');
  };

  const handleProceedToProcessing = async () => {
    setCurrentPage('processing');
    setProcessingStep(0);
    setProcessingError(null);
    setCurrentProcessingMessage('Starting analysis...');

    try {
      setProcessingStep(0);
      await new Promise(resolve => setTimeout(resolve, 500));

      setProcessingStep(1);
      const organized = await organizeTerms(parsedTerms, (message) => {
        setCurrentProcessingMessage(message);
        setProcessingStep(prev => Math.min(prev + 1, processingSteps.length - 1));
      });

      setProcessingStep(processingSteps.length - 1);
      setCurrentProcessingMessage('Organization complete!');

      await new Promise(resolve => setTimeout(resolve, 500));

      setOrganizedData(organized);
      setCurrentPage('tree');

    } catch (error) {
      console.error('Processing error:', error);
      setProcessingError(
        error instanceof Error
          ? error.message
          : 'An unknown error occurred during processing'
      );
      setProcessingStep(processingSteps.length - 1);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(organizedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'organized-terms.json';
    link.click();
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            {currentPage !== 'input' && (
              <IonButtons slot="start">
                <IonButton onClick={() => setCurrentPage('input')}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
              </IonButtons>
            )}
            <IonTitle>Quilly - Term Organizer</IonTitle>
            {currentPage === 'tree' && (
              <IonButtons slot="end">
                <IonButton onClick={handleExport}>
                  <IonIcon icon={downloadOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {currentPage === 'input' && (
            <InputScreen
              inputText={inputText}
              onInputChange={setInputText}
              onOrganize={handleOrganize}
            />
          )}

          {currentPage === 'review' && (
            <ReviewScreen
              parsedTerms={parsedTerms}
              parseStats={parseStats}
              validationErrors={validationErrors}
              onBack={() => setCurrentPage('input')}
              onContinue={handleProceedToProcessing}
            />
          )}

          {currentPage === 'processing' && (
            <ProcessingScreen
              processingStep={processingStep}
              processingSteps={processingSteps}
              currentMessage={currentProcessingMessage}
              error={processingError}
              onBack={() => setCurrentPage('review')}
            />
          )}

          {currentPage === 'tree' && organizedData && (
            <TreeScreen organizedData={organizedData} />
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
}