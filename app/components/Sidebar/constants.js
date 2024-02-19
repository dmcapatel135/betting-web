import { images } from '@utils/images';

export const navigations = [
  {
    icon: images.homeIcon,
    active_icon: images.homeIconActive,
    title: 'HOME',
    path: '/dashboard',
  },
  //   { icon: '/images/portfolio.png', title: 'Portfolio', path: 'portfolio' },
  //   { icon: '/images/wallet6.png', title: 'Wallet', path: 'wallet' },
  {
    icon: images.liveNowIcon,
    active_icon: images.liveNowIconActive,
    title: 'LIVE NOW',
    path: '/dashboard/live-now',
  },
  {
    icon: images.upcomingIcon,
    active_icon: images.upcomingIconActive,
    title: 'UPCOMING',
    path: '/dashboard/upcoming',
  },
  // {
  //   icon: images.virtualsportIcon,
  //   active_icon: images.virtualsportIconActive,
  //   title: 'VIRTUAL SPORTS',
  //   path: 'virtual-sport',
  // },
  {
    icon: images.jackpotIcon,
    active_icon: images.jackpotIconActive,
    title: 'JACKPOT',
    path: '/dashboard/jackpot',
  },
  {
    icon: images.popularIcon,
    active_icon: images.upcomingIconActive,
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
