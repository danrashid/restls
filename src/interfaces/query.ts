export type comparable = number | string | boolean | symbol | null | undefined;

export interface IQuery {
  [key: string]: comparable;
}
