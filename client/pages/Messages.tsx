import Chat from "@/components/Chat";

export default function Messages() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-2">Communicate with suppliers and vendors</p>
      </div>
      
      <Chat />
    </div>
  );
}
