// import { servicesTableName } from './../../../composables/dynamodb';
// // add Service to favorites
//  export async function createFavoriteItem(body: FavoriteJson) {
//     if (body === undefined || body === null)
//       throw new Error('Body is required for this operation.')
//     if (!body.serviceName)
//       throw new Error('Service Name is required for this operation.')
//     if (!favoritesTableName)
//       throw new Error('FAVORITES_TABLE_NAME is not defined.')
//     if (!body.username)
//       throw new Error('Username is required for this operation.')
     
//     const params: PutItemCommandInput = {
//       TableName: servicesTableName,
//       Item: {
//          PK: { S: `User#${body.username}` },
//          SK: { S: `Service#${body.serviceName}` },
//          ServiceName: { S: body.serviceName },
//          Username: { S: body.username },
//       },
//       ReturnConsumedCapacity: 'TOTAL',
//     }
     
//     try {
//       const command = new PutItemCommand(params)
//       await ddbDocClient.send(command)
//     }
//     catch (err) {
//       console.error('Error', err)
//     }
//      }