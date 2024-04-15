
export const errorFormatter = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.data?.message ||
      error?.response?.data?.data?.error ||
      error?.message ||
      "Something went wrong";
  
    return message;
  };