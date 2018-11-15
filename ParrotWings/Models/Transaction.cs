using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string UserFromId { get; set; }
        public string TypeOperation { get; set; }
        public string UserToId { get; set; }
        public string SumPw { get; set; }
        public string ResultPw { get; set; }
        public DateTime TransactionTime { get; set; }
    }
}



