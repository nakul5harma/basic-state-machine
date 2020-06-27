import { LoggerService } from '../logger/logger.service';
import { SwitchStates } from './enum/switch-states.enum';
import { SwitchTransitions } from './enum/switch-transitions.enum';
import { createMachine } from './state-machine';

const logger = LoggerService.getLoggerServiceInstance();

export const switchStateMachine = createMachine({
  // One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
  initialState: SwitchStates.OFF,
  [SwitchStates.OFF]: {
    actions: {
      // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
      onEnter: () => {
        logger.info(`${SwitchStates.OFF}: onEnter`);
      },
      onExit: () => {
        logger.info(`${SwitchStates.OFF}: onExit`);
      },
    },
    transitions: {
      // Each state can define events that trigger a transition.
      [SwitchTransitions.SWITCH]: {
        // A transition defines how a machine would react to the event, by exiting one state and entering another state.
        target: SwitchStates.ON,
        // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
        action: () => {
          logger.info(
            `transition action for '${SwitchTransitions.SWITCH}' in '${SwitchStates.OFF}' state`,
          );
        },
      },
    },
  },
  [SwitchStates.ON]: {
    actions: {
      onEnter: () => {
        logger.info(`${SwitchStates.ON}: onEnter`);
      },
      onExit: () => {
        logger.info(`${SwitchStates.ON}: onExit`);
      },
    },
    transitions: {
      [SwitchTransitions.SWITCH]: {
        target: SwitchStates.OFF,
        action: () => {
          logger.info(
            `transition action for '${SwitchTransitions.SWITCH}' in '${SwitchStates.ON}' state`,
          );
        },
      },
    },
  },
});
