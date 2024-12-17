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

export type ImageType = {
  url: string;
  id: number;
};
export type Work = WorkFormData & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

// 如果需要部分欄位可選的類型
export type WorkUpdateData = Partial<WorkFormData>;

// 如果需要特定欄位必填的類型
export type WorkCreateInput = Omit<WorkFormData, "ytVideoUrl"> & {
  ytVideoUrl?: string;
};

export type RepairFormData = {
  type: "公設" | "非公設";
  unit: string;
  contactName: string;
  phone: string;
  content: string;
  images: number[];
  date: string;
  status: string;
};

export type Repair = RepairFormData & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RepairType = "公設" | "非公設";

export type RepairStatus = "待處理" | "處理中" | "已完成";

export type RepairListType = {
  id: number;
  type: string;
  status: string;
  date: string;
  unit: string;
  contactName: string;
  phone: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  images: {
    id: number;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
