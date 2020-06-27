import { LoggerService } from './logger/logger.service';
import { SwitchTransitions } from './state-machine/enum/switch-transitions.enum';
import { switchStateMachine } from './state-machine/switch-state-machine';

const logger = LoggerService.getLoggerServiceInstance();

let state = switchStateMachine.value;
logger.info(`Current state : ${state}`); // current state: off

state = switchStateMachine.transition(state, SwitchTransitions.SWITCH);
logger.info(`Current state : ${state}`); // current state: on

state = switchStateMachine.transition(state, SwitchTransitions.SWITCH);
logger.info(`Current state : ${state}`); // current state: off
