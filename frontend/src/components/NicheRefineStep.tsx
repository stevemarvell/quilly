// src/components/PersonaBrainstormStep.tsx

import React from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTextarea
} from '@ionic/react';
import { checkmarkCircle, alertCircle } from 'ionicons/icons';

interface NicheRefineStepProps {
  selectedPersona: string;
  specificNiche: string;
  readerLanguage: string;
  onNicheChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const NicheRefineStep: React.FC<NicheRefineStepProps> = ({
                                                                  selectedPersona,
                                                                  specificNiche,
                                                                  readerLanguage,
                                                                  onNicheChange,
                                                                  onLanguageChange,
                                                                  onBack,
                                                                  onComplete
                                                                }) => {
  const isComplete = specificNiche.trim() && readerLanguage.trim();

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Step 3: Narrow Your Niche Further</IonCardTitle>
          <IonCardSubtitle>
            Get laser-focused on the specific problem
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonCard color="success" className="ion-margin-bottom">
            <IonCardContent>
              <IonIcon icon={checkmarkCircle} color="success" className="ion-margin-end" />
              <IonText color="success">
                <strong>Your Chosen Reader:</strong>
              </IonText>
              <IonText>
                <p className="ion-margin-top">{selectedPersona}</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonItem lines="none" className="ion-margin-bottom">
            <IonLabel className="ion-text-wrap">
              <strong>Now get MORE specific:</strong>
              <IonText color="medium">
                <p className="ion-margin-top">
                  What EXACT situation are they in when they need your book?
                </p>
              </IonText>
            </IonLabel>
          </IonItem>

          <IonCard color="light" className="ion-margin-bottom">
            <IonCardContent>
              <strong>Example Progressions:</strong>
              <IonList lines="none" className="ion-margin-top">
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <p>❌ Too Broad: "Photographers"</p>
                    <p>✓ Better: "Parents with new cameras"</p>
                    <p>✅ Best: "Moms trying to capture their kids' soccer games without blurry photos"</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <p>❌ Too Broad: "People learning cooking"</p>
                    <p>✓ Better: "Busy professionals wanting healthy meals"</p>
                    <p>✅ Best: "Working parents with 30 minutes to cook dinner who want their kids to eat vegetables"</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonTextarea
            value={specificNiche}
            onIonInput={(e) => onNicheChange(e.detail.value!)}
            placeholder="Example: Moms with new DSLRs who need to photograph fast-moving kids at outdoor sports events, struggling with motion blur and poor lighting"
            rows={4}
            className="ion-margin-top ion-padding"
          />
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Step 4: Define Your Reader's Language</IonCardTitle>
          <IonCardSubtitle>
            What words does YOUR reader use?
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="none" className="ion-margin-bottom">
            <IonLabel className="ion-text-wrap">
              <strong>Match your reader's vocabulary:</strong>
              <IonText color="medium">
                <p className="ion-margin-top">
                  Do they say "camera" or "DSLR"? "Pictures" or "photos"?
                  "Blurry" or "out of focus"? Use THEIR words, not technical jargon.
                </p>
              </IonText>
            </IonLabel>
          </IonItem>

          <IonCard color="light" className="ion-margin-bottom">
            <IonCardContent>
              <strong>Language Examples by Niche:</strong>
              <IonList lines="none" className="ion-margin-top">
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <p><strong>Amateur Parent Photographers:</strong></p>
                    <p>✅ "My camera" (not "DSLR")</p>
                    <p>✅ "Blurry pictures" (not "motion blur artifacts")</p>
                    <p>✅ "That clicky wheel" (not "aperture ring")</p>
                    <p>✅ "Good light" (not "optimal exposure conditions")</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <p><strong>Semi-Pro Hobbyists:</strong></p>
                    <p>✅ "DSLR settings"</p>
                    <p>✅ "Aperture priority mode"</p>
                    <p>✅ "Bokeh effect"</p>
                    <p>✅ "Golden hour shooting"</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonTextarea
            value={readerLanguage}
            onIonInput={(e) => onLanguageChange(e.detail.value!)}
            placeholder="Example: Uses casual terms like 'my camera' not 'DSLR', says 'blurry' not 'motion blur', wants 'better pictures' not 'optimal image quality', refers to 'that dial on top' not 'mode selector'"
            rows={5}
            className="ion-margin-top ion-padding"
          />

          <IonCard color="warning" className="ion-margin-top">
            <IonCardContent>
              <IonIcon icon={alertCircle} color="warning" className="ion-margin-end" />
              <IonText color="warning">
                <strong>Why This Matters:</strong>
              </IonText>
              <IonText>
                <p className="ion-margin-top">
                  Your content brainstorm should use THESE words.
                  If your reader says "blurry pictures," don't brainstorm "motion blur artifacts" -
                  use their language!
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonCardContent>
      </IonCard>

      <IonButtons className="ion-padding">
        <IonButton
          expand="block"
          fill="outline"
          onClick={onBack}
        >
          ← Back
        </IonButton>
        <IonButton
          expand="block"
          onClick={onComplete}
          disabled={!isComplete}
        >
          Continue to Content Brainstorm →
        </IonButton>
      </IonButtons>
    </>
  );
};