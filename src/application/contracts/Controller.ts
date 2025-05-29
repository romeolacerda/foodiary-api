
export interface IController<TBody = undefined> {
  handle(params: IController.Request): Promise<IController.Response<TBody>>
}

export namespace IController {
  export type Request<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParam = Record<string, unknown>
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParam
  }

  export type Response<TBody = undefined> = {
    statusCode: number
    body?: TBody
  }


}
