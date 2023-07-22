"use client";

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";
import ApiAlert from "@/components/ui/api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

type ApiEntity = {
  title: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  state: "public" | "admin";
  url: string;
};

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  const API_LIST: ApiEntity[] = [
    {
      title: "GET",
      state: "public",
      url: `${baseUrl}/${entityName}`,
    },
    {
      title: "GET",
      state: "public",
      url: `${baseUrl}/${entityName}/{${entityIdName}}`,
    },
    {
      title: "POST",
      state: "admin",
      url: `${baseUrl}/${entityName}`,
    },
    {
      title: "PATCH",
      state: "admin",
      url: `${baseUrl}/${entityName}`,
    },
    {
      title: "DELETE",
      state: "admin",
      url: `${baseUrl}/${entityName}`,
    },
  ];

  return (
    <>
      {API_LIST.map(({ title, state, url }) => (
        <ApiAlert
          key={`${title} ${url}`}
          title={title}
          variant={state}
          description={url}
        />
      ))}
    </>
  );
};

export default ApiList;
