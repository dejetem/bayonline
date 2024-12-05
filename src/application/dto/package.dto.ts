export interface CreatePackageDTO {
    name: string;
    description: string;
    price: number;
    expirationDate: Date;
  }
  
  export interface UpdatePackageDTO {
    name?: string;
    description?: string;
    price?: number;
  }
  