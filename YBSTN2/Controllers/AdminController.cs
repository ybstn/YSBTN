using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace YBSTN2.Controllers
{
    //[ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    //[Route("[controller]")]
    public class AdminController : Controller
    {
        public AdminController()
        {
        }
        [HttpPost]
        public void AddAlbom()
        {
        }
        [HttpDelete]
        public void DeleteAlbom()
        {
        }
        [HttpPost]
        public void EditAlbom()
        {
        }
    }
}
