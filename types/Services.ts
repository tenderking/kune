export interface Services {
  Category: { S: string }
  Description: { S: string }
  Address: { S: string }
  ServiceName: { S: string }
  Website: { S: string }
  ImgUrl: { S: string }
  Tags: { L: { S: string }[] }
  ServiceID: { N: string }
}
