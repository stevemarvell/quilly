// src/steps/MindMap.tsx

import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonTextarea,
  IonText,
  IonChip,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { bookOutline, bulbOutline } from 'ionicons/icons';
import { Layout } from '../layout/Layout.tsx';
import { callClaude } from '../services/claudeService';
import { organizeTerms, OrganizedTerms } from '../services/termOrganizerService';
import { saveState, loadState } from '../services/stateService';

interface MindMapProps {
  bookTopic: string;
  onComplete: (data: { wordList: string; organized: OrganizedTerms }) => void;
  onBack: () => void;
}

export const MindMap: React.FC<MindMapProps> = ({
                                                  bookTopic,
                                                  onComplete,
                                                  onBack
                                                }) => {
  const [step, setStep] = useState<'brainstorm' | 'organize'>('brainstorm');
  const [wordList, setWordList] = useState('');
  const [generatingHelp, setGeneratingHelp] = useState(false);
  const [organizingGroups, setOrganizingGroups] = useState(false);
  const [organized, setOrganized] = useState<OrganizedTerms | null>(null);
  const [processingMessage, setProcessingMessage] = useState('');

  // Load saved mind map data on mount
  useEffect(() => {
    const savedState = loadState();
    if (savedState.mindMapData) {
      // Handle both old string format and new object format
      if (typeof savedState.mindMapData === 'string') {
        // Old format - just a string
        setWordList(savedState.mindMapData);
      } else if (savedState.mindMapData.wordList) {
        // New format - object with wordList and organized
        setWordList(savedState.mindMapData.wordList);
        if (savedState.mindMapData.organized) {
          setOrganized(savedState.mindMapData.organized);
          setStep('organize');
        }
      }
    }
  }, []);

  // Save wordList whenever it changes
  useEffect(() => {
    if (wordList) {
      saveState({
        mindMapData: {
          wordList,
          organized: organized || { domains: [], generalTerms: [] }
        }
      });
    }
  }, [wordList, organized]);

  const wordCount = wordList.trim() ? wordList.split(/[\n,]+/).filter(w => w.trim()).length : 0;
  const canContinue = wordCount >= 20;

  const handleGetAIHelp = async () => {
    setGeneratingHelp(true);

    try {
      const prompt = `Generate a comprehensive list of 40-50 words and short phrases related to this book topic:

"${bookTopic}"

Include:
- Key concepts and terminology
- Common questions or problems
- Techniques and methods
- Stories or examples worth mentioning
- Tools or resources
- Common mistakes or pitfalls
- Best practices
- Related subtopics

Provide ONLY a list of words and phrases, one per line. No explanations, no numbers, no formatting. Just the raw words/phrases.

Example format:
aperture settings
depth of field
ISO basics
shutter speed
rule of thirds
composition techniques
...`;

      const response = await callClaude([
        { role: 'user', content: prompt }
      ]);

      const suggestions = response
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.match(/^\d+\./))
        .join('\n');

      if (wordList.trim()) {
        setWordList(wordList + '\n' + suggestions);
      } else {
        setWordList(suggestions);
      }
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
      alert('Failed to generate suggestions. Please try again.');
    } finally {
      setGeneratingHelp(false);
    }
  };

  const handleOrganizeWithAI = async () => {
    setOrganizingGroups(true);

    try {
      const words = wordList.split(/[\n,]+/).map(w => w.trim()).filter(w => w);

      const organizedData = await organizeTerms(
        words,
        undefined,
        (message) => {
          setProcessingMessage(message);
        }
      );

      setOrganized(organizedData);
    } catch (error) {
      console.error('Failed to organize:', error);
      alert('Failed to organize. Please try again.');
    } finally {
      setOrganizingGroups(false);
    }
  };

  return (
    <Layout pageTitle="Mind Map" currentStep="mind-map">
      {/* Book Topic Reminder */}
      <IonCard color="primary">
        <IonCardContent>
          <div className="quilly-topic-reminder">
            <IonIcon icon={bookOutline} className="quilly-topic-icon" />
            <div>
              <IonText className="quilly-topic-label">
                Your Book Topic
              </IonText>
              <IonText className="quilly-topic-text">
                {bookTopic}
              </IonText>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      {/* M.O.R.E. Method */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>The M.O.R.E. Writing Method</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="quilly-chips-container">
            <IonChip color="primary"><strong>M</strong>ind Map</IonChip>
            <IonChip color="medium"><strong>O</strong>utline</IonChip>
            <IonChip color="medium"><strong>R</strong>ough Draft</IonChip>
            <IonChip color="medium"><strong>E</strong>dit</IonChip>
          </div>
        </IonCardContent>
      </IonCard>

      {step === 'brainstorm' ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Step 1: Brain Dump</IonCardTitle>
              <IonCardSubtitle>Get all your ideas out</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p className="ion-margin-bottom">
                  Write down words and phrases about your topic. Don't organize yet - just capture everything!
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCard color="light" className="ion-margin-bottom">
                <IonCardContent>
                  <IonText color="medium">
                    <p>
                      <strong>💡 The No-Filter Rule:</strong> Write EVERYTHING that comes to mind.
                      Your best ideas emerge after you've exhausted the obvious ones.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>

              {!generatingHelp && (
                <IonButton
                  expand="block"
                  fill="outline"
                  color="ai"
                  onClick={handleGetAIHelp}
                  className="ion-margin-bottom"
                >
                  <IonIcon icon={bulbOutline} slot="start" />
                  Need Help? Get AI Word Suggestions
                </IonButton>
              )}

              {generatingHelp && (
                <IonCard className="ion-margin-bottom">
                  <IonCardContent className="ion-text-center">
                    <IonSpinner name="crescent" />
                    <IonText className="ion-margin-top">
                      <p>Generating word suggestions...</p>
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}

              <IonTextarea
                value={wordList}
                onIonInput={(e) => setWordList(e.detail.value!)}
                placeholder="Enter words and phrases (one per line or comma-separated)..."
                rows={15}
                className="ion-padding quilly-textarea"
              />

              <div className="ion-margin-top">
                <IonText color={canContinue ? 'success' : 'medium'}>
                  <p>
                    <strong>{wordCount} words/phrases</strong>
                    {!canContinue && ' (minimum 20 recommended)'}
                  </p>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <div className="ion-padding">
            <IonButton
              expand="block"
              fill="outline"
              onClick={onBack}
              className="ion-margin-bottom"
            >
              ← Back
            </IonButton>

            <IonButton
              expand="block"
              onClick={() => setStep('organize')}
              disabled={!canContinue}
              color="secondary"
            >
              Continue to Organize Ideas →
            </IonButton>
          </div>
        </>
      ) : (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Step 2: Review Your Ideas</IonCardTitle>
              <IonCardSubtitle>{wordCount} words and phrases captured</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p className="ion-margin-bottom">
                  Great work! You've brainstormed {wordCount} ideas. You can either:
                </p>
                <ul className="ion-padding-start">
                  <li>Use AI to automatically organize these into concept groups</li>
                  <li>Continue without organizing (you'll structure them in the Outline phase)</li>
                </ul>
              </IonText>
            </IonCardContent>
          </IonCard>

          {!organizingGroups && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{organized ? 'Re-organize with AI?' : 'Get AI Help?'}</IonCardTitle>
                <IonCardSubtitle>
                  {organized ? 'Generate a new organization' : 'Organize your ideas into concept groups'}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton
                  expand="block"
                  onClick={handleOrganizeWithAI}
                  color="ai"
                  fill="outline"
                >
                  <IonIcon icon={bulbOutline} slot="start" />
                  {organized ? 'Re-organize My Ideas with AI' : 'Organize My Ideas with AI'}
                </IonButton>
                {!organized && (
                  <IonText color="medium" className="ion-margin-top">
                    <p className="quilly-skip-text">
                      Or skip and continue to outline
                    </p>
                  </IonText>
                )}
              </IonCardContent>
            </IonCard>
          )}

          {organizingGroups && (
            <IonCard>
              <IonCardContent className="ion-text-center ion-padding">
                <IonSpinner name="crescent" className="quilly-spinner" />
                <IonText className="ion-margin-top">
                  <p>{processingMessage || 'Organizing your ideas...'}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}

          {organized && (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Organized Ideas</IonCardTitle>
                  <IonCardSubtitle>AI has clustered your concepts</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>
                      Your ideas have been organized into domains and clusters using AI analysis.
                      This isn't your final structure yet - just organized concept groups!
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>

              {organized.domains.map((domain) => (
                <IonCard key={domain.id} className="quilly-domain-card">
                  <IonCardHeader>
                    <IonCardTitle className="quilly-domain-title">
                      📁 {domain.name}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {domain.clusters.map((cluster) => (
                      <IonCard key={cluster.id} className="quilly-cluster-card">
                        <IonCardHeader>
                          <IonCardSubtitle className="quilly-cluster-title">
                            {cluster.name}
                          </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <div className="quilly-items-container">
                            {cluster.terms.map((term, idx) => (
                              <IonChip key={idx} color="primary" className="quilly-item-chip">
                                {term}
                              </IonChip>
                            ))}
                          </div>
                        </IonCardContent>
                      </IonCard>
                    ))}
                  </IonCardContent>
                </IonCard>
              ))}

              {organized.generalTerms.length > 0 && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>General Terms</IonCardTitle>
                    <IonCardSubtitle>Cross-cutting concepts</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="quilly-items-container">
                      {organized.generalTerms.map((term, idx) => (
                        <IonChip key={idx} color="medium">
                          {term}
                        </IonChip>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>
              )}
            </>
          )}

          <div className="ion-padding">
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => setStep('brainstorm')}
              className="ion-margin-bottom"
            >
              ← Back to Brain Dump
            </IonButton>

            <IonButton
              expand="block"
              onClick={() => onComplete({ wordList, organized: organized || { domains: [], generalTerms: [] } })}
              color="primary"
            >
              Continue to Outline →
            </IonButton>
          </div>
        </>
      )}
    </Layout>
  );
};