import { api } from "../lib/axios";
import { Page } from "./jobs.service";

export interface Conversation {
  id: string;
  job_id: string | null;
  job_title: string;
  other_user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
  };
  latest_message: Message | null;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_username: string;
  body: string;
  created_at: string;
  read_at: string | null;
}

export async function listConversations(): Promise<Page<Conversation>> {
  const { data } = await api.get<Page<Conversation> | Conversation[]>(
    "/messages/conversations/",
  );
  return Array.isArray(data)
    ? { count: data.length, next: null, previous: null, results: data }
    : data;
}

export async function getConversation(id: string): Promise<Conversation> {
  const { data } = await api.get<Conversation>(`/messages/conversations/${id}/`);
  return data;
}

export async function createConversation(jobId: string): Promise<Conversation> {
  const { data } = await api.post<Conversation>("/messages/conversations/", {
    job_id: jobId,
  });
  return data;
}

export async function listMessages(
  conversationId: string,
): Promise<Page<Message>> {
  const { data } = await api.get<Page<Message> | Message[]>(
    `/messages/conversations/${conversationId}/messages/`,
  );
  return Array.isArray(data)
    ? { count: data.length, next: null, previous: null, results: data }
    : data;
}

export async function listAllMessages(
  conversationId: string,
): Promise<Message[]> {
  const messages: Message[] = [];
  let page = 1;
  while (true) {
    const { data } = await api.get<Page<Message> | Message[]>(
      `/messages/conversations/${conversationId}/messages/`,
      { params: { page } },
    );
    if (Array.isArray(data)) {
      messages.push(...data);
      break;
    }
    messages.push(...data.results);
    if (!data.next) break;
    page += 1;
  }
  return messages;
}

export async function sendMessage(
  conversationId: string,
  body: string,
): Promise<Message> {
  const { data } = await api.post<Message>(
    `/messages/conversations/${conversationId}/messages/`,
    { body },
  );
  return data;
}

export async function markConversationRead(
  conversationId: string,
): Promise<void> {
  await api.post(`/messages/conversations/${conversationId}/read/`);
}
