import { BusinessImage, Patient, User, Service } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';


// export const get = async (doctorId: number): Promise<SettingsDTO[]> => {
//   return (await axiosInstance.get<SettingsDTO[]>(ApiRoutes.GET_SETTINGS, { params: { doctorId} }))
//     .data;
// };
