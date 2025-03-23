import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCode } from "../types/Code";
import {
  fetchCodes,
  createCode,
  updateCode as updateCodeAPI,
  deleteCode,
} from "../api/api-client";
import { CODES_QUERY_KEY } from "../shared/const";

export const useCodeStore = () => {
  const queryClient = useQueryClient();

  // fetch
  const { data: codes = [], isLoading: isFetching } = useQuery({
    queryKey: [CODES_QUERY_KEY],
    queryFn: fetchCodes,
  });

  // add
  const addCodeMutation = useMutation({
    mutationFn: (newCodeData: {
      newName: string;
      code: string;
      desc: string;
      categories: string[];
      ownerId: string;
    }) => {
      return createCode({
        name: newCodeData.newName,
        code: newCodeData.code,
        desc: newCodeData.desc,
        categories: newCodeData.categories,
        ownerId: newCodeData.ownerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CODES_QUERY_KEY] });
    },
  });

  // update
  const updateCodeMutation = useMutation({
    mutationFn: ({ code, ownerId }: { code: TCode; ownerId: string }) =>
      updateCodeAPI(code, ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CODES_QUERY_KEY] });
    },
  });

  // remove
  const removeCodeMutation = useMutation({
    mutationFn: ({ id, ownerId }: { id: string; ownerId: string }) =>
      deleteCode(id, ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CODES_QUERY_KEY] });
    },
  });

  return {
    codes,
    addCode: async (data: {
      newName: string;
      code: string;
      desc: string;
      categories: string[];
      ownerId: string;
    }) => {
      return addCodeMutation.mutateAsync(data);
    },
    updateCode: async ({ code, ownerId }: { code: TCode; ownerId: string }) => {
      return updateCodeMutation.mutateAsync({ code, ownerId });
    },
    removeCode: async ({ id, ownerId }: { id: string; ownerId: string }) => {
      return removeCodeMutation.mutateAsync({ id, ownerId });
    },
    isLoading:
      isFetching ||
      addCodeMutation.isPending ||
      updateCodeMutation.isPending ||
      removeCodeMutation.isPending,
  };
};
