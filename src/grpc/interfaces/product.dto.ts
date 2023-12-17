export interface CreateProductRequest {
    nombre: string;
    sku: string;
    precio: string;
    descripcion: string;
  }
  export interface CreateProductResponse {
    id: string;
  }
  
  export interface GetProductRequest {
    id: string;
  }
  
  export interface GetProductResponse {
    
    id: string;
    nombre: string;
    sku: string;
    precio: string;
    descripcion: string
  }
  
  export interface UpdateProductRequest {
    id: string;
    nombre?: string;
    sku?: string;
    precio?: string;
    descripcion?:string
  }
  
  export interface UpdateProductResponse {
    id: string;
    nombre: string;
    sku: string;
    precio: string;
    descripcion:string
  }
  
  export interface DeleteProductRequest {
    id: string;
  }
  
  export interface DeleteProductResponse {
    mensaje: string;
  }
  export interface ListProductsRequest {}
  export interface ListProductsResponse {
    products: Product[];
  }
 

  export interface LogoutProductRequest {
    productID: string;
  }
  export interface LogoutProductResponse {
    mensaje: string;
  }
  
  
  
  export interface Product {
    id: string;
    nombre: string;
    sku: string;
    precio: string;
    descripcion:string
  }