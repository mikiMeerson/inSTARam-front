import {
  UserRole,
  RaamStationType,
  BazStationType,
  RaamComputerType,
  BazComputerType,
  StatusType,
  AssigneeType,
  WeaponType,
  SeverityType,
  PlatformType,
  BlockType,
  EventTypeType,
  PhaseType,
} from './string-types';

export interface WeaponConfig {
  station: RaamStationType | BazStationType;
  weapon: WeaponType;
}

export interface VersionConfig {
  computer: RaamComputerType | BazComputerType;
  version: string;
}

export interface INote {
  _id: string;
  note: string;
  publisher: string;
  repliesTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IActivity {
  _id: string;
  publisher: string;
  action: string;
  value?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStar {
  _id: string;
  priority: number;
  severity: SeverityType;
  name: string;
  status: StatusType;
  assignee: AssigneeType;
  platform: PlatformType;
  block: BlockType;
  phase: PhaseType;
  publisher: string;
  contact: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: INote[];
  activity: IActivity[];
  event?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  unit: string;
  role: UserRole;
  watchList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  _id: string;
  name: string;
  publisher: string;
  type: EventTypeType;
  assignee?: string;
  block: BlockType;
  platform: PlatformType;
  dates: Date[];
  reason?: string;
  team?: string;
  callSign?: string;
  areas?: string;
  duration?: string;
  generalSummary?: string[];
  goals?: string[];
  dataSources?: string[];
  configuration: {
    weapons: WeaponConfig[];
    versions: VersionConfig[];
  };
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}

export interface IAlert {
  isAlert: boolean;
  content: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export const defaultRAAMEvent: IEvent = {
  _id: '0',
  name: '',
  assignee: '',
  block: '??',
  platform: '??????',
  dates: [],
  publisher: '',
  type: '???????? ??????????',
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        station: '2L',
        weapon: '??????',
      },
      {
        station: '2',
        weapon: '??????',
      },
      {
        station: '2R',
        weapon: '??????',
      },
      {
        station: 'LCFT',
        weapon: '??????',
      },
      {
        station: '5',
        weapon: '??????',
      },
      {
        station: 'RCFT',
        weapon: '??????',
      },
      {
        station: '8L',
        weapon: '??????',
      },
      {
        station: '8',
        weapon: '??????',
      },
      {
        station: '8R',
        weapon: '??????',
      },
    ],
    versions: [
      {
        computer: 'AAA',
        version: '??????',
      },
      {
        computer: 'BBB',
        version: '??????',
      },
      {
        computer: 'CCC',
        version: '??????',
      },
      {
        computer: 'DDD',
        version: '??????',
      },
    ],
  },
  dataSources: [],
  description: [],
  duration: '',
  findings: [],
  generalSummary: [],
  goals: [],
  notes: [],
  reason: '',
  team: '',
};

export const defaultBAZEvent: IEvent = {
  _id: '0',
  name: '',
  assignee: '',
  block: '??',
  platform: '????',
  dates: [],
  publisher: '',
  type: '???????? ??????????',
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        station: '1',
        weapon: '??????',
      },
      {
        station: '2',
        weapon: '??????',
      },
      {
        station: '3',
        weapon: '??????',
      },
      {
        station: '4',
        weapon: '??????',
      },
      {
        station: '5',
        weapon: '??????',
      },
      {
        station: '6',
        weapon: '??????',
      },
    ],
    versions: [
      {
        computer: 'EEE',
        version: '??????',
      },
      {
        computer: 'FFF',
        version: '??????',
      },
      {
        computer: 'GGG',
        version: '??????',
      },
    ],
  },
  dataSources: [],
  description: [],
  duration: '',
  findings: [],
  generalSummary: [],
  goals: [],
  notes: [],
  reason: '',
  team: '',
};
