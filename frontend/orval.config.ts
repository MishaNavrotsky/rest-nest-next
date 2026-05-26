module.exports = {
  'nestjs-api': {
    input: {
      target: 'http://localhost:3000/docs-json', 
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      clean: true,
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
};