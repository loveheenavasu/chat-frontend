export interface Message {
  _id: string;
  message: string;
  messageType: "USER" | "AI";
  createdAt: number;
  sessionId: number;
}
