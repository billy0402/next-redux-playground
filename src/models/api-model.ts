type Timestamp = {
  createAt: Date;
  updateAt: Date;
};

type BaseModel = Timestamp & {
  id: string;
};

export type { BaseModel };
