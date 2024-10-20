import { Patient } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const search = async (query: string, doctorId: number): Promise<Patient[]> => {
  return (await axiosInstance.get<Patient[]>(ApiRoutes.SEARCH_PATIENTS, { params: { query, doctorId} }))
    .data;
};
