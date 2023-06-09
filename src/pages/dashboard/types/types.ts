export type testingConstants = {
  rootUrl: string;
  numOfThreads: number;
  testDuration: number;
  numOfUsers: number;
  throughput: number;
};

export type params = {
  route: string;
  method: 'GET' | 'POST';
  body?: string;
  contentType: 'application/json';
  ratio: number;
};

export type methods = params[];