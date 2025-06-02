using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;



public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        DotNetEnv.Env.Load(); // !!! תוסיף את זה כאן !!!

        var configuration = new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();

        var connectionString = configuration["CONNECTION_STRING"];
        Console.WriteLine($"Connection: {connectionString}");

        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseMySql(
            connectionString,
            new MySqlServerVersion(new Version(8, 0, 36))
        );

        return new DataContext(optionsBuilder.Options);
    }
}

