import { useCallback, useState } from "react";

const GRAPHQL_BASE_URL = import.meta.env.VITE_GRAPHQL_BASE_URL;

interface GraphQLResponse<T> {
  data?: T;
  errors?: {
    message: string;
  };
}

export const useGraphQL = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async <TData, TVariables = Record<string, unknown>>(
      query: string,
      variables?: TVariables,
    ): Promise<TData> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(GRAPHQL_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        const result: GraphQLResponse<TData> = await response.json();

        if (result.errors?.length) {
          throw new Error(result.errors[0].message);
        }

        if (!response.ok) {
          throw new Error("GraphQL request failed");
        }

        return result.data as TData;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setError(message);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    execute,
    loading,
    error,
  };
};
