import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  
} from '../interfaces/product.dto';

interface IProductService {
  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
  getProduct(request: GetProductRequest): Observable<GetProductResponse>;
  updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>;
  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse>;
  listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
  
}

@Injectable()
export class ProductClient implements OnModuleInit {
  public productService: IProductService;

  constructor(
    @Inject('Product_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productService = this.client.getService<IProductService>('ProductService');
  }

  createProduct(data: CreateProductRequest): Observable<CreateProductResponse> {
    return this.productService.createProduct(data);
  }

  updateProduct(data: UpdateProductRequest): Observable<UpdateProductResponse> {
    return this.productService.updateProduct(data);
  }

  deleteProduct(data: DeleteProductRequest): Observable<DeleteProductResponse> {
    return this.productService.deleteProduct(data);
  }

  listProducts(data: ListProductsRequest): Observable<ListProductsResponse> {
    return this.productService.listProducts(data);
  }

  getProduct(data: GetProductRequest): Observable<GetProductResponse> {
    return this.productService.getProduct(data);
  }

  

}
