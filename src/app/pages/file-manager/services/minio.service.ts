import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
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
    return new AWS.S3({
      accessKeyId: this._accessKey,
      secretAccessKey: this._secretKey,
      endpoint: `${this._endpoint}:${this._port}`,
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      s3BucketEndpoint: true
    })
  }

  public getBucketList() {
    let minioClient = this.getMinioClient();
    return minioClient.listBuckets((err, data) => {
      if (err) console.error(err, err.stack);
      else
        console.log('bucket list:', data);
    })
  }

}
