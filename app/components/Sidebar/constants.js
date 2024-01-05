export const navigations = [
  {
    icon: '/images/bikoicon/home.png',
    active_icon: '/images/bikoicon/home.png',
    title: 'HOME',
    path: '/',
  },
  //   { icon: '/images/portfolio.png', title: 'Portfolio', path: 'portfolio' },
  //   { icon: '/images/wallet6.png', title: 'Wallet', path: 'wallet' },
  {
    icon: '/images/bikoicon/livenow.svg',
    active_icon: '/images/bikoicon/livenowwhite.png',
    title: 'LIVE NOW',
    path: '/login',
  },
  {
    icon: '/images/bikoicon/upcoming.png',
    active_icon: '/images/bikoicon/upcomingwhite.png',
    title: 'UPCOMING',
    path: 'upcoming',
  },
  {
    icon: '/images/bikoicon/virtual-sport.png',
    active_icon: '/images/bikoicon/virtualsportswhite.png',
    title: 'VIRTUAL SPORTS',
    path: 'virtual-sport',
  },
  {
    icon: '/images/bikoicon/jackpot.png',
    active_icon: '/images/bikoicon/jackpotwhite.png',
    title: 'JACKPOT',
    path: 'jackpot',
  },
  {
    icon: '/images/bikoicon/popular.png',
    active_icon: '/images/bikoicon/popularwhite.png',
    title: 'POPULAR',
    path: 'popular',
  },
];

export const tournaments = [
  {
    id: 1,
    league: 'UEFA CHAMPIONS LEAGUE',
    icon: '/images/bikoicon/international.png',
  },
  { id: 2, league: 'BUNDESLIGA', icon: '/images/bikoicon/germany.png' },
  {
    id: 3,
    league: 'UEFA EUROPA LEAGUE',
    icon: '/images/bikoicon/international.png',
  },
  { id: 4, league: 'SERIE A', icon: '/images/bikoicon/france.png' },
  { id: 5, league: 'PREMIER LEAGUE', icon: '/images/bikoicon/england.png' },
  { id: 6, league: 'LIGUE 1', icon: '/images/bikoicon/france.png' },
  { id: 7, league: 'LALIGA', icon: '/images/bikoicon/spain.png' },
];

export const popularCountries = [
  {
    id: 1,
    country: 'ENGLAND',
    icon: '/images/bikoicon/england.png',
    league_list: [
      { id: 1, league: 'ALL', total: 23 },
      { id: 2, league: 'Euroleague', total: 9 },
      { id: 3, league: 'Euroleague', total: 9 },
    ],
  },
  {
    id: 2,
    country: 'FRANCE',
    icon: '/images/bikoicon/france.png',
    league_list: [
      { id: 1, league: 'ALL', total: 23 },
      { id: 2, league: 'Euro League', total: 9 },
      { id: 3, league: 'United League', total: 9 },
    ],
  },
];
