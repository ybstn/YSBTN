using System;
using System.IO;
using YBSTN.Helpers;

namespace YBSTN.Models
{
	
	public class CurrentTracks 
	{
		
		//Current trackd Dir Analyze
		public static string[] CurrentFiles(string webRoot)
		{
			
			string dirPath = System.IO.Path.Combine(webRoot, "Current/");
			string[] files;
			files = System.IO.Directory.GetFiles(dirPath);
			for (var i = 0; i < files.Length; i++)
			{
				if (files[i].Contains(".DS_Store"))
				{
					files = Array.FindAll(files, val => val != files[i]);
					i--;
				}
			}
			var curTrArr = files;
			var item = 0;
			foreach (var _file in files)
			{
				var filename = Path.GetFileName(_file);
				curTrArr[item] = System.IO.Path.Combine(webRoot, ("Current/" + filename));
				item++;
			}
			return curTrArr;
		}
		//Footages Dir Analyze
		public static string[] CurrentFootages(string webRoot)
		{
			string dirPath = System.IO.Path.Combine(webRoot, "Current/");
			string[] files;
			files = System.IO.Directory.GetFiles(dirPath);
			dirPath = System.IO.Path.Combine(webRoot, "Footages/");
			var Footagefiles = System.IO.Directory.GetFiles(dirPath);
			for (var i = 0; i < Footagefiles.Length; i++)
			{
				if (Footagefiles[i].Contains(".DS_Store") || !Footagefiles[i].Contains(".mp4"))
				{
					Footagefiles = Array.FindAll(Footagefiles, val => val != Footagefiles[i]);
					i--;
				}

			}
			int[] randArray = Randomizer.Randomize(Footagefiles.Length);
			if (Footagefiles.Length < files.Length)
			{
				int FootTrackDiff = files.Length - Footagefiles.Length;
				int[] CompactionArray = new int[FootTrackDiff];
				int[] StartArray = randArray;
				randArray = new int[files.Length];
				StartArray.CopyTo(randArray, 0);

				int DiffVolume = (int)Math.Ceiling((double)(files.Length / Footagefiles.Length));
				for (int i = 0; i < DiffVolume; i++)
				{
					int[] AnotherRandomArray = Randomizer.Randomize(Footagefiles.Length);

					if (FootTrackDiff > Footagefiles.Length)
					{

						CompactionArray = AnotherRandomArray;
					}
					else
					{
						for (var y = 0; y < FootTrackDiff; y++)
						{
							CompactionArray[i] = AnotherRandomArray[i];
						}
					}
					CompactionArray.CopyTo(randArray, StartArray.Length);
				}
			}
			var CurrentFootageArray = new string[files.Length];
			var curFootArr = Footagefiles;
			for (var i = 0; i < files.Length; i++)
			{
				int randint = randArray[i];
				string AfterRandValue = curFootArr[randint];
				AfterRandValue = AfterRandValue.Substring(AfterRandValue.IndexOf("Footages", StringComparison.CurrentCulture));
				CurrentFootageArray[i] = AfterRandValue;
			}

			return CurrentFootageArray;

		}
	}
}
