import { useInfiniteQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useCourses = () => {
  const {
    data: coursesGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PageList<Course, number>>({
    queryKey: ["courses"],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PageList<Course, number>>("/courses", {
        params: {
          cursor: pageParam,
          pageSize: 3,
        },
      });
      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: location.pathname === "/courses",
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((course) => ({
          ...course,
        })),
      })),
    }),
  });

  return {
    coursesGroup,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
