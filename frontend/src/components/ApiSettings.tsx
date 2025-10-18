// src/components/ApiSettings.tsx

import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText
} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
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
        setErrorMessage('Connection test failed. Check backend server and API keys.');
      }
    } catch (error) {
      setTestResult('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>⚙️ API Configuration</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">
          <IonLabel className="ion-text-wrap">
            <h3>Backend Status</h3>
            <p>Test your connection to the backend API server</p>
          </IonLabel>
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleTestConnection}
          disabled={testing}
          className="ion-margin-top"
          color="secondary"
        >
          {testing ? (
            <>
              <IonSpinner name="crescent" className="ion-margin-end" />
              Testing Connection...
            </>
          ) : (
            'Test Connection'
          )}
        </IonButton>

        {testResult === 'success' && (
          <IonItem color="success" lines="none" className="ion-margin-top">
            <IonIcon icon={checkmarkCircle} slot="start" />
            <IonLabel>Connection successful!</IonLabel>
          </IonItem>
        )}

        {testResult === 'error' && (
          <IonItem color="danger" lines="none" className="ion-margin-top">
            <IonIcon icon={closeCircle} slot="start" />
            <IonLabel className="ion-text-wrap">
              <h3>Connection Failed</h3>
              <p>{errorMessage}</p>
            </IonLabel>
          </IonItem>
        )}

        <IonText className="ion-margin-top">
          <p><strong>Setup instructions:</strong></p>
          <ol className="ion-margin-top ion-padding">
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Ensure backend server is running: <code>node server.js</code></p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Add API keys to <code>.env</code> file in project root</p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Get Claude API key from <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></p>
            </IonLabel>
          </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">
              <p>Get Voyage API key from <a href="https://dash.voyageai.com/" target="_blank" rel="noopener noreferrer">dash.voyageai.com</a></p>
            </IonLabel>
          </IonItem>
          </ol>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};