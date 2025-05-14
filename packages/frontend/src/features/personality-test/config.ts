export type AnswerType = 'A' | 'B' | 'C' | 'D';

export type TestItem = {
  situation: string;
  question: string;
  answers: string[];
};

export const testList: TestItem[] = [
  {
    situation: 'You are invited to a gathering with strangers.',
    question: 'How do you usually respond to such a situation?',
    answers: [
      'Approach someone new and start a conversation',
      'Read the room and people first',
      'Try to understand the flow rather than talking',
      'Look out for anyone who seems uncomfortable',
    ],
  },
  {
    situation: 'An unexpected problem occurs.',
    question: 'How do you usually respond?',
    answers: [
      'Face the problem and try to solve it no matter what',
      'Assess the situation and come up with logical solutions',
      'Communicate with others to resolve it together',
      'Take time to manage your emotions and stay calm',
    ],
  },
  {
    situation: 'You have a crush on someone.',
    question: 'How do you express your feelings?',
    answers: [
      'Give a gift or a letter to show your feelings',
      'Show your honest feelings to your crush',
      'Put their perspective and feelings first',
      'Consistently show your feelings through actions',
    ],
  },
  {
    situation: 'You unexpectedly get free time.',
    question: 'How do you usually spend it?',
    answers: [
      'Read or study',
      'Immerse yourself in a creative activity',
      'Chat or meet with someone you know',
      'Engage yourself in volunteering and help others',
    ],
  },
  {
    situation: "You're going through emotional hardship.",
    question: 'How do you usually cope with it?',
    answers: [
      'Express your feelings through writing or art',
      'Observe your emotion and find the cause',
      'Open up to someone you trust',
      'Help others in need',
    ],
  },
  {
    situation: 'You have a chance to speak in front of many people.',
    question: 'How do you deliver your thoughts?',
    answers: [
      'Deliver your speech in a unique and memorable way',
      'Present with logical documents or materials',
      'Add a hint of warmth and considerateness to your speech',
      'Deliver the core message concisely and firmly',
    ],
  },
  {
    situation: 'You are appointed as the leader of a team project.',
    question: 'What leadership style do you aim for?',
    answers: [
      'Lead passionately and proactively',
      "Pay attention to team members' emotions",
      'Plan out the structure and flow',
      'Go to great lengths, adjusting your plans to offer help',
    ],
  },
  {
    situation: 'A friend in need reaches out for help.',
    question: 'How do you respond?',
    answers: [
      'Rearrange your schedule to help them',
      'Politely decline and suggest alternatives',
      'Listen empathetically and relate to their feelings',
      'Adjust your own plans to help',
    ],
  },
];
