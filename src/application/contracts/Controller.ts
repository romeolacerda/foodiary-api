import { getSchema } from '@kernel/decorators/schema';

type TRouteType = 'public' | 'private';

export abstract class Controller<Ttype extends TRouteType, TBody = undefined> {
  protected abstract handle(
    request: Controller.Request<Ttype>,
  ): Promise<Controller.Response<TBody>>;

  public execute(
    request: Controller.Request<Ttype>,
  ): Promise<Controller.Response<TBody>> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: Controller.Request<Ttype>['body']) {
    const schema = getSchema(this);
    if (!schema) {
      return body;
    }

    return schema.parse(body);
  }
}

export namespace Controller {
  type BaseRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParam = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParam;
  };

  type PublicRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParam = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQueryParam> & {
    accountId: null
  };

  type PrivateRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParam = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQueryParam> & {
    accountId: string
  };

  export type Request<
    Ttype extends TRouteType,
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParam = Record<string, unknown>,
  > = Ttype extends 'public'
    ? PublicRequest<TBody, TParams, TQueryParam>
    : PrivateRequest<TBody, TParams, TQueryParam>

    export type Response<TBody = undefined> = {
      statusCode: number;
      body?: TBody;
    };
}
