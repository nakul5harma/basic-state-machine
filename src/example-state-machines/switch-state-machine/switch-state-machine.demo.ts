import { LoggerService } from '../../logger/logger.service';
import { TurnstileTransitions } from '../coin-operated-turnstile-state-machine/enum/turnstile-transitions.enum';
import { SwitchStateMachine } from './switch-state-machine';
import { SwitchTransitions } from './enum/switch-transitions.enum';

export const demoSwitchStateMachine = () => {
  const logNameSpace = `Demo`;
  const logger = LoggerService.getLoggerServiceInstance();

  try {
    const switchStateMachine = SwitchStateMachine.getSwitchStateMachine();

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
};
