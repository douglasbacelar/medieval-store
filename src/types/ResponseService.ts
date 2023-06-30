export type ResponseServiceSuccess<T> = {
  status: 'Done!', 
  data: T
};

export type ResponseService<T> = ResponseServiceSuccess<T>;