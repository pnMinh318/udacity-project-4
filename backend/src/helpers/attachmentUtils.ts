// import * as AWS from 'aws-sdk'
import { S3 } from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'

// const XAWS = AWSXRay.captureAWS(AWS)

// export default XAWS
// TODO: Implement the fileStogare logic

const PUT_OBJECT_S3 = 'putObject'

export const genPresignedUrl = (todoId: string, userId: string) : string =>{
    const bucket = new S3({signatureVersion: "v4"});
  const presignedUrl = bucket.getSignedUrl(PUT_OBJECT_S3,{
    Bucket: bucket,
    Key: `${todoId + userId}`,
  })
  return presignedUrl
}
