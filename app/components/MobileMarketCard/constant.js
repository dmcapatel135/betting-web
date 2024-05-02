export const marketDummyData = [
  {
    sportId: 1,
    previewMarket: [
      {
        id: 1,
        name: '1x2',
        groups: ['all', 'score', 'regular_play'],
        status: 1,
        producerId: 3,
        outcomes: [
          {
            id: '1',
            odds: '-',
            probabilities: 0.383522,
            active: 1,
            name: 'Taraz',
          },
          {
            id: '2',
            odds: '-',
            probabilities: 0.264233,
            active: 1,
            name: 'draw',
          },
          {
            id: '3',
            odds: '-',
            probabilities: 0.352239,
            active: 1,
            name: 'Akzhaiyk Uralsk',
          },
        ],
      },
      {
        id: 29,
        name: 'Both teams to score',
        groups: ['all', 'score', 'regular_play'],
        status: 1,
        producerId: 3,
        outcomes: [
          {
            id: '74',
            odds: 1.64,
            probabilities: 0.557231,
            active: 1,
            name: 'yes',
          },
          {
            id: '76',
            odds: 2.01,
            probabilities: 0.442769,
            active: 1,
            name: 'no',
          },
        ],
      },
      {
        id: 18,
        name: 'Total',
        groups: ['all', 'score', 'regular_play'],
        status: 1,
        favourite: 1,
        specifiers: ['total=2.5'],
        producerId: 3,
        outcomes: [
          {
            id: '12',
            odds: 1.78,
            probabilities: 0.512292,
            active: 1,
            name: 'over 2.5',
          },
          {
            id: '13',
            odds: 1.86,
            probabilities: 0.487708,
            active: 1,
            name: 'under 2.5',
          },
        ],
      },
    ],
  },
];
