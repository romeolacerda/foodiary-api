import { Injectable } from "@kernel/di/Injectable";

@Injectable()
export class CreateMealUseCase{
  async execute(): Promise<any>{
    return {
      CreateMealUseCase: 'create meal'
    }
  }
}

