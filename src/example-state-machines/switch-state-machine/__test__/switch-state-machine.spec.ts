import { StateMachineModel } from '../../../state-machine/model/state-machine.model';
import { SwitchStateMachine } from '../switch-state-machine';
import { SwitchStates } from '../enum/switch-states.enum';
import { mockInvalidTransition } from './test-data/switch-state-machine.test-data';
import { SwitchTransitions } from '../enum/switch-transitions.enum';

describe('SwitchStateMachine', () => {
  let switchStateMachine: StateMachineModel;

  beforeEach(() => {
    switchStateMachine = SwitchStateMachine.getSwitchStateMachine();
  });

  it('Should be defined', () => {
    expect(switchStateMachine).toBeDefined();
  });

  it('Should have initial state as "OFF"', () => {
    expect(switchStateMachine.value).toEqual(SwitchStates.OFF);
  });

  it('Should throw when invalid transition is performed on "OFF" state', () => {
    expect(() =>
      switchStateMachine.transition(
        switchStateMachine.value,
        mockInvalidTransition,
      ),
    ).toThrowError(
      `Destination transition '${mockInvalidTransition}' is not defined for '${SwitchStates.OFF}' state`,
    );
  });

  it('Should throw when invalid transition is performed on "ON" state', () => {
    switchStateMachine.transition(
      switchStateMachine.value,
      SwitchTransitions.SWITCH,
    );

    expect(switchStateMachine.value).toEqual(SwitchStates.ON);

    expect(() =>
      switchStateMachine.transition(
        switchStateMachine.value,
        mockInvalidTransition,
      ),
    ).toThrowError(
      `Destination transition '${mockInvalidTransition}' is not defined for '${SwitchStates.ON}' state`,
    );
  });

  it('Should change state to "ON" when "SWITCH" transition is performed on "OFF" state', () => {
    const destinationState = switchStateMachine.transition(
      switchStateMachine.value,
      SwitchTransitions.SWITCH,
    );

    expect(destinationState).toEqual(SwitchStates.ON);
  });

  it('Should change state to "OFF" when "SWITCH" transition is performed on "ON" state', () => {
    switchStateMachine.transition(
      switchStateMachine.value,
      SwitchTransitions.SWITCH,
    );

    expect(switchStateMachine.value).toEqual(SwitchStates.ON);

    const destinationState = switchStateMachine.transition(
      switchStateMachine.value,
      SwitchTransitions.SWITCH,
    );

    expect(destinationState).toEqual(SwitchStates.OFF);
  });
});
