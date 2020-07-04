import { LoggerService } from './logger/logger.service';
import { SwitchTransitions } from './example-state-machines/switch-state-machine/enum/switch-transitions.enum';
import { SwitchStateMachine } from './example-state-machines/switch-state-machine/switch-state-machine';
import { TurnstileTransitions } from './example-state-machines/coin-operated-turnstile-state-machine/enum/turnstile-transitions.enum';
import { CoinOperatedTurnstileStateMachine } from './example-state-machines/coin-operated-turnstile-state-machine/coin-operated-turnstile-state-machine';

const logNameSpace = `Main`;
const logger = LoggerService.getLoggerServiceInstance();

try {
  const switchStateMachine = new SwitchStateMachine().getSwitchStateMachine();

  // Initial State: OFF
  let switchMachineState = switchStateMachine.value;
  logger.info(
    `${logNameSpace}.${SwitchStateMachine.name}.informed`,
    `Current State: ${switchMachineState}`,
  ); // Current State: OFF

  // OFF -> SWITCH -> ON
  switchMachineState = switchStateMachine.transition(
    switchMachineState,
    SwitchTransitions.SWITCH,
  );
  logger.info(
    `${logNameSpace}.${SwitchStateMachine.name}.informed`,
    `Current State: ${switchMachineState}`,
  ); // Current State: ON

  // ON -> SWITCH -> OFF
  switchMachineState = switchStateMachine.transition(
    switchMachineState,
    SwitchTransitions.SWITCH,
  );
  logger.info(
    `${logNameSpace}.${SwitchStateMachine.name}.informed`,
    `Current State: ${switchMachineState}`,
  ); // Current State: OFF

  // Error: OFF -> PUSH_HANDLE
  switchMachineState = switchStateMachine.transition(
    switchMachineState,
    TurnstileTransitions.PUSH_HANDLE,
  );
} catch (error) {
  logger.error(
    `${logNameSpace}.${SwitchStateMachine.name}.failed`,
    error.stack,
    error.message,
  );
}

try {
  const coinOperatedTurnstileStateMachine = new CoinOperatedTurnstileStateMachine().getCoinOperatedTurnstileStateMachine();

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
