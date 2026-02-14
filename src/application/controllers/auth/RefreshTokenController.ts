import { Controller } from '@application/contracts/Controller';
import { RefreshTokenUseCase } from '@application/usecases/auth/RefreshTokenUseCase';
import { Schema } from '@kernel/decorators/schema';
import { Injectable } from '@kernel/di/Injectable';
import {
  RefreshTokenBody,
  refreshTokenSchema,
} from './schemas/refreshTokenSchema';

@Injectable()
@Schema(refreshTokenSchema)
export class RefreshTokenController extends Controller<
  'public',
  RefreshTokenController.Response
> {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<'public', RefreshTokenBody>): Promise<
    Controller.Response<RefreshTokenController.Response>
  > {
    const { refreshToken } = body;

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenUseCase.execute({
        refreshToken,
      });

    return {
      statusCode: 200,
      body: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  };
}
