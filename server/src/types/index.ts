export enum WindSpeed {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export enum WindMode {
  COOLING = 'cooling',
  HEATING = 'heating',
}

export enum EventType {
  TURN_ON = 'turnOn',
  TURN_OFF = 'turnOff',
  PAUSE = 'pause',
  SCHEDULED = 'scheduled',
  WAIT = 'wait',
  LOG = 'log',
}

export enum Status {
  OFF = 'off',
  SERVING = 'serving',
  WAITING = 'waiting',
  PAUSE = 'pause',
}
