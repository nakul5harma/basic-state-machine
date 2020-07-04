import { LoggerService } from './logger/logger.service';
import { SwitchTransitions } from './example-state-machines/switch-state-machine/enum/switch-transitions.enum';
import { SwitchStateMachine } from './example-state-machines/switch-state-machine/switch-state-machine';

const logNameSpace = `Main`;
const logger = LoggerService.getLoggerServiceInstance();
const switchStateMachine = new SwitchStateMachine().getSwitchStateMachine();

let state = switchStateMachine.value;
logger.info(`${logNameSpace}.informed`, `Current state : ${state}`); // current state: off

state = switchStateMachine.transition(state, SwitchTransitions.SWITCH);
logger.info(`${logNameSpace}.informed`, `Current state : ${state}`); // current state: on

state = switchStateMachine.transition(state, SwitchTransitions.SWITCH);
logger.info(`${logNameSpace}.informed`, `Current state : ${state}`); // current state: off
