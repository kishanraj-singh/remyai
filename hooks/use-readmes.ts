import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { Readme } from "@prisma/client";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data.data);

export const useReadmes = () => {
  const { data: session } = useSession();
  const { data, mutate } = useSWR(
    session?.user ? "/api/readme" : null,
    fetcher,
  );

  return { readmes: (data ?? []) as Readme[], mutate };
};
