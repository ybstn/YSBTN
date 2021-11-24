using System;
using System.ComponentModel.DataAnnotations;
namespace YBSTN2.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
