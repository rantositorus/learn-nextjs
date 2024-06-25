// import Layout from "@/layout";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.log("error => ", err));
  }, []);
  return (
    <>
      <LayoutComponent
        metaTitle="Home"
        metaDescription="Ini adalah halaman beranda"
      >
        <p>Home</p>
        <Image src="/next.png" alt="Next.js Logo" width={200} height={200} />
        <img src="/next.png" alt="Next.js Logo" width={200} height={200} />
      </LayoutComponent>
    </>
  );
}
