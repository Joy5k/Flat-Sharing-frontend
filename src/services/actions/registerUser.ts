"use server";

export const registerUser = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-user`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
