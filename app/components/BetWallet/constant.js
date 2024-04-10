export const dummyMarketData = [
  {
    id: 1,
    name: '1x2',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '1',
        odds: 1.7,
        probabilities: 0.5602278123,
        active: 1,
        name: 'Everton',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '2',
        odds: 3.35,
        probabilities: 0.2744836986,
        active: 1,
        name: 'draw',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '3',
        odds: 5.5,
        probabilities: 0.1652884878,
        active: 1,
        name: 'Newcastle',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
  {
    id: 10,
    name: 'Double chance',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '9',
        odds: 1.16,
        probabilities: 0.8347115109,
        active: 1,
        name: 'Everton or draw',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '10',
        odds: 1.3,
        probabilities: 0.7255163001,
        active: 1,
        name: 'Everton or Newcastle',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '11',
        odds: 2.15,
        probabilities: 0.4397721864,
        active: 1,
        name: 'draw or Newcastle',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
  {
    id: 11,
    name: 'Draw no bet',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '4',
        odds: 1.25,
        probabilities: 0.7721781195,
        active: 1,
        name: 'Everton',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '5',
        odds: 3.85,
        probabilities: 0.2278218805,
        active: 1,
        name: 'Newcastle',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
  {
    id: 26,
    name: 'Odd/even',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '70',
        odds: 1.95,
        probabilities: 0.4818698275,
        active: 1,
        name: 'odd',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '72',
        odds: 1.8,
        probabilities: 0.5181301725,
        active: 1,
        name: 'even',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
  {
    id: 29,
    name: 'Both teams to score',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '74',
        odds: 2.3,
        probabilities: 0.4029011678,
        active: 1,
        name: 'yes',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '76',
        odds: 1.6,
        probabilities: 0.597098831,
        active: 1,
        name: 'no',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
  {
    id: 31,
    name: 'Everton clean sheet',
    groups: ['all', 'score', 'regular_play'],
    outcomes: [
      {
        id: '74',
        odds: 1.9,
        probabilities: 0.4918779079,
        active: 1,
        name: 'yes',
        market: {
          favourite: 1,
          status: 1,
        },
      },
      {
        id: '76',
        odds: 1.85,
        probabilities: 0.5081220908,
        active: 1,
        name: 'no',
        market: {
          favourite: 1,
          status: 1,
        },
      },
    ],
  },
];

export const dummyShareData = [
  {
    id: '1c0f1ebe-7247-4613-8e42-9f8b686c8202',
    code: 'MES4F2UN',
    market: '1x2',
    marketId: 1,
    specifiers: null,
    outcome: 'Everton',
    outcomeId: '1',
    eventId: 23204189,
  },
];
