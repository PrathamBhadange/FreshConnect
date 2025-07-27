import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Store,
  User,
  CheckCheck,
  Clock,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  senderType: "vendor" | "supplier";
  status: "sent" | "delivered" | "read";
  attachments?: { type: string; url: string; name: string }[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantType: "vendor" | "supplier";
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
}

interface ChatProps {
  currentUserId?: string;
  currentUserType?: "vendor" | "supplier";
  conversationId?: string;
  compact?: boolean;
}

export default function Chat({
  currentUserId = "user1",
  currentUserType = "vendor",
  conversationId,
  compact = false,
}: ChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    conversationId || null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: "conv1",
        participantId: "supplier1",
        participantName: "Fresh Valley Farms",
        participantType: "supplier",
        participantAvatar: "/placeholder.svg",
        lastMessage:
          "Your order has been confirmed and will be delivered tomorrow morning.",
        lastMessageTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        unreadCount: 0,
        online: true,
      },
      {
        id: "conv2",
        participantId: "supplier2",
        participantName: "Spice Kingdom",
        participantType: "supplier",
        participantAvatar: "/placeholder.svg",
        lastMessage: "Do you need the premium quality masala or regular?",
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unreadCount: 2,
        online: false,
      },
      {
        id: "conv3",
        participantId: "vendor1",
        participantName: "Raj's Chaat Corner",
        participantType: "vendor",
        participantAvatar: "/placeholder.svg",
        lastMessage: "Thanks for the quick delivery!",
        lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        unreadCount: 0,
        online: true,
      },
    ];

    const mockMessages: Message[] = [
      {
        id: "msg1",
        content:
          "Hi! I'm interested in placing a bulk order for fresh vegetables.",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        senderId: currentUserId,
        senderName: "You",
        senderType: currentUserType,
        status: "read",
      },
      {
        id: "msg2",
        content:
          "Hello! Thank you for reaching out. What quantities are you looking for?",
        timestamp: new Date(Date.now() - 55 * 60 * 1000),
        senderId: "supplier1",
        senderName: "Fresh Valley Farms",
        senderType: "supplier",
        status: "read",
      },
      {
        id: "msg3",
        content:
          "I need about 50kg tomatoes, 30kg onions, and 20kg potatoes daily for my street food stall.",
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        senderId: currentUserId,
        senderName: "You",
        senderType: currentUserType,
        status: "read",
      },
      {
        id: "msg4",
        content:
          "Perfect! We can definitely supply those quantities. For bulk orders like this, I can offer you a 15% discount. Would you like me to prepare a quote?",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        senderId: "supplier1",
        senderName: "Fresh Valley Farms",
        senderType: "supplier",
        status: "read",
      },
      {
        id: "msg5",
        content:
          "That sounds great! Yes, please send me the quote. Also, what's your delivery schedule?",
        timestamp: new Date(Date.now() - 40 * 60 * 1000),
        senderId: currentUserId,
        senderName: "You",
        senderType: currentUserType,
        status: "read",
      },
      {
        id: "msg6",
        content:
          "We deliver fresh produce every morning between 6-8 AM. I'll send you the detailed quote with pricing in a few minutes.",
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        senderId: "supplier1",
        senderName: "Fresh Valley Farms",
        senderType: "supplier",
        status: "read",
      },
    ];

    setConversations(mockConversations);
    if (conversationId || mockConversations.length > 0) {
      setActiveConversation(conversationId || mockConversations[0].id);
      setMessages(mockMessages);
    }
  }, [conversationId, currentUserId, currentUserType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      content: newMessage,
      timestamp: new Date(),
      senderId: currentUserId,
      senderName: "You",
      senderType: currentUserType,
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate delivery confirmation
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg,
        ),
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getActiveConversation = () => {
    return conversations.find((conv) => conv.id === activeConversation);
  };

  if (compact) {
    // Compact chat for embedding in other components
    return (
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Chat</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {messages.slice(-5).map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderId === currentUserId
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.senderId === currentUserId
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "p-4 border-b cursor-pointer hover:bg-muted transition-colors",
                  activeConversation === conversation.id && "bg-muted",
                )}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.participantAvatar} />
                      <AvatarFallback>
                        {conversation.participantType === "supplier" ? (
                          <Store className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">
                        {conversation.participantName}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge
                          variant="default"
                          className="ml-2 h-5 w-5 p-0 text-xs"
                        >
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(conversation.lastMessageTime)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={getActiveConversation()?.participantAvatar}
                    />
                    <AvatarFallback>
                      {getActiveConversation()?.participantType ===
                      "supplier" ? (
                        <Store className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {getActiveConversation()?.participantName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getActiveConversation()?.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0 flex flex-col h-[400px]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.senderId === currentUserId
                          ? "justify-end"
                          : "justify-start",
                      )}
                    >
                      <div className="flex items-start gap-2 max-w-[80%]">
                        {message.senderId !== currentUserId && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={getActiveConversation()?.participantAvatar}
                            />
                            <AvatarFallback>
                              {getActiveConversation()?.participantType ===
                              "supplier" ? (
                                <Store className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={cn(
                            "rounded-lg px-3 py-2",
                            message.senderId === currentUserId
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs opacity-60">
                              {formatTime(message.timestamp)}
                            </p>
                            {message.senderId === currentUserId && (
                              <div className="ml-2">
                                {message.status === "sent" && (
                                  <Clock className="h-3 w-3 opacity-60" />
                                )}
                                {message.status === "delivered" && (
                                  <CheckCheck className="h-3 w-3 opacity-60" />
                                )}
                                {message.status === "read" && (
                                  <CheckCheck className="h-3 w-3 text-blue-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Select a conversation to start chatting
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
