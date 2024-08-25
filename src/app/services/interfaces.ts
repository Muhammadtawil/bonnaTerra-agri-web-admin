export interface CategoryInetrface {
    id: string;
    categoryName:string,
    categoryArabicName:string,
    categoryDescription: string,
    products: Product[];
  }
  

  export interface Product {
    id: string;
    productName: string;
    productArabicName: string;
    description: string;
    productImageUrl: string;
    price: number;
    startMonth: number;
    endMonth: number;
    categoryId: string; 
    isStock: boolean;
    draft: boolean;
  }