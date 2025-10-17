// src/App.tsx

import React, { useState, useEffect } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { WhatToWriteAbout } from './screens/WhatToWriteAbout';
import { MindMap } from './screens/MindMap';
import { FrameworkSelection } from './screens/FrameworkSelection';
import { saveState, loadState } from './services/stateService';
import { OrganizedTerms } from './services/termOrganizerService';

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
import './theme/global.css';

setupIonicReact();

type Page = 'what-to-write' | 'mind-map' | 'framework';

interface TopicData {
  paidFor: string;
  passionate: string;
  adviceGiven: string;
  brokenRecord: string;
  chosenTopic: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('what-to-write');
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [mindMapData, setMindMapData] = useState<{ wordList: string; organized: OrganizedTerms } | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved state on mount
  useEffect(() => {
    console.log('Loading saved state...');
    const savedState = loadState();
    console.log('Loaded state:', savedState);

    if (savedState.topicData) {
      setTopicData(savedState.topicData);
    }
    if (savedState.mindMapData) {
      setMindMapData(savedState.mindMapData);
    }
    if (savedState.selectedFramework) {
      setSelectedFramework(savedState.selectedFramework);
    }
    if (savedState.currentPage) {
      setCurrentPage(savedState.currentPage as Page);
    }

    setIsLoading(false);
  }, []);

  const handleTopicComplete = (data: TopicData) => {
    console.log('Topic completed:', data);
    setTopicData(data);
    setCurrentPage('mind-map');
    saveState({
      topicData: data,
      currentPage: 'mind-map'
    });
  };

  const handleMindMapComplete = (data: { wordList: string; organized: OrganizedTerms }) => {
    console.log('Mind map completed:', data);
    setMindMapData(data);
    setCurrentPage('framework');
    saveState({
      mindMapData: data,
      currentPage: 'framework'
    });
  };

  const handleFrameworkComplete = (framework: string) => {
    console.log('Framework selected:', framework);
    setSelectedFramework(framework);
    saveState({
      selectedFramework: framework
    });
    // TODO: Navigate to next screen (Outline builder)
    alert(`Framework "${framework}" selected! Next: Build your outline`);
  };

  const handleBackToTopic = () => {
    setCurrentPage('what-to-write');
    saveState({
      currentPage: 'what-to-write'
    });
  };

  const handleBackToMindMap = () => {
    setCurrentPage('mind-map');
    saveState({
      currentPage: 'mind-map'
    });
  };

  // Don't render until we've loaded state
  if (isLoading) {
    return <IonApp><div>Loading...</div></IonApp>;
  }

  return (
    <IonApp>
      {currentPage === 'what-to-write' && (
        <WhatToWriteAbout onComplete={handleTopicComplete} />
      )}

      {currentPage === 'mind-map' && topicData && (
        <MindMap
          bookTopic={topicData.chosenTopic}
          onComplete={handleMindMapComplete}
          onBack={handleBackToTopic}
        />
      )}

      {currentPage === 'framework' && topicData && (
        <FrameworkSelection
          bookTopic={topicData.chosenTopic}
          onComplete={handleFrameworkComplete}
          onBack={handleBackToMindMap}
        />
      )}
    </IonApp>
  );
}