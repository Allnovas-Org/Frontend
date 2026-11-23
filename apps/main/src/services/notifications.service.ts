import { api } from "../lib/axios";
import { Page } from "./jobs.service";

export interface ApiNotification {
  id: string;
  kind: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
  created_at: string;
  read_at: string | null;
  archived_at: string | null;
}

export async function listNotifications(): Promise<Page<ApiNotification>> {
  const { data } = await api.get<Page<ApiNotification>>("/notifications/");
  return data;
}

export async function markNotificationRead(
  id: string,
): Promise<ApiNotification> {
  const { data } = await api.post<ApiNotification>(
    `/notifications/${id}/read/`,
  );
  return data;
}

export async function archiveNotification(
  id: string,
): Promise<ApiNotification> {
  const { data } = await api.post<ApiNotification>(
    `/notifications/${id}/archive/`,
  );
  return data;
}

export async function deleteNotification(id: string): Promise<void> {
  await api.delete(`/notifications/${id}/`);
}
