import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ProductResolver } from 'src/graphql/resolvers/product.resolver';
import { ProductClient } from 'src/grpc/clients/product.client';

@Global()
@Module({
  imports: [

    ClientsModule.register([
      {
        name: 'Product_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/product.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  

  ],
  providers: [ProductResolver, ProductClient],
  exports: [ProductClient],
})
export class ProductModule {}