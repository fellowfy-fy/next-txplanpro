import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

interface DeletePlanResponse {
  message?: string;
  error?: string;
}

// export const search = async (query: string, doctorId: number): Promise<Patient[]> => {
//   return (await axiosInstance.get<Patient[]>(ApiRoutes.SEARCH_PATIENTS, { params: { query, doctorId } }))
//     .data;
// };

export const deleteId = async (planId: number): Promise<DeletePlanResponse> => {
  return (await axiosInstance.delete(ApiRoutes.DELETE_PLAN, { params: { planId } })).data;
}
