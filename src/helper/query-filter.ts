export const queryFilter = (
  searchParams: URLSearchParams,
  ...params: string[]
): URLSearchParams => {
  const query = new URLSearchParams();
  params.forEach((param) => {
    const value = searchParams.get(param);
    if (value !== null) {
      query.append(param, value);
    }
  });
  return query;
};
