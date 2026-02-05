import React from "react";
import { useLoaderData } from "react-router-dom";

const Github = () => {
  const data = useLoaderData();

  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl flex flex-col items-center">
      <img
        src={data.avatar_url}
        alt=""
        className="w-48 h-48 mx-auto rounded-full"
      />
      <p>Github followers:{data.followers}</p>
      <p>Github name:{data.name}</p>
    </div>
  );
};

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/ARYANKAWALE");
  return response.json();
};