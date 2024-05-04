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
            odds: '-',
            probabilities: 0.557231,
            active: 1,
            name: 'yes',
          },
          {
            id: '76',
            odds: '-',
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
            odds: '-',
            probabilities: 0.512292,
            active: 1,
            name: 'over 2.5',
          },
          {
            id: '13',
            odds: '-',
            probabilities: 0.487708,
            active: 1,
            name: 'under 2.5',
          },
        ],
      },
    ],
  },
  {
    sportId: 2,
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
            probabilities: 0.636089,
            active: 1,
            name: 'Rizing Zephyr',
          },
          {
            id: '2',
            odds: '-',
            probabilities: 0.0579909,
            active: 1,
            name: 'draw',
          },
          {
            id: '3',
            odds: '-',
            probabilities: 0.30592,
            active: 1,
            name: 'Yamagata',
          },
        ],
      },
    ],
  },
  {
    sportId: 10,
    previewMarket: [
      {
        id: 186,
        name: 'Winner',
        groups: ['all', 'score', 'regular_play'],
        status: 1,
        producerId: 3,
        outcomes: [
          {
            id: '4',
            odds: '-',
            probabilities: 0.309019,
            active: 1,
            name: 'Sakai, Shoki',
          },
          {
            id: '5',
            odds: '-',
            probabilities: 0.690985,
            active: 1,
            name: 'Toyoshima, Ryota',
          },
        ],
      },
    ],
  },
  {
    sportId: 12,
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
            probabilities: 0.423234,
            active: 1,
            name: 'Ireland',
          },
          {
            id: '2',
            odds: '-',
            probabilities: 0.0549035,
            active: 1,
            name: 'draw',
          },
          {
            id: '3',
            odds: '-',
            probabilities: 0.521861,
            active: 1,
            name: 'Fiji',
          },
        ],
      },
    ],
  },
  {
    sportId: 21,
    previewMarket: [
      {
        id: 340,
        name: 'Winner (incl. super over)',
        groups: ['all', 'score', 'incl_so'],
        status: 1,
        producerId: 3,
        outcomes: [
          {
            id: '4',
            odds: 1.71,
            probabilities: 0.546176,
            active: 1,
            name: 'Royal Challengers Bengaluru',
          },
          {
            id: '5',
            odds: 2.02,
            probabilities: 0.45383,
            active: 1,
            name: 'Gujarat Titans',
          },
        ],
      },
    ],
  },
  {
    sportId: 5,
    previewMarket: [
      {
        id: 186,
        name: 'Winner',
        groups: ['all', 'score', 'regular_play'],
        status: 1,
        producerId: 3,
        outcomes: [
          {
            id: '4',
            odds: '-',
            probabilities: 0.83687,
            active: 1,
            name: 'Wqf1',
          },
          {
            id: '5',
            odds: '-',
            probabilities: 0.163134,
            active: 1,
            name: 'Wqf2',
          },
        ],
      },
      {
        id: 202,
        name: '2nd set - winner',
        groups: ['all', 'score', 'set'],
        status: 1,
        specifiers: ['setnr=2'],
        producerId: 3,
        outcomes: [
          {
            id: '4',
            odds: '-',
            probabilities: 0.7918716788618,
            active: 1,
            name: 'Wqf1',
          },
          {
            id: '5',
            odds: '-',
            probabilities: 0.2081309171702596,
            active: 1,
            name: 'Wqf2',
          },
        ],
      },
      {
        id: 202,
        name: '1st set - winner',
        groups: ['all', 'score', 'set'],
        status: 1,
        favourite: 1,
        specifiers: ['setnr=1'],
        producerId: 3,
        outcomes: [
          {
            id: '4',
            odds: '-',
            probabilities: 0.7818,
            active: 1,
            name: 'Wqf1',
          },
          {
            id: '5',
            odds: 3.85,
            probabilities: 0.2182,
            active: '-',
            name: 'Wqf2',
          },
        ],
      },
    ],
  },
];
