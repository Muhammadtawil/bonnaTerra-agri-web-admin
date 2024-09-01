
export interface CategoryInetrface {
    id: string;
    categoryName:string,
    categoryArabicName:string,
    categoryDescription: string,
    products: ProductInterface[];
  }
  

  export interface ProductInterface {
    id: string;
    productName: string;
    productArabicName: string;
    description: string;
    productImageUrl: string;
    price: number;
    startMonth: number;
    endMonth: number;
    categoryId:string ;
    isStock: boolean;
    draft: boolean;
  }

  export interface GetProductInterface {
    id: string;
    productName: string;
    productArabicName: string;
    description: string;
    productImageUrl: string;
    price: number;
    startMonth: number;
    endMonth: number;
    category: CategoryInetrface;
    isStock: boolean;
    draft: boolean;
  }

export interface SubscriberInterface{
  id: string;
  subscriberEmail: string;
  subscriberName: string;
} 
  
export interface TestimonialInterface{
  testimonialId: string;
  senderName: string;
  senderPosition: string;
  testimonialContent: string;
  senderImageUrl: string;
  isFlag: boolean;

}

export interface SellerInterFace{
  id: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerWebsite: string;
  sellerOffer: string;
  sellerAddress: string;


}


export interface CustomerInteface{
  id: string;
  customerName: string;
  customerJob: string;
  customerPhone: string;
  customerAge: number;
  customerEmail: string;
  nationality: string;
  address: string;
  customerNotes: string;
  createdAt: Date;
  
}


export interface GetCustomerInteface{
  id: string;
  customerName: string;
  customerJob: string;
  customerPhone: string;
  customerAge: number;
  customerEmail: string;
  nationality: string;
  address: string;
  customerNotes: string;
  createdAt: Date;
  preferredProducts: ProductInterface[];
}

  export const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];