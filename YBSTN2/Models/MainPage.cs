using System;
using System.Collections.Generic;

namespace YBSTN.Models
{
    public class MainPage
    {
        //public MainPage()
        //{
        //}
        public string[] CurrentTracksArray { get; set; }
        public string[] CurrentFootageArray { get; set; }
        public string[] DescribesArray { get; set; }
        public string[] CurrentImageArray { get; set; }
        public virtual ICollection<album> Albumes { get; set; }
        public virtual ICollection<_event> _Events { get; set; }
    }
    public class album
    {
        public string name { get; set; }
        public string tracks { get; set; }
        public string Aid { get; set; }
        public string AlbLink { get; set; }
        public string AlbYId { get; set; }
        public string ImgUrl { get; set; }
        public string AlbumDescriptionTitle { get; set; }
        public string AlbumDescriptionText { get; set; }
        public virtual ICollection<track> trackList { get; set; }
    }
    public class track
    {
        public string name { get; set; }
        public string STime { get; set; }
        public string Path { get; set; }
        public int trackId { get; set; }
    }
    public class _event
    {
        public string name { get; set; }
        public string Eid { get; set; }
        public string CoverImgUrl { get; set; }
        public string FolderImgUrl { get; set; }
        public string EventName { get; set; }
        public string EventShortDescription { get; set; }
        public string EventLongDescription { get; set; }
        public string EventDate { get; set; }
        public string EventLink { get; set; }
        public string EventLinkText { get; set; }
        public virtual List<string> EventVideoLinks { get; set; }
        public virtual List<string> files { get; set; }
        public virtual ICollection<Eventtrack> audioFiles { get; set; }
    }
    public class Eventtrack
    {
        public string name { get; set; }
        public string path { get; set; }
    }
}

