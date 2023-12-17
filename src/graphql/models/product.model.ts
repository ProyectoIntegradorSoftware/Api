import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  sku: string;


  @Field()
  precio: string; 
  
  @Field()
  descripcion: string;

}