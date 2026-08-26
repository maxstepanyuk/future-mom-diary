import axios from 'axios';

export function logErrorResponse(
  errorObj: unknown
): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(
    `${green}➤ ${yellow}Error Response:${reset}`
  );

  if (axios.isAxiosError(errorObj)) {
    console.log(
      'URL:',
      errorObj.config?.url
    );

    console.log(
      'METHOD:',
      errorObj.config?.method
    );

    console.log(
      'STATUS:',
      errorObj.response?.status
    );

    console.log(
      'DATA:',
      errorObj.response?.data
    );

    return;
  }

  console.dir(errorObj, {
    depth: null,
    colors: true,
  });
}