using System;
using System.Linq;
namespace YBSTN.Helpers
{
    public class Randomizer
	{
		public Randomizer()
        {
		}
		public static int[] Randomize(int limits)
		{
			int[] array = new int[limits];

			for (int i = 0; i < limits; i++)
			{
				array[i] = i;
			}
			Random rand = new Random(DateTime.Now.Millisecond);

			array = array.OrderBy(XmlNode => rand.Next()).ToArray();
			int[] randNumb = array;

			return randNumb;
		}
	}
}
