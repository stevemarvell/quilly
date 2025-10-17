// src/components/Layout.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonListHeader,
  IonSplitPane,
  IonMenuButton,
} from '@ionic/react';
import { checkmarkCircle, ellipseOutline } from 'ionicons/icons';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  currentStep?: string;
}

interface MenuItem {
  id: string;
  label: string;
  completed?: boolean;
  disabled?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'Orientation',
    items: [
      { id: 'welcome', label: 'Welcome! Start Here', completed: false, disabled: true },
      { id: 'platform-tour', label: 'Author Platform Tour + Program ToC', completed: false, disabled: true },
      { id: 'support', label: 'Customer Support', completed: false, disabled: true },
      { id: 'zoom', label: 'How To Use Zoom', completed: false, disabled: true },
      { id: 'first-call', label: 'Before Your First Coaching Call', completed: false, disabled: true },
    ]
  },
  {
    title: 'Before You Begin Writing',
    items: [
      { id: 'books-change-lives', label: 'Books Change Lives', completed: false, disabled: true },
      { id: 'before-start', label: 'Before You Start Writing', completed: false, disabled: true },
      { id: 'publishing-types', label: 'Self-Publishing vs. Traditional', completed: false, disabled: true },
      { id: 'mindset', label: 'The Publishing Author\'s Mindset', completed: false, disabled: true },
      { id: 'what-to-write', label: 'What to Write About', completed: false },
    ]
  },
  {
    title: 'The M.O.R.E. Method',
    items: [
      { id: 'mind-map', label: 'Mind Map', completed: false },
      { id: 'outline', label: 'Outline', completed: false },
      { id: 'rough-draft', label: 'Rough Draft', completed: false },
      { id: 'lead-magnet', label: 'Decide Whether Or Not To Use A Lead Magnet', completed: false },
      { id: 'edit', label: 'Edit', completed: false },
    ]
  },
  {
    title: 'Pre-Book Production',
    items: [
      { id: 'note-from-coach', label: 'Before You Begin: A Note From Coach Ali', completed: false },
      { id: 'book-title', label: 'Choosing a Book Title', completed: false },
      { id: 'author-bio', label: 'Author Bio', completed: false },
      { id: 'tier-ones', label: 'Tier Ones', completed: false },
      { id: 'kdp-account', label: 'Create Kindle Direct Publishing (KDP) Account', completed: false },
      { id: 'prepare-manuscript', label: 'Prepare Manuscript for Formatting', completed: false },
      { id: 'book-description', label: 'Book Description', completed: false },
      { id: 'service-agreement', label: 'Service Level Agreement', completed: false },
    ]
  },
  {
    title: 'Book Production',
    items: [
      { id: 'formatting', label: 'Formatting', completed: false },
      { id: 'cover', label: 'Cover', completed: false },
      { id: 'keywords-categories', label: 'Keywords and Categories', completed: false },
      { id: 'upload-kdp', label: 'Upload Your Book Into KDP', completed: false },
      { id: 'proof-copy', label: 'Order A Proof Copy', completed: false },
    ]
  },
  {
    title: 'How to Launch Your Book',
    items: [
      { id: 'fundamentals', label: 'The Fundamentals Of A Bestseller', completed: false },
      { id: 'launch-plan', label: 'The 6 Week Launch Plan', completed: false },
      { id: 'author-central', label: 'Create Author Central Account', completed: false },
      { id: 'launch-team', label: 'Using a Launch Team to Sell More Books', completed: false },
    ]
  },
  {
    title: 'Selling Books After Launch',
    items: [
      { id: 'after-launch', label: 'The Psychology of Marketing', completed: false },
      { id: 'relaunch', label: 'Selling Books After Launch (And How To Relaunch)', completed: false },
      { id: 'reviews', label: 'The Road To Your First (Or Next) 100 Reviews', completed: false },
    ]
  },
  {
    title: 'Audiobook',
    items: [
      { id: 'why-audiobook', label: 'Why an audiobook?', completed: false },
      { id: 'who-record', label: 'Who should record your audiobook?', completed: false },
      { id: 'upload-audiobook', label: 'Uploading your audiobook', completed: false },
      { id: 'launch-audiobook', label: 'Launching and marketing your audiobook', completed: false },
      { id: 'final-tips', label: 'Final Tips and encouragement', completed: false },
    ]
  },
  {
    title: 'Bonus Content',
    items: [
      { id: 'change-price', label: 'Change Your Book Price', completed: false },
      { id: 'sales-dashboard', label: 'Review Your Sales Dashboard', completed: false },
      { id: 'author-copies', label: 'Order Author Copies', completed: false },
    ]
  },
];

export const Layout: React.FC<LayoutProps> = ({ children, pageTitle, currentStep }) => {
  return (
    <IonSplitPane contentId="main-content" when="md">
      <IonMenu contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Become a Bestseller 2.0</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <IonListHeader>
                <IonLabel>{section.title}</IonLabel>
              </IonListHeader>
              <IonList>
                {section.items.map((item) => (
                  <IonMenuToggle key={item.id} autoHide={false}>
                    <IonItem
                      button={!item.disabled}
                      detail={false}
                      color={currentStep === item.id ? 'primary' : undefined}
                      disabled={item.disabled}
                    >
                      <IonIcon
                        icon={item.completed ? checkmarkCircle : ellipseOutline}
                        slot="start"
                        color={item.disabled ? 'medium' : item.completed ? 'primary' : 'medium'}
                      />
                      <IonLabel className="ion-text-wrap" color={item.disabled ? 'medium' : undefined}>
                        {item.label}
                      </IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </IonList>
            </div>
          ))}
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonMenuButton slot="start" />
            <IonTitle>{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {children}
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};