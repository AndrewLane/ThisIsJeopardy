using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace ThisIsJeopardy.Services;

public class ApiHelperService
{
    private readonly IWebAssemblyHostEnvironment _hostingEnvironment;
    public ApiHelperService(IWebAssemblyHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment;
    }

    public string GetApi(string path)
    {
        string prefix = string.Empty;
        if (_hostingEnvironment.IsDevelopment())
        {
            prefix = "http://localhost:8888/";
        }

        return $"{prefix}{path}";
    }
}

