import { StateMachineModel } from '../../../state-machine/model/state-machine.model';
import { CoinOperatedTurnstileStateMachine } from '../coin-operated-turnstile-state-machine';
import { TurnstileStates } from '../enum/turnstile-states.enum';
import { TurnstileTransitions } from '../enum/turnstile-transitions.enum';
import { mockInvalidTransition } from './test-data/coin-operated-turnstile-state-machine.test-data';

describe('CoinOperatedTurnstileStateMachine', () => {
  let coinOperatedTurnstileStateMachine: StateMachineModel;

  beforeEach(() => {
    coinOperatedTurnstileStateMachine = CoinOperatedTurnstileStateMachine.getCoinOperatedTurnstileStateMachine();
  });

  it('Should be defined', () => {
    expect(coinOperatedTurnstileStateMachine).toBeDefined();
  });

  it('Should have initial state as "LOCKED"', () => {
    expect(coinOperatedTurnstileStateMachine.value).toEqual(
      TurnstileStates.LOCKED,
    );
  });

  it('Should throw when invalid transition is performed on "LOCKED" state', () => {
    expect(() =>
      coinOperatedTurnstileStateMachine.transition(
        coinOperatedTurnstileStateMachine.value,
        mockInvalidTransition,
      ),
    ).toThrowError(
      `Destination transition '${mockInvalidTransition}' is not defined for '${TurnstileStates.LOCKED}' state`,
    );
  });

  it('Should throw when invalid transition is performed on "UNLOCKED" state', () => {
    coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.INSERT_COIN,
    );

    expect(coinOperatedTurnstileStateMachine.value).toEqual(
      TurnstileStates.UNLOCKED,
    );

    expect(() =>
      coinOperatedTurnstileStateMachine.transition(
        coinOperatedTurnstileStateMachine.value,
        mockInvalidTransition,
      ),
    ).toThrowError(
      `Destination transition '${mockInvalidTransition}' is not defined for '${TurnstileStates.UNLOCKED}' state`,
    );
  });

  it('Should not change state when "PUSH_HANDLE" transition is performed on "LOCKED" state', () => {
    const destinationState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.PUSH_HANDLE,
    );

    expect(destinationState).toEqual(TurnstileStates.LOCKED);
  });

  it('Should change state to "UNLOCKED" when "INSERT_COIN" transition is performed on "LOCKED" state', () => {
    const destinationState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.INSERT_COIN,
    );

    expect(destinationState).toEqual(TurnstileStates.UNLOCKED);
  });

  it('Should not change state when "INSERT_COIN" transition is performed on "UNLOCKED" state', () => {
    coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.INSERT_COIN,
    );

    expect(coinOperatedTurnstileStateMachine.value).toEqual(
      TurnstileStates.UNLOCKED,
    );

    const destinationState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.INSERT_COIN,
    );

    expect(destinationState).toEqual(TurnstileStates.UNLOCKED);
  });

  it('Should change state to "LOCKED" when "PUSH_HANDLE" transition is performed on "UNLOCKED" state', () => {
    coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.INSERT_COIN,
    );

    expect(coinOperatedTurnstileStateMachine.value).toEqual(
      TurnstileStates.UNLOCKED,
    );

    const destinationState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileStateMachine.value,
      TurnstileTransitions.PUSH_HANDLE,
    );

    expect(destinationState).toEqual(TurnstileStates.LOCKED);
  });
});
