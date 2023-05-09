export const handleFetch = async ({ url = "" }) => {
  if (url === "") return new Error("Invalid URL");
  try {
    const response = await fetch(url);
    const data = await response.json();
    const res = data.res;
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error del fetch: ", error);
    return error;
  }
};
