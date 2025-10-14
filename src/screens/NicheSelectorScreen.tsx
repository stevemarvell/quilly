// src/screens/NicheSelectorScreen.tsx

import React, { useState } from 'react';
import { BookTopicCard } from '../components/BookTopicCard';
import { PersonaBrainstormStep } from '../components/PersonaBrainstormStep';
import { PersonaSelectStep } from '../components/PersonaSelectStep';
import { NicheRefineStep } from '../components/NicheRefineStep';

export interface ReaderPersona {
  description: string;
  language: string;
  specificNiche: string;
}

interface NicheSelectorScreenProps {
  bookTopic: string;
  onComplete: (persona: ReaderPersona) => void;
  onBack: () => void;
}

export const NicheSelectorScreen: React.FC<NicheSelectorScreenProps> = ({
                                                                          bookTopic,
                                                                          onComplete,
                                                                          onBack
                                                                        }) => {
  const [step, setStep] = useState<'brainstorm' | 'select' | 'refine'>('brainstorm');
  const [personaBrainstorm, setPersonaBrainstorm] = useState('');
  const [personas, setPersonas] = useState<string[]>([]);
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(0);
  const [specificNiche, setSpecificNiche] = useState('');
  const [readerLanguage, setReaderLanguage] = useState('');

  const handleBrainstormComplete = () => {
    const lines = personaBrainstorm
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 10);

    setPersonas(lines.slice(0, 5));
    setStep('select');
  };

  const handlePersonaSelected = () => {
    setStep('refine');
  };

  const handleComplete = () => {
    onComplete({
      description: personas[selectedPersonaIndex],
      language: readerLanguage,
      specificNiche: specificNiche
    });
  };

  return (
    <>
      <BookTopicCard
        bookTopic={bookTopic}
        title="🎯 Define Your Specific Niche"
        subtitle="Riches in the niches - the narrower your focus, the stronger your book"
      />

      {step === 'brainstorm' && (
        <PersonaBrainstormStep
          value={personaBrainstorm}
          onChange={setPersonaBrainstorm}
          onNext={handleBrainstormComplete}
        />
      )}

      {step === 'select' && personas.length > 0 && (
        <PersonaSelectStep
          personas={personas}
          selectedIndex={selectedPersonaIndex}
          onSelect={setSelectedPersonaIndex}
          onBack={() => setStep('brainstorm')}
          onNext={handlePersonaSelected}
        />
      )}

      {step === 'refine' && (
        <NicheRefineStep
          selectedPersona={personas[selectedPersonaIndex]}
          specificNiche={specificNiche}
          readerLanguage={readerLanguage}
          onNicheChange={setSpecificNiche}
          onLanguageChange={setReaderLanguage}
          onBack={() => setStep('select')}
          onComplete={handleComplete}
        />
      )}
    </>
  );
};