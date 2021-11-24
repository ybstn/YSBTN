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
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _env;
		public XElement Discog;

        public HomeController(IWebHostEnvironment env)
        {
            _env = env;
		
		}
        [HttpGet]
        public MainPage Get()
        {
			MainPage mainPage = new MainPage();
            //mainPage.CurrentTracksArray = CurrentTracks.CurrentFiles(_env.WebRootPath);
            //mainPage.CurrentFootageArray = CurrentTracks.CurrentFootages(_env.WebRootPath);

            mainPage.Albumes = Albums.GetAllAlbumes(_env.WebRootPath);
            return mainPage;
        }

        [HttpGet]
        [Route("GetCurrentTracks")]
        public string[] GetCurrentTracks()
        {
            var CurrentTrackArray = CurrentTracks.CurrentFiles(_env.WebRootPath);
            return CurrentTrackArray;

        }

        [HttpGet]
        [Route("Album/{id}")]
        public album Album(string id)
        {
            album _album  = Albums.GetSingleAlbum(id,_env.WebRootPath);
            return _album;
        }
    }
}
