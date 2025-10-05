import { SUPABASE } from "../supabaseClient.js";

//Create conversation
export const createConversation = async (user1_id, user2_id) => {
  if (!user1_id || !user2_id)
    throw new Error("Both user1_id and user2_id are required");

  const { data, error } = await SUPABASE.from("conversations")
    .insert([{ user1_id, user2_id }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

//Get all conversations
export const getAllConversations = async () => {
  const { data, error } = await SUPABASE.from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

//Send message
export const sendMessage = async (conversation_id, sender_id, text) => {
  if (!conversation_id || !sender_id || !text)
    throw new Error("conversation_id, sender_id, and text are required");

  const { data, error } = await SUPABASE.from("messages")
    .insert([{ conversation_id, sender_id, text }])
    .select();

  if (error) throw new Error(error.message);

  //Broadcast to realtime listeners
  await broadcastMessage(data[0]);
  return data[0];
};

//Fetch messages
export const getMessagesByConversation = async (
  conversation_id,
  limit,
  offset
) => {
  const { data, error } = await SUPABASE.from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true })
    .range(Number(offset), Number(offset) + Number(limit) - 1);

  if (error) throw new Error(error.message);
  return data;
};

//Realtime subscription for conversation
export const subscribeToConversation = (conversationId) => {
  const channel = SUPABASE.channel(`conversation:${conversationId}`);

  channel
    .on("broadcast", { event: "new_message" }, (payload) => {
      console.log(
        `New realtime message in conversation ${conversationId}:`,
        payload
      );
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log(
          `Listening to realtime updates for conversation ${conversationId}`
        );
      }
    });

  return channel;
};

//Broadcast message to subscribers
export const broadcastMessage = async (message) => {
  const channel = SUPABASE.channel(`conversation:${message.conversation_id}`);
  await channel.send({
    type: "broadcast",
    event: "new_message",
    payload: message,
  });
};
