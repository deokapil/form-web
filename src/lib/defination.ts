type CollegeType = {
  id: number;
  name: string | null;
  logo: string | null;
  slug: string | null;
  collegeUrl: string | null;
};

type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };

type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

type UploadError = {
  code: string;
  message: string;
  data: any;
};

type CandRet = {
  id: number;
};
