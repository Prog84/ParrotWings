using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace ParrotWings.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; } // FIO
        public int BalancePW { get; set; } // добавляем свойство BalancePW
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Обратите внимание, что authenticationType должен совпадать с типом, определенным в CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Здесь добавьте настраиваемые утверждения пользователя
            return userIdentity;
        }
    }
    public class WingsCarrotDBContext : IdentityDbContext<ApplicationUser>
    {
        public WingsCarrotDBContext() : base("DefaultConnection")
        {
            Database.SetInitializer<WingsCarrotDBContext>(new WingsCarrotDBInit());
        }

        public static WingsCarrotDBContext Create() => new WingsCarrotDBContext();

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new TransactionEntityConfiguration());
        }
        public DbSet<Transaction> Transactions { get; set; }
    }

    public class TransactionEntityConfiguration : EntityTypeConfiguration<Transaction>
    {
        public TransactionEntityConfiguration()
        {
            HasKey(K => K.TransactionId);
            Property(id => id.TransactionId).IsRequired().HasColumnName("TransactionId");
            Property(ufid => ufid.UserFromId).IsRequired().HasColumnName("UserFromId");
            Property(uo => uo.TypeOperation).IsRequired().HasColumnName("TypeOperation");
            Property(utid => utid.UserToId).IsRequired().HasColumnName("UserToId");
            Property(s => s.SumPw).IsRequired().HasColumnName("SumPw");
            Property(rezs => rezs.ResultPw).IsRequired().HasColumnName("ResultPw");
            Property(tt => tt.TransactionTime).IsRequired().HasColumnName("TransactionTime");
            ToTable("Transactions");

        }
    }

    public class WingsCarrotDBInit:CreateDatabaseIfNotExists<WingsCarrotDBContext>
    {
        protected override void Seed(WingsCarrotDBContext context)
        {       
            
        }
    }
}