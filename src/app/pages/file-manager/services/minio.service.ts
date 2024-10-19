import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import { CreateBucketCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
@Injectable({
  providedIn: 'root'
})
export class MinioService {

  private _bucketName: string;
  private readonly _endpoint: string;
  private readonly _port: number;
  private _useSsl: boolean;
  private readonly _accessKey: string;
  private readonly _secretKey: string;

  constructor() {
    this._bucketName = environment.minio.minio_s3_bucket_name;
    this._endpoint = environment.minio.minio_s3_endpoint;
    this._port = +environment.minio.minio_s3_port;
    this._useSsl = environment.minio.minio_s3_use_ssl;
    this._accessKey = environment.minio.minio_s3_access_key;
    this._secretKey = environment.minio.minio_s3_secret_key;
  }

  public getMetadata() {
    return {
      'Content-Type': 'application/octet-stream'
    }
  }

  private getMinioClient() {
    return new S3Client({
      region:"us-west-2",
      endpoint:this._endpoint,
      credentials:{
        accessKeyId: this._accessKey,
        secretAccessKey: this._secretKey,
      }
    })
  }

  public  async getBucketList() {
    const client = new S3Client({
      region:"us-west-2",
      endpoint:this._endpoint,
      credentials:{
        accessKeyId: this._accessKey,
        secretAccessKey: this._secretKey,
      }
    });
    const bucketName = "testbucket";
   var test= await client.send(
      new ListBucketsCommand({
      })
    );

    console.log(test)



}






    // const input =  {
    //   "Bucket": "examplebucket",
    //   "CreateBucketConfiguration": {
    //     "LocationConstraint": "eu-west-1"
    //   }
    // };
    // const command = new CreateBucketCommand(input);
    // const response = await getmin .send(command);


}
