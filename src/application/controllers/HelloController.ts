import { Controller } from "@application/contracts/Controller";
import { HelloBody, helloSchema } from "./schemas/helloSchema";
import { Schema } from "@kernel/decorators/schema";
import { HelloUseCase } from "src/usecases/HelloUseCase";


@Schema(helloSchema)
export class HelloController extends Controller<unknown> {

  constructor(private readonly helloUseCase: HelloUseCase) {
    super()
  }

  protected override async handle(request: Controller.Request<HelloBody>): Promise<Controller.Response<unknown>> {
    const result = await this.helloUseCase.execute({
      email: request.body.email
    })

    return {
      statusCode: 200,
      body: {
        result
      }
    }
  }
}
