// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // res.status(200).json({ name: "John Doe" });
  try {
    const respnse = await (await fetch("https://dummyjson.com/users")).json();
    res.status(200).json({ ...respnse });
  } catch (error) {
    console.log("error => ", error);
  }
}
