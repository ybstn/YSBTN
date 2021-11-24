using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using YBSTN.Helpers;
using YBSTN.Models;

namespace YBSTN.Controllers
{
    [Route("[controller]")]
    public class EventsDataController : Controller
    {
        private readonly IWebHostEnvironment _env;
        public XElement Discog;

        public EventsDataController(IWebHostEnvironment env)
        {
            _env = env;

        }
        [HttpGet]
        public List<_event> Get()
        {
            MainPage mainPage = new MainPage();
            List<_event> events = Events.GetAllEvents(_env.WebRootPath);
            return events;
        }
        [HttpGet]
        [Route("{id}")]
        public _event Get(string id)
        {
            _event evnt = Events.GetSingleEvent(id, _env.WebRootPath);
            return evnt;

        }
    }
}
