
import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class CreateUserInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  contrasena: string;
}

@InputType()
export class CreateProductInput {
  @Field()
  nombre: string;

  @Field()
  sku: string;

  @Field()
  precio: string;

  @Field()
  descripcion: string;

  
}


@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  apellido?: string;

  @Field({ nullable: true })
  correo?: string;

}

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({nullable: true })
  sku?:string;

  @Field({ nullable: true })
  precio?: string;

  @Field({ nullable: true })
  descripcion?: string;

}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  correo: string;

  @Field()
  contrasena: string;
}
export class DeleteProductInput {
  @Field(() => ID)
  id: string;
}