import { LoggerService } from '../../logger/logger.service';
import { StateMachine } from '../../state-machine/state-machine';
import { SwitchStates } from './enum/switch-states.enum';
import { SwitchTransitions } from './enum/switch-transitions.enum';

export class SwitchStateMachine {
  private readonly logNameSpace = SwitchStateMachine.name;
  private readonly logger = LoggerService.getLoggerServiceInstance();

  getSwitchStateMachine() {
    const stateMachine = new StateMachine();

    return stateMachine.createMachine({
      // One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
      initialState: SwitchStates.OFF,
      [SwitchStates.OFF]: {
        actions: {
          // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
          onEnter: () => {
            this.logger.info(
              `${this.logNameSpace}.getSwitchStateMachine.informed`,
              `${SwitchStates.OFF}: onEnter`,
            );
          },
          onExit: () => {
            this.logger.info(
              `${this.logNameSpace}.getSwitchStateMachine.informed`,
              `${SwitchStates.OFF}: onExit`,
            );
          },
        },
        transitions: {
          // Each state can define events that trigger a transition.
          [SwitchTransitions.SWITCH]: {
            // A transition defines how a machine would react to the event, by exiting one state and entering another state.
            target: SwitchStates.ON,
            // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getSwitchStateMachine.informed`,
                `Transition action for '${SwitchTransitions.SWITCH}' in '${SwitchStates.OFF}' state`,
              );
            },
          },
        },
      },
      [SwitchStates.ON]: {
        actions: {
          onEnter: () => {
            this.logger.info(
              `${this.logNameSpace}.getSwitchStateMachine.informed`,
              `${SwitchStates.ON}: onEnter`,
            );
          },
          onExit: () => {
            this.logger.info(
              `${this.logNameSpace}.getSwitchStateMachine.informed`,
              `${SwitchStates.ON}: onExit`,
            );
          },
        },
        transitions: {
          [SwitchTransitions.SWITCH]: {
            target: SwitchStates.OFF,
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getSwitchStateMachine.informed`,
                `Transition action for '${SwitchTransitions.SWITCH}' in '${SwitchStates.ON}' state`,
              );
            },
          },
        },
      },
    });
  }
}
