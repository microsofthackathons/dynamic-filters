import { rest } from 'msw';

export const handlers = [
  // Handles a GET /user request
  rest.get('/api/filters', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'filter1',
          displayName: 'Filter 1',
          options: [
            {
              value: 'filter1_1',
              text: 'Filter 1 - 1',
              selected: true,
            },
            {
              value: 'filter1_2',
              text: 'Filter 1 - 2',
            },
            {
              value: 'filter1_3',
              text: 'Filter 1 - 3',
            },
          ],
          service: null,
          dependencies: null,
        },
        {
          name: 'filter2',
          displayName: 'Filter 2',
          options: [
            {
              value: 'filter2_1',

              text: 'Filter 2 - 1',
            },
            {
              value: 'filter2_2',
              text: 'Filter 2 - 2',
            },
            {
              value: 'filter2_3',
              text: 'Filter 2 - 3',
            },
          ],
          service: null,
          dependencies: null,
        },
        {
          name: 'filter3',
          displayName: 'Filter 3',
          options: null,
          multiSelect: true,
          service: '/api/filters/filter3',
          dependencies: ['filter2'],
        },
      ])
    );
  }),
  rest.post('/api/filters/filter3', async (req, res, ctx) => {
    const body = await req.json();

    return res(
      ctx.status(200),
      ctx.json([
        {
          value: `filter3_1_${body[0].name}`,
          text: `Filter 3 - 1 ${body[0].value}`,
        },
        {
          value: `filter3_2_${body[0].name}`,
          text: `Filter 3 - 2 ${body[0].value}`,
        },

        {
          value: `filter3_3_${body[0].name}`,
          text: `Filter 3 - 3 ${body[0].value}`,
        },
      ])
    );
  }),
];
