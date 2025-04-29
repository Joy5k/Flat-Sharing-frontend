import { USER_ROLE } from "@/contants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { z } from "zod";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path?: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  children?: DrawerItem[]; 
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const Gender = ["MALE", "FEMALE"];



export const createFlatSchema = z.object({
  location: z.string({
    required_error: "location is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  rentAmount: z.preprocess(
    (val) => typeof val === 'string' ? parseFloat(val) : val,
    z.number().min(0, { message: "Rent amount must be greater than or equal to 0!" })
  ),
  bedrooms: z.preprocess(
    (val) => typeof val === 'string' ? parseInt(val, 10) : val,
    z.number().min(1, { message: "Bedrooms must be a positive integer!" })
  ),
  amenities: z.array(
    z.string({
      required_error: "Minimum 1 amenities is required!",
    })
  ),
  photos: z
    .array(
      z
        .string({
          required_error: "Multiples Photos are needed!",
        })
        .url()
    )
    .optional(),
});

export  type TFlatFormValues = z.infer<typeof createFlatSchema>;
