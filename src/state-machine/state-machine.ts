import { StateMachineModel } from './model/state-machine.model';

export class StateMachine {
  static createMachine(stateMachineDefinition: any): StateMachineModel {
    const machine: StateMachineModel = {
      value: stateMachineDefinition.initialState,
      transition: (currentState: any, event: any) => {
        // The event is checked against the current state’s transitions.
        const currentStateDefinition = stateMachineDefinition[currentState];
        const destinationTransition = currentStateDefinition.transitions[event];

        // If a transition matches the event, that transition “happens”.
        if (!destinationTransition) {
          throw new Error(
            `Destination transition '${event}' is not defined for '${currentState}' state`,
          );
        }

        const destinationState = destinationTransition.target;
        const destinationStateDefinition =
          stateMachineDefinition[destinationState];

        // By virtue of a transition “happening”, states are exited, and entered and the relevant actions are performed
        destinationTransition.action();
        currentStateDefinition.actions.onExit();
        destinationStateDefinition.actions.onEnter();

        // The machine immediately is in the new state, ready to process the next event.
        machine.value = destinationState;

        return machine.value;
      },
    };

    return machine;
  }
}
