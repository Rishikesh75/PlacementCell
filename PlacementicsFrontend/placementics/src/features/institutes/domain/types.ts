export interface College {
  id: string;
  name: string;
  address: string | null;
  contact: string | null;
  imageFileName: string | null;
  imageUrl: string | null;
  verifiedStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Institute {
  id: number;
  shortName: string;
  name: string;
  location: string;
  alumni: string;
  recruiters: string;
  placement: string;
}

export interface CreatedInstitute extends Institute {
  tpoName: string;
  tpoEmail: string;
  createdOn: string;
}
