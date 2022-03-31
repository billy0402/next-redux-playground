type Timestamp = {
  createAt: Date;
  updateAt: Date;
};

type BaseModel = Timestamp & {
  id: number;
};

export type { BaseModel };
