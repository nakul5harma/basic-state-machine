import { LoggerService } from '../../logger/logger.service';
import { StateMachineModel } from '../../state-machine/model/state-machine.model';
import { StateMachine } from '../../state-machine/state-machine';
import { TurnstileStates } from './enum/turnstile-states.enum';
import { TurnstileTransitions } from './enum/turnstile-transitions.enum';

export class CoinOperatedTurnstileStateMachine {
  private static readonly logNameSpace = CoinOperatedTurnstileStateMachine.name;
  private static readonly logger = LoggerService.getLoggerServiceInstance();

  static getCoinOperatedTurnstileStateMachine(): StateMachineModel {
    return StateMachine.createMachine({
      // One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
      initialState: TurnstileStates.LOCKED,
      [TurnstileStates.LOCKED]: {
        actions: {
          // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
          onEnter: () => {
            this.logger.info(
              `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
              `${TurnstileStates.LOCKED}: onEnter`,
            );
          },
          // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
          onExit: () => {
            this.logger.info(
              `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
              `${TurnstileStates.LOCKED}: onExit`,
            );
          },
        },
        transitions: {
          // Each state can define events that trigger a transition.
          [TurnstileTransitions.INSERT_COIN]: {
            // A transition defines how a machine would react to the event, by exiting one state and entering another state.
            target: TurnstileStates.UNLOCKED,
            // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
                `Transition action for '${TurnstileTransitions.INSERT_COIN}' in '${TurnstileStates.LOCKED}' state`,
              );
            },
          },
          // Each state can define events that trigger a transition.
          [TurnstileTransitions.PUSH_HANDLE]: {
            // A transition defines how a machine would react to the event, by exiting one state and entering another state.
            target: TurnstileStates.LOCKED,
            // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
                `Transition action for '${TurnstileTransitions.PUSH_HANDLE}' in '${TurnstileStates.LOCKED}' state`,
              );
            },
          },
        },
      },
      [TurnstileStates.UNLOCKED]: {
        actions: {
          // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
          onEnter: () => {
            this.logger.info(
              `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
              `${TurnstileStates.UNLOCKED}: onEnter`,
            );
          },
          // Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
          onExit: () => {
            this.logger.info(
              `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
              `${TurnstileStates.UNLOCKED}: onExit`,
            );
          },
        },
        transitions: {
          // Each state can define events that trigger a transition.
          [TurnstileTransitions.INSERT_COIN]: {
            // A transition defines how a machine would react to the event, by exiting one state and entering another state.
            target: TurnstileStates.UNLOCKED,
            // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
                `Transition action for '${TurnstileTransitions.INSERT_COIN}' in '${TurnstileStates.UNLOCKED}' state`,
              );
            },
          },
          // Each state can define events that trigger a transition.
          [TurnstileTransitions.PUSH_HANDLE]: {
            // A transition defines how a machine would react to the event, by exiting one state and entering another state.
            target: TurnstileStates.LOCKED,
            // A transition can define actions that occur when the transition happens. Actions will typically have side effects.
            action: () => {
              this.logger.info(
                `${this.logNameSpace}.getCoinOperatedTurnstileStateMachine.informed`,
                `Transition action for '${TurnstileTransitions.PUSH_HANDLE}' in '${TurnstileStates.UNLOCKED}' state`,
              );
            },
          },
        },
      },
    });
  }
}
