using ASPNetCoreWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNetCoreWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
