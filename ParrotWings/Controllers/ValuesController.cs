using ParrotWings.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ParrotWings.Controllers
{
    [Authorize]
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        [Route("getUsers/{userID}")]
        [HttpGet]
        public List<ApplicationUser> getUsers([FromUri] string userID)
        {
           var context = new WingsCarrotDBContext();
           var allUsers = context.Users.Select(u => u).Where(u => !u.Id.Contains(userID)).ToList();
           return allUsers;
        }

        [Route("getBalance/{userID}")]
        [HttpGet]
        public string getBalance([FromUri] string userID)
        {
            var context = new WingsCarrotDBContext();
            var balanceUser = context.Users.Select(u => new { u.Id, u.BalancePW }).Where(u => u.Id.Contains(userID)).ToList();
            return balanceUser[0].BalancePW.ToString();
        }
        [Route("addTransaction")]
        [HttpPost]
        public string addTransaction([FromBody] Transaction userTransaction)
        {
            using (var context = new WingsCarrotDBContext())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        ApplicationUser tempUserFromBalance = context.Users.SingleOrDefault(u => u.Id == userTransaction.UserFromId);
                        tempUserFromBalance.BalancePW = tempUserFromBalance.BalancePW - Convert.ToInt32(userTransaction.SumPw);
                        ApplicationUser tempUserToBalance = context.Users.SingleOrDefault(u => u.Id == userTransaction.UserToId);
                        tempUserToBalance.BalancePW = tempUserToBalance.BalancePW + Convert.ToInt32(userTransaction.SumPw);
                        context.SaveChanges();
                        userTransaction.ResultPw = tempUserFromBalance.BalancePW.ToString();
                        context.Transactions.Add(userTransaction);
                        context.SaveChanges();
                        var tempId = userTransaction.UserToId;
                        userTransaction.UserToId = userTransaction.UserFromId;
                        userTransaction.UserFromId = tempId;
                        userTransaction.TypeOperation = "DEBIT";
                        userTransaction.ResultPw = tempUserToBalance.BalancePW.ToString();
                        context.Transactions.Add(userTransaction);
                        context.SaveChanges();
                        dbContextTransaction.Commit();
                        return tempUserFromBalance.BalancePW.ToString();
                    }
                    catch (Exception e)
                    {
                        dbContextTransaction.Rollback();
                        return e.ToString();
                    }
                }
            }
        }
        [Route("getTransactions/{userID}")]
        [HttpGet]
        public IQueryable getTransactions([FromUri] string userID)
        {
            var context = new WingsCarrotDBContext();
            var Transactions = from tr in context.Transactions
                         join u in context.Users on tr.UserToId equals u.Id
                         where tr.UserFromId.Contains(userID)
                         orderby tr.TransactionTime descending
                         select new
                         {
                             tr.TransactionId,
                             tr.UserFromId,
                             tr.TypeOperation,
                             UserToId = u.Name,
                             tr.SumPw,
                             tr.ResultPw,
                             tr.TransactionTime
                         };
            return Transactions;
        }
    }
}



