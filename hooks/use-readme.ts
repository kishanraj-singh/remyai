import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { Readme } from "@prisma/client";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data.data);

export const useReadme = (id: string) => {
  const { data: session } = useSession();
  const { data, mutate } = useSWR(
    session?.user ? `/api/readme/${id}` : null,
    fetcher,
  );

  return { readme: data as Readme, mutate };
};
