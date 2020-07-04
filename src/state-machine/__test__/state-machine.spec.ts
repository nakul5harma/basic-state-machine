import { StateMachineModel } from '../model/state-machine.model';
import { StateMachine } from '../state-machine';
import {
  mockStateMachineDefinition,
  mockState1,
  mockTransition1,
  mockState2,
  mockTransition2,
} from './test-data/state-machine.test-data';

describe('StateMachine', () => {
  let stateMachine: StateMachineModel;

  beforeEach(() => {
    stateMachine = StateMachine.createMachine(mockStateMachineDefinition);
  });

  it('Should be defined', () => {
    expect(stateMachine).toBeDefined();
  });

  it('Should have an initial state when initiated', () => {
    expect(stateMachine.value).toEqual(mockState1);
  });

  it('Should throw when invalid transition is performed', () => {
    expect(() =>
      stateMachine.transition(stateMachine.value, mockTransition2),
    ).toThrowError(
      `Destination transition '${mockTransition2}' is not defined for '${stateMachine.value}' state`,
    );
  });

  it('Should change state when valid transition is performed', () => {
    const destinationTransitionAction =
      mockStateMachineDefinition[mockState1].transitions[mockTransition1]
        .action;
    const destinationStateOnEnter =
      mockStateMachineDefinition[mockState2].actions.onEnter;
    const currentStateOnExit =
      mockStateMachineDefinition[mockState1].actions.onExit;

    expect(destinationTransitionAction).not.toHaveBeenCalled();
    expect(destinationStateOnEnter).not.toHaveBeenCalled();
    expect(currentStateOnExit).not.toHaveBeenCalled();

    const destinationState = stateMachine.transition(
      stateMachine.value,
      mockTransition1,
    );

    expect(destinationState).toEqual(mockState2);

    expect(destinationTransitionAction).toHaveBeenCalled();
    expect(destinationStateOnEnter).toHaveBeenCalled();
    expect(currentStateOnExit).toHaveBeenCalled();
  });
});
