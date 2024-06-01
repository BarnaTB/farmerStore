interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

async function paginate<T>(
  model: any,
  query: Record<string, any> = {},
  { page, itemsPerPage }: PaginationParams,
  relations?: string[] 
): Promise<PaginatedResult<T>> {
  const offset = (page - 1) * itemsPerPage;

  let includeOptions: { include?: Record<string, boolean> } = {}; 

  if (relations && Array.isArray(relations) && relations.length > 0) {
    includeOptions.include = {};
    relations.forEach(relation => {
      includeOptions.include![relation] = true;
    });
  }

  const [data, totalCount] = await Promise.all([
    model.findMany({
      where: { ...query },
      skip: offset,
      take: itemsPerPage,
      ...includeOptions,
    }),
    model.count({ where: { ...query } }),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return {
    data,
    currentPage: page,
    totalPages,
    totalCount,
  };
}

export default paginate;
