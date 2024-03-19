import { images } from '@utils/images';

export const navigations = [
  {
    icon: images.homeIcon,
    active_icon: images.homeIconActive,
    state: true,
    title: 'HOME',
    path: '/',
    id: 2,
  },
  {
    icon: images.liveNowIcon,
    active_icon: images.liveNowIconActive,
    state: true,
    title: 'NOW',
    path: '/dashboard/live-now',
    id: 4,
  },
  {
    icon: images.upcomingIcon,
    active_icon: images.upcomingIconActive,
    title: 'UPCOMING',
    state: true,
    path: '/dashboard/upcoming',
    id: 3,
  },
  {
    icon: images.jackpotIcon,
    active_icon: images.jackpotIconActive,
    title: 'JACKPOT',
    state: false,
    path: '/dashboard/jackpot',
    id: 5,
  },
  {
    icon: images.popularIcon,
    active_icon: images.popularIconActive,
    title: 'POPULAR',
    state: true,
    path: '/dashboard/popular',
    id: 1,
  },
  {
    icon: '/images/bikoicon/how-to-play.svg',
    active_icon: '/images/bikoicon/how-to-play-active.svg',
    title: 'HOW TO PLAY',
    state: false,
    path: '/dashboard/how-to-play',
    id: 8,
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
