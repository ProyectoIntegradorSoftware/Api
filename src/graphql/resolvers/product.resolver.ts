import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductClient } from '../../grpc/clients/product.client';
import { ProductModel } from '../models/product.model';
import { CreateProductInput,  UpdateProductInput,  } from '../models/inputs';
import { CreateProductRequest, UpdateProductRequest } from 'src/grpc/interfaces/product.dto';
import { RespuestaEliminacion } from '../models/salidas';

import { Observable, catchError, map } from 'rxjs';



@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private productClient: ProductClient) {}


  @Query(() => ProductModel)
  async getProduct(@Args('id') id: string): Promise<ProductModel> {
    const response = await this.productClient.getProduct({ id }).toPromise();
    return this.transformProductResponse(response);
  }
 

  @Query(() => [ProductModel])
  listProducts(): Observable<ProductModel[]> {
    return this.productClient.listProducts({}).pipe(
      map((response) => response.products.map(product => this.transformProductResponse(product))),
      catchError((error) => {
        console.log('Error al listar Productos', error);
        throw new Error('Error al listar los Productos');
      }),
    );
  }

  @Mutation(() => ProductModel)
  createProduct(@Args('createProductInput') input: CreateProductInput): Observable<ProductModel> {
    const request: CreateProductRequest = { 
      nombre: input.nombre,
      sku: input.sku,
      precio: input.precio,
      descripcion: input.descripcion,
    };

    return this.productClient.createProduct(request).pipe(
      map((response) => this.transformProductResponse(response)),
      catchError((error) => {
        console.log('Error al crear Producto', error);
        throw new Error('Error al crear el Producto');
      }),
    );
  }

  @Mutation(() => ProductModel)
  updateProduct(@Args('updateProductInput') input: UpdateProductInput): Observable<ProductModel> {
    const request: UpdateProductRequest = {
      id: input.id,
      nombre: input.nombre ?? undefined,
      sku: input.sku ?? undefined,
      precio: input.precio ?? undefined,
      descripcion: input.descripcion ?? undefined,
    };

    return this.productClient.updateProduct(request).pipe(
      map((response) => this.transformProductResponse(response)),
      catchError((error) => {
        console.log('Error al actualizar Producto', error);
        throw new Error('Error al actualizar el Producto');
      }),
    );
  }

  


  @Mutation(() => RespuestaEliminacion)
  deleteProduct(@Args('id') id: string): Observable<RespuestaEliminacion> {
    return this.productClient.deleteProduct({ id }).pipe(
      map((response) => this.transformEliminacionRespuesta(response)),
      catchError((error) => {
        console.log('Error al eliminar Producto', error);
        throw new Error('Error al eliminar el Producto');
      }),
    );
  }



  

  private transformProductResponse(response: any): ProductModel {
    if(!response){
      throw new Error('No se encontró el Producto');
    }
    console.log("response", response.nombre);
    console.log("response", response.sku);
    console.log("response", response.precio);
    console.log("response", response.descripcion);
    return {
      id: response.id,
      nombre: response.nombre,
      sku: response.sku,
      precio: response.precio,
      descripcion: response.descripcion
    };
  }

  private transformEliminacionRespuesta(response: any): RespuestaEliminacion {
    return {
      mensaje: response.mensaje,
        };
  }


}