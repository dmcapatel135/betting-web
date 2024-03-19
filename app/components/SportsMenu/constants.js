export const tabsName = [
  { id: 1, path: '/dashboard/popular', tabName: 'POPULAR MATCH' },
  { id: 2, path: '/', tabName: 'TODAYs MATCHES', filterName: new Date() },
  {
    id: 3,
    path: '/dashboard/upcoming',
    tabName: 'UPCOMING MATCHES',
    filterName: '',
  },
  {
    id: 4,
    path: '/dashboard/live-now',
    tabName: 'LIVE NOW',
    filterName: 'true',
    img: '/images/bikoicon/liveyellow.png',
  },
];

export const sport = [
  {
    name: 'Soccer',
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
  {
    name: 'Basketball',
    icon: '/images/bikoicon/sports_and_outdoors.png',
    active_icon: '/images/bikoicon/basketballwhite.png',
  },
  {
    name: 'Boxing',
    icon: '/images/bikoicon/boxing.png',
    active_icon: '/images/bikoicon/boxingwhite.png',
  },
  {
    name: 'Rugby',
    icon: '/images/bikoicon/rugby.png',
    active_icon: '/images/bikoicon/rugbywhite.png',
  },
  {
    name: 'Cricket',
    icon: '/images/bikoicon/cricket.png',
    active_icon: '/images/bikoicon/cricketwhite.png',
  },
  {
    name: 'Tennis',
    icon: '/images/bikoicon/tennis-racket.png',
    active_icon: '/images/bikoicon/tennis-racket.svg',
  },
];

export const marketsName = [
  {
    sportId: 1,
    marketName: [
      { name: '3 WAY', option: ['1', 'X', '2'] },
      // { name: 'Over/Under(2.5)', option: ['Over', 'Under'] },
      { name: 'Total', option: ['Over', 'Under'] },
      { name: 'BOTH TEAMS TO SCORE', option: ['Yes', 'No'] },
    ],
  },
  {
    sportId: 2,
    marketName: [{ name: '3 WAY', option: ['1', 'X', '2'] }],
  },
  {
    sportId: 10,
    marketName: [{ name: 'Winner', option: ['1', '2'] }],
  },
  {
    sportId: 12,
    marketName: [{ name: '3 WAY', option: ['1', 'x', '2'] }],
  },
  {
    sportId: 21,
    marketName: [{ name: 'Winner (incl. super over)', option: [1, 2] }],
  },
  {
    sportId: 5,
    marketName: [
      { name: 'Winner', option: [1, 2] },
      { name: '1st set - winner', option: [1, 2] },
      { name: '2nd set - winner', option: [1, 2] },
    ],
  },
];
