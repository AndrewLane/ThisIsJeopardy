namespace ThisIsJeopardy.Models;

public class GameState
{
    public string? GameId { get; set; }
    public string? PlayerId1 { get; set; }
    public string? PlayerId2 { get; set; }
    public DateTime? BuzzedInTime { get; set; }
    public string? BuzzedInPlayer { get; set; }
}
