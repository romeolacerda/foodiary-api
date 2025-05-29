import { APIGatewayProxyEventV2 } from "aws-lambda";

export function lambdaBodyPerser(body: APIGatewayProxyEventV2['body']){
  try{
    if (!body){
      return {}
    }

    return JSON.parse(body)
  } catch {
    throw new Error('Malformed body')
  }
}
