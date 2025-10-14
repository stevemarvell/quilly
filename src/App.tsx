// src/App.tsx

import React, { useState } from 'react';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { downloadOutline, arrowBack } from 'ionicons/icons';
import { parseTerms, validateTerms } from './utils/termParser';
import { organizeTerms, OrganizedTerms } from './services/termOrganizerService';
import { WhatToWriteAbout } from './screens/WhatToWriteAbout';
import { FourPsScreen, FourPsData } from './screens/FourPsScreen';
import { NicheSelectorScreen, ReaderPersona } from './screens/NicheSelectorScreen';
import { InputScreen } from './screens/InputScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { TreeScreen } from './screens/TreeScreen';
import { TitleGeneratorScreen } from './screens/TitleGeneratorScreen';

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

import './theme/variables.css';

setupIonicReact();

type Page = 'topic' | 'fourps' | 'niche' | 'input' | 'review' | 'processing' | 'tree' | 'titles';

interface TopicBuilderData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

export default function TermOrganizerApp() {
  const [currentPage, setCurrentPage] = useState<Page>('topic');

  // Topic Builder
  const [topicData, setTopicData] = useState<TopicBuilderData | null>(null);

  // 4 P's
  const [fourPsData, setFourPsData] = useState<FourPsData | null>(null);

  // Niche Selector
  const [readerPersona, setReaderPersona] = useState<ReaderPersona | null>(null);

  // Input & Processing
  const [inputText, setInputText] = useState('');
  const [parsedTerms, setParsedTerms] = useState<string[]>([]);
  const [parseStats, setParseStats] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [processingStep, setProcessingStep] = useState(0);
  const [currentProcessingMessage, setCurrentProcessingMessage] = useState('');
  const [organizedData, setOrganizedData] = useState<OrganizedTerms | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);

  // Titles
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubtitle, setSelectedSubtitle] = useState('');

  const processingSteps = [
    "Generating embeddings for semantic analysis",
    "Calculating similarity between terms",
    "Analyzing term relationships with AI",
    "Building hierarchical structure",
    "Finalizing organization"
  ];

  const handleTopicComplete = (data: TopicBuilderData) => {
    setTopicData(data);
    setCurrentPage('fourps');
  };

  const handleFourPsComplete = (data: FourPsData) => {
    setFourPsData(data);
    setCurrentPage('niche');
  };

  const handleNicheComplete = (persona: ReaderPersona) => {
    setReaderPersona(persona);
    setCurrentPage('input');
  };

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
      const organized = await organizeTerms(
        parsedTerms,
        fourPsData,
        (message) => {
          setCurrentProcessingMessage(message);
          setProcessingStep(prev => Math.min(prev + 1, processingSteps.length - 1));
        }
      );

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

  const handleTitlesComplete = (title: string, subtitle: string) => {
    setSelectedTitle(title);
    setSelectedSubtitle(subtitle);
    // Could add export screen here or just show success
    alert(`Title selected: ${title}\nSubtitle: ${subtitle}\n\nYou can now export your complete book outline!`);
  };

  const handleExport = () => {
    if (!organizedData) return;

    const exportData = {
      bookTopic: topicData?.chosenTopic,
      fourPs: fourPsData,
      niche: readerPersona,
      structure: organizedData,
      title: selectedTitle,
      subtitle: selectedSubtitle
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quilly-book-outline.json';
    link.click();
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'topic': return 'Topic Builder';
      case 'fourps': return "4 P's Framework";
      case 'niche': return 'Niche Selection';
      case 'input': return 'Content Brainstorm';
      case 'review': return 'Review Terms';
      case 'processing': return 'Processing';
      case 'tree': return 'Book Structure';
      case 'titles': return 'Title Generator';
      default: return 'Quilly';
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            {currentPage !== 'topic' && (
              <IonButtons slot="start">
                <IonButton onClick={() => {
                  // Navigate back through the flow
                  if (currentPage === 'fourps') setCurrentPage('topic');
                  else if (currentPage === 'niche') setCurrentPage('fourps');
                  else if (currentPage === 'input') setCurrentPage('niche');
                  else if (currentPage === 'review') setCurrentPage('input');
                  else if (currentPage === 'processing') setCurrentPage('review');
                  else if (currentPage === 'tree') setCurrentPage('input');
                  else if (currentPage === 'titles') setCurrentPage('tree');
                }}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
              </IonButtons>
            )}
            <IonTitle>Quilly - {getPageTitle()}</IonTitle>
            {(currentPage === 'tree' || currentPage === 'titles') && (
              <IonButtons slot="end">
                <IonButton onClick={handleExport}>
                  <IonIcon icon={downloadOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {currentPage === 'topic' && (
            <WhatToWriteAbout onComplete={handleTopicComplete} />
          )}

          {currentPage === 'fourps' && topicData && (
            <FourPsScreen
              bookTopic={topicData.chosenTopic}
              onComplete={handleFourPsComplete}
              onBack={() => setCurrentPage('topic')}
            />
          )}

          {currentPage === 'niche' && topicData && (
            <NicheSelectorScreen
              bookTopic={topicData.chosenTopic}
              onComplete={handleNicheComplete}
              onBack={() => setCurrentPage('fourps')}
            />
          )}

          {currentPage === 'input' && (
            <InputScreen
              inputText={inputText}
              fourPsData={fourPsData}
              readerPersona={readerPersona}
              onInputChange={setInputText}
              onOrganize={handleOrganize}
              onBack={() => setCurrentPage('niche')}
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
            <>
              <TreeScreen organizedData={organizedData} />
              
                <IonButton
                  expand="block"
                  onClick={() => setCurrentPage('titles')}
                >
                  Continue to Title Generation →
                </IonButton>
              
            </>
          )}

          {currentPage === 'titles' && fourPsData && organizedData && (
            <TitleGeneratorScreen
              fourPsData={fourPsData}
              organizedData={organizedData}
              onComplete={handleTitlesComplete}
              onBack={() => setCurrentPage('tree')}
            />
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
}