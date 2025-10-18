// src/config/courseConfig.ts

export interface CourseStep {
  id: string;
  label: string;
  completed?: boolean;
  disabled?: boolean;
}

export interface CourseSection {
  title: string;
  items: CourseStep[];
}

export const courseSections: CourseSection[] = [
  {
    title: 'What To Write About',
    items: [
      { id: 'what-to-write/author', label: 'Author', completed: false },
      { id: 'what-to-write/topic', label: 'Topic', completed: false },
      { id: 'what-to-write/reader', label: 'Reader', completed: false },
      { id: 'what-to-write/niche', label: 'Niche', completed: false },
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

// Helper function to get all steps in order
export const getAllSteps = (): CourseStep[] => {
  return courseSections.flatMap(section => section.items);
};

// Helper function to find next/previous steps
export const getAdjacentSteps = (currentStepId: string) => {
  const allSteps = getAllSteps();
  const currentIndex = allSteps.findIndex(step => step.id === currentStepId);

  return {
    previous: currentIndex > 0 ? allSteps[currentIndex - 1] : null,
    next: currentIndex < allSteps.length - 1 ? allSteps[currentIndex + 1] : null,
    currentIndex,
    totalSteps: allSteps.length,
  };
};