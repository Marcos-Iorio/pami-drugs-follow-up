export const fetcher = (value: string) =>
  fetch(value).then((res) => res.json());
