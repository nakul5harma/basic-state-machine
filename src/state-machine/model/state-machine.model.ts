export interface StateMachineModel {
  value: any;
  transition: (currentState: any, event: any) => {};
}
