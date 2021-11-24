using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace YBSTN.Models
{
    public class Events
    {
		public static List<_event> GetAllEvents(string webRoot)
		{
			XElement Discog = XElement.Load(System.IO.Path.Combine(webRoot, "XML/YBSTN.xml"));

			List<_event> events = (from node in Discog.Elements("event")
									select new _event
									{
										name = node.Attribute("name").Value,
										Eid = node.Attribute("Eid").Value,
										CoverImgUrl = node.Attribute("CoverImgUrl").Value,
										FolderImgUrl = node.Attribute("FolderImgUrl").Value,
										EventName = node.Element("EventDescription").Element("EventName").Value,
										EventShortDescription = node.Element("EventDescription").Element("EventShortDescription").Value,
										EventLongDescription = node.Element("EventDescription").Element("EventLongDescription").Value,
										EventDate = node.Element("EventDate").Value,
										EventLink = node.Element("EventLink").Attribute("link").Value,
										EventLinkText = node.Element("EventLink").Value,
										EventVideoLinks = getEventVideoLinks(node),
										files = EventPhotoVideoDir(webRoot, node),
										audioFiles = getEventAudio(node)
									}
							  ).ToList();
			return events;
		}
		public static _event GetSingleEvent(string Eid, string webRoot)
		{
			XElement Discog = XElement.Load(System.IO.Path.Combine(webRoot, "XML/YBSTN.xml"));
			XElement node = Discog.Elements("event").FirstOrDefault(x => x.Attribute("Eid").Value == Eid);
			_event evnt = new _event
			{
				name = node.Attribute("name").Value,
				Eid = node.Attribute("Eid").Value,
				CoverImgUrl = node.Attribute("CoverImgUrl").Value,
				FolderImgUrl = node.Attribute("FolderImgUrl").Value,
				EventName = node.Element("EventDescription").Element("EventName").Value,
				EventShortDescription = node.Element("EventDescription").Element("EventShortDescription").Value,
				EventLongDescription = node.Element("EventDescription").Element("EventLongDescription").Value,
				EventDate = node.Element("EventDate").Value,
				EventLink = node.Element("EventLink").Attribute("link").Value,
				EventLinkText = node.Element("EventLink").Value,
				EventVideoLinks = getEventVideoLinks(node),
				files = EventPhotoVideoDir(webRoot, node)
			};
			return evnt;
		}
		private static List<string> getEventVideoLinks(XElement node)
		{
			List<string> videoLinklist = (from _link in node.Element("EventVideoLinks").Elements("link")
										  select _link.Value).ToList();
			return videoLinklist;
		}
		private static List<string> EventPhotoVideoDir(string webRoot, XElement node)
        {
            string[] files;
			string folderUrl =  node.Attribute("FolderImgUrl").Value;

			files = System.IO.Directory.GetFiles(System.IO.Path.Combine(webRoot, folderUrl));
            for (var i = 0; i < files.Length; i++)
            {
                if (files[i].Contains(".DS_Store"))
                {
                    files = Array.FindAll(files, val => val != files[i]);
                    i--;
                }
            }
            var curImgArr = files;
           
            for (var i = 0; i < files.Length; i++)
            {
                var iicur = curImgArr[i].Substring(curImgArr[i].LastIndexOf("/", StringComparison.CurrentCulture)+1);
                curImgArr[i] = '/' + folderUrl +iicur;
            }
			curImgArr = curImgArr.OrderBy(x => x.Length).ToArray();
			return curImgArr.ToList();

		}
		private static ICollection<Eventtrack> getEventAudio(XElement node)
        {
			ICollection<Eventtrack> tracklist = (from _track in node.Element("EventAudio").Elements("audio")
											select new Eventtrack
											{
												name = _track.Attribute("name").Value,
												path = _track.Attribute("path").Value
											}).ToList();
			return tracklist;
		}
	}
}
