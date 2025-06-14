export const queryFilter = (
  searchParams: URLSearchParams,
  ...params: string[]
): URLSearchParams => {
  const query = new URLSearchParams();
  params.forEach((param) => {
    const value = searchParams.get(param);
    console.log(value);
    if (value !== null) {
      query.append(param, value);
    }
  });
  console.log(query);
  return query;
};
