using Microsoft.AspNetCore.SignalR;

namespace Art.Talks.API.WebSocket;

public class ChatHub : Hub
{
    public async Task SendMessage(int id, string sender, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", id, sender, message);
    }
}
