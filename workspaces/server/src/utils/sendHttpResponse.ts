import type { Response } from "express";

interface HttpResponseArgs<T> {
  res: Response;
  status?: number;
  data?: T;
  error?: string;
}

export default function sendHtppResponse<T>(args: HttpResponseArgs<T>) {
  const { res, status, data, error } = args;

  if (error) {
    return res
      .status(status || 500)
      .json({ status: status || 500, error: { code: status, message: error } });
  }

  return res.status(status || 200).json({ status: status || 200, data: data, statusText: "OK" });
}
