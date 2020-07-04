export const mockState1 = 'MockState1';
export const mockState2 = 'MockState2';

export const mockTransition1 = 'MockTransition1';
export const mockTransition2 = 'MockTransition2';

export const mockStateMachineDefinition = {
  initialState: mockState1,
  [mockState1]: {
    actions: {
      onEnter: jest.fn(),
      onExit: jest.fn(),
    },
    transitions: {
      [mockTransition1]: {
        target: mockState2,
        action: jest.fn(),
      },
    },
  },
  [mockState2]: {
    actions: {
      onEnter: jest.fn(),
      onExit: jest.fn(),
    },
    transitions: {
      [mockTransition1]: {
        target: mockState1,
        action: jest.fn(),
      },
    },
  },
};
