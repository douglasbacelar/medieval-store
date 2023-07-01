type StatusOk = 201 | 200;
type StatusError = 400 | 404 | 401 | 500 ;

export type ResponseServiceSuccess<T> = {
  status: StatusOk | StatusError,
  data: T
};

export type ResponseService<T> = ResponseServiceSuccess<T>;