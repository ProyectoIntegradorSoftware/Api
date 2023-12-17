
import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductRequest, CreateProductResponse, DeleteProductRequest, DeleteProductResponse, GetProductRequest, GetProductResponse, ListProductsRequest, ListProductsResponse, UpdateProductRequest, UpdateProductResponse } from 'src/grpc/interfaces/product.dto';

interface ProductGrpcService {
  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
  getProduct(request: GetProductRequest): Observable<GetProductResponse>;
  updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>;
  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse>;
  listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
}

@Injectable()
export class ProductService {
  private ProductGrpcService: ProductGrpcService;

  constructor(@Inject('Product_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ProductGrpcService = this.client.getService<ProductGrpcService>('ProductService');
  }

  createProduct(data: CreateProductRequest): Observable<CreateProductResponse> {
    
    return this.ProductGrpcService.createProduct(data);
  }

  updateProduct(data: UpdateProductRequest): Observable<UpdateProductResponse> {
    return this.ProductGrpcService.updateProduct(data);
  }

  deleteProduct(data: DeleteProductRequest): Observable<DeleteProductResponse> {
    return this.ProductGrpcService.deleteProduct(data);
  }

  getProduct(data: GetProductRequest): Observable<GetProductResponse> {
    return this.ProductGrpcService.getProduct(data);
  }

  listProducts(data: ListProductsRequest): Observable<ListProductsResponse> {
    return this.ProductGrpcService.listProducts(data);
  }
}