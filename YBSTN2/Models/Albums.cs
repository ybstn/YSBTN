using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace YBSTN.Models
{
    public class Albums
    {
		public static List<album> GetAllAlbumes(string webRoot)
		{
			XElement Discog = XElement.Load(System.IO.Path.Combine(webRoot, "XML/YBSTN.xml"));

			List<album> _albums = (from node in Discog.Elements("album")
								   select new album
								   {
									   Aid = node.Attribute("Aid").Value,
									   name = node.Attribute("name").Value,
									   AlbLink = node.Attribute("AlbLink").Value,
									   AlbYId = node.Attribute("AlbYId").Value,
									   ImgUrl = node.Attribute("ImgUrl").Value,
									   tracks = node.Attribute("tracks").Value,
									   AlbumDescriptionTitle = node.Element("AlbumDescription").Element("AlbumDescriptionTitle").Value,
									   AlbumDescriptionText = node.Element("AlbumDescription").Element("AlbumDescriptionText").Value,
									   trackList = getAlbumTrackList(node)
								   }
							  ).ToList();
			return _albums;
		}
		public static album GetSingleAlbum(string albID, string contentRoot)
        {
			XElement Discog = XElement.Load(System.IO.Path.Combine(contentRoot, "XML/YBSTN.xml"));
			XElement node = Discog.Elements("album").FirstOrDefault(x=> x.Attribute("Aid").Value ==albID);
			album _album = new album
								   {
									   Aid = node.Attribute("Aid").Value,
									   name = node.Attribute("name").Value,
									   AlbLink = node.Attribute("AlbLink").Value,
									   AlbYId = node.Attribute("AlbYId").Value,
									   ImgUrl = node.Attribute("ImgUrl").Value,
									   tracks = node.Attribute("tracks").Value,
									   AlbumDescriptionTitle = node.Element("AlbumDescription").Element("AlbumDescriptionTitle").Value,
									   AlbumDescriptionText = node.Element("AlbumDescription").Element("AlbumDescriptionText").Value,
									   trackList = getAlbumTrackList(node)

								   };
			return _album;
		}
		private static ICollection<track> getAlbumTrackList(XElement node)
		{
			ICollection<track> tracklist = (from _track in node.Elements("track")
											select new track
											{
												name = _track.Attribute("name").Value,
												STime = _track.Attribute("STime").Value,
												Path = _track.Attribute("path").Value,
												trackId = int.Parse(_track.Attribute("Tid").Value)
											}).ToList();
			return tracklist;
		}
	}
}
