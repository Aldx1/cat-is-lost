import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const baseUrl = process.env.API_URL;

export const useFetch = <T>(
  invoke: boolean,
  setInvoke: Function,
  url: string,
  requestData: any,
  auth: boolean,
  callbackSuccess?: Function,
  method: HTTPMethod = HTTPMethod.POST
): { loading: boolean; error: boolean } => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { apiToken } = useAuth();
  const { showModal, closeModal } = useModal();

  let headers = {
    accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  if (auth) Object.assign(headers, { Authorization: apiToken });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      axios({
        method: method,
        url: url,
        baseURL: baseUrl,
        data: requestData,
        headers: headers,
      })
        .then((response) => {
          if (showModal) closeModal();
          if (callbackSuccess) callbackSuccess(response.data as T);
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          setInvoke(false);
        });
    };

    if (invoke) fetchData();

    return () => {};
  }, [invoke]);

  return { loading, error };
};
