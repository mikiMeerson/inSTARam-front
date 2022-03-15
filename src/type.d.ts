// This might change based on backend's updates,
// and might break the code here if not updated as well.
// Maybe you can export this to a mutual package that
// frontend and backend can use together? I don't really know
// a solution but this might be one.
type userRole = 'viewer' | 'editor' | 'admin';
type orderType = 'desc' | 'asc';

type linkDisplayType = {
    display: string;
    link: string;
    role: userRole;
}

interface weaponConfig {
  '2L': WEAPONS;
  '2': WEAPONS;
  '2R': WEAPONS;
  'LCFT': WEAPONS;
  '5': WEAPONS;
  'RCFT': WEAPONS;
  '8L': WEAPONS;
  '8': WEAPONS;
  '8R': WEAPONS;
}

interface versionConfig {
  AAA: string;
  BBB: string;
  CCC: string;
  DDD: string;
}

interface INote {
    _id: string;
    note: string;
    publisher: string;
    repliesTo?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IActivity {
    _id: string;
    publisher: string;
    action: string;
    value?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IStar {
  _id: string;
  priority: number;
  severity: SEVERITIES;
  name: string;
  status: STATUSES;
  assignee: ASSIGNEES;
  platform: PLATFORMS;
  block: BLOCKS;
  publisher: string;
  event: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: INote[];
  activity: IActivity[];
  createdAt?: string;
  updatedAt?: string;
}

interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  unit: string;
  role: userRole;
  watchList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface IEvent {
  _id: string;
  name: string;
  publisher: string;
  type: EVENT_TYPES;
  assignee: string;
  block: BLOCKS;
  platform: PLATFORMS;
  dates: Date[];
  reason?: string;
  team?: string;
  callSign?: string;
  areas?: string;
  duration?: string;
  generalSummary?: string[];
  goals?: string[];
  dataSources?: string[];
  configuration?: {
    weapons: weaponConfig;
    versions: versionConfig;
  };
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}

type ApiStarsType = {
    message: string
    status: string
    stars: IStar[]
    star?: IStar
}

type ApiUsersType = {
    message: string
    status: string
    users: IUser[]
    user?: IUser
}

type IAlert = {
    isAlert: boolean
    content: string
    severity: 'success' | 'info' | 'warning' | 'error'
}

type ApiEventsType = {
    message: string
    status: string
    events: IEvent[]
    event?: IEvent
}
