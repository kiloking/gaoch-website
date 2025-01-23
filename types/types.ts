export type WorkFormData = {
  bgimgId?: number | null;
  coverImageId?: number | null;
  title: string;
  year: string;
  location: string;
  description: string;
  address: string;
  area: string;
  units: string;
  floors: string;
  houseTypes: string;
  architect: string;
  company: string;
  ytVideoUrl: string;
  coverImage: ImageType | null;
  bgimg: ImageType | null;
};

//projectFormDataType
export type ProjectFormData = {
  coverImageId?: number | null;
  title: string;
  location: string;
  status: string;
  price: string;
  link: string;
  base: string;
  area: string;
  size: string;
  floors: string;
  household: string;
  design_company: string;
  construction_company: string;
  coverImage: ImageType | null;
};

//statusType
export type ProjectsStatusType = "熱銷中" | "即將開工" | "即將開案";

export type ImageType = {
  url: string;
  id: number;
};
export type Work = WorkFormData & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkUpdateData = Partial<WorkFormData>;

export type WorkCreateInput = Omit<WorkFormData, "ytVideoUrl"> & {
  ytVideoUrl?: string;
};

export type RepairFormData = {
  unit: string;
  contactName: string;
  phone: string;
  content: string;
  images: number[];
  date: string;
  status: string;
  community_code: string;
  community_name: string;
  email: string;
  contact_time: string;
  repair_area: string;
  repair_class: string;
  videoId: number | null;
};

export type Repair = RepairFormData & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RepairStatus = "待處理" | "處理中" | "已完成";

export type RepairListType = {
  id: number;
  status: string;
  date: string;
  unit: string;
  contactName: string;
  phone: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  community_code: string;
  community_name: string;
  email: string;
  contact_time: string;
  repair_area: string;
  repair_class: string;
  videoId?: number | null;
  images: {
    id: number;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
