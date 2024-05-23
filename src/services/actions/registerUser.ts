"use server";

export const registerUser = async (data: any) => {
  console.log(data,"in register user")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-user`,
    {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
