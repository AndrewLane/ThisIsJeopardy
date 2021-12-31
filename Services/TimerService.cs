using System.Timers;

namespace ThisIsJeopardy.Services;

/// <summary>
/// Source: https://docs.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-6.0&viewFallbackFrom=aspnetcore-3.0#invoke-component-methods-externally-to-update-state
/// </summary>
public class TimerService : IDisposable
{
    private int elapsedCount;
    private readonly ILogger<TimerService> logger;
    private readonly NotifierService notifier;
    private System.Timers.Timer? timer;
    private const int tickInterval = 500;

    public TimerService(NotifierService notifier, ILogger<TimerService> logger)
    {
        this.notifier = notifier;
        this.logger = logger;
    }

    public void Start()
    {
        if (timer is null)
        {
            timer = new();
            timer.AutoReset = true;
            timer.Interval = tickInterval;
            timer.Elapsed += HandleTimer;
            timer.Enabled = true;
            logger.LogInformation("Timer Started");
        }
    }

    private async void HandleTimer(object? source, ElapsedEventArgs e)
    {
        elapsedCount += 1;
        await notifier.Update("elapsedCount", elapsedCount);
        // logger.LogInformation($"elapsedCount: {elapsedCount}");
    }

    public void Dispose()
    {
        timer?.Dispose();
    }
}