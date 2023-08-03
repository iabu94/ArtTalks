using Microsoft.AspNetCore.SignalR;

namespace Art.Talks.API.WebSocket;

public class ChatHub : Hub
{
    public async Task SendMessage(string sender, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", sender, message);
    }
}
