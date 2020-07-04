import { LoggerService } from '../../logger/logger.service';
import { SwitchTransitions } from '../switch-state-machine/enum/switch-transitions.enum';
import { CoinOperatedTurnstileStateMachine } from './coin-operated-turnstile-state-machine';
import { TurnstileTransitions } from './enum/turnstile-transitions.enum';

export const demoCoinOperatedTurnstileStateMachine = () => {
  const logNameSpace = `Demo`;
  const logger = LoggerService.getLoggerServiceInstance();

  try {
    const coinOperatedTurnstileStateMachine = CoinOperatedTurnstileStateMachine.getCoinOperatedTurnstileStateMachine();

    // Initial State: LOCKED
    let coinOperatedTurnstileMachineState =
      coinOperatedTurnstileStateMachine.value;
    logger.info(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.informed`,
      `Current State: ${coinOperatedTurnstileMachineState}`,
    ); // Current State: LOCKED

    // LOCKED -> PUSH_HANDLE -> LOCKED
    coinOperatedTurnstileMachineState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileMachineState,
      TurnstileTransitions.PUSH_HANDLE,
    );
    logger.info(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.informed`,
      `Current State: ${coinOperatedTurnstileMachineState}`,
    ); // Current State: LOCKED

    // LOCKED -> INSERT_COIN -> UNLOCKED
    coinOperatedTurnstileMachineState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileMachineState,
      TurnstileTransitions.INSERT_COIN,
    );
    logger.info(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.informed`,
      `Current State: ${coinOperatedTurnstileMachineState}`,
    ); // Current State: UNLOCKED

    // UNLOCKED -> INSERT_COIN -> UNLOCKED
    coinOperatedTurnstileMachineState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileMachineState,
      TurnstileTransitions.INSERT_COIN,
    );
    logger.info(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.informed`,
      `Current State: ${coinOperatedTurnstileMachineState}`,
    ); // Current State: UNLOCKED

    // UNLOCKED -> PUSH_HANDLE -> LOCKED
    coinOperatedTurnstileMachineState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileMachineState,
      TurnstileTransitions.PUSH_HANDLE,
    );
    logger.info(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.informed`,
      `Current State: ${coinOperatedTurnstileMachineState}`,
    ); // Current State: LOCKED

    // Error: LOCKED -> SWITCH
    coinOperatedTurnstileMachineState = coinOperatedTurnstileStateMachine.transition(
      coinOperatedTurnstileMachineState,
      SwitchTransitions.SWITCH,
    );
  } catch (error) {
    logger.error(
      `${logNameSpace}.${CoinOperatedTurnstileStateMachine.name}.failed`,
      error.stack,
      error.message,
    );
  }
};
