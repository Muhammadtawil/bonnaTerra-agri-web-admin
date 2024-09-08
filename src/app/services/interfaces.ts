
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

export interface UserInterface{
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: number;
  userBio: string;
  userRole: string;
  userImgUrl: string;
  userFacebookUrl: string;
  userLinkedInUrl: string;
  userTwitterUrl: string;
  userInstagramUrl: string;
  userPosition: string;
  createdAt: Date;
  isTeam: boolean;
  isOnline: boolean;
  startDateExp: Date;
}

export interface GetUsersInfoInterface{
  userId: string;
  userImgUrl: string;
  userName: string;
}

export interface TaskInterface {
  taskId: string;
  taskTitle: string;
  taskStatus: TaskStatusEnum;
  taskPriority: TaskPriorityEnum;
  createdBy: string;
  createdAt: Date;
  taskDeadline?: Date;
  isAssigned:boolean,
  assignedTo?: string[];
  assignedBy: string;
}

export interface AssignedTasksInterface {
  assignedTaskId: string;
  taskId: string;
  taskTitle: string;
  taskStatus: TaskStatusEnum;
  taskPriority: TaskPriorityEnum;
  taskDeadline?: Date;
  assignBy: string;
  createdAt: Date;
  assignedAt: Date;
  assignedTo?: UserInterface[]; // List of users assigned to this task
  tasks?: TaskInterface[]; // List of tasks associated with this assignment
}

export enum TaskStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}

export enum TaskPriorityEnum {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
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