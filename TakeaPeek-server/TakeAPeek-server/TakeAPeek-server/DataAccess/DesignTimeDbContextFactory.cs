using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-1VUANBN; Initial Catalog=TakeAPeek; Integrated Security=True;TrustServerCertificate=True;");

        return new DataContext(optionsBuilder.Options);
    }
}
