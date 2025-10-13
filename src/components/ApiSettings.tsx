// src/components/ApiSettings.tsx

import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSpinner,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/react';
import { checkmarkCircle, closeCircle, alertCircle } from 'ionicons/icons';
import { testConnection } from '../services/claudeService';

export const ApiSettings: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    setErrorMessage('');

    try {
      const success = await testConnection();
      setTestResult(success ? 'success' : 'error');
      if (!success) {
        setErrorMessage('Connection test failed. Check your API key.');
      }
    } catch (error) {
      setTestResult('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setTesting(false);
    }
  };

  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  const hasApiKey = apiKey && apiKey.startsWith('sk-ant-');

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>⚙️ API Configuration</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">
          <IonLabel>
            <h3>API Key Status</h3>
            <p>
              {hasApiKey ? (
                <span style={{ color: 'green' }}>✓ API key configured</span>
              ) : (
                <span style={{ color: 'red' }}>✗ No API key found</span>
              )}
            </p>
          </IonLabel>
        </IonItem>

        {!hasApiKey && (
          <IonItem color="warning" lines="none">
            <IonIcon icon={alertCircle} slot="start" />
            <IonLabel className="ion-text-wrap">
              <IonNote>
                Please add your Claude API key to the .env file
              </IonNote>
            </IonLabel>
          </IonItem>
        )}

        <IonButton
          expand="block"
          onClick={handleTestConnection}
          disabled={!hasApiKey || testing}
          style={{ marginTop: '16px' }}
        >
          {testing ? (
            <>
              <IonSpinner name="crescent" style={{ marginRight: '8px' }} />
              Testing Connection...
            </>
          ) : (
            'Test Connection'
          )}
        </IonButton>

        {testResult === 'success' && (
          <IonItem color="success" lines="none" style={{ marginTop: '12px' }}>
            <IonIcon icon={checkmarkCircle} slot="start" />
            <IonLabel>Connection successful!</IonLabel>
          </IonItem>
        )}

        {testResult === 'error' && (
          <IonItem color="danger" lines="none" style={{ marginTop: '12px' }}>
            <IonIcon icon={closeCircle} slot="start" />
            <IonLabel className="ion-text-wrap">
              <h3>Connection Failed</h3>
              <p>{errorMessage}</p>
            </IonLabel>
          </IonItem>
        )}

        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          <p>
            <strong>To get your API key:</strong>
          </p>
          <ol style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>Visit <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></li>
            <li>Create a new API key</li>
            <li>Add it to your <code>.env</code> file as <code>VITE_CLAUDE_API_KEY</code></li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      </IonCardContent>
    </IonCard>
  );
};