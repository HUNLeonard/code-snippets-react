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
    mutationFn: updateCodeAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CODES_QUERY_KEY] });
    },
  });

  // remove
  const removeCodeMutation = useMutation({
    mutationFn: deleteCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CODES_QUERY_KEY] });
    },
  });

  return {
    codes,
    addCode: (data: {
      newName: string;
      code: string;
      desc: string;
      categories: string[];
      ownerId: string;
    }) => addCodeMutation.mutate(data),
    updateCode: (code: TCode) => updateCodeMutation.mutate(code),
    removeCode: (id: string) => removeCodeMutation.mutate(id),
    isLoading:
      isFetching ||
      addCodeMutation.isPending ||
      updateCodeMutation.isPending ||
      removeCodeMutation.isPending,
  };
};
